# yt-stream-bot

Discord bot for streaming youtube videos. Works like theatre. Requires one "human" account for streaming video from PC to channel and bot account for controlling first one's browser. 

Inspired by [Mantra27](https://github.com/Mantra27/discord-bot-video-stream-beta)

# Preview

[![Youtube link](https://img.youtube.com/vi/TjV4kzbuDNE/0.jpg)](https://youtu.be/TjV4kzbuDNE)

# Tecnologies

<ul>
    <li>Node.js with typescript</li>
    <li>discord.js v14 library for interacting with discord api</li>
    <li>puppeteer to control chrome</li>
</ul>

# Usage

1) Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [node](https://nodejs.org/en/download/), [npm](https://docs.npmjs.com/cli/v8/configuring-npm/install#using-a-node-installer-to-install-node-js-and-npm) and [chrome](https://www.google.com/chrome/) on your computer

2) Use `git clone https://github.com/DEsimas/yt-stream-bot` to download source code

3) Go to `yt-stream-bot` directory and create file called `.env`

4) Put there bot settings:
```
TOKEN = <discord bot token>
CHANNEL = <id of text channel with commands>
ROLE = <user role id>
VP_WIDTH = <monitor width in pixels>
VP_HEIGHT = <monitor height in pixels>
```
[*TOKEN](https://www.writebots.com/discord-bot-token/)
*CHANNEL, ROLE - turn on [developer mode](https://www.howtogeek.com/714348/how-to-enable-or-disable-developer-mode-on-discord/) and copy id using right click menu

5) Install dependencies using `npm i`

6) Start bot with `npm run start:dev`, crome browser will open

7) Stream it using "human" account. Be careful **this** **account** **can** **be** **blocked!**

8) Use `!watch <video url>` command to play video.

# .env

<table>
    <tr>
        <th>TOKEN</th>
        <th>token for discord bot</th>
    </tr>
    <tr>
        <th>CHANNEL</th>
        <th>id of text channel with commands</th>
    </tr>
    </tr>
        <th>ROLE</th>
        <th>users with this role id can use bot, don't state for access from anybody</th>
    <tr>
    <tr>
        <th>VP_WIDTH</th>
        <th>monitor width in pixels</th>
    </tr>
    <tr>
        <th>VP_HEIGHT</th>
        <th>monitor height in pixels</th>
    </tr>
</table>
