import {Command, flags} from '@oclif/command'
import {blue, red} from 'chalk'
import {generate} from './generator'

const atomics = ['atoms', 'molecules', 'organisms', 'organizations', 'templates', 'pages']
const toPascalCase = (str: string) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

class ReactComponentGenerator extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag with no value (-f, --force)
    force: flags.boolean({char: 'f'}),
  }

  static args = [
    {name: 'file'},
    {name: 'directory'},
  ]

  async run() {
    const {args} = this.parse(ReactComponentGenerator)
    if (!(args.file && args.directory)) {
      throw new Error(`${red('error')} required argv[0] && argv[1].
      Please specify the file name for argv[0].
      Please specify the directory name for argv[1].
      ex) atoms, molecules...`)
    }

    if (!atomics.includes(args.directory)) {
      throw new Error(`${red('error')} Specify the module name of atomic design for the directory name.`)
    }
    await generate(toPascalCase(args.file), args.directory)
    console.log('\n', blue('info'), 'completed to generate component :)')
  }
}

export = ReactComponentGenerator
