const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const member = interaction.guild.members.cache.get(interaction.user.id);
        const nickname = member.nickname;
		await interaction.reply(`Pong, ${nickname}!`);
	},
};