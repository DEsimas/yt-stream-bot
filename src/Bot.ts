import { Client, Message } from "discord.js";

export interface BotOptions {
	token: string;
	prefix?: string;
};

export class Bot {
	private readonly token: string;
	private readonly prefix: string;
	private readonly client: Client;

	constructor(options: BotOptions) {
		this.token = options.token;
		this.prefix = options.prefix || "!";

		this.client = new Client();

		this.setHandlers();
	}

	public login(): void {
		this.client.login(this.token);
	}

	private async setHandlers(): Promise<void> {
		this.client.on("ready", () => this.readyHandler());
		this.client.on("message", (message) => this.messageHandler(message));
	}

	private async readyHandler(): Promise<void> {
		console.log("uwu");
	}

	private async messageHandler(message: Message): Promise<void> {
		console.log("owo");
	}
};