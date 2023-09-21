const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(`about`)
        .setDescription(`About the bot`),

    async execute(interaction) {
        const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

        const botAvatarURL = interaction.client.user.displayAvatarURL();

		// Create an embed with the app name, version, and codename from package.json
        const responseEmbed = new EmbedBuilder()
            .setTitle(`${packageJson.name} *${packageJson.codename}*\n(${packageJson.version}) `)
            .setThumbnail(botAvatarURL)
            .setDescription(`I'm ${packageJson.name}, click me on the command menu to see what I can do.`)
            .setFooter({ text: 'Originally made by 天くま (tenkuma) - Thanks for keeping the credits ;)' });

        // interaction.reply() to reply with a ephemeral message
        await interaction.reply({ embeds: [responseEmbed], ephemeral: true });
    },
};
