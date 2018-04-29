function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export default class Grid {
  constructor(size, tiles, teamColors) {
    this.size = size
    this.tiles = tiles
    this.defaultTile = tiles.empty
    this.generate()
    this.teams = Object.keys(teamColors)
    this.teamColors = teamColors
    this.units = this.teams.reduce((acc, val) => (
      { ...acc, [val]: {} }
    ), {})
  }

  generate() {
    this.grid = []
    for (let x = 0; x < this.size[0]; x++) {
      this.grid[x] = []
      for (let y = 0; y < this.size[1]; y++) {
        this.grid[x][y] = Object.assign({}, this.defaultTile)
      }
    }
  }

  contains(coords) {
    return (
      coords[0] >= 0 &&
      coords[0] < this.size[0] &&
      coords[1] >= 0 &&
      coords[1] < this.size[1]
    )
  }

  getTile(coords) {
    return this.grid[coords[0]][coords[1]]
  }

  isEmpty(coords) {
    return this.contains(coords) && this.getTile(coords).type === 'empty'
  }

  moveUnit(oldCoords, newCoords) {
    const unit = this.getTile(oldCoords)
    this.grid[newCoords[0]][newCoords[1]] = unit
    this.setEmpty(oldCoords)
    this.units[unit.team][unit.id] = newCoords
  }

  setEmpty(coords) {
    this.grid[coords[0]][coords[1]] = Object.assign({}, this.defaultTile)
  }

  deleteUnit(coords) {
    const unit = this.getTile(coords)
    delete this.units[unit.team][unit.id]
    this.setEmpty(coords)
  }

  createUnit(unitType, coords, team) {
    const id = generateId()
    this.grid[coords[0]][coords[1]] = { ...this.tiles[unitType], id, team }
    if (team) {
      if (!this.teams.includes(team)) {
        throw new Error('Team does not exist!')
      }
      this.units[team][id] = coords
    }
  }

  getCoords(id, team) {
    return this.units[team][id]
  }

  applyDirection(coords, direction) {
    switch (direction) {
      case 'left': {
        return [coords[0] - 1, coords[1]]
      }
      case 'right': {
        return [coords[0] + 1, coords[1]]
      }
      case 'up': {
        return [coords[0], coords[1] - 1]
      }
      case 'down': {
        return [coords[0], coords[1] + 1]
      }
    }
  }

  draw(ctx) {
    ctx.clear()
    for (let x = 0; x < this.size[0]; x++) {
      for (let y = 0; y < this.size[1]; y++) {
        const unit = this.getTile([x, y])
        if (unit.type !== 'empty') {
          const color = this.teamColors[unit.team][unit.unit]
          ctx.bg(color[0], color[1], color[2])
          ctx.box(x + 1, y + 1, 1, 1)
        }
      }
    }
    ctx.bg(0, 0, 0)
    ctx.box(this.size[0], this.size[1], 1, 1)
  }
}
