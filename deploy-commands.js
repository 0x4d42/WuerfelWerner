const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const dotenv = require('dotenv');
dotenv.config();

const commands = [
        new SlashCommandBuilder().setName('ping').setDescription('Antwortet mit pong!'),
        new SlashCommandBuilder().setName('würfeln')
        .setDescription('Würfelt!')
        .addStringOption(option =>
            option.setName('würfel')
            .setDescription('Wähle den Würfel, welchen du werfen möchtest.')
            .setRequired(true)
            .addChoices({ name: 'W4', value: '4' }, { name: 'W6', value: '6' }, { name: 'W8', value: '8' }, { name: 'W10', value: '10' }, { name: 'W12', value: '12' }, { name: 'W20', value: '20' }, ))
    ]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken((process.env.BOT_TOKEN));

rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);