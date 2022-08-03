import { Client, GatewayIntentBits, Interaction, Message, MessageActionRow, MessageButton, EmbedBuilder } from "discord.js";
import { Browser, BrowserOptions } from "./Browser";

export interface BotOptions {
	token: string;
	channelID: string;
	prefix?: string;
	role?: string;
	browserOptions?: BrowserOptions;
};

export class Bot {
	private readonly token: string;
	private readonly channelID: string;
	private readonly prefix: string;
	private readonly role: string | undefined;
	private readonly intents: number[];
	private readonly client: Client;
	private readonly browser: Browser;

	private controller: Message | undefined;

	constructor(options: BotOptions) {
		this.token = options.token;
		this.channelID = options.channelID;
		this.prefix = options.prefix || "!";
		this.role = options.role;

		this.intents = [
			GatewayIntentBits.Guilds,
			GatewayIntentBits.GuildMessages
		];

		this.client = new Client({ intents: this.intents });
		this.browser = new Browser(options.browserOptions);

		this.launchBrowser();
		this.setHandlers();
	}

	public login(): void {
		this.client.login(this.token);
	}

	private async launchBrowser(): Promise<void> {
		await this.browser.launch();
		await this.browser.setPage();
	}

	private async setHandlers(): Promise<void> {
		this.client.on("ready", () => this.readyHandler());
		this.client.on("messageCreate", (message) => this.messageHandler(message));
		this.client.on('interactionCreate', (interaction) => this.interactionHandler(interaction));
	}

	private async readyHandler(): Promise<void> {
		console.log(`Logged in as ${this.client.user ? this.client.user.tag : ""}`);
	}

	private async messageHandler(message: Message): Promise<void> {
		if (this.role && !message.guild?.members.cache.find((user) => (user.id == message.author.id))?.roles.cache.has(this.role)) return;
		if (message.content.indexOf(this.prefix) != 0) return;
		if (message.channel.id != this.channelID) return;

		switch (message.content.split(" ")[0].slice(1)) {
			case "watch":
				try {
					await this.browser.openVideo(message.content.split(" ")[1]);

					const embed = new EmbedBuilder()
						.setColor("Red")
						.setTitle("**Use buttons to control player**");

					if (this.controller) {
						if (this.controller.deletable) await this.controller.delete();
					}

					this.controller = await message.reply({ embeds: [embed], components: this.getActionRows() })
				} catch {
					message.channel.send("**Wrong video url**");
				}
				break;
		}
	}

	private async interactionHandler(interaction: Interaction): Promise<void> {
		if (!interaction.isButton()) return;
		if (this.role && !interaction.guild?.members.cache.find((user) => (user.id == interaction.user.id))?.roles.cache.has(this.role)) return;
		interaction.deferUpdate();

		switch (interaction.customId) {
			case 'prev':
				this.browser.previous();
				break;
			case 'next':
				this.browser.next();
				break;
			case 'seekb':
				this.browser.seek_back();
				break;
			case 'seekf':
				this.browser.seek_for();
				break;
			case 'pause':
				this.browser.pause();
				break;
			case 'full':
				this.browser.fullscreen();
				break;
			case 'subtitles':
				this.browser.subtitles();
				break;
			case 'wide':
				this.browser.wide();
				break;
		}
	}

	private getActionRows(): Array<MessageActionRow> {
		return [
			new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('seekb')
						.setEmoji('⬅️')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('pause')
						.setEmoji('⏯️')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('seekf')
						.setEmoji('➡️')
						.setStyle('PRIMARY'),
				),
			new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId('prev')
						.setEmoji('⏮️')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('next')
						.setEmoji('⏭️')
						.setStyle('PRIMARY'),
				),
			new MessageActionRow()
				.addComponents(
					new MessageButton()
						.setCustomId("wide")
						.setEmoji("↔️")
						.setStyle("PRIMARY"),
					new MessageButton()
						.setCustomId('full')
						.setEmoji('🖥️')
						.setStyle('PRIMARY'),
					new MessageButton()
						.setCustomId('subtitles')
						.setEmoji('📋')
						.setStyle('PRIMARY')
				)
		]
	}
};