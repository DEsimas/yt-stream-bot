import { Client, Intents, Message } from "discord.js";
import { Browser, BrowserOptions } from "./Browser";

export interface BotOptions {
	token: string;
	channelID: string;
	prefix?: string;
	browserOptions?: BrowserOptions;
};

export class Bot {
	private readonly token: string;
	private readonly channelID: string;
	private readonly prefix: string;
	private readonly intents: number[];
	private readonly client: Client;
	private readonly browser: Browser;

	constructor(options: BotOptions) {
		this.token = options.token;
		this.channelID = options.channelID;
		this.prefix = options.prefix || "!";

		this.intents = [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MESSAGES
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
	}

	private async readyHandler(): Promise<void> {
		console.log(`Logged in as ${this.client.user ? this.client.user.tag : ""}`);
	}

	private async messageHandler(message: Message): Promise<void> {
		if (message.content.indexOf(this.prefix) != 0) return;
		if (message.channel.id != this.channelID) return;

		switch (message.content.split(" ")[0].slice(1)) {
			case "watch":
				try {
					await this.browser.openVideo(message.content.split(" ")[1]);
				} catch {
					message.channel.send("**Wrong video url**");
				}
				break;
		}
	}
};