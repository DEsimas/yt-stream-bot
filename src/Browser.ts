import * as Puppeteer from "puppeteer";

export interface BrowserOptions {
	viewport?: Puppeteer.Viewport;
};

export class Browser {
	private readonly viewport: Puppeteer.Viewport;

	private browser?: Puppeteer.Browser;
	private page?: Puppeteer.Page;
	private isShorts?: boolean;

	constructor(options?: BrowserOptions) {
		this.viewport = options?.viewport || {
			width: 1680,
			height: 1120
		};
	}

	public async launch(): Promise<void> {
		this.browser = await Puppeteer.launch({ headless: false, executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
		console.log("Chrome started");
	}

	public async setPage(): Promise<void> {
		if (!this.browser) throw new Error("Browser not launched");
		this.page = await this.browser.newPage();
		this.page.setDefaultNavigationTimeout(0);
		this.page.setViewport(this.viewport);
	}

	public async openVideo(url: string): Promise<void> {
		if (!this.page) throw new Error("Page not opened");
		if (!this.validateURL(url)) throw new Error("Invalid video url");
		this.isShorts = url.search("shorts") != -1;
		await this.page?.goto(url);
	}

	public async previous(): Promise<void> {
		if(this.isShorts)
			return this.page?.keyboard.press("ArrowUp");
		
		this.page?.keyboard.press("ShiftLeft");
		await this.page?.keyboard.press("P");
	}

	public async next(): Promise<void> {
		if(this.isShorts)
			return this.page?.keyboard.press("ArrowDown");

		this.page?.keyboard.press("ShiftLeft");
		await this.page?.keyboard.press("N");
	}

	public async seek_back(): Promise<void> {
		await this.page?.keyboard.press("J");
	}

	public async seek_for(): Promise<void> {
		await this.page?.keyboard.press("L");
	}

	public async pause(): Promise<void> {
		await this.page?.keyboard.press("K");
	}

	public async fullscreen(): Promise<void> {
		await this.page?.keyboard.press("F");
	}

	public async subtitles(): Promise<void> {
		await this.page?.keyboard.press("C");
	}

	public async wide(): Promise<void> {
		await this.page?.keyboard.press("T");
	}

	private validateURL(url: string): boolean {
		return url.slice(0, 17) == "https://youtu.be/" ||
			url.slice(0, 23) == "http://www.youtube.com/" ||
			url.slice(0, 16) == "http://youtu.be/" ||
			url.slice(0, 24) == "https://www.youtube.com/" ||
			url.slice(0, 33) == "https://www.youtube-nocookie.com/" ||
			url.slice(0, 32) == "http://www.youtube-nocookie.com/" ||
			url.slice(0, 19) == "http://youtube.com/" ||
			url.slice(0, 20) == "https://youtube.com/";
	}
};