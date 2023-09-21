const { SlashCommandBuilder, ChannelType  } = require(`discord.js`)
const { EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`go`)
        .setDescription(`Go to a channel in roleplay`)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Where you wanna go?')
                .setRequired(true)),

    async execute(interaction) {
        const chan = interaction.options.getChannel(`channel`)
        const member = interaction.guild.members.cache.get(interaction.user.id);
        const nickname = member.nickname;
        const exitEmbed = new EmbedBuilder()
    .setAuthor({ name: nickname })
    .setDescription(`Went to <#${chan.id}>`)
        const cameEmbed = new EmbedBuilder()
        .setAuthor({ name: nickname })
        .setDescription(`Came from <#${chan.id}>`)
    interaction.reply({ embeds: [exitEmbed] });
    chan.send({ embeds: [cameEmbed] });
    },
}