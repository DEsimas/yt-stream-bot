import { Client, Message } from "discord.js";
import { Browser, BrowserOptions } from "./Browser";

export interface BotOptions {
	token: string;
	prefix?: string;
	browserOptions?: BrowserOptions;
};

export class Bot {
	private readonly token: string;
	private readonly prefix: string;
	private readonly client: Client;
	private readonly browser: Browser;

	constructor(options: BotOptions) {
		this.token = options.token;
		this.prefix = options.prefix || "!";

		this.client = new Client();
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
		this.client.on("message", (message) => this.messageHandler(message));
	}

	private async readyHandler(): Promise<void> {
		console.log(`Logged in as ${this.client.user.tag}`);
	}

	private async messageHandler(message: Message): Promise<void> {
		if (message.content.indexOf(this.prefix) != 0) return;

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