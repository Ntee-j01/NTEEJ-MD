/////////////  NTEEJ X MEDIA ////////////////////////////




const moment = require("moment-timezone");
const {
  fetchJson,
  smd,
  tlang,
  send,
  getBuffer,
  prefix,
  groupdb,
  Config,
  plugins,
  createUrl,
  photoEditor,
  smdBuffer,
  sleep,
  fancytext,
  sendGImages,
  tiny,
  runtime,
  bot_,
  formatp,
  commands
} = require("../lib");

let bgmm = false;
let s_ser = true;
let baseApi =
  process.env.API_SMD || global.api_smd || "https://api-smd-1.vercel.app";
let photo = ["imageMessage"];  
const os = require("os");
const Config = require("../config");
let gis = require("async-g-i-s");
const axios = require("axios");
const fetch = require("node-fetch");
const { shazam } = require("../lib");
let yts = require("secktor-pack");
const { MessageType, Mimetype } = require("@whiskeysockets/baileys");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const { execFile } = require("child_process");
const exec = require("child_process").exec;
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
const translatte = require("translatte");
const {
  fetchJson,
  getBuffer
} = require("../lib/");


 ///////////////// EDITOR PACK CMD ///////
 
 let gfxold = [
  "ad",
  "uncover",
  "clown",
  "mnm",
  "pet",
  "drip",
  "gun",
  "colorify",
];

let gfxx = [
  "beautiful",
  "blur",
  "facepalm",
  "invert",
  "rainbow",
  "wanted",
  "wasted",
  "greyscale",
  "sepia",
  "rip",
  "trash",
  "hitler",
  "jail",
  "shit",
  "affect",
  ...gfxold,
];

const sendEditor = async (
  m,
  cmd,
  error = true,
  cap = Config.caption?.split("\n")[0] || ""
) => {
  if (!gfxx.includes(cmd)) return;
  try {
    let mm = m.image
      ? m
      : m.reply_message && m.reply_message.image
      ? m.reply_message
      : false;
    if (!mm || !photo.includes(mm.mtype2))
      return m.reply(`*_Uhh Dear,  Reply To An Image!_*`);
    let media = await m.bot.downloadAndSaveMediaMessage(mm);
    var anu = "";
    try {
      anu = (await createUrl(media, "uguMashi")).url;
      if (!anu) throw new Error("invalid Media!");
    } catch (e) {
      console.log(e);
      try {
        anu = await createUrl(media);
      } catch (e) {
        anu = false;
      }
    }
    try {
      fs.unlink(media);
    } catch (e) {}
    if (!anu) return m.reply("*_Failed To Create Url!_*");
    let base = await smdBuffer(`${baseApi}/api/maker/${cmd}?url=${anu}`);

    m.send(base, { caption: cap }, "img", mm);
  } catch (e) {
    if (error) {
      console.log(e);
      await m.error(`${e}\n\ncommand ${cmd}`, e, false);
    }
  }
};

for (let i = 0; i < gfxx.length; i++) {
  smd(
    {
      cmdname: gfxx[i],
      infocmd: `Edit image with ${gfxx[i]} effect!`,
      type: "editor",
      use: "< image >",
      filename: __filename,
    },
    async (m, text, { smd }) => {
      try {
        if (gfxold.includes(smd)) {
          await photoEditor(m, smd);
        } else {
          sendEditor(m, smd);
        }
      } catch (err) {
        await message.error(
          `${err}\n\ncommand: ${smd}`,
          err,
          "Request Denied!"
        );
      }
    }
  );
}

smd(
  {
    cmdname: "editor",
    infocmd: "create gfx logo for text",
    type: "editor",
    use: "< image >",
    filename: __filename,
  },
  async (m, text, { smd }) => {
    try {
      let mm = m.image
        ? m
        : m.reply_message && m.reply_message.image
        ? m.reply_message
        : false;

      let too = `*Separate the text with _:_ sign!*\n*Example : ${
        prefix + smd
      } David _:_ Bot*`;
      if (!mm) {
        let str = `┌───〈 *𝙉𝙏𝙀𝙀𝙅-𝙈𝘿*  〉───◆
│╭─────────────···▸
┴│▸
⬡│▸ ${gfxx.join(" \n⬡│▸ ")}
┬│▸
│╰────────────···▸▸
└───────────────···▸

\t *USE: _${prefix + smd}_ by replying image*
_To get All Results with single Cmd!_
`;
        return await m.sendUi(m.chat, { caption: str });
      }

      for (let i = 0; i < gfxx.length; i++) {
        try {
          if (gfxold.includes(gfxx[i])) {
            await photoEditor(m, gfxx[i]);
          } else {
            sendEditor(m, gfxx[i], false);
          }
        } catch (e) {}
      }
    } catch (e) {
      m.error(`${e}\n\nCommand: ${smd}`, e, false);
    }
  }
);



   ///////////// HELP CMD /////////////////
   
smd(
  {
    pattern: "menus",
    type: "MENU list",
    info: "user",
    dontAddCommandList: true,
  },
  async (message) => {
    try {
      let menuMessage = ` 
➮ʀᴜɴᴛɪᴍᴇ - ${runtime(process.uptime())} 
➮ᴅᴀᴛᴇ - ${message.date} 
➮ɴᴏᴡ ᴛɪᴍᴇ - ${message.time} 
➮ᴄʀᴇᴀᴛᴏʀ - *NTEEJ*
➮Oᴡɴᴇʀ - ${Config.ownername} 
➮Nᴜᴍ - ${owner.split(",")[0]} 
➮Mᴇᴍᴏ - ${formatp(os.totalmem() - os.freemem())} 
      \n *NTEEJ-MD A SIMPLE WHATSAPP BOT WITH RICH LIBRARY CREATED BY NTEEJ*\n\n ${readmore} 
╭──❲ *ALL MENU* ❳
│🤖 Lɪꜱᴛ 
│🤖 Cᴀᴛᴇɢᴏʀʏ 
│🤖 Hᴇʟᴘ 
│🤖 Aʟɪᴠᴇ 
│🤖 Uᴘᴛɪᴍᴇ 
│🤖 Wᴇᴀᴛʜᴇʀ 
│🤖 Lɪɴᴋ 
│🤖 Cᴘᴜ 
│🤖 Rᴇᴘᴏꜱɪᴛᴏʀʏ 
╰─────────────⦁`.trim();
      return await message.bot.sendUi(message.from, { caption: menuMessage });
    } catch (error) {
      await message.error(error + "\nCommand:menus", error);
    }
  }
);
// Command: Set Custom Command
astro_patch.cmd(
  {
    pattern: "setcmd",
    desc: "To set a custom command",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (message, query, { Void }) => {
    try {
      if (!query) {
        return await message.send(
          "*_Please provide cmd name by replying a Sticker_*"
        );
      }

      let queryParts = query.split(",");
      let newCommand, originalCommand;
      let isSticker = false;

      if (message.quoted) {
        let quotedType = message.quoted.mtype;
        if (quotedType === "stickerMessage" && query) {
          isSticker = true;
          newCommand = query.split(" ")[0];
          originalCommand = "sticker-" + message.quoted.msg.fileSha256;
        }
      }

      if (!isSticker && queryParts.length > 1) {
        originalCommand = queryParts[0].trim().toLowerCase();
        newCommand = queryParts[1].trim().toLowerCase();
      } else if (!isSticker) {
        return await message.send(
          "*_Uhh Dear, Give Cmd With New Name_*\n*Eg: _.setcmd New_Name, Cmd_Name_*"
        );
      }

      if (newCommand.length < 1) {
        return await message.reply(
          "*_Uhh Please, Provide New_Cmd Name First_*"
        );
      }

      if (global.setCmdAlias[newCommand]) {
        return await message.send(
          `*_"${isSticker ? "Given Sticker" : newCommand}" Already set for "${
            global.setCmdAlias[newCommand]
          }" Cmd, Please try another ${isSticker ? "Sticker" : "Name"}_*`
        );
      }

      const foundCommand =
        astro_patch.commands.find((cmd) => cmd.pattern === originalCommand) ||
        astro_patch.commands.find(
          (cmd) => cmd.alias && cmd.alias.includes(originalCommand)
        );

      if (foundCommand) {
        global.setCmdAlias[newCommand] = foundCommand.pattern;
        return await message.send(
          `*_Cmd "${global.setCmdAlias[newCommand]}" Successfully set to "${
            isSticker ? "Sticker" : newCommand
          }"._*\n*_These all names are reset if the bot restarts_*`
        );
      } else {
        return await message.send(
          `*_Provided Cmd (${originalCommand}) not found in bot commands. Please provide a valid command name_*`
        );
      }
    } catch (error) {
      await message.error(error + "\nCommand:setcmd", error);
    }
  }
);

// Command: Delete Custom Command
astro_patch.cmd(
  {
    pattern: "delcmd",
    desc: "To delete a custom command",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (message, query, { Void }) => {
    try {
      let commandName = query ? query.split(" ")[0].trim().toLowerCase() : "";
      let isSticker = false;

      if (message.quoted) {
        if (message.quoted.mtype === "stickerMessage") {
          isSticker = true;
          commandName = "sticker-" + message.quoted.msg.fileSha256;
        } else if (!query) {
          return await message.send(
            "*_Please reply to a Sticker that was set for a command_*"
          );
        }
      } else if (!query) {
        return await message.send(
          "*_Uhh Dear, provide the name that was set for a command_*\n*Eg: _.delcmd Cmd_Name_*"
        );
      }

      if (global.setCmdAlias[commandName]) {
        await message.send(
          `*_"${
            isSticker ? "Given Sticker" : commandName
          }" deleted successfully for "${
            global.setCmdAlias[commandName]
          }" command_*`
        );
        delete global.setCmdAlias[commandName];
        return;
      } else {
        return await message.send(
          `*_"${
            isSticker ? "Given Sticker" : commandName
          }" is not set for any command._*\n *_Please provide a valid ${
            isSticker ? "Sticker" : "command name"
          } to delete_*`
        );
      }
    } catch (error) {
      await message.error(error + "\nCommand:delcmd", error);
    }
  }
);

// Command: Ping
astro_patch.smd(
  {
    pattern: "ping",
    desc: "To check ping",
    category: "misc",
    filename: __filename,
  },
  async (message) => {
    var startTime = new Date().getTime();
    const { key } = await message.reply("*Testing Ping!!!*");
    var endTime = new Date().getTime();
    return await message.send(
      `*Pong*\n *${endTime - startTime} ms*`,
      {
        edit: key,
      },
      "",
      message
    );
  }
);

// Command: Uptime
astro_patch.cmd(
  {
    pattern: "uptime",
    alias: ["runtime"],
    desc: "Tells runtime/uptime of bot.",
    category: "misc",
    filename: __filename,
  },
  async (message) => {
    try {
      message.reply(
        `*_Uptime of ${tlang().title}: ${runtime(process.uptime())}_*`
      );
    } catch (error) {
      await message.error(error + "\n\ncommand : uptime", error, false);
    }
  }
);

// Command: List Menu
astro_patch.cmd(
  {
    pattern: "list",
    desc: "list menu",
    category: "user",
  },
  async (message) => {
    try {
      const { commands } = require("../lib");
      let listMessage = `\n  
╭━━〘 * ${Config.botname} * 〙    
┃ 🤖 Prefix: ${Config.HANDLERS}
┃ 🤖 Owner: ${Config.ownername}
┃ 🤖 Commands: ${commands.length}
┃ 🤖 Uptime: ${runtime(process.uptime())}
┃ 🤖 Mem: ${formatp(os.totalmem() - os.freemem())}
╰━━━━━━━━━━━━━━⊷\n`;

      for (let i = 0; i < commands.length; i++) {
        if (commands[i].pattern === undefined) {
          continue;
        }
        listMessage += `*${i + 1} ${fancytext(commands[i].pattern, 1)}*\n`;
        listMessage += `  ${fancytext(commands[i].desc, 1)}\n`;
      }

      return await message.sendUi(message.chat, {
        caption: listMessage + Config.caption,
      });
    } catch (error) {
      await message.error(error + "\nCommand:list", error);
    }
  }
);

// Command: Owner
astro_patch.smd(
  {
    pattern: "owner",
    desc: "To display owner information",
    category: "owner",
    filename: __filename,
  },
  async (message) => {
    try {
      const vcard =
        "BEGIN:VCARD\nVERSION:3.0\nFN:" +
        Config.ownername +
        "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" +
        global.owner?.split(",")[0] +
        ":+" +
        global.owner?.split(",")[0] +
        "\nEND:VCARD";

      let contactMessage = {
        contacts: {
          displayName: Config.ownername,
          contacts: [
            {
              vcard,
            },
          ],
        },
        contextInfo: {
          externalAdReply: {
            title: Config.ownername,
            body: "Touch here.",
            renderLargerThumbnail: true,
            thumbnailUrl: "",
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: "",
            sourceUrl:
              "https://wa.me/+" +
              global.owner?.split(",")[0] +
              "?text=Hii+" +
              Config.ownername,
          },
        },
      };

      return await message.sendMessage(message.jid, contactMessage, {
        quoted: message,
      });
    } catch (error) {
      await message.error(error + "\nCommand:owner", error);
    }
  }
);

// Command: Translate
astro_patch.cmd(
  {
    pattern: "trt",
    alias: ["translate"],
    category: "user",
    filename: __filename,
    use: "< text >",
    desc: "Translates the given text to the desired language.",
  },
  async (message, query) => {
    try {
      let targetLanguage = query ? query.split(" ")[0].toLowerCase() : "en";
      if (!message.reply_text) {
        var textToTranslate =
          query.replace(targetLanguage, "")?.trim() || false;
      } else {
        var textToTranslate = message.reply_text;
      }

      if (!textToTranslate) {
        return await message.reply(
          `*Please provide the text to translate. Example: ${prefix}trt en Who are you*`
        );
      }

      var translation = await translatte(textToTranslate, {
        from: "auto",
        to: targetLanguage,
      });

      if ("text" in translation) {
        return await message.reply(translation.text);
      }
    } catch (error) {
      await message.error(error + "\n\nCommand: trt", error);
    }
  }
);
const readDirectory = (directoryPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        reject("Error reading directory");
      } else {
        resolve(files);
      }
    });
  });
};
astro_patch.cmd(
  {
    pattern: "file",
    desc: "to get the exact name and location of the command in the repository, so the user can edit it.",
    category: "user",
    fromMe: true,
    filename: __filename,
  },
  async (message, query) => {
    try {
      if (!query) {
        return message.reply("*Please provide a command or directory*");
      }

      if (query.startsWith(".")) {
        let result = "*------------- FILE MANAGER -2------------*\n";
        try {
          const files = await readDirectory(query);
          files.forEach((file) => {
            result += file + "\n";
          });
          await message.reply(result.toString());
        } catch (error) {
          message.reply(error);
        }
        return;
      }

      const { commands } = require("../lib");
      let output = [];
      let command = query.split(" ")[0].toLowerCase().trim();
      let commandInfo =
        commands.find((cmd) => cmd.pattern === command) ||
        commands.find((cmd) => cmd.alias && cmd.alias.includes(command));

      if (!commandInfo) {
        return await message.reply("*❌No such command.*");
      }

      output.push("*🍁Command:* " + commandInfo.pattern);
      if (commandInfo.category) {
        output.push("*🧩Type:* " + commandInfo.category);
      }
      if (commandInfo.alias && commandInfo.alias[0]) {
        output.push("*🧩Alias:* " + commandInfo.alias.join(", "));
      }
      if (commandInfo.desc) {
        output.push("*✨Description:* " + commandInfo.desc);
      }
      if (commandInfo.use) {
        output.push(
          "*〽️Usage:*\n ```" +
            prefix +
            commandInfo.pattern +
            " " +
            commandInfo.use +
            "```"
        );
      }
      if (commandInfo.usage) {
        output.push("*〽️Usage:*\n ```" + commandInfo.usage + "```");
      }
      if (commandInfo.filename) {
        output.push("*✨FileName:* " + commandInfo.filename);
      }
      try {
        if (
          query.includes("function") &&
          commandInfo.function &&
          message.isAsta &&
          commandInfo.pattern !== "file"
        ) {
          output.push("*🧩Function:* " + commandInfo.function.toString());
        }
      } catch {}
      await message.reply(output.join("\n"));
    } catch (error) {
      await message.error(error + "\nCommand:file", error);
    }
  }
);

astro_patch.cmd(
  {
    pattern: "eval",
    alias: ["$"],
    category: "tools",
    filename: __filename,
    fromMe: true,
    desc: "Runs JavaScript code on the Node.js server.",
    use: "< run code >",
    dontAddCommandList: true,
  },
  async (message, query, { isCreator, cmdName, Void }) => {
    try {
      if (!query) {
        return message.reply("*Provide a query to run*");
      }
      let result = eval("const a = async()=>{\n" + query + "\n}\na()");
      if (typeof result === "object") {
        await message.reply(JSON.stringify(result));
      } else {
        await message.reply(result.toString());
      }
    } catch (error) {
      return await message.reply(error.toString());
    }
  }
);

astro_patch.cmd(
  {
    pattern: "shell",
    category: "tools",
    filename: __filename,
    fromMe: true,
    desc: "Runs a command in the server shell (e.g., Heroku).",
    use: "<shell commands | ls, cd >",
    dontAddCommandList: true,
  },
  async (message, query) => {
    try {
      if (!message.isCreator) {
        return message.reply(tlang().owner);
      }
      if (!query) {
        return message.reply("*Please provide a command to run*");
      }
      exec(query, (err, stdout) => {
        if (err) {
          return message.reply("----" + tlang().title + "----\n\n" + err);
        }
        if (stdout) {
          return message.reply("----" + tlang().title + "----\n\n" + stdout);
        }
      });
    } catch (error) {
      await message.error(error + "\n\ncommand shell", error);
    }
  }
);

     //////////////  MEDIA CMD //////////

smd(
  {
    pattern: "x4mp4",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x4b18a7) => {
    try {
      if (!_0x4b18a7.reply_message.video) {
        return await _0x4b18a7.send("*Need Video!*");
      }
      let _0x4ef7a7 = "./temp/x4mp4.mp4";
      var _0x15f54e = await _0x4b18a7.bot.downloadAndSaveMediaMessage(
        _0x4b18a7.quoted.msg
      );
      ffmpeg(_0x15f54e)
        .withSize("25%")
        .format("mp4")
        .save(_0x4ef7a7)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x15f54e);
          } catch (_0x5d7674) {}
          await _0x4b18a7.bot.sendMessage(_0x4b18a7.jid, {
            video: fs.readFileSync(_0x4ef7a7),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync("./temp/output.mp4");
          } catch (_0x41f0af) {}
        });
    } catch (_0x24d276) {
      return await _0x4b18a7.error(
        _0x24d276 + "\n\n command: coffe",
        _0x24d276,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "x2mp4",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x366978) => {
    try {
      if (!_0x366978.reply_message.video) {
        return await _0x366978.send("*Need Video!*");
      }
      let _0xd7e5e = "./temp/x2mp4.mp4";
      var _0x250def = await _0x366978.bot.downloadAndSaveMediaMessage(
        _0x366978.quoted.msg
      );
      ffmpeg(_0x250def)
        .withSize("50%")
        .format("mp4")
        .save(_0xd7e5e)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x250def);
          } catch (_0x51a807) {}
          await _0x366978.bot.sendMessage(_0x366978.jid, {
            video: fs.readFileSync(_0xd7e5e),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0xd7e5e);
          } catch (_0x123c69) {}
        });
    } catch (_0x48689b) {
      return await _0x366978.error(
        _0x48689b + "\n\n command: x2mp4",
        _0x48689b,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4image",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x46cbb2) => {
    try {
      if (!_0x46cbb2.reply_message.image) {
        return await _0x46cbb2.send("*Need image!*");
      }
      let _0x4fe7c4 = "./temp/x2mp4.mp4";
      var _0x2190cb = await _0x46cbb2.bot.downloadAndSaveMediaMessage(
        _0x46cbb2.quoted.msg
      );
      console.log("checking location : ", _0x2190cb);
      ffmpeg(_0x2190cb)
        .loop(6)
        .fps(19)
        .videoBitrate(400)
        .size("640x480")
        .format("mp4")
        .save(_0x4fe7c4)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x2190cb);
          } catch (_0x29694a) {}
          await _0x46cbb2.sendMessage(_0x46cbb2.jid, {
            video: fs.readFileSync(_0x4fe7c4),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x4fe7c4);
          } catch (_0x56669d) {}
        });
    } catch (_0x289740) {
      return await _0x46cbb2.error(
        _0x289740 + "\n\n command: x2mp4",
        _0x289740,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4vintage",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x3ea4a9) => {
    try {
      if (!_0x3ea4a9.reply_message.video) {
        return await _0x3ea4a9.send("*Need Video!*");
      }
      let _0x3ad4d2 = "./temp/mp4vintage.mp4";
      var _0xf321 = await _0x3ea4a9.bot.downloadAndSaveMediaMessage(
        _0x3ea4a9.quoted.msg
      );
      ffmpeg(_0xf321)
        .outputOptions(["-y", "-vf", "curves=vintage,format=yuv420p"])
        .fps(22)
        .save(_0x3ad4d2)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0xf321);
          } catch (_0x174c55) {}
          await _0x3ea4a9.bot.sendMessage(_0x3ea4a9.jid, {
            video: fs.readFileSync(_0x3ad4d2),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x3ad4d2);
          } catch (_0x3e0650) {}
        });
    } catch (_0x321ae3) {
      return await _0x3ea4a9.error(
        _0x321ae3 + "\n\n command: mp4vintage",
        _0x321ae3,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4reverse",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x4f5b42) => {
    try {
      if (!_0x4f5b42.reply_message.video) {
        return await _0x4f5b42.send("*Need Video!*");
      }
      let _0x129d1f = "./temp/mp4reverse.mp4";
      var _0x2fe7fb = await _0x4f5b42.bot.downloadAndSaveMediaMessage(
        _0x4f5b42.quoted.msg
      );
      ffmpeg(_0x2fe7fb)
        .outputOptions(["-y", "-vf", "reverse", "-af", "areverse"])
        .format("mp4")
        .fps(22)
        .save(_0x129d1f)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x2fe7fb);
          } catch (_0x1bd563) {}
          await _0x4f5b42.bot.sendMessage(_0x4f5b42.jid, {
            video: fs.readFileSync(_0x129d1f),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x129d1f);
          } catch (_0x455893) {}
        });
    } catch (_0x42284c) {
      return await _0x4f5b42.error(
        _0x42284c + "\n\n command: mp4reverse",
        _0x42284c,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4bw",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x7aa23c) => {
    try {
      if (!_0x7aa23c.reply_message.video) {
        return await _0x7aa23c.send("*Need Video!*");
      }
      let _0x3cc99e = "./temp/mp4bw.mp4";
      var _0x41b53a = await _0x7aa23c.bot.downloadAndSaveMediaMessage(
        _0x7aa23c.quoted.msg
      );
      ffmpeg(_0x41b53a)
        .outputOptions(["-y", "-vf", "hue=s=0"])
        .format("mp4")
        .save(_0x3cc99e)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x41b53a);
          } catch (_0x1d4df6) {}
          await _0x7aa23c.bot.sendMessage(_0x7aa23c.jid, {
            video: fs.readFileSync(_0x3cc99e),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x3cc99e);
          } catch (_0x5f4e04) {}
        });
    } catch (_0x5c34d8) {
      return await _0x7aa23c.error(
        _0x5c34d8 + "\n\n command: mp4bw",
        _0x5c34d8,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4enhance",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x9057cf) => {
    try {
      if (!_0x9057cf.reply_message.video) {
        return await _0x9057cf.send("*Need Video!*");
      }
      let _0x240121 = "./temp/mp4enhance.mp4";
      var _0x229d8f = await _0x9057cf.bot.downloadAndSaveMediaMessage(
        _0x9057cf.quoted.msg
      );
      ffmpeg(_0x229d8f)
        .outputOptions(["-y", "-vf", "unsharp=3:3:1.5"])
        .format("mp4")
        .save(_0x240121)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x229d8f);
          } catch (_0x1a85d6) {}
          await _0x9057cf.bot.sendMessage(_0x9057cf.jid, {
            video: fs.readFileSync(_0x240121),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x240121);
          } catch (_0x464135) {}
        });
    } catch (_0x384772) {
      return await _0x9057cf.error(
        _0x384772 + "\n\n command: mp4enhance",
        _0x384772,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4blur",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x1cd89e) => {
    try {
      if (!_0x1cd89e.reply_message.video) {
        return await _0x1cd89e.send("*Need Video!*");
      }
      let _0x266ccd = "./temp/mp4blur.mp4";
      var _0x3b01ff = await _0x1cd89e.bot.downloadAndSaveMediaMessage(
        _0x1cd89e.quoted.msg
      );
      ffmpeg(_0x3b01ff)
        .outputOptions([
          "-y",
          "-vf",
          "split[original][copy];[copy]scale=ih*16/9:-1,crop=h=iw*9/16,gblur=sigma=20[blurred];[blurred][original]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2",
        ])
        .save(_0x266ccd)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x3b01ff);
          } catch (_0x860bdc) {}
          await _0x1cd89e.bot.sendMessage(_0x1cd89e.jid, {
            video: fs.readFileSync(_0x266ccd),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x266ccd);
          } catch (_0x3a1c61) {}
        });
    } catch (_0x3d1468) {
      return await _0x1cd89e.error(
        _0x3d1468 + "\n\n command: mp4blur",
        _0x3d1468,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4edge",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x268562) => {
    try {
      if (!_0x268562.reply_message.video) {
        return await _0x268562.send("*Need Video!*");
      }
      let _0x1880a8 = "./temp/mp4edge.mp4";
      var _0x239d82 = await _0x268562.bot.downloadAndSaveMediaMessage(
        _0x268562.quoted.msg
      );
      ffmpeg(_0x239d82)
        .outputOptions([
          "-y",
          "-codec:v",
          "mpeg4",
          "-filter:v",
          "edgedetect=low=0.9:high=0.3",
        ])
        .format("mp4")
        .save(_0x1880a8)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x239d82);
          } catch (_0x5234ee) {}
          await _0x268562.bot.sendMessage(_0x268562.jid, {
            video: fs.readFileSync(_0x1880a8),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x1880a8);
          } catch (_0x1ff4c1) {}
        });
    } catch (_0x43e29b) {
      return await _0x268562.error(
        _0x43e29b + "\n\n command: mp4edge",
        _0x43e29b,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "gif2",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x1b6921) => {
    try {
      if (!_0x1b6921.reply_message.video) {
        return await _0x1b6921.send("*Need Video!*");
      }
      let _0x6cbbe1 = "./temp/gif.mp4";
      var _0xdb859c = await _0x1b6921.bot.downloadAndSaveMediaMessage(
        _0x1b6921.quoted.msg
      );
      console.log("checking location : ", _0xdb859c);
      ffmpeg(_0xdb859c)
        .noAudio()
        .fps(13)
        .videoBitrate(500)
        .save(_0x6cbbe1)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0xdb859c);
          } catch (_0x5f55b3) {}
          await _0x1b6921.sendMessage(_0x1b6921.jid, {
            video: fs.readFileSync(_0x6cbbe1),
            caption: Config.caption,
            gifplayback: true,
          });
          try {
            fs.unlinkSync(_0x6cbbe1);
          } catch (_0x534c20) {}
        });
    } catch (_0x2a29f2) {
      return await _0x1b6921.error(
        _0x2a29f2 + "\n\n command: gif",
        _0x2a29f2,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "agif",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x502c2d) => {
    try {
      if (!_0x502c2d.reply_message.video) {
        return await _0x502c2d.send("*Need Video!*");
      }
      let _0x579ed0 = "./temp/agif.mp4";
      var _0x16f62a = await _0x502c2d.bot.downloadAndSaveMediaMessage(
        _0x502c2d.quoted.msg
      );
      console.log("checking location : ", _0x16f62a);
      ffmpeg(_0x16f62a)
        .fps(13)
        .videoBitrate(500)
        .save(_0x579ed0)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x16f62a);
          } catch (_0x21b110) {}
          await _0x502c2d.sendMessage(_0x502c2d.jid, {
            video: fs.readFileSync(_0x579ed0),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x579ed0);
          } catch (_0x3c5b81) {}
        });
    } catch (_0x280723) {
      return await _0x502c2d.error(
        _0x280723 + "\n\n command: agif",
        _0x280723,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4rainbow",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x362c61) => {
    try {
      if (!_0x362c61.reply_message.Video) {
        return await _0x362c61.send("*Need Video!*");
      }
      let _0x3415e4 = "./temp/mp4rainbow.mp4";
      var _0x4a260c = await _0x362c61.bot.downloadAndSaveMediaMessage(
        _0x362c61.quoted.msg
      );
      console.log("checking location : ", _0x4a260c);
      ffmpeg(_0x4a260c)
        .outputOptions([
          "-y",
          "-vf",
          "geq=r='X/W*r(X,Y)':g='(1-X/W)*g(X,Y)':b='(H-Y)/H*b(X,Y)",
          "-pix_fmt yuv420p",
        ])
        .videoFilters("eq=brightness=0.5")
        .save(_0x3415e4)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x4a260c);
          } catch (_0x4e9e6c) {}
          await _0x362c61.sendMessage(_0x362c61.jid, {
            video: fs.readFileSync(_0x3415e4),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x3415e4);
          } catch (_0x42e1c4) {}
        });
    } catch (_0x27e686) {
      return await _0x362c61.error(
        _0x27e686 + "\n\n command: mp4rainbow",
        _0x27e686,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4negative",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x452d19) => {
    try {
      if (!_0x452d19.reply_message.Video) {
        return await _0x452d19.send("*Need Video!*");
      }
      let _0x10134d = "./temp/mp4negative.mp4";
      var _0x39b1c5 = await _0x452d19.bot.downloadAndSaveMediaMessage(
        _0x452d19.quoted.msg
      );
      console.log("checking location : ", _0x39b1c5);
      ffmpeg(_0x39b1c5)
        .outputOptions(["-y", "-vf", "curves=color_negative,format=yuv420p"])
        .format("mp4")
        .save(_0x10134d)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x39b1c5);
          } catch (_0x5e79cb) {}
          await _0x452d19.sendMessage(_0x452d19.jid, {
            video: fs.readFileSync(_0x10134d),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x10134d);
          } catch (_0x3be412) {}
        });
    } catch (_0x2271c4) {
      return await _0x452d19.error(
        _0x2271c4 + "\n\n command: mp4negative",
        _0x2271c4,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4art",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x4ffe99) => {
    try {
      if (!_0x4ffe99.reply_message.Video) {
        return await _0x4ffe99.send("*Need Video!*");
      }
      let _0x50a27e = "./temp/mp4art.mp4";
      var _0x3ce211 = await _0x4ffe99.bot.downloadAndSaveMediaMessage(
        _0x4ffe99.quoted.msg
      );
      console.log("checking location : ", _0x3ce211);
      ffmpeg(_0x3ce211)
        .outputOptions([
          "-y",
          "-vf",
          "convolution=-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2,format=yuv420p",
        ])
        .format("mp4")
        .save(_0x50a27e)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x3ce211);
          } catch (_0x16f246) {}
          await _0x4ffe99.sendMessage(_0x4ffe99.jid, {
            video: fs.readFileSync(_0x50a27e),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x50a27e);
          } catch (_0x1e8124) {}
        });
    } catch (_0x51b6ab) {
      return await _0x4ffe99.error(
        _0x51b6ab + "\n\n command: mp4art",
        _0x51b6ab,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4stab",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x5ca0cf) => {
    try {
      if (!_0x5ca0cf.reply_message.Video) {
        return await _0x5ca0cf.send("*Need Video!*");
      }
      let _0x64e5ee = "./temp/mp4stab.mp4";
      var _0x553646 = await _0x5ca0cf.bot.downloadAndSaveMediaMessage(
        _0x5ca0cf.quoted.msg
      );
      console.log("checking location : ", _0x553646);
      ffmpeg(_0x553646)
        .outputOptions(["-y", "-vf", "deshake,format=yuv420p"])
        .format("mp4")
        .save(_0x64e5ee)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x553646);
          } catch (_0x2efd94) {}
          await _0x5ca0cf.sendMessage(_0x5ca0cf.jid, {
            video: fs.readFileSync(_0x64e5ee),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x64e5ee);
          } catch (_0x162614) {}
        });
    } catch (_0x435edb) {
      return await _0x5ca0cf.error(
        _0x435edb + "\n\n command: mp4stab",
        _0x435edb,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4color",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x4c9b1f) => {
    try {
      if (!_0x4c9b1f.reply_message.Video) {
        return await _0x4c9b1f.send("*Need Video!*");
      }
      let _0x377eec = "./temp/mp4color.mp4";
      var _0x3c26fa = await _0x4c9b1f.bot.downloadAndSaveMediaMessage(
        _0x4c9b1f.quoted.msg
      );
      console.log("checking location : ", _0x3c26fa);
      ffmpeg(_0x3c26fa)
        .outputOptions([
          "-y",
          "-vf",
          "eq=contrast=1.3:saturation=1.5:brightness=-0.1,format=yuv420p",
        ])
        .format("mp4")
        .save(_0x377eec)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x3c26fa);
          } catch (_0x4a1d42) {}
          await _0x4c9b1f.sendMessage(_0x4c9b1f.jid, {
            video: fs.readFileSync(_0x377eec),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x377eec);
          } catch (_0x4b56ec) {}
        });
    } catch (_0xb73bb6) {
      return await _0x4c9b1f.error(
        _0xb73bb6 + "\n\n command: mp4color",
        _0xb73bb6,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4slowmo",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x3fdc39) => {
    try {
      if (!_0x3fdc39.reply_message.Video) {
        return await _0x3fdc39.send("*Need Video!*");
      }
      let _0xce72ec = "./temp/mp4slowmo.mp4";
      var _0x151370 = await _0x3fdc39.bot.downloadAndSaveMediaMessage(
        _0x3fdc39.quoted.msg
      );
      console.log("checking location : ", _0x151370);
      ffmpeg(_0x151370)
        .videoFilters("minterpolate=fps=120")
        .videoFilters("setpts=4*PTS")
        .format("mp4")
        .save(_0xce72ec)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x151370);
          } catch (_0x1f4732) {}
          await _0x3fdc39.sendMessage(_0x3fdc39.jid, {
            video: fs.readFileSync(_0xce72ec),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0xce72ec);
          } catch (_0x5f551f) {}
        });
    } catch (_0x25f85c) {
      return await _0x3fdc39.error(
        _0x25f85c + "\n\n command: mp4slowmo",
        _0x25f85c,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp3volume",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x1352a3) => {
    try {
      if (!_0x1352a3.reply_message.audio) {
        return await _0x1352a3.sendMessage("*Need Audio!*");
      }
      let _0x3475f1 = "./temp/mp3volume.mp3";
      var _0x439c89 = await _0x1352a3.bot.downloadAndSaveMediaMessage(
        _0x1352a3.quoted.msg
      );
      ffmpeg(_0x439c89)
        .outputOptions(["-y", "-filter:a", "volume=5.3"])
        .save(_0x3475f1)
        .on("end", async () => {
          await _0x1352a3.bot.sendMessage(_0x1352a3.jid, {
            audio: fs.readFileSync(_0x3475f1),
            caption: Config.caption,
            ptt: false,
          });
          try {
            fs.unlinkSync(_0x439c89);
          } catch (_0x8efcb2) {}
          try {
            fs.unlinkSync(_0x3475f1);
          } catch (_0xdbff16) {}
        });
    } catch (_0x4a59c9) {
      return await _0x1352a3.error(
        _0x4a59c9 + "\n\n command: mp3volume",
        _0x4a59c9,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp3reverse",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x5c5bd9) => {
    try {
      if (!_0x5c5bd9.reply_message.audio) {
        return await _0x5c5bd9.sendMessage("*Need Audio!*");
      }
      let _0x52a54d = "./temp/mp3reverse.mp3";
      var _0x105b33 = await _0x5c5bd9.bot.downloadAndSaveMediaMessage(
        _0x5c5bd9.quoted.msg
      );
      ffmpeg(_0x105b33)
        .outputOptions(["-y", "-filter_complex", "areverse"])
        .save(_0x52a54d)
        .on("end", async () => {
          await _0x5c5bd9.bot.sendMessage(_0x5c5bd9.jid, {
            audio: fs.readFileSync(_0x52a54d),
            caption: Config.caption,
            ptt: false,
          });
          try {
            fs.unlinkSync(_0x105b33);
          } catch (_0x54f82c) {}
          try {
            fs.unlinkSync(_0x52a54d);
          } catch (_0x7b8a3) {}
        });
    } catch (_0x27153f) {
      return await _0x5c5bd9.error(
        _0x27153f + "\n\n command: mp3reverse",
        _0x27153f,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "x2mp3",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x4778af) => {
    try {
      if (!_0x4778af.reply_message.audio) {
        return await _0x4778af.sendMessage("*Need Audio!*");
      }
      let _0x1699bd = "./temp/x2mp3.mp3";
      var _0x18cc38 = await _0x4778af.bot.downloadAndSaveMediaMessage(
        _0x4778af.quoted.msg
      );
      ffmpeg(_0x18cc38)
        .outputOptions(["-y", "-filter:a", "atempo=2.0", "-vn"])
        .save(_0x1699bd)
        .on("end", async () => {
          await _0x4778af.bot.sendMessage(_0x4778af.jid, {
            audio: fs.readFileSync(_0x1699bd),
            caption: Config.caption,
            ptt: false,
          });
          try {
            fs.unlinkSync(_0x18cc38);
          } catch (_0x22ae61) {}
          try {
            fs.unlinkSync(_0x1699bd);
          } catch (_0x334ae2) {}
        });
    } catch (_0x43f378) {
      return await _0x4778af.error(
        _0x43f378 + "\n\n command: x2mp3",
        _0x43f378,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp3low",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x498785) => {
    try {
      if (!_0x498785.reply_message.audio) {
        return await _0x498785.sendMessage("*Need Audio!*");
      }
      let _0x595373 = "./temp/mp3low.mp3";
      var _0x4a3798 = await _0x498785.bot.downloadAndSaveMediaMessage(
        _0x498785.quoted.msg
      );
      ffmpeg(_0x4a3798)
        .outputOptions(["-y", "-af", "asetrate=44100*0.9"])
        .save(_0x595373)
        .on("end", async () => {
          await _0x498785.bot.sendMessage(_0x498785.jid, {
            audio: fs.readFileSync(_0x595373),
            caption: Config.caption,
            ptt: false,
          });
          try {
            fs.unlinkSync(_0x4a3798);
          } catch (_0x8b5dca) {}
          try {
            fs.unlinkSync(_0x595373);
          } catch (_0x4fea54) {}
        });
    } catch (_0x178ce5) {
      return await _0x498785.error(
        _0x178ce5 + "\n\n command: mp3low",
        _0x178ce5,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp3pitch",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x4dbb0d) => {
    try {
      if (!_0x4dbb0d.reply_message.audio) {
        return await _0x4dbb0d.sendMessage("*Need Audio!*");
      }
      let _0x1cf01b = "./temp/mp3pitch.mp3";
      var _0x44b65c = await _0x4dbb0d.bot.downloadAndSaveMediaMessage(
        _0x4dbb0d.quoted.msg
      );
      ffmpeg(_0x44b65c)
        .outputOptions(["-y", "-af", "asetrate=44100*1.3"])
        .save(_0x1cf01b)
        .on("end", async () => {
          await _0x4dbb0d.bot.sendMessage(_0x4dbb0d.jid, {
            audio: fs.readFileSync(_0x1cf01b),
            caption: Config.caption,
            ptt: false,
          });
          try {
            fs.unlinkSync(_0x44b65c);
          } catch (_0x1b3554) {}
          try {
            fs.unlinkSync(_0x1cf01b);
          } catch (_0x3b936f) {}
        });
    } catch (_0x373068) {
      return await _0x4dbb0d.error(
        _0x373068 + "\n\n command: mp3pitch",
        _0x373068,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp3crusher",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x324972) => {
    try {
      if (!_0x324972.reply_message.audio) {
        return await _0x324972.sendMessage("*Need Audio!*");
      }
      let _0x4afadd = "./temp/mp3crusher.mp3";
      var _0x546d4a = await _0x324972.bot.downloadAndSaveMediaMessage(
        _0x324972.quoted.msg
      );
      ffmpeg(_0x546d4a)
        .outputOptions([
          "-y",
          "-filter_complex",
          "acrusher=level_in=8:level_out=18:bits=8:mode=log:aa=1",
        ])
        .save(_0x4afadd)
        .on("end", async () => {
          await _0x324972.bot.sendMessage(_0x324972.jid, {
            audio: fs.readFileSync(_0x4afadd),
            caption: Config.caption,
            ptt: false,
          });
          try {
            fs.unlinkSync(_0x546d4a);
          } catch (_0x1fe1a8) {}
          try {
            fs.unlinkSync(_0x4afadd);
          } catch (_0x4f7742) {}
        });
    } catch (_0x4f3484) {
      return await _0x324972.error(
        _0x4f3484 + "\n\n command: mp3crusher",
        _0x4f3484,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp3eq",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x5c7aff) => {
    try {
      if (!_0x5c7aff.reply_message.audio) {
        return await _0x5c7aff.sendMessage("*Need Audio!*");
      }
      let _0x54dd35 = "./temp/mp3eq.mp3";
      var _0x4f0af5 = await _0x5c7aff.bot.downloadAndSaveMediaMessage(
        _0x5c7aff.quoted.msg
      );
      ffmpeg(_0x4f0af5)
        .outputOptions([
          "-y",
          "-af",
          "superequalizer=1b=10:2b=10:3b=1:4b=5:5b=7:6b=5:7b=2:8b=3:9b=4:10b=5:11b=6:12b=7:13b=8:14b=8:15b=9:16b=9:17b=10:18b=10[a];[a]loudnorm=I=-16:TP=-1.5:LRA=14",
          "-ar 48k",
        ])
        .save(_0x54dd35)
        .on("end", async () => {
          await _0x5c7aff.bot.sendMessage(_0x5c7aff.jid, {
            audio: fs.readFileSync(_0x54dd35),
            caption: Config.caption,
            ptt: false,
          });
          try {
            fs.unlinkSync(_0x4f0af5);
          } catch (_0x225344) {}
          try {
            fs.unlinkSync(_0x54dd35);
          } catch (_0x497aed) {}
        });
    } catch (_0x102c4e) {
      return await _0x5c7aff.error(
        _0x102c4e + "\n\n command: mp3eq",
        _0x102c4e,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp3bass",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x50b4cd) => {
    try {
      if (!_0x50b4cd.reply_message.audio) {
        return await _0x50b4cd.sendMessage("*Need Audio!*");
      }
      let _0x152a93 = "./temp/mp3bass.mp3";
      var _0x1f0325 = await _0x50b4cd.bot.downloadAndSaveMediaMessage(
        _0x50b4cd.quoted.msg
      );
      ffmpeg(_0x1f0325)
        .outputOptions(["-y", "-filter:a", "bass=g=9:f=110:w=0.6"])
        .save(_0x152a93)
        .on("end", async () => {
          await _0x50b4cd.bot.sendMessage(_0x50b4cd.jid, {
            audio: fs.readFileSync(_0x152a93),
            caption: Config.caption,
            ptt: false,
          });
          try {
            fs.unlinkSync(_0x1f0325);
          } catch (_0x16f61f) {}
          try {
            fs.unlinkSync(_0x152a93);
          } catch (_0x4d65e8) {}
        });
    } catch (_0x47308f) {
      return await _0x50b4cd.error(
        _0x47308f + "\n\n command: mp3bass",
        _0x47308f,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "waves",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x150e8b) => {
    try {
      if (!_0x150e8b.reply_message.audio) {
        return await _0x150e8b.sendMessage("*Need Audio!*");
      }
      let _0x4f37db = "./temp/waves.mp4";
      var _0x34ffd6 = await _0x150e8b.bot.downloadAndSaveMediaMessage(
        _0x150e8b.quoted.msg
      );
      ffmpeg(_0x34ffd6)
        .outputOptions([
          "-y",
          "-filter_complex",
          "[0:a]showwaves=s=720x1280:mode=cline:rate=25,format=yuv420p[v]",
          "-map",
          "[v]",
          "-map 0:a",
        ])
        .save(_0x4f37db)
        .on("end", async () => {
          await _0x150e8b.bot.sendMessage(_0x150e8b.jid, {
            video: fs.readFileSync(_0x4f37db),
            caption: Config.caption,
            ptt: false,
          });
          try {
            fs.unlinkSync(_0x34ffd6);
          } catch (_0x1e0c58) {}
          try {
            fs.unlinkSync(_0x4f37db);
          } catch (_0xc844a3) {}
        });
    } catch (_0x2ad83f) {
      return await _0x150e8b.error(
        _0x2ad83f + "\n\n command: waves",
        _0x2ad83f,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "frequency",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x2b9cd0) => {
    try {
      if (!_0x2b9cd0.reply_message.audio) {
        return await _0x2b9cd0.sendMessage("*Need Audio!*");
      }
      let _0x460635 = "./temp/frequency.mp4";
      var _0x5ae218 = await _0x2b9cd0.bot.downloadAndSaveMediaMessage(
        _0x2b9cd0.quoted.msg
      );
      ffmpeg(_0x5ae218)
        .outputOptions([
          "-y",
          "-filter_complex",
          "[0:a]showfreqs=s=720x1280:mode=cline:fscale=log,format=yuv420p[v]",
          "-map",
          "[v]",
          "-map 0:a",
        ])
        .save(_0x460635)
        .on("end", async () => {
          await _0x2b9cd0.bot.sendMessage(_0x2b9cd0.jid, {
            video: fs.readFileSync(_0x460635),
            caption: Config.caption,
            ptt: false,
          });
          try {
            fs.unlinkSync(_0x5ae218);
          } catch (_0x1c7e6e) {}
          try {
            fs.unlinkSync(_0x460635);
          } catch (_0x53a1fa) {}
        });
    } catch (_0x24ee7f) {
      return await _0x2b9cd0.error(
        _0x24ee7f + "\n\n command: frequency",
        _0x24ee7f,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "avec",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x3b2af0) => {
    try {
      if (!_0x3b2af0.reply_message.audio) {
        return await _0x3b2af0.sendMessage("*Need Audio!*");
      }
      let _0x41cf8c = "./temp/avec.mp4";
      var _0x58171a = await _0x3b2af0.bot.downloadAndSaveMediaMessage(
        _0x3b2af0.quoted.msg
      );
      ffmpeg(_0x58171a)
        .outputOptions([
          "-y",
          "-filter_complex",
          "[0:a]avectorscope=s=720x1280:rf=5:gf=25:bf=5:draw=line,format=yuv420p[v]",
          "-map",
          "[v]",
          "-map 0:a",
        ])
        .save(_0x41cf8c)
        .on("end", async () => {
          await _0x3b2af0.bot.sendMessage(_0x3b2af0.jid, {
            video: fs.readFileSync(_0x41cf8c),
            caption: Config.caption,
            ptt: false,
          });
          try {
            fs.unlinkSync(_0x58171a);
          } catch (_0x1f4b33) {}
          try {
            fs.unlinkSync(_0x41cf8c);
          } catch (_0x40b560) {}
        });
    } catch (_0x19d97) {
      return await _0x3b2af0.error(
        _0x19d97 + "\n\n command: avec",
        _0x19d97,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "volumeaudio",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x44b63b) => {
    try {
      if (!_0x44b63b.reply_message.audio) {
        return await _0x44b63b.sendMessage("*Need Audio!*");
      }
      let _0x1856b0 = "./temp/volumeaudio.mp4";
      var _0x11bcd8 = await _0x44b63b.bot.downloadAndSaveMediaMessage(
        _0x44b63b.quoted.msg
      );
      ffmpeg(_0x11bcd8)
        .outputOptions([
          "-y",
          "-filter_complex",
          "[0:a]showvolume=f=1:b=4:w=720:h=68,format=yuv420p[vid]",
          "-map",
          "[vid]",
          "-map 0:a",
        ])
        .save(_0x1856b0)
        .on("end", async () => {
          await _0x44b63b.bot.sendMessage(_0x44b63b.jid, {
            video: fs.readFileSync(_0x1856b0),
            caption: Config.caption,
            ptt: false,
          });
          try {
            fs.unlinkSync(_0x11bcd8);
          } catch (_0x433ba0) {}
          try {
            fs.unlinkSync(_0x1856b0);
          } catch (_0x111488) {}
        });
    } catch (_0x21c8c7) {
      return await _0x44b63b.error(
        _0x21c8c7 + "\n\n command: volumeaudio",
        _0x21c8c7,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "cqtaudio",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x57c344) => {
    try {
      if (!_0x57c344.reply_message.audio) {
        return await _0x57c344.sendMessage("*Need Audio!*");
      }
      let _0x36b161 = "./temp/cqtaudio.mp4";
      var _0x3074da = await _0x57c344.bot.downloadAndSaveMediaMessage(
        _0x57c344.quoted.msg
      );
      ffmpeg(_0x3074da)
        .outputOptions([
          "-y",
          "-filter_complex",
          "[0:a]showcqt=s=1280x720,format=yuv420p[v]",
          "-map",
          "[v]",
          "-map 0:a",
        ])
        .save(_0x36b161)
        .on("end", async () => {
          await _0x57c344.bot.sendMessage(_0x57c344.jid, {
            video: fs.readFileSync(_0x36b161),
            caption: Config.caption,
            ptt: false,
          });
          try {
            fs.unlinkSync(_0x3074da);
          } catch (_0x1642ec) {}
          try {
            fs.unlinkSync(_0x36b161);
          } catch (_0x1f072f) {}
        });
    } catch (_0x478698) {
      return await _0x57c344.error(
        _0x478698 + "\n\n command: cqtaudio",
        _0x478698,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "bwimage",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x128d19) => {
    try {
      if (!_0x128d19.reply_message.video) {
        return await _0x128d19.send("*Need Video!*");
      }
      let _0x2e00d2 = "./temp/bwimage.png";
      var _0x6f6f29 = await _0x128d19.bot.downloadAndSaveMediaMessage(
        _0x128d19.quoted.msg
      );
      ffmpeg(_0x6f6f29)
        .outputOptions(["-y", "-vf", "hue=s=0"])
        .save(_0x2e00d2)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x6f6f29);
          } catch (_0x32f5de) {}
          await _0x128d19.bot.sendMessage(_0x128d19.jid, {
            image: fs.readFileSync(_0x2e00d2),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x2e00d2);
          } catch (_0x5d6d7f) {}
        });
    } catch (_0x4198f1) {
      return await _0x128d19.error(
        _0x4198f1 + "\n\n command: bwimage",
        _0x4198f1,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "vintageimage",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x3cd6fa) => {
    try {
      if (!_0x3cd6fa.reply_message.video) {
        return await _0x3cd6fa.send("*Need Video!*");
      }
      let _0x209128 = "./temp/vintageimage.png";
      var _0x58ea92 = await _0x3cd6fa.bot.downloadAndSaveMediaMessage(
        _0x3cd6fa.quoted.msg
      );
      ffmpeg(_0x58ea92)
        .outputOptions(["-y", "-vf", "curves=vintage"])
        .save(_0x209128)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x58ea92);
          } catch (_0x2dfca7) {}
          await _0x3cd6fa.bot.sendMessage(_0x3cd6fa.jid, {
            image: fs.readFileSync(_0x209128),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x209128);
          } catch (_0x181170) {}
        });
    } catch (_0x47c67d) {
      return await _0x3cd6fa.error(
        _0x47c67d + "\n\n command: vintageimage",
        _0x47c67d,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "blurimage",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x567d21) => {
    try {
      if (!_0x567d21.reply_message.video) {
        return await _0x567d21.send("*Need Video!*");
      }
      let _0x1838cc = "./temp/blurimage.png";
      var _0x440048 = await _0x567d21.bot.downloadAndSaveMediaMessage(
        _0x567d21.quoted.msg
      );
      ffmpeg(_0x440048)
        .outputOptions([
          "-y",
          "-vf",
          "split[original][copy];[copy]scale=ih*16/9:-1,crop=h=iw*9/16,gblur=sigma=20[blurred];[blurred][original]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2",
        ])
        .save(_0x1838cc)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x440048);
          } catch (_0x50d28c) {}
          await _0x567d21.bot.sendMessage(_0x567d21.jid, {
            image: fs.readFileSync(_0x1838cc),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x1838cc);
          } catch (_0x511f75) {}
        });
    } catch (_0x30b72e) {
      return await _0x567d21.error(
        _0x30b72e + "\n\n command: blurimage",
        _0x30b72e,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "edgeimage",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x5ba46c) => {
    try {
      if (!_0x5ba46c.reply_message.video) {
        return await _0x5ba46c.send("*Need Video!*");
      }
      let _0x5dc1f3 = "./temp/edgeimage.png";
      var _0x54c789 = await _0x5ba46c.bot.downloadAndSaveMediaMessage(
        _0x5ba46c.quoted.msg
      );
      ffmpeg(_0x54c789)
        .outputOptions(["-y", "-filter:v", "edgedetect=low=0.9:high=0.2"])
        .save(_0x5dc1f3)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x54c789);
          } catch (_0x521c7f) {}
          await _0x5ba46c.bot.sendMessage(_0x5ba46c.jid, {
            image: fs.readFileSync(_0x5dc1f3),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x5dc1f3);
          } catch (_0x2b8185) {}
        });
    } catch (_0x259684) {
      return await _0x5ba46c.error(
        _0x259684 + "\n\n command: edgeimage",
        _0x259684,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "enhanceimage",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x406ae2) => {
    try {
      if (!_0x406ae2.reply_message.video) {
        return await _0x406ae2.send("*Need Video!*");
      }
      let _0x1611a8 = "./temp/enhanceimage.png";
      var _0x27cc90 = await _0x406ae2.bot.downloadAndSaveMediaMessage(
        _0x406ae2.quoted.msg
      );
      ffmpeg(_0x27cc90)
        .outputOptions(["-y", "-vf", "unsharp=3:3:1.5"])
        .save(_0x1611a8)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x27cc90);
          } catch (_0x1ca4a2) {}
          await _0x406ae2.bot.sendMessage(_0x406ae2.jid, {
            image: fs.readFileSync(_0x1611a8),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x1611a8);
          } catch (_0x1d9ca3) {}
        });
    } catch (_0x573f91) {
      return await _0x406ae2.error(
        _0x573f91 + "\n\n command: enhanceimage",
        _0x573f91,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "grenimage",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x53b27b) => {
    try {
      if (!_0x53b27b.reply_message.video) {
        return await _0x53b27b.send("*Need Video!*");
      }
      let _0x5f5571 = "./temp/grenimage.png";
      var _0x3006b5 = await _0x53b27b.bot.downloadAndSaveMediaMessage(
        _0x53b27b.quoted.msg
      );
      ffmpeg(_0x3006b5)
        .videoFilters("noise=alls=100:allf=t+u")
        .save(_0x5f5571)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x3006b5);
          } catch (_0x4b5d77) {}
          await _0x53b27b.bot.sendMessage(_0x53b27b.jid, {
            image: fs.readFileSync(_0x5f5571),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x5f5571);
          } catch (_0x357b40) {}
        });
    } catch (_0x29589a) {
      return await _0x53b27b.error(
        _0x29589a + "\n\n command: grenimage",
        _0x29589a,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "rainbowimage",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x467e72) => {
    try {
      if (!_0x467e72.reply_message.video) {
        return await _0x467e72.send("*Need Video!*");
      }
      let _0x2aca4d = "./temp/rainbowimage.png";
      var _0x141bb6 = await _0x467e72.bot.downloadAndSaveMediaMessage(
        _0x467e72.quoted.msg
      );
      ffmpeg(_0x141bb6)
        .outputOptions([
          "-y",
          "-vf",
          "geq=r='X/W*r(X,Y)':g='(1-X/W)*g(X,Y)':b='(H-Y)/H*b(X,Y)",
        ])
        .videoFilters("eq=brightness=0.6")
        .save(_0x2aca4d)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x141bb6);
          } catch (_0x3cae0b) {}
          await _0x467e72.bot.sendMessage(_0x467e72.jid, {
            image: fs.readFileSync(_0x2aca4d),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x2aca4d);
          } catch (_0x478b42) {}
        });
    } catch (_0x1463ee) {
      return await _0x467e72.error(
        _0x1463ee + "\n\n command: rainbowimage",
        _0x1463ee,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "negativeimage",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x534333) => {
    try {
      if (!_0x534333.reply_message.image) {
        return await _0x534333.send("*Need imagge!*");
      }
      let _0xbde1c6 = "./temp/negativeimage.png";
      var _0x412db7 = await _0x534333.bot.downloadAndSaveMediaMessage(
        _0x534333.quoted.msg
      );
      ffmpeg(_0x412db7)
        .outputOptions(["-y", "-vf", "curves=color_negative"])
        .save(_0xbde1c6)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x412db7);
          } catch (_0x163989) {}
          await _0x534333.bot.sendMessage(_0x534333.jid, {
            image: fs.readFileSync(_0xbde1c6),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0xbde1c6);
          } catch (_0x44e02f) {}
        });
    } catch (_0x322ecc) {
      return await _0x534333.error(
        _0x322ecc + "\n\n command: negativeimage",
        _0x322ecc,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "artimage",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x2888d7) => {
    try {
      if (!_0x2888d7.reply_message.image) {
        return await _0x2888d7.send("*Need imagge!*");
      }
      let _0x5abf4e = "./temp/artimage.png";
      var _0x310141 = await _0x2888d7.bot.downloadAndSaveMediaMessage(
        _0x2888d7.quoted.msg
      );
      ffmpeg(_0x310141)
        .outputOptions([
          "-y",
          "-vf",
          "convolution=-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2",
        ])
        .save(_0x5abf4e)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x310141);
          } catch (_0x35cd12) {}
          await _0x2888d7.bot.sendMessage(_0x2888d7.jid, {
            image: fs.readFileSync(_0x5abf4e),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x5abf4e);
          } catch (_0x422f29) {}
        });
    } catch (_0x29dcaa) {
      return await _0x2888d7.error(
        _0x29dcaa + "\n\n command: artimage",
        _0x29dcaa,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "colorimage",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x547dc8) => {
    try {
      if (!_0x547dc8.reply_message.image) {
        return await _0x547dc8.send("*Need imagge!*");
      }
      let _0x3f5452 = "./temp/colorimage.png";
      var _0x2e1ad6 = await _0x547dc8.bot.downloadAndSaveMediaMessage(
        _0x547dc8.quoted.msg
      );
      ffmpeg(_0x2e1ad6)
        .outputOptions([
          "-y",
          "-vf",
          "eq=contrast=1.3:saturation=1.5:brightness=-0.1",
        ])
        .save(_0x3f5452)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x2e1ad6);
          } catch (_0x5c60eb) {}
          await _0x547dc8.bot.sendMessage(_0x547dc8.jid, {
            image: fs.readFileSync(_0x3f5452),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x3f5452);
          } catch (_0xb969d3) {}
        });
    } catch (_0x85d054) {
      return await _0x547dc8.error(
        _0x85d054 + "\n\n command: colorimage",
        _0x85d054,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "imterp",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x1928a2, _0xd4c6d1) => {
    _0xd4c6d1 = _0xd4c6d1.split(" ");
    _0xd4c6d1[1] = _0xd4c6d1[0];
    if (!_0x1928a2.reply_message && _0xd4c6d1[1] === "") {
      return await _0x1928a2.send(
        "*Need Video and FPS Value!*\nEx: ```.interp 100```"
      );
    }
    if (_0xd4c6d1[1] <= 10) {
      return await _0x1928a2.send("*Low FPS Value ⚠️*\n*Please, type over 10*");
    }
    if (_0xd4c6d1[1] >= 500) {
      return await _0x1928a2.send(
        "*High FPS Value ⚠️*\n*Please, type under 500*"
      );
    }
    await _0x1928a2.send("```Interpolating..```");
    var _0x7a872 = await _0x1928a2.bot.downloadAndSaveMediaMessage(
      _0x1928a2.quoted.msg
    );
    exec(
      "ffprobe -hide_banner -loglevel fatal -show_error -show_format -show_streams -show_programs -show_chapters -show_private_data -print_format json " +
        _0x7a872,
      async (_0x2025ec, _0x10845e, _0x20e511) => {
        var _0x9813a3 = JSON.parse(_0x10845e);
        var _0x123e18 = {
          value: 100,
        };
        var _0x1fc606 = {
          time: 1,
        };
        if (
          _0x9813a3.format.size / 1000000 > 0 &&
          _0x9813a3.format.size / 1000000 < 6
        ) {
          _0x123e18.value = _0x123e18.value - 2;
          _0x1fc606.time = _0x1fc606.time + 1;
        }
        if (
          _0x9813a3.format.size / 1000000 > 5 &&
          _0x9813a3.format.size / 1000000 < 11
        ) {
          _0x123e18.value = _0x123e18.value - 5;
          _0x1fc606.time = _0x1fc606.time + 1.4;
        }
        if (
          _0x9813a3.format.size / 1000000 > 10 &&
          _0x9813a3.format.size / 1000000 < 21
        ) {
          _0x123e18.value = _0x123e18.value - 9;
          _0x1fc606.time = _0x1fc606.time + 2;
        }
        if (
          _0x9813a3.format.size / 1000000 > 20 &&
          _0x9813a3.format.size / 1000000 < 31
        ) {
          _0x123e18.value = _0x123e18.value - 25;
          _0x1fc606.time = _0x1fc606.time + 2.3;
        }
        if (_0x9813a3.format.size / 1000000 > 30) {
          _0x123e18.value = _0x123e18.value - 39;
          _0x1fc606.time = _0x1fc606.time + 9;
        }
        if (
          _0x9813a3.streams[0].duration > 0 &&
          _0x9813a3.streams[0].duration < 21
        ) {
          _0x123e18.value = _0x123e18.value - 4;
          _0x1fc606.time = _0x1fc606.time + 1;
        }
        if (
          _0x9813a3.streams[0].duration > 20 &&
          _0x9813a3.streams[0].duration < 41
        ) {
          _0x123e18.value = _0x123e18.value - 9;
          _0x1fc606.time = _0x1fc606.time + 1.4;
        }
        if (
          _0x9813a3.streams[0].duration > 40 &&
          _0x9813a3.streams[0].duration < 61
        ) {
          _0x123e18.value = _0x123e18.value - 11;
          _0x1fc606.time = _0x1fc606.time + 2;
        }
        if (
          _0x9813a3.streams[0].duration > 60 &&
          _0x9813a3.streams[0].duration < 81
        ) {
          _0x123e18.value = _0x123e18.value - 15;
          _0x1fc606.time = _0x1fc606.time + 2.7;
        }
        if (
          _0x9813a3.streams[0].duration > 80 &&
          _0x9813a3.streams[0].duration < 101
        ) {
          _0x123e18.value = _0x123e18.value - 21;
          _0x1fc606.time = _0x1fc606.time + 3.4;
        }
        if (
          _0x9813a3.streams[0].duration > 100 &&
          _0x9813a3.streams[0].duration < 121
        ) {
          _0x123e18.value = _0x123e18.value - 27;
          _0x1fc606.time = _0x1fc606.time + 4;
        }
        if (_0x9813a3.streams[0].duration > 120) {
          _0x123e18.value = _0x123e18.value - 39;
          _0x1fc606.time = _0x1fc606.time + 9;
        }
        if (
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] > 0 &&
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] < 11
        ) {
          _0x123e18.value = _0x123e18.value + 1;
          _0x1fc606.time = _0x1fc606.time - 0.6;
        }
        if (
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] > 10 &&
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] < 21
        ) {
          _0x123e18.value = _0x123e18.value - 3;
          _0x1fc606.time = _0x1fc606.time + 1;
        }
        if (
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] > 20 &&
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] < 31
        ) {
          _0x123e18.value = _0x123e18.value - 19;
          _0x1fc606.time = _0x1fc606.time + 2.3;
        }
        if (
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] > 30 &&
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] < 41
        ) {
          _0x123e18.value = _0x123e18.value - 31;
          _0x1fc606.time = _0x1fc606.time + 4.3;
        }
        if (_0x9813a3.streams[0].r_frame_rate.split("/")[0] > 40) {
          _0x123e18.value = _0x123e18.value - 40;
          _0x1fc606.time = _0x1fc606.time + 9;
        }
        if (
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] > 9 &&
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] < 31 &&
          _0xd4c6d1[1] > 39
        ) {
          _0x1fc606.time = _0x1fc606.time + 3.3;
        }
        if (
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] > 30 &&
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] < 41 &&
          _0xd4c6d1[1] > 39
        ) {
          _0x1fc606.time = _0x1fc606.time + 5;
        }
        if (
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] > 30 &&
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] < 41 &&
          _0xd4c6d1[1] > 49
        ) {
          _0x1fc606.time = _0x1fc606.time + 5.4;
        }
        if (
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] > 30 &&
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] < 41 &&
          _0xd4c6d1[1] > 59
        ) {
          _0x1fc606.time = _0x1fc606.time + 6;
        }
        if (
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] > 30 &&
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] < 41 &&
          _0xd4c6d1[1] > 69
        ) {
          _0x1fc606.time = _0x1fc606.time + 7.5;
        }
        if (
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] > 40 &&
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] < 61 &&
          _0xd4c6d1[1] > 59
        ) {
          _0x1fc606.time = _0x1fc606.time + 9;
        }
        if (
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] > 40 &&
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] < 61 &&
          _0xd4c6d1[1] > 64
        ) {
          _0x1fc606.time = _0x1fc606.time + 9.2;
        }
        if (
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] > 40 &&
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] < 61 &&
          _0xd4c6d1[1] > 69
        ) {
          _0x1fc606.time = _0x1fc606.time + 9.5;
        }
        if (
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] > 40 &&
          _0x9813a3.streams[0].r_frame_rate.split("/")[0] < 61 &&
          _0xd4c6d1[1] > 75
        ) {
          _0x1fc606.time = _0x1fc606.time + 10;
        }
        let _0x801241 =
          "_This process may take a while._\n_Envisaged Time:_ *" +
          _0x1fc606.time +
          " Minute*\n_Success Rate:_ *" +
          _0x123e18.value +
          "%*";
        await _0x1928a2.send(_0x801241);
        var _0x268b51 = 10;
        ffmpeg(_0x7a872)
          .videoFilters(
            "minterpolate=fps=" + _0xd4c6d1[1] + ":mi_mode=mci:me_mode=bidir"
          )
          .format("mp4")
          .save("output.mp4")
          .on("progress", async (_0x211e93) => {
            var _0x27ebf4 = _0x211e93.percent;
            while (_0x27ebf4 > 10 && _0x268b51 == 10) {
              _0x268b51 = 1;
              let _0x2e9cd2 = "*Completed %10!*";
              await _0x1928a2.send(_0x2e9cd2);
            }
            while (_0x27ebf4 > 30 && _0x268b51 == 1) {
              _0x268b51 = 2;
              let _0x414f71 = "*Completed %30!*";
              await _0x1928a2.send(_0x414f71);
            }
            while (_0x27ebf4 > 50 && _0x268b51 == 2) {
              _0x268b51 = 3;
              let _0x1c0fd9 = "*Completed %50!*";
              await _0x1928a2.send(_0x1c0fd9);
            }
            while (_0x27ebf4 > 70 && _0x268b51 == 3) {
              _0x268b51 = 4;
              let _0x2564b4 = "*Completed %70!*";
              await _0x1928a2.send(_0x2564b4);
            }
            while (_0x27ebf4 > 90 && _0x268b51 == 4) {
              _0x268b51 = 5;
              let _0x1ffbc7 = "*Preparing Video..*";
              await _0x1928a2.send(_0x1ffbc7);
            }
          })
          .on("end", async () => {
            await _0x1928a2.send(
              fs.readFileSync("output.mp4"),
              {
                caption:
                  "Made by Suhail\n_Interpolated to " + _0xd4c6d1[1] + " FPS_",
              },
              "video"
            );
          });
      }
    );
  }
);



 ////      /////// SEARCH CMD ////////////
 
 
smd(
  {
    pattern: "find",
    alias: ["shazam"],
    category: "search",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (message) => {
    try {
      let mime = message.reply_message ? message.reply_message.mtype : "";
      if (!/audio/.test(mime))
        return message.reply(`Reply audio ${prefix}find`);
      let buff = await message.reply_message.download();
      let data = await shazam(buff);
      if (!data || !data.status) return message.send(data);
      let h = `*TITLE: _${data.title}_* \n*ARTIST: _${data.artists}_*\n *ALBUM:* _${data.album}_ `;
      await message.bot.sendUi(
        message.jid,
        { caption: h },
        { quoted: message },
        "text",
        "true"
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: find`,
        e,
        `*_Didn't get any results, Sorry!_*`
      );
    }
  }
);
smd(
  {
    pattern: "github",
    category: "search",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (message, match) => {
    try {
      message.react("🔍");
      if (!match)
        return message.reply(
          `Give me a user name like ${prefix}github DeeCeeXxx`
        );

      const { data } = await axios(`https://api.github.com/users/${match}`);
      if (!data)
        return await message.send(
          `*_Didn't get any results, Provide valid user name!_*`
        );
      let gitdata = data;
      message.sendMessage(
        message.jid,
        {
          image: { url: gitdata.avatar_url },
          caption: `ㅤㅤㅤ*[ GITHUB USER INFO ]*

🚩 Id : ${gitdata.id}
🔖 Nickname : ${gitdata.name}
🔖 Username : ${gitdata.login}
✨ Bio : ${gitdata.bio}
🏢 Company : ${gitdata.company}
📍 Location : ${gitdata.location}
📧 Email : ${gitdata.email}
📰 Blog : ${gitdata.blog}
🔓 Public Repo : ${gitdata.repos_url}
🔐 Public Gists : ${gitdata.gists_url}
💕 Followers : ${gitdata.followers}
👉 Following : ${gitdata.following}
🔄 Updated At : ${gitdata.updated_at}
🧩 Created At : ${gitdata.created_at}`,
        },
        { quoted: message }
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: github`,
        e,
        `*_Didn't get any results, Sorry!_*`
      );
    }
  }
);
smd(
  {
    pattern: "coffe",
    alias: ["tea", "kofi"],
    category: "search",
    react: "🫡",
    desc: "send randome coffe",
    filename: __filename,
  },
  async (m) => {
    try {
      // m.react("🫡")
      return await m.bot.sendMessage(
        m.chat,
        {
          image: { url: "https://coffee.alexflipnote.dev/random" },
          caption: `Here is your Coffee...`,
        },
        { quoted: m }
      );
    } catch (e) {
      return await m.error(
        `${e}\n\n command: coffe`,
        e,
        `*_Didn't get any results, Sorry!_*`
      );
    }
  }
);
smd(
  {
    pattern: "lyrics",
    alias: ["lyric"],
    category: "search",
    desc: "Searche lyrics of given song name",
    use: "<text | song>",
    filename: __filename,
  },

  async (message, text, { cmdName }) => {
    if (!text)
      return message.reply(
        `*_Uhh please, give me song name_*\n*_Example ${
          prefix + cmdName
        } blue eyes punjabi_*`
      );
    try {
      const res = await (
        await fetch(`https://inrl-web.onrender.com/api/lyrics?text=${text}`)
      ).json();
      if (!res.status) return message.send("*Please Provide valid name!!!*");
      if (!res.result)
        return message.send("*There's a problem, try again later!*");
      const { thumb, lyrics, title, artist } = res.result,
        tbl = "```",
        tcl = "*",
        tdl = "_*",
        contextInfo = {
          externalAdReply: {
            ...(await message.bot.contextInfo("𝗦𝗨𝗛𝗔𝗜𝗟-𝗠𝗗", `Lyrics-${text}`)),
          },
        };
      await send(
        message,
        `*𝚃𝚒𝚝𝚕𝚎:* ${title}\n*𝙰𝚛𝚝𝚒𝚜𝚝:* ${artist} \n${tbl}${lyrics}${tbl} `,
        { contextInfo: contextInfo },
        ""
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: ${cmdName}`,
        e,
        `*_Didn't get any lyrics, Sorry!_*`
      );
    }
  }
);
smd(
  {
    pattern: "imdb",
    category: "search",
    desc: "sends info of asked movie/series.",
    use: "<text>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!match)
        return message.reply(`_Name a Series or movie ${tlang().greet}._`);
      let { data } = await axios.get(
        `http://www.omdbapi.com/?apikey=742b2d09&t=${match}&plot=full`
      );
      if (!data || data.cod == "404")
        return await message.reply(`*_Please provide valid country name!_*`);

      let imdbt =
        "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n" + " ``` 𝕀𝕄𝔻𝔹 𝕊𝔼𝔸ℝℂℍ```\n" + "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
      imdbt += "🎬Title      : " + data.Title + "\n";
      imdbt += "📅Year       : " + data.Year + "\n";
      imdbt += "⭐Rated      : " + data.Rated + "\n";
      imdbt += "📆Released   : " + data.Released + "\n";
      imdbt += "⏳Runtime    : " + data.Runtime + "\n";
      imdbt += "🌀Genre      : " + data.Genre + "\n";
      imdbt += "👨🏻‍💻Director   : " + data.Director + "\n";
      imdbt += "✍Writer     : " + data.Writer + "\n";
      imdbt += "👨Actors     : " + data.Actors + "\n";
      imdbt += "📃Plot       : " + data.Plot + "\n";
      imdbt += "🌐Language   : " + data.Language + "\n";
      imdbt += "🌍Country    : " + data.Country + "\n";
      imdbt += "🎖️Awards     : " + data.Awards + "\n";
      imdbt += "📦BoxOffice  : " + data.BoxOffice + "\n";
      imdbt += "🏙️Production : " + data.Production + "\n";
      imdbt += "🌟imdbRating : " + data.imdbRating + "\n";
      imdbt += "❎imdbVotes  : " + data.imdbVotes + "\n\n";
      imdbt += Config.caption;
      await message.bot.sendUi(
        message.jid,
        { caption: imdbt },
        { quoted: message },
        "image",
        data.Poster
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: ${cmdName}`,
        e,
        `*_Uhh dear, Didn't get any results!_*`
      );
    }
  }
);
smd(
  {
    pattern: "weather",
    category: "search",
    desc: "Sends weather info about asked place.",
    use: "<location>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text)
        return message.reply(
          `*_Give me city name, ${message.isCreator ? "Buddy" : "Idiot"}!!_*`
        );
      let { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
      );
      if (!data || data.cod === "404")
        return await message.reply(`*_Please provide valid city name!_*`);
      let textw = `*🌟Weather of  ${text}*\n\n`;
      textw += `*Weather:-* ${data.weather[0].main}\n`;
      textw += `*Description:-* ${data.weather[0].description}\n`;
      textw += `*Avg Temp:-* ${data.main.assets}\n`;
      textw += `*Feels Like:-* ${data.main.feels_like}\n`;
      textw += `*Pressure:-* ${data.main.pressure}\n`;
      textw += `*Humidity:-* ${data.main.humidity}\n`;
      textw += `*Humidity:-* ${data.wind.speed}\n`;
      textw += `*Latitude:-* ${data.coord.lat}\n`;
      textw += `*Longitude:-* ${data.coord.lon}\n`;
      textw += `*Country:-* ${data.sys.country}\n\n`;
      textw += Config.caption;
      message.bot.sendUi(
        message.jid,
        { caption: textw },
        { quoted: message },
        "text",
        "true"
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: weather`,
        e,
        `*_Please provide valid city name!_*`
      );
    }
  }
);
smd(
  {
    pattern: "npm",
    desc: "download mp4 from url.",
    category: "search",
    use: "<package name>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      if (!match) return message.reply("Please give me package name.📦");
      const { data } = await axios.get(
        `https://api.npms.io/v2/search?q=${match}`
      );
      let txt = data.results
        .map(
          ({ package: pkg }) =>
            `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`
        )
        .join("\n\n")
        ?.trim();
      data && txt
        ? await message.reply(txt)
        : await message.reply("*No Result Found. Sorry!!*");
    } catch (e) {
      await message.error(`${e}\n\ncommand : npm`, e);
    }
  }
);
smd(
  {
    pattern: "cric",
    category: "search",
    desc: "Sends info of given query from Google Search.",
    use: "<text>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      await message.reply(`*_Please Wait, Getting Cricket Info_*`);
      const response = await fetch(
        "https://api.cricapi.com/v1/currentMatches?apikey=f68d1cb5-a9c9-47c5-8fcd-fbfe52bace78"
      );
      const dat = await response.json();

      for (let i = 0; i < dat.data.length; i++) {
        let j = i + 1;
        text += `\n*--------------------- MATCH ${i}-------------------*`;
        text += "\n*Match Name:* " + dat.data[i].name;
        text += "\n*Match Status:* " + dat.data[i].status;
        text += "\n*Match Date:* " + dat.data[i].dateTimeGMT;
        text += "\n*Match Started:* " + dat.data[i].matchStarted;
        text += "\n*Match Ended:* " + dat.data[i].matchEnded;
      }
      return await message.reply(text);
    } catch (e) {
      return await message.error(
        `${e}\n\n command: cric`,
        e,
        `*_Uhh dear, Didn't get any results!_*`
      );
    }
  }
);
smd(
  {
    pattern: "google",
    alias: ["search", "gsearch"],
    category: "search",
    desc: "Sends info of given query from Google Search.",
    use: "<text>",
    filename: __filename,
  },
  async (message, text) => {
    try {
      if (!text)
        return message.reply(
          `*_Uhh please, give me a query_*\n*_Example : ${prefix}google Suhail Md._*`
        );
      let google = require("google-it");
      google({ query: text }).then((res) => {
        let msg = `Google Search From : ${text} \n\n`;
        for (let g of res) {
          msg += `➣ Title : ${g.title}\n`;
          msg += `➣ Description : ${g.snippet}\n`;
          msg += `➣ Link : ${g.link}\n\n────────────────────────\n\n`;
        }

        return message.reply(msg);
      });
    } catch (e) {
      return await message.error(
        `${e}\n\n command: google`,
        e,
        `*_Uhh dear, Didn't get any results!_*`
      );
    }
  }
);
smd(
  {
    pattern: "image",
    alias: ["img", "pic"],
    category: "search",
    desc: "Searches Image on Google",
    use: "<text>",
    filename: __filename,
  },
  async (message, match) => {
    try {
      let text = match ? match : message.reply_text;
      if (!text)
        return message.reply(`Provide me a query!\n*Ex : .image  iphone 16`);

      let name1 = text.split("|")[0] || text;
      let name2 = text.split("|")[1] || `5`;

      let nn = parseInt(name2) || 5;
      let Group = await groupdb.findOne({ id: message.chat });
      let safe = Group.nsfw == "true" ? "off" : "on";
      try {
        let n = await gis(name1, {
          query: { safe: safe },
          userAgent:
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
        });
        console.log("NTEEJ-MD images results : ", n);

        if (n && n[0]) {
          nn = n && n.length > nn ? nn : n.length;
          message.reply(`*_Sending images of '${name1}' in chat!_*`);
          for (let i = 0; i < nn; i++) {
            try {
              let random = Math.floor(Math.random() * n.length);
              message.bot.sendFromUrl(
                message.jid,
                n[random].url,
                "",
                message,
                {},
                "image"
              );
              n.splice(random, 1);
            } catch {}
          }
          return;
        }
      } catch (e) {
        console.log("ERROR IN SYNC G>I>S IMAGE PACKAGE\n\t", e);
      }

      let buttonMessage = {};

      let urlsArray = [];
      const params = {
        q: name1,
        tbm: "isch",
        hl: "en",
        gl: "in",
        ijn: "0",
      };
      const headers = {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36",
        "Accept-Encoding": "application/json",
      };

      const res = await axios.get("https://www.google.com/search", {
        headers: headers,
        params: params,
      });
      let body = res.data;
      body = body.slice(body.lastIndexOf("AF_initDataCallback"));
      body = body.slice(body.indexOf("["));
      body = body.slice(0, body.indexOf("</script>") - 1);
      body = body.slice(0, body.lastIndexOf(","));

      const img = JSON.parse(body);

      const imgObjects = img[56][1][0][0][1][0];

      for (let i = 0; i < name2; i++) {
        if (imgObjects[i] && imgObjects[i][0][0]["444383007"][1]) {
          let url = imgObjects[i][0][0]["444383007"][1][3][0]; // the url
          urlsArray.push(url);
        }
      }

      for (let url of urlsArray) {
        try {
          message.bot.sendFromUrl(message.chat, url, "", message, {}, "image");
        } catch {}
      }
    } catch (e) {
      return await message.error(
        `${e}\n\n command: image`,
        e,
        `*_Uhh dear, Didn't get any results!_*`
      );
    }
  }
);
smd(
  {
    pattern: "couplepp",
    category: "search",
    desc: "Sends two couples pics.",
    filename: __filename,
  },
  async (message) => {
    try {
      let anu = await fetchJson(
        "https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json"
      );
      let random = anu[Math.floor(Math.random() * anu.length)];
      message.reply(
        random.male,
        { caption: `*✦Couple Male profile✦*` },
        "image"
      );
      message.reply(
        random.female,
        { caption: `*✦Couple Female profile✦*` },
        "image"
      );
    } catch (e) {
      return await message.error(
        `${e}\n\n command: couplepp`,
        e,
        `*_Uhh dear, Didn't get any results!_*`
      );
    }
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "iswa",
    alias: ["oldwa", "bio", "onwa"],
    category: "search",
    desc: "Searches in given rage about given number.",
    use: "263778533166xx",
    filename: __filename,
  },
  async (message, text) => {
    if (!text)
      return await message.reply(
        "Give Me Number without + sign. Example: .iswa 234906652xx"
      );
    var inputnumber = text.split(" ")[0];
    if (!inputnumber.includes("x"))
      return message.reply(
        `*You did not add x*\nExample: iswa 234906652xx  \n ${Config.caption}`
      );
    message.reply(
      `*Searching for WhatsApp account in given range...* \n ${Config.caption}`
    );

    function countInstances(string, word) {
      return string.split(word).length - 1;
    }
    var number0 = inputnumber.split("x")[0];
    var number1 = inputnumber.split("x")[countInstances(inputnumber, "x")]
      ? inputnumber.split("x")[countInstances(inputnumber, "x")]
      : "";
    var random_length = countInstances(inputnumber, "x");
    var randomxx;
    if (random_length == 1) {
      randomxx = 10;
    } else if (random_length == 2) {
      randomxx = 100;
    } else if (random_length == 3) {
      randomxx = 1000;
    }

    text = `*--『 List of Whatsapp Numbers 』--*\n\n`;
    var nobio = `\n*Bio:* || \nHey there! I am using WhatsApp.\n`;
    var nowhatsapp = `\n*Numbers with no WhatsApp account within provided range.*\n`;
    for (let i = 0; i < randomxx; i++) {
      var nu = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      var status1 = nu[Math.floor(Math.random() * nu.length)];
      var status2 = nu[Math.floor(Math.random() * nu.length)];
      var status3 = nu[Math.floor(Math.random() * nu.length)];
      var dom4 = nu[Math.floor(Math.random() * nu.length)];
      var random;
      if (random_length == 1) {
        random = `${status1}`;
      } else if (random_length == 2) {
        random = `${status1}${status2}`;
      } else if (random_length == 3) {
        random = `${status1}${status2}${status3}`;
      } else if (random_length == 4) {
        random = `${status1}${status2}${status3}${dom4}`;
      }

      var anu = await message.bot.onWhatsApp(
        `${number0}${i}${number1}@s.whatsapp.net`
      );
      var anuu = anu.length !== 0 ? anu : false;
      try {
        try {
          var anu1 = await message.bot.fetchStatus(anu[0].jid);
        } catch {
          var anu1 = "401";
        }
        if (anu1 == "401" || anu1.status.length == 0) {
          nobio += `wa.me/${anu[0].jid.split("@")[0]}\n`;
        } else {
          text += `🧐 *Number:* wa.me/${anu[0].jid.split("@")[0]}\n ✨*Bio :* ${
            anu1.status
          }\n🍁*Last update :* ${moment(anu1.setAt)
            .tz("Asia/Karachi")
            .format("HH:mm:ss DD/MM/YYYY")}\n\n`;
        }
      } catch {
        nowhatsapp += ` ≛ ${number0}${i}${number1}\n`;
      }
    }
    return await message.reply(`${text}${nobio}${nowhatsapp}`);
  }
);
smd(
  {
    pattern: "nowa",
    category: "search",
    desc: "Searches in given rage about given number.",
    use: "234906652xx",
    filename: __filename,
  },
  async (message, text) => {
    if (!text)
      return await message.reply(
        "Give Me Number without + sign. Example: .nowa 234906652xx"
      );
    const inputNumber = text.split(" ")[0];
    if (!inputNumber.includes("x"))
      return message.reply(
        `*You did not add x in number.*\nExample: ${prefix}nowa 2348039xx  \n ${Config.caption}`
      );
    message.reply(
      `*Searching for WhatsApp account in the given range...*\n${Config.caption}`
    );
    function countInstances(string, word) {
      return string.split(word).length - 1;
    }
    const number0 = inputNumber.split("x")[0];
    const number1 = inputNumber.split("x").slice(-1)[0] || "";
    const randomLength = countInstances(inputNumber, "x");
    const randomxx = [10, 100, 1000][randomLength - 1] || 0;
    let nobio = `\n*『 WhatsApp Account With No Bio』* \n`;
    let nobios = "";
    let nowhatsapp = `*『 Numbers With No WhatsApp Account 』* \n\n`;
    for (let i = 0; i < randomxx; i++) {
      const nu = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
      const status = nu
        .slice(0, randomLength)
        .map(() => nu[Math.floor(Math.random() * nu.length)])
        .join("");
      const random = `${status}${
        nu[Math.floor(Math.random() * nu.length)]
      }`.slice(0, randomLength);
      const anu = await message.bot.onWhatsApp(`${number0}${i}${number1}`);
      const anuu = anu.length !== 0 ? anu : false;
      try {
        const anu1 = await message.bot.fetchStatus(anu[0].jid);
        if (anu1 === "401" || anu1.status.length === 0) {
          nobios += `wa.me/${anu[0].jid.split("@")[0]}\n`;
        }
      } catch {
        nowhatsapp += ` ≛ ${number0}${i}${number1}\n`;
      }
    }
    if (!nobios) {
      nobio = "";
    } else {
      nobio += nobios + "\n\n";
    }
    return await message.reply(`${nobio}${nowhatsapp}${Config.caption}`);
  }
);


//////////////////.  GFX CMD ///////////////




const done = "✳️";
const rwait = "✳️";

const gfxFunc = async (cld, { Void, text, smd: cmdName }, sendError = true) => {
 try {
   text += ": ser";
   let exampleText = `Example  : *${prefix + cmdName}* Nteej`;
   let infoText = `*Separate the text with ':' sign*\n*Example : ${prefix + cmdName} Nteej : Md*`;
   let name = text.split(":")[0];
   let command = cmdName.toLowerCase();

   switch (command) {
     case "gfx1":
       if (!name) {
         throw exampleText;
       }
       let url = `https://api.caliph.biz.id/api/kaneki?nama=${encodeURIComponent(name)}&apikey=caliphkey`;
       cld.send(url, { caption: Config.caption }, "img", cld);
       break;

     case "gfx2":
       if (!text) {
         throw infoText;
       }
       if (!text.includes(":")) {
         throw infoText;
       }
       let [name1, name2] = text.split(":");
       let url2 = `https://api.caliph.biz.id/api/girlneko?nama=${encodeURIComponent(name1.trim())}&nama2=${encodeURIComponent(name2.trim())}&apikey=caliphkey`;
       cld.send(url2, { caption: Config.caption }, "img", cld);
       break;

     case "gfx3":
       if (!name) {
         throw exampleText;
       }
       let url3 = `https://api.caliph.biz.id/api/rem?nama=${encodeURIComponent(name)}&apikey=caliphkey`;
       cld.send(url3, { caption: Config.caption }, "img", cld);
       break;
       case "gfx4":
        if (!name) {
          throw exampleText;
        }
        let url4 = `https://api.caliph.biz.id/api/textpro/matrix?text=${encodeURIComponent(name)}&apikey=caliphkey`;
        cld.send(url4, { caption: Config.caption }, "img", cld);
        break;

      case "gfx5":
        if (!name) {
          throw exampleText;
        }
        let url5 = `https://api.lolhuman.xyz/api/textprome/jokerlogo?apikey=${lolkeysapi}&text=${encodeURIComponent(name)}`;
        cld.send(url5, { caption: Config.caption }, "img", cld);
        break;

      case "gfx6":
        if (!text) {
          throw infoText;
        }
        if (!text.includes(":")) {
          throw infoText;
        }
        let url6 = `https://api.lolhuman.xyz/api/textprome2/lionlogo?apikey=${lolkeysapi}&text1=${encodeURIComponent(name1)}&text2=${encodeURIComponent(name2)}`;
        cld.send(url6, { caption: Config.caption }, "img", cld);
        break;

      case "gfx7":
        if (!text) {
          throw infoText;
        }
        if (!text.includes(":")) {
          throw infoText;
        }
        let [text1, text2] = text.split(":");
        let url7 = `https://api.lolhuman.xyz/api/photooxy2/battlefield4?apikey=${lolkeysapi}&text1=${encodeURIComponent(text1.trim())}&text2=${encodeURIComponent(text2.trim())}`;
        cld.send(url7, { caption: Config.caption }, "img", cld);
        break;

      case "gfx8":
        if (!name) {
          throw exampleText;
        }
        let url8 = `https://api.lolhuman.xyz/api/ephoto1/anonymhacker?apikey=${lolkeysapi}&text=${encodeURIComponent(name)}`;
        cld.send(url8, { caption: Config.caption }, "img", cld);
        break;

      case "gfx9":
        if (!name) {
          throw exampleText;
        }
        let url9 = `https://api.lolhuman.xyz/api/ephoto1/avatarlolnew?apikey=${lolkeysapi}&text=${encodeURIComponent(name)}`;
        cld.send(url9, { caption: Config.caption }, "img", cld);
        break;

      case "gfx10":
        if (!name) {
          throw exampleText;
        }
        let url10 = `https://api.lolhuman.xyz/api/ephoto1/avatardota?apikey=${lolkeysapi}&text=${encodeURIComponent(name)}`;
        cld.send(url10, { caption: Config.caption }, "img", cld);
        break;

      case "gfx11":
        if (!text) {
          throw infoText;
        }
        if (!text.includes(":")) {
          throw infoText;
        }
        let [text3, text4] = text.split(":");
        let url11 = `https://api.lolhuman.xyz/api/ephoto2/codwarzone?apikey=${lolkeysapi}&text1=${encodeURIComponent(text3.trim())}&text2=${encodeURIComponent(text4.trim())}`;
        cld.send(url11, { caption: Config.caption }, "img", cld);
        break;

      case "gfx12":
        if (!name) {
          throw exampleText;
        }
        let url12 = `https://api.lolhuman.xyz/api/ephoto1/freefire?apikey=${lolkeysapi}&text=${encodeURIComponent(name)}`;
        cld.send(url12, { caption: Config.caption }, "img", cld);
        break;

      case "gfx13":
        if (!text.includes(":")) {
          throw infoText;
        }
        let [text5, text6] = text.split(":");
        let url13 = `https://api.caliph.biz.id/api/sadboy?nama=${encodeURIComponent(text5.trim())}&nama2=${encodeURIComponent(text6.trim())}&apikey=caliphkey`;
        cld.send(url13, { caption: Config.caption }, "img", cld);
        break;

      case "gfx14":
        if (!text) {
          throw infoText;
        }
        let [text7, text8] = text.split(":");
        let url14 = `https://api.caliph.biz.id/api/lolimaker?nama=${encodeURIComponent(text7.trim())}&nama2=${encodeURIComponent(text8.trim())}&apikey=caliphkey`;
        cld.send(url14, { caption: Config.caption }, "img", cld);
        break;

     default:
       break;
   }
 } catch (err) {
   console.log(err);
   if (sendError) {
     return cld.send(`${err}`);
   }
 }
};

const gfxx = [
 "gfx1",
 "gfx2",
 "gfx3",
 "gfx4",
 "gfx5",
 "gfx6",
 "gfx7",
 "gfx8",
 "gfx9",
 "gfx10",
 "gfx11",
 "gfx12",
 "gfx13",
 "gfx14",
];
const lolkeysapi = "GataDios";

for (let i = 0; i < gfxx.length; i++) {
 smd(
   {
     cmdname: gfxx[i],
     infocmd: "create a gfx logo for text",
     type: "gfx",
   },
   async (cld, text, { smd: cmdName, Void }) => {
     try {
       gfxFunc(cld, { text, Void, smd: cmdName });
     } catch (err) {
       console.log(err);
     }
   }
 );
}

smd(
 {
   cmdname: "gfx",
   infocmd: "create gfx logo for text",
   type: "gfx",
 },
 async (cld, text, { smd: cmdName, Void }) => {
   try {
     let exampleText = `*Separate the text with _:_ sign!*\n*Example : ${prefix + cmdName} Suhail _:_ Bot*`;
     if (!text) {
       let menu = `┌───〈 *ɢꜰx ᴍᴇɴᴜ*  〉───◆\n│╭─────────────···▸\n┴│▸\n⬡│▸ ${gfxx.join(" \n⬡│▸ ")} \n┬│▸\n│╰────────────···▸▸\n└───────────────···▸\n\n\t *USE: ${prefix + cmdName} Suhail:Md*\n_To get All Results with single Cmd!_\n`;
       return await cld.sendUi(cld.chat, { caption: menu });
     }

     if (!text.includes(":")) {
       return cld.send(exampleText);
     }

     for (let i = 0; i < gfxx.length; i++) {
       gfxFunc(cld, { text, Void, smd: `gfx${i + 1}` }, false);
     }
   } catch (err) {
     cld.error(`${err}\n\nCommand: ${cmdName}`, err, false);
   }
 }
);




         //////////////////////////. DELETE. CMD //////////////////


smd(
  {
    pattern: "antidelete",
    alias: ["delete"],
    desc: "turn On/Off auto download deletes",
    fromMe: true,
    category: "user",
    use: "<on/off>",
    filename: __filename,
  },
  async (_0x17cbbb, _0x32fa8b) => {
    try {
      bgmm =
        (await bot_.findOne({
          id: "bot_" + _0x17cbbb.user,
        })) ||
        (await bot_.new({
          id: "bot_" + _0x17cbbb.user,
        }));
      let _0x649c1d = _0x32fa8b.toLowerCase().split(" ")[0].trim();
      if (_0x649c1d === "on" || _0x649c1d === "enable" || _0x649c1d === "act") {
        if (bgmm.antidelete === "true") {
          return await _0x17cbbb.reply("*Anti_Delete already enabled!*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x17cbbb.user,
          },
          {
            antidelete: "true",
          }
        );
        return await _0x17cbbb.reply("*Anti_Delete Succesfully enabled*");
      } else if (
        _0x649c1d === "off" ||
        _0x649c1d === "disable" ||
        _0x649c1d === "deact"
      ) {
        if (bgmm.antidelete === "false") {
          return await _0x17cbbb.reply("*Anti_Delete already disabled*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x17cbbb.user,
          },
          {
            antidelete: "false",
          }
        );
        return await _0x17cbbb.reply("*Anti_Delete Succesfully deactivated*");
      } else {
        return await _0x17cbbb.send(
          "*_Use on/off to enable/disable Anti_Delete!_*"
        );
      }
    } catch (_0x29fc10) {
      await _0x17cbbb.error(_0x29fc10 + "\n\nCommand: antidelete ", _0x29fc10);
    }
  }
);
let ms = [];
let { stor, isGroup } = require("../lib");
smd(
  {
    on: "delete",
  },
  async (_0x52ff57, _0x12aaf9, { store: _0x33e289 }) => {
    try {
      let _0x2e7880 = await bot_.findOne({
        id: "bot_" + _0x52ff57.user,
      });
      if (
        _0x2e7880 &&
        _0x2e7880.antidelete &&
        _0x2e7880.antidelete === "true"
      ) {
        let _0x4a4a8f = _0x52ff57.msg.key.participant
          ? _0x52ff57.msg.key.participant
          : _0x52ff57.msg.key.fromMe
          ? _0x52ff57.user
          : _0x52ff57.msg.key.remoteJid;
        let _0x1ea1c0 = await stor();
        if (!_0x1ea1c0.messages[_0x52ff57.from]) {
          _0x1ea1c0.messages[_0x52ff57.from] = {};
        }
        ms = [
          ..._0x1ea1c0.messages[_0x52ff57.from],
          ..._0x33e289.messages[_0x52ff57.from].array,
        ];
        for (let _0x3597d4 = 0; _0x3597d4 < ms.length; _0x3597d4++) {
          if (ms[_0x3597d4].key.id === _0x52ff57.msg.key.id) {
            let _0x4d822f = await _0x52ff57.bot.fakeMessage(
              "text",
              {
                id: _0x52ff57.msg.key.id,
              },
              "*[ANTIDELETE DETECTED]*"
            );
            let _0x52c1e8 = await _0x52ff57.bot.forwardOrBroadCast(
              /pm/gi.test(DELCHAT) ? _0x52ff57.user : _0x52ff57.from,
              ms[_0x3597d4].message,
              {
                quoted:
                  ms[_0x3597d4].message && ms[_0x3597d4].message.conversation
                    ? undefined
                    : _0x4d822f,
              }
            );
            if (_0x52c1e8) {
              await _0x52ff57.bot.sendMessage(
                /pm/gi.test(DELCHAT) ? _0x52ff57.user : _0x52ff57.from,
                {
                  text:
                    "*[DELETED INFORMATION]*\n\n*TIME:* " +
                    _0x52ff57.time +
                    "\n*CHAT:* " +
                    (await _0x52ff57.bot.getName(_0x52ff57.chat))
                      .split("\n")
                      .join("  ") +
                    "\n*DELETED BY:* @" +
                    _0x52ff57.senderNum +
                    "\n*MESSGE FROM:* @" +
                    _0x4a4a8f.split("@")[0],
                  mentions: [_0x4a4a8f, _0x52ff57.sender],
                },
                {
                  quoted: _0x52c1e8,
                }
              );
            }
            break;
          }
        }
      }
    } catch (_0x307ba0) {
      console.log(_0x307ba0);
    }
  }
);



//////////////////. PLUGINS CMD ///////////

// Restart command
smd(
 {
   cmdname: "restart",
   info: "To restart bot",
   type: "tools",
   fromMe: s_ser,
   filename: __filename,
 },
 async (cld) => {
   const { exec } = require("child_process");
   cld.reply("Restarting");
   exec("pm2 restart all");
 }
);

// ShutDown command
smd(
  {
    cmdname: "shutdown",
    info: "To shutdown bot",
    type: "tools",
    fromMe: s_ser,
    filename: __filename,
  },
  async (cld) => {
    const { exec } = require("child_process");
    cld.reply("Shutting down");
    exec("pm2 stop all");
  }
 );

// Installed plugins command
smd(
 {
   cmdname: "plugins",
   alias: ["plugin"],
   type: "owner",
   info: "Shows list of all externally installed modules",
   fromMe: s_ser,
   filename: __filename,
   use: "<name>",
 },
 async (cld, pluginName) => {
   try {
     let installedPlugins = await plugins(cld, "plugins", pluginName);
     return await cld.send(
       !installedPlugins
         ? "*_There's no plugin install in " + Config.botname + "_*"
         : !pluginName
         ? "*All Installed Modules are:-*\n\n" + installedPlugins
         : installedPlugins
     );
   } catch (err) {
     cld.error(err + " \n\ncmdName plugins\n");
   }
 }
);

// Remove plugin command
smd(
 {
   pattern: "uninstall",
   alias: ["remove"],
   type: "owner",
   info: "removes external modules.",
   fromMe: s_ser,
   filename: __filename,
   use: "<plugin name>",
 },
 async (cld, pluginName) => {
   if (!pluginName) {
     return await cld.reply("*_Uhh Please, Provide Me Plugin Name_*");
   }
   if (pluginName === "alls") {
     return await cld.reply(await plugins("remove", "all", __dirname));
   }
   try {
     await cld.send(
       await plugins(cld, "remove", pluginName, __dirname),
       {},
       "",
       cld
     );
   } catch {}
 }
);

// Install plugin command
smd(
 {
   cmdname: "install",
   type: "owner",
   info: "Installs external modules..",
   fromMe: s_ser,
   filename: __filename,
   use: "<gist url>",
 },
 async (cld, pluginUrl) => {
   let url = pluginUrl
     ? pluginUrl
     : cld.quoted
     ? cld.quoted.text
     : "";
   if (!url.toLowerCase().includes("https")) {
     return await cld.send("*_Uhh Please, Provide Me Plugin Url_*");
   }
   await cld.reply(await plugins(cld, "install", url, __dirname));
 }
);


////////////////////.   ANTIVV CMD //////////


smd(
  {
    cmdname: "antiviewonce",
    alias: ["antivv"],
    desc: "turn On/Off auto viewOnce Downloder",
    fromMe: true,
    type: "user",
    use: "<on/off>",
    filename: __filename,
  },
  async (_0x5c3dd1, _0x543e4e) => {
    try {
      bgmm =
        (await bot_.findOne({
          id: "bot_" + _0x5c3dd1.user,
        })) ||
        (await bot_.new({
          id: "bot_" + _0x5c3dd1.user,
        }));
      let _0x446f76 = _0x543e4e.toLowerCase().split(" ")[0].trim();
      if (_0x446f76 === "on" || _0x446f76 === "enable" || _0x446f76 === "act") {
        if (bgmm.antiviewonce === "true") {
          return await _0x5c3dd1.reply("*AntiViewOnce already enabled!*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x5c3dd1.user,
          },
          {
            antiviewonce: "true",
          }
        );
        return await _0x5c3dd1.reply("*AntiViewOnce Succesfully enabled*");
      } else if (
        _0x446f76 === "off" ||
        _0x446f76 === "disable" ||
        _0x446f76 === "deact"
      ) {
        if (bgmm.antiviewonce === "false") {
          return await _0x5c3dd1.reply("*AntiViewOnce already disabled*");
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x5c3dd1.user,
          },
          {
            antiviewonce: "false",
          }
        );
        return await _0x5c3dd1.reply("*AntiViewOnce Succesfully deactivated*");
      } else {
        return await _0x5c3dd1.send(
          "*_Use on/off to enable/disable antiViewOnce!_*"
        );
      }
    } catch (_0x4bb48d) {
      await _0x5c3dd1.error(
        _0x4bb48d + "\n\nCommand: AntiViewOnce ",
        _0x4bb48d
      );
    }
  }
);
smd(
  {
    on: "viewonce",
  },
  async (_0x4a4a25, _0x1400fa) => {
    try {
      if (!bgmm) {
        bgmm = await bot_.findOne({
          id: "bot_" + _0x4a4a25.user,
        });
      }
      if (bgmm && bgmm.antiviewonce && bgmm.antiviewonce === "true") {
        let _0x52bb9a = {
          key: {
            ..._0x4a4a25.key,
          },
          message: {
            conversation: "```[VIEWONCE DETECTED] downloading!```",
          },
        };
        let _0x58b72c = await _0x4a4a25.bot.downloadAndSaveMediaMessage(
          _0x4a4a25.msg
        );
        await _0x4a4a25.bot.sendMessage(
          _0x4a4a25.from,
          {
            [_0x4a4a25.mtype2.split("Message")[0]]: {
              url: _0x58b72c,
            },
            caption: _0x4a4a25.body,
          },
          {
            quoted: _0x52bb9a,
          }
        );
      }
    } catch (_0x6010c1) {
      console.log("error while getting antiviewOnce media\n, ", _0x6010c1);
    }
  }
);



/////////////// ANIME CMD ////////////////


async function sendAnime(_0x55a475, _0x509539, _0x4e419e, _0x835b9a = "") {
  function _0xf3e051() {
    const _0x58922f = ["Naruto", "\n*More on✨:* ", "map", "1736295xNxVMd", "get", "json", "\n*Created On☘️:* ", "https://api.waifu.pics/sfw/", "articles", "sendMessage", "https://api.waifu.pics/nsfw/", "split", "animenews", "foxgirl", "12896280WdEPAA", "chat", "log", "url", "publishedAt", "/video.json", "https://nekos.life/api/v2/img/fox_girl", "floor", "result", "waifu", "nsfw", "\n\n*Content🧩:* ", "trap", "author", "neko", "loli", "length", "4267560Bkglyi", "2301172sMBiSS", "demon", "12uzEKTO", "title", "naruto", "data", "./commands/Anime.js/sendAnime()\n", "source", "102969imHSeo", "bot", "1786770BYzQsB", "megumin", "*Title🔰:* ", ",Here we go😊!!!!*", "10vterwW", "1894515XGwMrc", "https://newsapi.org/v2/everything?q=", "error", "\n*Author📌:* "];
    _0xf3e051 = function () {
      return _0x58922f;
    };
    return _0xf3e051();
  }
  const _0x2d1f22 = _0x2f0bdf;
  (function (_0x62479, _0x27d9b1) {
    const _0x384220 = _0x2f0bdf;
    const _0x1ce537 = _0x62479();
    while (true) {
      try {
        const _0x9dcce7 = -parseInt(_0x384220(332)) / 1 * (-parseInt(_0x384220(338)) / 2) + -parseInt(_0x384220(346)) / 3 + parseInt(_0x384220(324)) / 4 + parseInt(_0x384220(334)) / 5 * (-parseInt(_0x384220(326)) / 6) + -parseInt(_0x384220(339)) / 7 + -parseInt(_0x384220(323)) / 8 + parseInt(_0x384220(357)) / 9;
        if (_0x9dcce7 === _0x27d9b1) {
          break;
        } else {
          _0x1ce537.push(_0x1ce537.shift());
        }
      } catch (_0x58dc6a) {
        _0x1ce537.push(_0x1ce537.shift());
      }
    }
  })(_0xf3e051, 425495);
  function _0x2f0bdf(_0x12f513, _0x42e578) {
    const _0x36af85 = _0xf3e051();
    _0x2f0bdf = function (_0x362f95, _0x29060b) {
      _0x362f95 = _0x362f95 - 323;
      let _0x43aa24 = _0x36af85[_0x362f95];
      return _0x43aa24;
    };
    return _0x2f0bdf(_0x12f513, _0x42e578);
  }
  try {
    if (_0x4e419e === _0x2d1f22(366) || _0x4e419e === _0x2d1f22(371) || _0x4e419e === _0x2d1f22(335)) {
      let _0x379467 = _0x835b9a.split("|")[0] || "";
      let _0x4c4376 = _0x835b9a[_0x2d1f22(354)]("|")[1] || "1";
      let _0x117530 = _0x835b9a[_0x2d1f22(354)]("|")[1] ? "" : " *" + _0x4e419e + _0x2d1f22(337);
      let _0x43e16d = _0x379467 == _0x2d1f22(367) ? _0x2d1f22(353) + (_0x4e419e === "megumin" ? _0x2d1f22(369) : _0x2d1f22(366)) : _0x2d1f22(350) + _0x4e419e;
      for (let _0x4e7334 = 0; _0x4e7334 < _0x4c4376; _0x4e7334++) {
        let _0x576105 = await (await fetch(_0x43e16d))[_0x2d1f22(348)]();
        await _0x55a475.bot.sendMessage(_0x509539[_0x2d1f22(358)], {
          image: {
            url: _0x576105.url
          },
          caption: _0x117530
        }, {
          quoted: _0x509539
        });
      }
    } else if (_0x4e419e === _0x2d1f22(372) || _0x4e419e === _0x2d1f22(356)) {
      let _0x385596 = _0x4e419e === _0x2d1f22(372) ? "https://waifu.pics/api/sfw/shinobu" : _0x2d1f22(363);
      let _0x3e303e = await axios[_0x2d1f22(347)](_0x385596);
      await _0x55a475[_0x2d1f22(333)][_0x2d1f22(352)](_0x509539[_0x2d1f22(358)], {
        image: {
          url: _0x3e303e[_0x2d1f22(329)][_0x2d1f22(360)]
        }
      }, {
        quoted: _0x509539
      });
    } else if (_0x4e419e === _0x2d1f22(325) || _0x4e419e === _0x2d1f22(328)) {
      let _0x3a01f7 = "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/" + (_0x4e419e === "demon" ? "Demonslayer" : _0x2d1f22(343)) + _0x2d1f22(362);
      const _0x37dffc = await fetchJson(_0x3a01f7);
      const _0x51dced = _0x37dffc.result[Math[_0x2d1f22(364)](Math.random() * _0x37dffc[_0x2d1f22(365)][_0x2d1f22(373)])].url;
      await _0x55a475[_0x2d1f22(333)][_0x2d1f22(352)](_0x509539[_0x2d1f22(358)], {
        video: {
          url: _0x51dced
        },
        caption: "*Here we go😊!!!!*"
      });
    } else if (_0x4e419e === _0x2d1f22(355)) {
      let _0x509613 = await axios.get(_0x2d1f22(340) + _0x835b9a + "&domains=techcrunch.com,animenewsnetwork.com,myanimelist.net,comingsoon.net,crunchyroll.com&language=en&sortby=publishedat&apikey=cd4116be09ef4a0caceedf21b6258460&pageSize=8");
      let _0x7f6c91 = _0x509613[_0x2d1f22(329)][_0x2d1f22(351)];
      _0x7f6c91[_0x2d1f22(345)](async (_0x3a0939, _0x38234d) => {
        const _0x4a7def = _0x2d1f22;
        try {
          _0x55a475.bot.sendMessage(_0x509539[_0x4a7def(358)], {
            image: {
              url: _0x3a0939.urlToImage
            },
            caption: _0x4a7def(336) + _0x3a0939[_0x4a7def(327)] + _0x4a7def(368) + _0x3a0939.content + _0x4a7def(342) + _0x3a0939[_0x4a7def(370)] + "\n*Source♦️:* " + _0x3a0939[_0x4a7def(331)].name + _0x4a7def(349) + _0x3a0939[_0x4a7def(361)] + _0x4a7def(344) + _0x3a0939[_0x4a7def(360)] + "\n\n" + Config.caption + "*"
          }, {
            quoted: _0x509539
          });
        } catch (_0x120a1d) {}
      });
    }
  } catch (_0x29e730) {
    console[_0x2d1f22(359)](_0x2d1f22(330), _0x29e730);
    await _0x509539[_0x2d1f22(341)](_0x29e730);
  }
}
smd({
  pattern: "waifu",
  desc: "To get Waifu Random Pics",
  category: "anime",
  filename: __filename
}, async (_0x3f90ca, _0x18c6e6, {
  cmdName: _0x44f36d
}) => {
  try {
    return await sendAnime(_0x3f90ca, _0x3f90ca, "waifu", _0x18c6e6);
  } catch {}
});
smd({
  pattern: "neko",
  category: "anime",
  desc: "Sends a Neko Image in chat",
  filename: __filename
}, async (_0x1cd273, _0xb77fec, {
  cmdName: _0x3c6957
}) => {
  try {
    return await sendAnime(_0x1cd273, _0x1cd273, "neko", _0xb77fec);
  } catch {}
});
smd({
  pattern: "megumin",
  desc: "To get Waifu Random Pics",
  category: "anime",
  filename: __filename
}, async (_0x5a7e62, _0x8aed59, {
  cmdName: _0x3d1dd2
}) => {
  try {
    return await sendAnime(_0x5a7e62, _0x5a7e62, "megumin", _0x8aed59);
  } catch {}
});
smd({
  pattern: "loli",
  category: "anime",
  filename: __filename,
  desc: "Sends image of loli."
}, async _0x11eae1 => {
  try {
    return await sendAnime(_0x11eae1, _0x11eae1, "loli");
  } catch {}
});
smd({
  pattern: "foxgirl",
  category: "anime",
  desc: "Sends image of Fox Girl Anime.",
  filename: __filename
}, async _0x545d0f => {
  try {
    return await sendAnime(_0x545d0f, _0x545d0f, "foxgirl");
  } catch {}
});
smd({
  pattern: "demon",
  alias: ["ds"],
  desc: "To get Naruto Random Videos",
  category: "anime",
  filename: __filename
}, async _0x88a702 => {
  try {
    return await sendAnime(_0x88a702, _0x88a702, "demon");
  } catch {}
});
smd({
  pattern: "naruto",
  desc: "To get Naruto Random Videos",
  category: "anime",
  filename: __filename
}, async _0x5ded99 => {
  try {
    return await sendAnime(_0x5ded99, _0x5ded99, "naruto");
  } catch {}
});
smd({
  pattern: "pokepic",
  category: "anime",
  filename: __filename,
  desc: "Sends image of pokemon."
}, async (_0x583a8f, _0x26e084) => {
  try {
    return await sendGImages(_0x583a8f, _0x26e084 + "Pokemon Pics only HD ", "*---「 Poke Pic 」---*", _0x26e084);
  } catch {}
});
smd({
  pattern: "animewall",
  category: "anime",
  desc: "Anime Wallpaper Random",
  filename: __filename
}, async (_0x1be31e, _0x45a934) => {
  try {
    return await sendGImages(_0x1be31e, _0x45a934 + "anime wallpaper for desktop full hd", "*---「 Anime Wallpaper 」---*", _0x45a934);
  } catch {}
});
smd({
  pattern: "pokemon",
  category: "anime",
  filename: __filename,
  desc: "Sends info of pokemon in current chat."
}, async (_0x127028, _0x60d63) => {
  try {
    if (!_0x60d63) {
      return _0x127028.reply("*Uhh Please Give Me Poki Name/num*");
    }
    try {
      let {
        data: _0x4e5976
      } = await axios.get("https://pokeapi.co/api/v2/pokemon/" + _0x60d63);
      if (!_0x4e5976.name) {
        return _0x127028.reply("❌ Could not found any pokemon with that name");
      }
      let _0x8d1690 = "*•Name: " + _0x4e5976.name + "*\n*•Pokedex ID: " + _0x4e5976.id + "*\n*•Height: " + _0x4e5976.height + "*\n*•Weight: " + _0x4e5976.weight + "*\n*•Abilities: " + _0x4e5976.abilities[0].ability.name + ", " + _0x4e5976.abilities[1].ability.name + "*\n*•Base Experience: " + _0x4e5976.base_experience + "*\n*•Type: " + _0x4e5976.types[0].type.name + "*\n*•Base Stat: " + _0x4e5976.stats[0].base_stat + "*\n*•Attack: " + _0x4e5976.stats[1].base_stat + "*\n*•Defense: " + _0x4e5976.stats[2].base_stat + "*\n*•Special Attack: " + _0x4e5976.stats[3].base_stat + "*\n*•Special Defense:" + _0x4e5976.stats[4].base_stat + "*\n*•Speed: " + _0x4e5976.stats[5].base_stat + "*\n";
      return await Suhail.bot.sendMessage(_0x127028.jid, {
        image: {
          url: _0x4e5976.sprites.front_default
        },
        caption: _0x8d1690
      }, {
        quoted: _0x127028
      });
    } catch (_0x2fa93f) {
      _0x127028.reply("*_Ahh,Couldn't found any pokemon._*");
    }
  } catch {}
});
smd({
  pattern: "kaneki",
  desc: "Sends a random image of Kaneki from Tokyo Ghoul.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/kaneki";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Kaneki from Tokyo Ghoul.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: kaneki`, error, "*_Uhh dear, an error occurred!_*");
  }
});
// Command for Akira
smd({
  pattern: "akira",
  desc: "Sends a random image of Akira.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/akira";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Akira.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: akira`, error, "*_Uhh dear, an error occurred!_*");
  }
});
// Command for Anna
smd({
  pattern: "anna",
  desc: "Sends a random image of Anna.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/anna";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Anna.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: anna`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Asuna
smd({
  pattern: "asuna",
  desc: "Sends a random image of Asuna.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/asuna";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Asuna.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: asuna`, error, "*_Uhh dear, an error occurred!_*");
  }
});
// Command for Anna
smd({
  pattern: "anna",
  desc: "Sends a random image of Anna.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/anna";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Anna.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: anna`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Asuna
smd({
  pattern: "asuna",
  desc: "Sends a random image of Asuna.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/asuna";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Asuna.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: asuna`, error, "*_Uhh dear, an error occurred!_*");
  }
});
// Command for Boruto
smd({
  pattern: "boruto",
  desc: "Sends a random image of Boruto.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/boruto";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Boruto.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: boruto`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Chiho
smd({
  pattern: "chiho",
  desc: "Sends a random image of Chiho.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/chiho";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Chiho.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: chiho`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Eba
smd({
  pattern: "eba",
  desc: "Sends a random image of Eba.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/eba";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Eba.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: eba`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Elaina
smd({
  pattern: "elaina",
  desc: "Sends a random image of Elaina.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/elaina";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Elaina.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: elaina`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Ezra
smd({
  pattern: "ezra",
  desc: "Sends a random image of Ezra.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/erza";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Ezra.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: ezra`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Inori
smd({
  pattern: "inori",
  desc: "Sends a random image of Inori.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/inori";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Inori.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: inori`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Itachi
smd({
  pattern: "itachi",
  desc: "Sends a random image of Itachi.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/itachi";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Itachi.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: itachi`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Itori
smd({
  pattern: "itori",
  desc: "Sends a random image of Itori.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/itori";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Itori.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: itori`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Kaga
smd({
  pattern: "kaga",
  desc: "Sends a random image of Kaga.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/kaga";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Kaga.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: kaga`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Kaori
smd({
  pattern: "kaori",
  desc: "Sends a random image of Kaori.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/kaori";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Kaori.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: kaori`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Kotori
smd({
  pattern: "kotori",
  desc: "Sends a random image of Kotori.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/kotori";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Kotori.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: kotori`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Kurumi
smd({
  pattern: "kurumi",
  desc: "Sends a random image of Kurumi.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/kurumi";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Kurumi.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: kurumi`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Miku
smd({
  pattern: "miku",
  desc: "Sends a random image of Miku.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/miku";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Miku.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: miku`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Naruto
smd({
  pattern: "naruto",
  desc: "Sends a random image of Naruto.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/naruto";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Naruto.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: naruto`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Nezuko
smd({
  pattern: "nezuko",
  desc: "Sends a random image of Nezuko.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/nezuko";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Nezuko.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: nezuko`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Sakura
smd({
  pattern: "sakura",
  desc: "Sends a random image of Sakura.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/sakura";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Sakura.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: sakura`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Sasuke
smd({
  pattern: "sasuke",
  desc: "Sends a random image of Sasuke.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/sasuke";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Sasuke.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: sasuke`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Husbu
smd({
  pattern: "husbu",
  desc: "Sends a random image of Husbu.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/husbu";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Husbu.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: husbu`, error, "*_Uhh dear, an error occurred!_*");
  }
});

// Command for Shota
smd({
  pattern: "shota",
  desc: "Sends a random image of Shota.",
  category: "anime",
}, async (m) => {
  try {
    const apiUrl = "https://api.maher-zubair.tech/anime/shota";
    const response = await fetch(apiUrl);

    if (!response.ok) {
      return await m.send(`*_Error: ${response.status} ${response.statusText}_*`);
    }

    const data = await response.json();

    if (data.status !== 200) {
      return await m.send(`*_Error: ${data.status} - ${data.developer || "Unknown error"}_*`);
    }

    const { url } = data;

    if (!url) {
      return await m.send("*_No image found!_*");
    }

    const caption = "Random image of Shota.";
    await m.bot.sendFromUrl(m.from, url, caption, m, {}, "image");
  } catch (error) {
    await m.error(`${error}\n\ncommand: shota`, error, "*_Uhh dear, an error occurred!_*");
  }
});
smd({
  pattern: 'animesearch',
  fromMe: false,
  desc: 'Search for anime details',
  type: 'anime'
}, async (message, match) => {
  try {
      const query = match[1].trim();
      const response = await axios.get(`https://api.maher-zubair.tech/anime/search?q=${encodeURIComponent(query)}`);
      const anime = response.data.result;
      
      const title = anime.title.english || anime.title.romaji || anime.title.native;
      const description = anime.description;
      const genres = anime.genres.join(', ');
      const status = anime.status;
      const episodes = anime.episodes;
      const coverImage = anime.coverImage.medium;
      
      const messageText = `*Title:* ${title}\n*Genres:* ${genres}\n*Status:* ${status}\n*Episodes:* ${episodes}\n*Description:* ${description}`;
      
      await message.send(messageText, { quoted: message.data, thumbnail: coverImage });
  } catch (error) {
      console.error('Error fetching anime details:', error);
      await message.send('_Failed to fetch anime details._', { quoted: message.data });
  }
});