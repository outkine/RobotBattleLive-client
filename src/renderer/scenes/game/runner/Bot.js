import Docker from 'dockerode'
import stream from 'stream'
import { infoPrint } from './print'

const docker = new Docker()

export default class Bot {
  constructor(language, file, team) {
    this.language = language
    this.file = file
    this.team = team
    if (this.language === 'python') {
      this.command = 'python3'
    } else {
      throw new Error('Invalid language')
    }
  }

  async start() {
    this.container = await docker.createContainer({
      Image: `${this.language}:slim`,
      AttachStdin: true,
      AttachStdout: true,
      AttachStderr: true,
      Binds: [`${__dirname}/scripts:/scripts`],
      Tty: false,
      Cmd: [this.command, '/scripts/' + this.file],
      CapDrop: ['ALL'],
      Privileged: false,
      OpenStdin: true,
    })

    this.stream = await this.container.attach({ stream: true, stdin: true, stdout: true, stderr: true })
    this.stdout = new stream.PassThrough()
    this.stderr = new stream.PassThrough()
    this.stdout.setMaxListeners(0)
    this.stderr.setMaxListeners(0)
    this.container.modem.demuxStream(this.stream, this.stdout, this.stder)


    await this.container.start()
  }

  run(data) {
    return new Promise((resolve, reject) => {
      this.stream.write(JSON.stringify(data) + '\n')
      this.stdout.on('data', (data) => {
        for (let string of data.toString().split('\n')) {
          const split = string.split(';')
          if (split[0] === 'ACTION') {
            let result
            try {
              result = JSON.parse(split[1])
            } catch (e) {
              infoPrint(string)
              continue
            }
            this.stdout.removeAllListeners('data')
            resolve(result)
          } else {
            infoPrint(string)
          }
        }
      })
      this.stderr.once('data', (data) => {
        reject(new Error(data.toString()))
      })
    })
  }
}
