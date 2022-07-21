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
        // read user input
        let dice = interaction.options.getString('würfel');
        let amount = interaction.options.getInteger('anzahl');

        // Sanity check input
        if (!amount || amount <= 0) {
            amount = 1
        }

        // loop over amount
        let resultString = ""
        for (let index = 0; index < amount; index++) {
            let res = Math.round((Math.random() * (dice - 1) + 1));
            resultString += 'Ergebnis: ' + res + '/' + dice + '\n';
        }
        await interaction.reply(resultString)
    }
});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);