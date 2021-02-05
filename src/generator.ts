import {readFile, writeFile, readdir, access, mkdir} from 'fs/promises'
import path from 'path'
import {compile} from 'handlebars'
import {blue, red, green} from 'chalk'

const checkDir = async (pathToComponent: string) => {
  try {
    await access(pathToComponent)
    console.log(blue('info'), 'exited such directory!!\n')
  } catch {
    console.log(blue('info'), 'No such directory, so make dir!!\n')
    try {
      await mkdir(pathToComponent, {recursive: true})
      console.log(green('success'), 'completed to make directory!!\n')
    } catch (error) {
      console.error(red('failed'), 'make directory :(\n')
    }
  }
}

export const generate = async (name: string, directory: string) => {
  const templates = await readdir(path.join(__dirname, '/templates/'))
  const pathToComponent = path.join(process.cwd(), `/src/components/${directory}/${name}/`)
  await checkDir(pathToComponent)
  return Promise.all(templates.map(async template => {
    try {
      const buffer = await readFile(path.join(__dirname, `/templates/${template}`))
      const compiled = compile(buffer.toString())
      const fileName = template.replace('fc', name).slice(0, -4)
      await writeFile(path.join(pathToComponent, fileName), compiled({name, directory}))
      console.info(green('success'), `created: ${pathToComponent}${fileName}`)
    } catch (error) {
      console.error(red('failed'), 'generate component :(\n', error)
    }
  }))
}
