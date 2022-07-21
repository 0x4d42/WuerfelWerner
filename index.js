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
    const regexNumbers = /[1-9][0-9]*/g; // Match only numbers greater than 0

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'würfeln') {
        // read user input
        let dice = interaction.options.getString('würfel');
        let amount = interaction.options.getString('anzahl').match(regexNumbers)
        
        // Sanity check input
        if (amount && amount[0] > 0){
            amount = amount[0]
        }else{
            // Default
            amount = 1
        }
        
        // loop over amount
        for (let index = 0; index < amount; index++) {
            let res = Math.round((Math.random() * (dice - 1) + 1));
            await interaction.reply('Ergebnis: ' + res + '/' + dice);
        }
        
    }
});

// Login to Discord with your client's token
client.login(process.env.BOT_TOKEN);