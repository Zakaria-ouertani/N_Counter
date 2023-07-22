const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require("./config.json");
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
  console.log(`Logged in as ${c.user.tag}`);
});


client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    console.log(filePath)
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] the command at ${filePath} is missing required 'data' or 'execute' prop.`);
    }
  }
}

client.login(token);
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand) return;
  console.log(interaction);
  if (!commands) {
    console.error(`No command matching ${interaction.commandName} was found.`)
    try {
      await command.execute(interaction)
    }
    catch (error) {
      console.error(error)
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: 'Error while exec' })
      }
      else {
        await interaction.reply({ content: 'Error while exec' })
      }
    }
  }
});
