const { prefix } = require('../config.json')

const validatePermissions = (perms) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`)
    }
  }
}

module.exports = (client, commandOptions) => {
  let {
    command,
    expected = '',
    min = 0,
    max = null,
    perms = [],
    roles = [],
    callback,
  } = commandOptions

  // Ensure the command and aliases are in an array
  if (typeof command === 'string') {
    command = [command]
  }

  console.log(`Registering command "${command[0]}"`)

  // Ensure the permissions are in an array and are all valid
  if (perms.length) {
    if (typeof perms === 'string') {
      perms = [perms]
    }

    validatePermissions(permissions)
  }

  client.on('message', (message) => {
    const { member, content, guild } = message

    for (const alias of command) {
      const cmd = `${prefix}${alias.toLowerCase()}`

      if (
        content.toLowerCase().startsWith(`${cmd} `) ||
        content.toLowerCase() === cmd
      ) {
        // A command has been ran

        // Ensure the user has the required permissions
        for (const perm of perms) {
          if (!member.hasPermission(perm)) {
            let embed = new Discord.MessageEmbed()
            embed.setTitle("Insufficient permissions!")
            embed.setDescription("Hey, looks like you don´t have permission " + "´" + perm + "´" + "Without this permission i can´t let you use this command.")
            embed.setColor("#FF0000")
            return
          }
        }

        // Ensure the user has the required roles
        for (const requiredRole of requiredRoles) {
          const role = guild.roles.cache.find(
            (role) => role.name === requiredRole
          )

          if (!role || !member.roles.cache.has(role.id)) {
            message.reply(
              `You must have the "${requiredRole}" role to use this command.`
            )
            return
          }
        }

        // Split on any number of spaces
        const arguments = content.split(/[ ]+/)

        // Remove the command which is the first index
        arguments.shift()

        // Ensure we have the correct number of arguments
        if (
          arguments.length < minArgs ||
          (maxArgs !== null && arguments.length > maxArgs)
        ) {
          message.reply(
            `Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`
          )
          return
        }

        // Handle the custom command code
        callback(message, arguments, arguments.join(' '), client)

        return
      }
    }
  })
}
