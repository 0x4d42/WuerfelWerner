// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'würfeln') {
        let input = interaction.options.getString('würfel');
        let res = Math.round((Math.random() * (input - 1) + 1));
        await interaction.reply('Ergebnis: ' + res + '/' + input);
    }
});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);