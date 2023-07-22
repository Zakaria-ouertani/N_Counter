const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require("./config.json");
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers] });



client.commands = new Collection();

// Get Commands from subfolders in the ./commands dir
const commandFoldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(commandFoldersPath)

for (const folder of commandFolders) {
  const commandsPath = path.join(commandFoldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const commandFilePath = path.join(commandsPath, file);
    const command = require(commandFilePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] the command at ${commandFilePath} is missing required 'data' or 'execute' prop.`);
    }
  }
}

// Get events from the ./events folder
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
for (file of eventFiles) {
  const eventFilePath = path.join(eventsPath, file);
  const event = require(eventFilePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}


client.login(token);
