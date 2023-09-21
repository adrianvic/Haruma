const { SlashCommandBuilder } = require('discord.js');
const { PermissionsBitField } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nuke')
        .setDescription('Delete messages')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('How many messages?')
                .setMaxValue(50)
                .setMinValue(1)
                .setRequired(true)),
    async execute(interaction) {
        const number = interaction.options.getInteger('number');
        
        try {
            // Check permissions
            if (
                !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)
            ) {
                return await interaction.reply({ content: 'Error: missing permissions', ephemeral: true });
            }

            // Defer the action
            await interaction.deferReply({ ephemeral: false });
            
            // Delete the messages
            await interaction.channel.bulkDelete(number);

            // Delay
            await new Promise(resolve => setTimeout(resolve, 8000));

            // Answer
            await interaction.followUp({ content: `${number} messages were deleted`});
        } catch (error) {
            console.error(error);
            await interaction.followUp({ content: 'Unknown error.', ephemeral: true });
        }
    }
}
