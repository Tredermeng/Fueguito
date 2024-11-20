const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");

const ANNOUNCE_CHANNEL_ID = "993255385257480264";
const FOOTER_TEXT = "Tredermeng Community© - Todos los derechos reservados";
const ANNOUNCE_IMAGE_URL =
  "https://cdn.discordapp.com/attachments/1242271769201741901/1305238423052750981/standard.gif?ex=67324d82&is=6730fc02&hm=acca9704d465c8d6f48455e27b4a2be7e11d3768e864e0fe249f6422e23c06a2&";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("announcement")
    .setDescription("📢 Usa el sistema de anuncios.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Solo para Administradores
  cooldown: 3000,

  async execute(interaction, Client) {
    const announceChannel = Client.channels.cache.get(ANNOUNCE_CHANNEL_ID);

    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction
        .reply({
          content: `❌ **¡Tienes que ser administrador para mandar anuncios!**`,
          ephemeral: true,
        })
        .then(() => {
          setTimeout(() => {
            interaction.deleteReply();
          }, 11000);
        });
    }

    const modal = new ModalBuilder()
      .setCustomId("announcementModal")
      .setTitle("Anuncio");

    const descriptionInput = new TextInputBuilder()
      .setCustomId("description")
      .setLabel("Descripción del mensaje")
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder("Introduzca la descripción del anuncio.");

    const descriptionRow = new ActionRowBuilder().addComponents(descriptionInput);

    modal.addComponents(descriptionRow);

    await interaction.showModal(modal);

    const modalInteraction = await interaction.awaitModalSubmit({
      filter: (i) => i.user.id === interaction.user.id,
      time: 1200000_000,
    });

    const description = modalInteraction.fields.getTextInputValue("description");

    const embed = new EmbedBuilder()
      .setColor("#000000")
      .setTitle(`📢 | ANUNCIO | Tredermeng Community`)
      .setFooter({
        text: FOOTER_TEXT,
      })
      .setTimestamp()
      .setDescription(`${description}`)
      .setImage(ANNOUNCE_IMAGE_URL)
      .addFields([
        { name: `Anuncio por:`, value: `${interaction.member}`, inline: true },
      ]);

    announceChannel
      .send({ content: `||@everyone||`, embeds: [embed] }),
    await modalInteraction.deferUpdate();
  },
};
