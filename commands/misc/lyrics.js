const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { getLyrics } = require('genius-lyrics-api') ;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setDescription('Search for song lyrics')
        .addStringOption(option =>
            option.setName('artist')
                .setDescription('Artist name')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('title')
                .setDescription('Song title')
                .setRequired(true)),
    async execute(interaction) {
        const artist = interaction.options.getString('artist');
        const title = interaction.options.getString('title');

        // Ephemeral message saying the bot is thinking
        await interaction.deferReply();

        // Use getLyrics to get the lyrics
        try {
            const lyrics = await getLyrics({
                apiKey: 'yourGeniusAPIKey', // Change to your Genius key
                title: title,
                artist: artist,
            });

            if (lyrics) {
                // Embed with the lyrics
                const { EmbedBuilder } = require('discord.js');
                const embed = new EmbedBuilder()
                    .setAuthor({ name: artist })
                    .setTitle(title)
                    .setDescription(lyrics)
                    .setFooter({text : 'Made with Genius API'})

                // Send the embed
                await interaction.followUp({ content: 'Here is the lyric:', ephemeral: false, embeds: [embed] });
            } else {
                await interaction.followUp('Could not find the lyric.');
            }
        } catch (error) {
            console.error('Error while searching for the lyric:', error);
            await interaction.followUp('Error while searching for the lyric.');
        }
    },
};
