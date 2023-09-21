const { SlashCommandBuilder, ChannelType  } = require(`discord.js`)
const { EmbedBuilder } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName(`myname`)
        .setDescription(`Change your nickname`)
        .addStringOption(option =>
            option.setName('name')
                .setDescription('What is your new nickname?')
                .setRequired(true)),

    async execute(interaction) {
        const nick = interaction.options.getString(`name`)
        const member = interaction.guild.members.cache.get(interaction.user.id);
        const nickname = member.nickname;

        if (interaction.guild) {
            try {
                await interaction.member.setNickname(nick);
                interaction.reply({ content: `Your new nickname is **${nickname}**!`, ephemeral: true });
            } catch (error) {
                console.error(error);
                interaction.reply({ content: `Something went wrong`, ephemeral: true });
            }
        } else {
            interaction.reply({ content: 'Try this in a server', ephemeral: true });
        }
    },
}