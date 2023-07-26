const { Events } = require('discord.js')
const { addMembers } = require.main.require('./addMembers.js')
const { guildId } = require.main.require('./config.json')
const { readFile, writeFile } = require('node:fs/promises')
const path = require('node:path')

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    function countNigs(messageContent) {
      nigs = (messageContent.match(/nigg|k7alch|negr|ka7louch|wsif/g) || []).length
      return nigs
    }
    const guild = await message.guild.fetch(guildId);
    const members = await guild.members.fetch();
    await addMembers(members);
    const nigsCount = countNigs(message.content);
    const messageSenderId = message.author.id
    let membersJsonPath = path.join(__dirname, '../members.json')
    let membersJson = JSON.parse(await readFile(membersJsonPath))

    membersJson.find(member => {
      if (member.id == messageSenderId) {
        member.nigs += nigsCount
      }
    });
    await writeFile(membersJsonPath, JSON.stringify(membersJson))
  }
}
