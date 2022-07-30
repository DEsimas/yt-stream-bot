import * as Puppeteer from "puppeteer";

export class Browser {
	private browser?: Puppeteer.Browser;
	private page?: Puppeteer.Page;

	constructor() {

	}

	public async launch(): Promise<void> {
		this.browser = await Puppeteer.launch({ headless: false, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
		console.log("Chrome started");
	}

	public async setPage(): Promise<void> {
		if (!this.browser) throw new Error("Browser not launched");
		this.page = await this.browser.newPage();
		this.page.setDefaultNavigationTimeout(0);
		this.page.setViewport({ width: 1366, height: 786 });
	}

	public async openVideo(url: string): Promise<void> {
		if (!this.page) throw new Error("Page not opened");
		if (url.slice(0, 17) != "https://youtu.be/" || url.indexOf("?") != -1) throw new Error("Invalid video url");
		await this.page?.goto(url);
		setTimeout( async () => await this.page?.keyboard.press("F"), 2000);
	}
}