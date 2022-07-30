import { config } from "dotenv";
import { Bot } from "./Bot";

config();

if (!process.env.TOKEN) throw new Error("TOKEN is not provided");

const bot = new Bot({
	token: process.env.TOKEN,
	prefix: process.env.PREFIX
});

bot.login();