const { SlashCommandBuilder } = require("discord.js")


module.exports = {
  data: new SlashCommandBuilder()
    .setName("nigs")
    .setDescription("How many nigs."),
  async execute(interaction) {
    await interaction.reply('Number of nigs: ')
  },
};
