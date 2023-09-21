const { SlashCommandBuilder, ChannelType  } = require(`discord.js`)
const { EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`do`)
        .setDescription(`Indicates an action in roleplay`)
        .addStringOption(option =>
            option.setName('what')
                .setDescription('What you gonna do?')
                .setMaxLength(256)
                .setRequired(true))
        .addStringOption(option =>
            option.setName('extra')
                .setDescription('Describe the action')
                .setMaxLength(4000)),

    async execute(interaction) {
        const action = interaction.options.getString('what')
        const desc = interaction.options.getString(`extra`)
        const member = interaction.guild.members.cache.get(interaction.user.id);
        const nickname = member.nickname;
        const responseEmbed = new EmbedBuilder()
	.setTitle(`${nickname} ` + action + "...")
	.setFooter({ text: `No one was killed or died` })
    if (desc != null) {responseEmbed.setDescription("..." + desc)};
    interaction.reply({ embeds: [responseEmbed] });
    },
}