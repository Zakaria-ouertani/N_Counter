const { SlashCommandBuilder } = require("discord.js")
const { guildId } = require.main.require("./config.json")



module.exports = {
  data: new SlashCommandBuilder()
    .setName("nigsperuser")
    .setDescription("How many times each user said the thing."),
  async execute(interaction) {
    async function countNigs() {
      messages = await interaction.guild.messages.fetch()
      console.log(typeof messages)
    }
    console.log("yasou3")
    try {
      message = ""
      const guild = await interaction.client.guilds.fetch(guildId);
      const members = await guild.members.fetch()
      members.forEach((member) => {
        message += `${member.user.username} did the deed n times\n`
      });
      await interaction.reply(message)
    } catch (error) {
      console.log(error)
    }
  },
};
