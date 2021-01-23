const path = require('path')
const fs = require('fs')

module.exports = (client) => {
  const handler = require(`./cmds/handler.js`)

  const cmd = []

  const readCmd = (dir) => {
    const f = fs.readdirSync(path.join(__dirname, dir))
    for (const cmd of f) {
      const stat = fs.lstatSync(path.join(__dirname, dir, cmd))
      if (stat.isDirectory()) {
        readCmd(path.join(dir, cmd))
      } else if (cmd !== handler && cmd !== 'load-commands.js') {
        const option = require(path.join(__dirname, dir, cmd))
        cmd.push(option)
        if (client) {
          handler(client, options)
        }
      }
    }
  }

  readCmd('./cmds')

  return cmd
}
