const {
	SlashCommandBuilder,
	EmbedBuilder,
	ChannelType,
	GuildExplicitContentFilter,
} = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setDMPermission(false)
		.setName("server")
		.setDescription(
			"💾 Utilice este comando para verificar la información del servidor",
		),
	async execute(interaction) {
		const serwer = interaction.guild;
		const owner = await serwer.fetchOwner().catch(() => null);
		const onlineMembers = serwer.members.cache.filter(
			(member) => member.presence?.status === "online",
		);
		const { channels, roles } = serwer;
		const sortowaneRole = roles.cache
			.map((role) => role)
			.slice(1, roles.cache.size)
			.sort((a, b) => b.position - a.position);
		const roleUserów = sortowaneRole.filter((role) => !role.managed);
		const roleManaged = sortowaneRole.filter((role) => role.managed);
		const BoosterCount = serwer.members.cache.filter((member) =>
			member.roles.cache.has("1249987041467301889"),
		).size;

		const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
			let totalLength = 0;
			const result = [];

			for (const role of roles) {
				const roleString = `<@&${role.id}>`;

				if (roleString.length + totalLength > maxFieldLength) break;

				totalLength += roleString.length + 1;
				result.push(roleString);
			}

			return result.length;
		};

		const allRolesCount = roles.cache.size - 1;
		const getChannelTypeSize = (type) =>
			channels.cache.filter((channel) => type.includes(channel.type)).size;
		const totalChannels = getChannelTypeSize([
			ChannelType.GuildText,
			ChannelType.GuildNews,
			ChannelType.GuildVoice,
			ChannelType.GuildStageVoice,
			ChannelType.GuildForum,
		]);
		const verificationLevelMap = {
			[GuildExplicitContentFilter.Disabled]: "Low",
			[GuildExplicitContentFilter.MembersWithoutRoles]: "Medium",
			[GuildExplicitContentFilter.AllMembers]: "Hard",
		};
		const verificationLevel =
			verificationLevelMap[serwer.explicitContentFilter] || "Unknown";
		const userId = "954592544539443240";
		const mention = `<@${userId}>`;

		const embed = new EmbedBuilder()
			.setColor("#000000")
			.setAuthor({
				name: serwer.name,
				iconURL: serwer.iconURL({ dynamic: true }),
			})
			.addFields(
				{
					name: `<:_:1032436934863233096>  Server ID:`,
					value: `└ ${serwer.id}`,
					inline: true,
				},
				{
					name: `<a:_:1032436940684931132> Fecha de Creación:`,
					value: `└ <t:${Math.floor(serwer.createdTimestamp / 1000)}:R>`,
					inline: true,
				},
				{
					name: `<a:_:1032436989598892032> Dueño:`,
					value: `└ ${owner?.user?.toString() || "dueño"}`,
					inline: true,
				},
				{
					name: `<:_:1032437017256136824> Miembros (${serwer.memberCount})`,
					value: `└ **${onlineMembers.size}** Online ✅\n└ **${BoosterCount}** Boosters 💜`,
					inline: true,
				},
				{
					name: `<:_:1032437031479017503> Canales (${totalChannels})`,
					value: `└ **${getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildForum, ChannelType.GuildNews])}** Texto\n└ **${getChannelTypeSize([ChannelType.GuildVoice, ChannelType.GuildStageVoice])}** Voz`,
					inline: true,
				},
				{
					name: `<a:_:1032439287578378265> Roles (${allRolesCount})`,
					value: `└ **${maxDisplayRoles(roleUserów)}** Normal roles`,
				},
			)
			.setImage(
				"https://cdn.discordapp.com/attachments/1242271769201741901/1305238423052750981/standard.gif?ex=67324d82&is=6730fc02&hm=acca9704d465c8d6f48455e27b4a2be7e11d3768e864e0fe249f6422e23c06a2&",
			)
			.setFooter({
				text: `Invocado por: ${interaction.user.tag}`,
				iconURL: interaction.user.avatarURL({ dynamic: true }),
			})
			.setTimestamp();

		await interaction.reply({ embeds: [embed] });
	},
};
