import vld from './vld'
import Grid from './Grid'
import { Observable } from 'rx'

async function exitHandler(exit) {
  for (let bot of bots) {
    await bot.container.kill()
    await bot.container.remove()
  }
  if (exit) {
    process.exit()
  }
}
process.on('exit', async () => exitHandler(false))
process.on('SIGINT', exitHandler)
process.on('SIGUSR1', exitHandler)
process.on('SIGUSR2', exitHandler)

const GRID_SIZE = [5, 5]
const UNIT_COMMANDS = {
  soldier: ['move']
}
const TILES = {
  empty: {
    type: 'empty',
  },
  soldier: {
    type: 'unit',
    unit: 'soldier',
    health: 10,
  }
}

const grid = new Grid(GRID_SIZE, TILES, {
  blue: {
    soldier: [64, 121, 140]
  },
  red: {
    soldier: [150, 122, 161]
  }
})
grid.createUnit('soldier', [0, 0], 'blue')
grid.createUnit('soldier', [4, 4], 'red')

let bots

const validator = new vld.Validator({
  type: 'object',
  key: {
    type: 'string',
  },
  value: [
    vld.equal({
      type: ['move', 'attack'],
      direction: ['left', 'right', 'up', 'down'],
    }),
  ],
})

export default async function main(bots_) {
  bots = bots_
  for (let bot of bots) {
    await bot.start()
  }

  // return new Observable(async observer => {
  //   for (let i = 0; i < 100; i++) {
  //     for (let bot of bots) {
  //       let commands
  //       try {
  //         commands = await bot.run({ grid: grid.grid, units: grid.units, team: bot.team })
  //       } catch (e) {
  //         observer.error(e.message)
  //       }
  //       if (validator.validate(commands)) {
  //         for (let id in commands) {
  //           if (!grid.units[bot.team][id]) {
  //             throw new Error(`Invalid id "${id}"!`)
  //           }
  //           const coords = grid.getCoords(id, bot.team)
  //           const command = commands[id]
  //           const unit = grid.getTile(coords)
  //           if (grid.isEmpty(coords)) {
  //             throw new Error(`Coords "(${coords[0]}, ${coords[1]})" do not contain a unit!`)
  //           }
  //           if (!UNIT_COMMANDS[unit.unit].includes(command.type)) {
  //             throw new Error(`Command "${command}" does not exist for unit "${unit.unit}"!`)
  //           }

  //           switch (command.type) {
  //             case 'move': {
  //               let newCoords = grid.applyDirection(coords, command.direction)
  //               if (grid.isEmpty(newCoords)) {
  //                 grid.moveUnit(coords, newCoords)
  //               }
  //               break
  //             }
  //             case 'attack': {
  //               let newCoords = grid.applyDirection(coords, command.direction)
  //               if (!grid.isEmpty(newCoords)) {
  //                 const target = grid.getTile(newCoords)
  //                 target.health -= 1
  //                 if (target.health === 0) {
  //                   grid.deleteUnit(newCoords)
  //                 }
  //               }
  //               break
  //             }
  //           }
  //         }
  //       } else {
  //         observer.error('Data format is wrong!')
  //       }

  //       observer.next(grid)
  //     }
  //   }
  // })
}
