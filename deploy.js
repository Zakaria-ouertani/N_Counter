const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./config.json");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandsFolder = fs.readdirSync(foldersPath);
for (const folder of commandsFolder) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command || 'execute in command') {
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] the command at ${filePath} is missing required 'data' or 'execute' prop.`);
    }
  }
}


const rest = new REST().setToken(token);
(async () => {
  try {
    console.log(`Refreshing ${commands.length} slash commands`)
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
    console.log(`Reloaded ${data.length} slash commands`);
  } catch (error) {
    console.error(error);
  }
})();
