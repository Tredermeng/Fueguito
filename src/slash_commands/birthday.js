const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("birthday")
		.setDescription("🎉 Celebra tu cumpleaños.")
		.addUserOption((option) =>
			option
				.setName("user")
				.setDescription("🎉 Menciona a alguien para desearle feliz cumpleaños.")
				.setRequired(true),
		), 

	async execute(interaction, client) {
		const personaMencionada = interaction.options.getUser("user");

		if (personaMencionada) {
			const tarjeta = new EmbedBuilder()
				.setColor("#000000")
				.setTitle(`¡Feliz Cumpleaños, ${personaMencionada.username}! 🎉🎂`) 
				.setDescription(`Que tengas un excelente día y de celebración.`)
				.setImage(
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpapHeGOGN1CKQ09yGFQgvsaVg9VVEPDgxFA&s",
				) 
				.setFooter({ text: "¡Disfruta tu día especial!🎉" });
			interaction.reply({ embeds: [tarjeta] });
		} else {
			const embed = new EmbedBuilder()
				.setColor("#FF0000")
				.setDescription(
					"¡Debes mencionar a alguien para desearle feliz cumpleaños!",
				);
			interaction.reply({ embeds: [embed] });
		}
	},
};
