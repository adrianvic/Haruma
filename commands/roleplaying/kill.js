const { SlashCommandBuilder, ChannelType  } = require(`discord.js`)
const { EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`kill`)
        .setDescription(`Kill someone in roleplay`)
        .addUserOption(option =>
            option.setName('who')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('How?')
                .setMaxLength(4000)
                .setRequired(true)),

    async execute(interaction) {
        const member = interaction.guild.members.cache.get(interaction.user.id);
        const nickname = member.nickname;
        const dead = interaction.options.getUser('who')
        const desc = interaction.options.getString(`reason`)
        const responseEmbed = new EmbedBuilder()
	.setTitle(`${nickname} killed someone:`)
    .setDescription(`<@${dead.id}> died ${desc}`)
    interaction.reply({ embeds: [responseEmbed] });
    },
}