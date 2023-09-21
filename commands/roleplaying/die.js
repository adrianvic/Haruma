const { SlashCommandBuilder, ChannelType  } = require(`discord.js`);
const { EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`die`)
	.setDescription(`You die in roleplay`)
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Why?')
                .setMaxLength(256)
                .setRequired(true)),

    async execute(interaction) {
        const why = interaction.options.getString('reason')
        const member = interaction.guild.members.cache.get(interaction.user.id);
        const nickname = member.nickname;
        const responseEmbed = new EmbedBuilder()
	.setTitle(`${nickname} died...`)
    .setDescription("..." + why)
    interaction.reply({ embeds: [responseEmbed] });
    },
}