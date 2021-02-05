import {Command, flags} from '@oclif/command'
import {blue} from 'chalk'
import {generate} from './generator'

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
    await generate(args.file, args.directory)
    console.log('\n', blue('info'), 'completed to generate component :)')
  }
}

export = ReactComponentGenerator
