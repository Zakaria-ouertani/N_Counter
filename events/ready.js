const { Events } = require('discord.js')
const { addMembers } = require.main.require('./addMembers.js')
const { guildId } = require.main.require('./config.json')
module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    console.log(`Logged in as ${client.user.tag}`);
    const guild = await client.guilds.fetch(guildId)
    const members = await guild.members.fetch()
    await addMembers(members);
  }

}

