const { SlashCommandBuilder, ChannelType  } = require(`discord.js`)
const { EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`t`)
        .setDescription(`Indicates a thought in roleplay`)
        .addStringOption(option =>
            option.setName('what')
                .setRequired(true)),

    async execute(interaction) {
        const desc = interaction.options.getString(`what`)
        const member = interaction.guild.members.cache.get(interaction.user.id);
        const nickname = member.nickname;
        const responseEmbed = new EmbedBuilder()
	.setTitle(`${nickname} is thinking:`)
    .setDescription(desc)
    interaction.reply({ embeds: [responseEmbed] });
    },
}