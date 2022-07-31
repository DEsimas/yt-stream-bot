import { config } from "dotenv";
import { Bot } from "./Bot";

config();

if (!process.env.TOKEN) throw new Error("TOKEN is not provided");

const bot = new Bot({
	token: process.env.TOKEN,
	prefix: process.env.PREFIX,
	browserOptions: {
		viewport: {
			width: Number(process.env.VP_WIDTH),
			height: Number(process.env.VP_HEIGHT)
		}
	}
});

bot.login();