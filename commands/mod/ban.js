const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require('discord.js');
const { PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove/Ban someone from this server')
        .addBooleanOption(option =>
            option.setName('silent')
                .setDescription('Only you will see the command result')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('type')
                .setRequired(true)
                .addChoices(
                    { name: 'Kick', value: 'kick' },
                    { name: 'Ban', value: 'ban' },
                ))
        .addUserOption(option =>
            option.setName('user')
                .setDescription('User to remove')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Removal reason')
                .setMaxLength(500)
                .setRequired(false)),
    
    async execute(interaction) {
        const banned = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');
        const type = interaction.options.getString('type');
        const silent = interaction.options.getBoolean('silent');
        
        const banEmbed = new EmbedBuilder();
    
        if (type === 'ban') {
            banEmbed.setTitle(`${banned.username} was banned`);
            if (reason) {
                banEmbed.setDescription(`Reason: ${reason}`);
            }
        } 
	else (type === 'kick')
	{
            banEmbed.setTitle(`${banned.username} was removed`);
            if (reason) {
                banEmbed.setDescription(`Reason: ${reason}`);
            }
        }
    
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return interaction.reply({ content: `Wait! You does not have enough permissions...`, ephemeral: true });
        }
    
        try {
            if (type === 'ban') {
                await interaction.guild.members.ban(banned, { reason });
            } else if (type === 'kick') {
                await interaction.guild.members.kick(banned, { reason });
            }
            interaction.reply({ embeds: [banEmbed], ephemeral: silent });
        } catch (error) {
            console.error(error);

            // Check for specific error code '50013' (Missing Permissions)
            if (error.code === 50013) {
                interaction.reply({ content: `Strange... I do not have enough permissions (API 50013).`, ephemeral: true });
            } else {
                interaction.reply({ content: `There was an error while processing the action. (API ${error.code})`, ephemeral: true });
            }
        }
    },
};
