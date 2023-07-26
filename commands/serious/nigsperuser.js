const { SlashCommandBuilder } = require("discord.js")
const { guildId } = require.main.require("./config.json")
const { readFile } = require('node:fs/promises')
const path = require('node:path')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nigsperuser")
    .setDescription("How many times each user said the thing."),
  async execute(interaction) {
    try {
      let message = ""
      const membersJsonPath = path.join(__dirname, '../../members.json');
      const membersJson = JSON.parse(await readFile(membersJsonPath));

      for (member of membersJson) {
        let user = await interaction.client.users.fetch(member.id);
        let username = user.username;
        let nigs = member.nigs;
        message += `${username} did the deed ${nigs} ${nigs == 1 ? 'time' : 'times'}.\n`;
      }

      interaction.reply(message)
    } catch (error) {
      console.log(error)
    }
  },
};
