import { config } from "dotenv";
import { Bot, BotOptions } from "./Bot";

config();

if (!process.env.TOKEN) throw new Error("TOKEN is not provided");
if (!process.env.CHANNEL) throw new Error("CHANNEL is not provided");

let options: BotOptions = {
	token: process.env.TOKEN,
	channelID: process.env.CHANNEL,
	prefix: process.env.PREFIX,
}

try {
	options.browserOptions = {
		viewport: {
			width: Number(process.env.VP_WIDTH),
			height: Number(process.env.VP_HEIGHT)
		}
	}

	if (isNaN(Number(process.env.VP_WIDTH)) || isNaN(Number(process.env.VP_HEIGHT))) throw new Error("viewport size is NaN");
} catch {
	options.browserOptions = undefined;
}

const bot = new Bot(options);

bot.login();