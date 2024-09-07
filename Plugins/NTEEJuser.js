// USER

let {
   runtime,
   fancytext,
  tlang,
  tiny,
   formatp,
   prefix,
   smd,
   commands,
   smdBuffer,
 } = require("../lib");
 const { smd, bot_ } = require("../lib");
 let bgmm = false;
 let ms = [];
 let { stor, isGroup } = require("../lib");
 const axios = require("axios");
 const fetch = require("node-fetch");
 const os = require("os");
 const speed = require("performance-now");
 const Config = require("../config");
 const cheerio = require("cheerio");
 const { exec } = require("child_process");
const translatte = require("translatte");
const long = String.fromCharCode(8206);
const readmore = long.repeat(4001);
const astro_patch = require("../lib/plugins");
 
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
➮Fᴏᴜɴᴅᴇʀ- *Nteej*
➮Oᴡɴᴇʀ - ${Config.ownername} 
➮Nᴜᴍ - ${owner.split(",")[0]} 
➮Mᴇᴍᴏ - ${formatp(os.totalmem() - os.freemem())} 
      \n *NTEEJ-MD A SIMPLE WHATSAPP BOT WITH RICH LIBRARY CREATE BY NTEEJ*\n\n ${readmore} 
╭──❰ *ALL MENU* ❱ 
│🎗 Lɪꜱᴛ 
│🎗 Cᴀᴛᴇɢᴏʀʏ 
│🎗 Hᴇʟᴘ 
│🎗 Aʟɪᴠᴇ 
│🎗 Uᴘᴛɪᴍᴇ 
│🎗 Wᴇᴀᴛʜᴇʀ 
│🎗 Lɪɴᴋ 
│🎗 Cᴘᴜ 
│🎗 Rᴇᴘᴏꜱɪᴛᴏʀʏ 
╰─────────────⦁`.trim();
      return await message.bot.sendUi(message.from, { caption: menuMessage });
    } catch (error) {
      await message.error(error + "\nCommand:menus", error);
    }
  }
);

cmd({
  pattern: "jid",
  desc: "get jid of all user in a group.",
  category: "user",
  filename: __filename,
  use: "<@user>",
 }, async ({ jid, reply, quoted }) => {
  if (quoted) {
    return reply(quoted.sender);
  } else {
    return reply(jid);
  }
 });
 
 
 //nteej
let {cmd} = require("../lib/plugins");
cmd({
  pattern: "jid",
  desc: "get jid of all user in a group.",
  category: "user",
  filename: __filename,
  use: "<@user>",
 }, async ({ jid, reply, quoted }) => {
  if (quoted) {
    return reply(quoted.sender);
  } else {
    return reply(jid);
  }
 });
 
 // Get Profile Picture Command
 cmd({
  pattern: "getpp",
  desc: "Get Profile Pic For Given User",
  category: "user",
  filename: __filename,
 }, async (message) => {
  try {
    const user = message.reply_message
      ? message.reply_message.sender
      : message.mentionedJid[0]
      ? message.mentionedJid[0]
      : message.from;
 
    let profilePicUrl;
    try {
      profilePicUrl = await message.bot.profilePictureUrl(user, "image");
    } catch (error) {
      return message.reply("```Profile Pic Not Fetched```");
    }
 
    return await message.bot.sendMessage(
      message.chat,
      {
        image: {
          url: profilePicUrl,
        },
        caption: "  *---Profile Pic Is Here---*\n" + Config.caption,
      },
      {
        quoted: message,
      }
    );
  } catch (error) {
    await message.error(error + "\n\ncommand : getpp", error);
  }
 });
 
 // Get User Information Command
 cmd({
  pattern: "whois",
  desc: "Makes photo of replied sticker.",
  category: "user",
  use: "<reply to any person>",
  filename: __filename,
 }, async (message) => {
  try {
    const user = message.reply_message
      ? message.reply_message.sender
      : message.mentionedJid[0]
      ? message.mentionedJid[0]
      : false;
 
    if (!user && message.isGroup) {
      const groupPicUrl =
        (await message.bot
          .profilePictureUrl(message.chat, "image")
          .catch(() => "https://i.postimg.cc/FssKzLK7/20240622-140407.jpg")) ||
        THUMB_IMAGE;
 
      const metadata = message.metadata;
      const admins = message.admins
        .map(
          (admin, index) =>
            `  ${index + 1}. wa.me/${admin.id.split("@")[0]}`
        )
        .join("\n");
 
      const owner =
        metadata.owner ||
        message.admins.find((admin) => admin.admin === "superadmin")?.id ||
        false;
 
      let groupInfo =
        "\n      *「 GROUP INFORMATION 」*\n*▢ NAME :* \n   • " +
        metadata.subject +
        "\n*▢ Members :*\n   • " +
        metadata.participants.length +
        "\n*▢ Group Owner :*\n   • " +
        (owner ? "wa.me/" + owner.split("@")[0] : "notFound") +
        "\n*▢ Admins :*\n" +
        admins +
        "\n*▢ Description :*\n   • " +
        (metadata.desc?.toString() || "_not set_") +
        "\n   ";
 
      return await message.reply(
        groupPicUrl,
        {
          caption: groupInfo,
        },
        "image"
      );
    } else {
      if (!user) {
        return message.reply("*_Please Reply To A Person!_*");
      }
 
      try {
        const status = await message.bot.fetchStatus(user);
        const statusText = status.status;
        let statusTimestamp = status.setAt.toString();
        let timestampArray = statusTimestamp.split(" ");
 
        if (timestampArray.length > 3) {
          statusTimestamp = timestampArray.slice(0, 5).join(" ");
        }
      } catch {
        statusText = "undefined";
        statusTimestamp = "";
      }
 
      const userId = user.split("@")[0];
      let profilePicUrl;
 
      try {
        profilePicUrl = await message.bot.profilePictureUrl(user, "image");
      } catch (error) {
        profilePicUrl = "https://telegra.ph/file/29a8c892a1d18fdb26028.jpg";
      }
 
      const userName = await message.bot.getName(user);
 
      return await message.bot.sendMessage(
        message.jid,
        {
          image: {
            url: profilePicUrl,
          },
          caption: Config.ownername,
        },
        {
          quoted: message,
        }
      );
    }
  } catch (error) {
    await message.error(error + "\n\ncommand : whois", error);
  }
 });
 
 // Get WhatsApp Link Command
 cmd({
  pattern: "wa",
  desc: "Makes wa me of quoted or mentioned user.",
  category: "user",
  filename: __filename,
 }, async (message) => {
  try {
    const user = message.reply_message
      ? message.reply_message.sender
      : message.mentionedJid[0]
      ? message.mentionedJid[0]
      : false;
 
    await message.reply(
      !user
        ? "*Please Reply Or Mention A User*"
        : "https://wa.me/" + user.split("@")[0]
    );
  } catch (error) {
    await message.error(error + "\n\ncommand : wa", error, false);
  }
 });
 
 // Get User's WhatsApp Link Command
 cmd({
  pattern: "mee",
  desc: "Makes wa me for user.",
  category: "user",
  filename: __filename,
 }, async (message) => {
  try {
    return await message.reply(
      "https://wa.me/" + message.sender.split("@")[0]
    );
  } catch {}
 });

 
 // Get Profile Picture Command
 cmd({
  pattern: "getpp",
  desc: "Get Profile Pic For Given User",
  category: "user",
  filename: __filename,
 }, async (message) => {
  try {
    const user = message.reply_message
      ? message.reply_message.sender
      : message.mentionedJid[0]
      ? message.mentionedJid[0]
      : message.from;
 
    let profilePicUrl;
    try {
      profilePicUrl = await message.bot.profilePictureUrl(user, "image");
    } catch (error) {
      return message.reply("```Profile Pic Not Fetched```");
    }
 
    return await message.bot.sendMessage(
      message.chat,
      {
        image: {
          url: profilePicUrl,
        },
        caption: "  *---Profile Pic Is Here---*\n" + Config.caption,
      },
      {
        quoted: message,
      }
    );
  } catch (error) {
    await message.error(error + "\n\ncommand : getpp", error);
  }
 });
 
 // Get User Information Command
 cmd({
  pattern: "whois",
  desc: "Makes photo of replied sticker.",
  category: "user",
  use: "<reply to any person>",
  filename: __filename,
 }, async (message) => {
  try {
    const user = message.reply_message
      ? message.reply_message.sender
      : message.mentionedJid[0]
      ? message.mentionedJid[0]
      : false;
 
    if (!user && message.isGroup) {
      const groupPicUrl =
        (await message.bot
          .profilePictureUrl(message.chat, "image")
          .catch(() => "https://i.postimg.cc/FssKzLK7/20240622-140407.jpg")) ||
        THUMB_IMAGE;
 
      const metadata = message.metadata;
      const admins = message.admins
        .map(
          (admin, index) =>
            `  ${index + 1}. wa.me/${admin.id.split("@")[0]}`
        )
        .join("\n");
 
      const owner =
        metadata.owner ||
        message.admins.find((admin) => admin.admin === "superadmin")?.id ||
        false;
 
      let groupInfo =
        "\n      *「 GROUP INFORMATION 」*\n*▢ NAME :* \n   • " +
        metadata.subject +
        "\n*▢ Members :*\n   • " +
        metadata.participants.length +
        "\n*▢ Group Owner :*\n   • " +
        (owner ? "wa.me/" + owner.split("@")[0] : "notFound") +
        "\n*▢ Admins :*\n" +
        admins +
        "\n*▢ Description :*\n   • " +
        (metadata.desc?.toString() || "_not set_") +
        "\n   ";
 
      return await message.reply(
        groupPicUrl,
        {
          caption: groupInfo,
        },
        "image"
      );
    } else {
      if (!user) {
        return message.reply("*_Please Reply To A Person!_*");
      }
 
      try {
        const status = await message.bot.fetchStatus(user);
        const statusText = status.status;
        let statusTimestamp = status.setAt.toString();
        let timestampArray = statusTimestamp.split(" ");
 
        if (timestampArray.length > 3) {
          statusTimestamp = timestampArray.slice(0, 5).join(" ");
        }
      } catch {
        statusText = "undefined";
        statusTimestamp = "";
      }
 
      const userId = user.split("@")[0];
      let profilePicUrl;
 
      try {
        profilePicUrl = await message.bot.profilePictureUrl(user, "image");
      } catch (error) {
        profilePicUrl = "https://telegra.ph/file/29a8c892a1d18fdb26028.jpg";
      }
 
      const userName = await message.bot.getName(user);
 
      return await message.bot.sendMessage(
        message.jid,
        {
          image: {
            url: profilePicUrl,
          },
          caption: Config.ownername,
        },
        {
          quoted: message,
        }
      );
    }
  } catch (error) {
    await message.error(error + "\n\ncommand : whois", error);
  }
 });
 
 // Get WhatsApp Link Command
 cmd({
  pattern: "wa",
  desc: "Makes wa me of quoted or mentioned user.",
  category: "user",
  filename: __filename,
 }, async (message) => {
  try {
    const user = message.reply_message
      ? message.reply_message.sender
      : message.mentionedJid[0]
      ? message.mentionedJid[0]
      : false;
 
    await message.reply(
      !user
        ? "*Please Reply Or Mention A User*"
        : "https://wa.me/" + user.split("@")[0]
    );
  } catch (error) {
    await message.error(error + "\n\ncommand : wa", error, false);
  }
 });
 
 // Get User's WhatsApp Link Command
 cmd({
  pattern: "mee",
  desc: "Makes wa me for user.",
  category: "user",
  filename: __filename,
 }, async (message) => {
  try {
    return await message.reply(
      "https://wa.me/" + message.sender.split("@")[0]
    );
  } catch {}
 });

 
 smd(
  {
    pattern: "channel",
    desc: "To check ping",
    react: "🗨️",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const channelMessage = `NTEEJ-MD 𝘾𝙃𝘼𝙉𝙉𝙀𝙇 𝙎𝙐𝙋𝙋𝙊𝙍𝙏\n\n _ʜᴇʏ ʜᴇʀᴇ's ᴏᴜʀ ᴄʜᴀɴɴᴇʟ ʟɪɴᴋ, ᴘʟᴇᴀsᴇ ғᴏʟʟᴏᴡ ᴀɴᴅ sᴜᴘᴘᴏʀᴛ ᴜs ᴛᴏ ᴋᴇᴇᴘ ᴛʜɪs ᴘʀᴏᴊᴇᴄᴛ ᴀʟɪᴠᴇ_\n *ʟɪɴᴋ:* https://whatsapp.com/channel/0029Vae3GZF9Bb658QgSCl1I\n\n ${Config.botname} *NTEEJ*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(channelMessage, { contextInfo });
  }
);

smd(
  {
    pattern: "support",
    desc: "To check ping",
    react: "🗨️",
    category: "user",
    filename: __filename,
  },
  async (message) => {
    const SupportMsg = `ERRORS WITH REPO COMMAND THIS IS NEW REPO \n\n *REPO:*https://github.com/Ntee-j01/NTEEJ-MD\n\n ${Config.botname} *WORKS*`;

    const contextInfo = {
      forwardingScore: 999,
      isForwarded: true,
    };

    await message.send(SupportMsg, { contextInfo });
  }
);

/nteej
const { prefix, smd } = require("../lib");

smd(
  {
    cmdname: "fakereply",
    alias: ["freply"],
    desc: "Create fake Reply by given texts!",
    type: "user",
    use: " msg| reply_text | number ",
    usage: "generates fake messages of given text and number!",
    filename: __filename,
    public: true,
  },
  async (m, text) => {
    try {
      let types = ["text", "order", "contact", "image", "video"];
      let args = text.split("|");
      if (!text || args.length < 3)
        return await m.reply(
          `*Use ${prefix}fakereply text |Reply_text|923184474176|type(text,order,contact,image,video)*`
        );
      let reply = args[0],
        msg = args[1],
        num = `${args[2].replace(/[^0-9]/g, "")}@s.whatsapp.net`,
        type = args[3] && types.includes(args[3]) ? args[3] : "text",
        charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        smds = "SMD";
      for (let i = 0; i < 13; i++) {
        smds += charset[Math.floor(Math.random() * charset.length)];
      }
      let fak = await m.bot.fakeMessage(
        type,
        { id: smds, remoteJid: m.isGroup ? m.chat : num, participant: num },
        msg
      );
      try {
        if (type === "contact") {
          fak.message.contactMessage.jpegThumbnail = await m.getpp(num);
        }
      } catch (e) {
        console.log(e);
      }
      await m.bot.sendMessage(m.chat, { text: reply }, { quoted: fak });
    } catch (e) {
      m.error(`${e}\n\nCommand: fakereply`, e, false);
    }
  }
);

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

smd(
  {
    pattern: "readmore",
    alias: ["rmore", "readmor"],
    desc: "Adds *readmore* in given text.",
    category: "user",
    filename: __filename,
  },
  async (_0x5db0de, _0x38fb87) => {
    try {
      let _0x5ea4b8 = _0x38fb87 ? _0x38fb87 : _0x5db0de.reply_text;
      if (!_0x5ea4b8) {
        _0x5ea4b8 =
          "*Uhh Dear,Please provide text*\n*Eg:- _.readmor text1 readmore text2_*";
      } else {
        _0x5ea4b8 += " ";
      }
      if (_0x5ea4b8.includes("readmore")) {
        await _0x5db0de.reply(
          _0x5ea4b8.replace(/readmore/, String.fromCharCode(8206).repeat(4001))
        );
      } else {
        await _0x5db0de.reply(
          _0x5ea4b8.replace(" ", String.fromCharCode(8206).repeat(4001))
        );
      }
    } catch (_0x36cb2c) {
      await _0x5db0de.error(
        _0x36cb2c + "\n\ncommand : readmore",
        _0x36cb2c,
        false
      );
    }
  }
);
let pmtypes = ["videoMessage", "imageMessage"];
cmd(
  {
    pattern: "url",
    alias: ["createurl"],
    category: "user",
    filename: __filename,
    desc: "image to url.",
    use: "<video | image>",
  },
  async (_0x4e4351) => {
    try {
      let _0x680da4 = pmtypes.includes(_0x4e4351.mtype)
        ? _0x4e4351
        : _0x4e4351.reply_message;
      if (!_0x680da4 || !pmtypes.includes(_0x680da4?.mtype)) {
        return _0x4e4351.reply("*_Uhh Dear, Reply To An Image/Video!_*");
      }
      let _0x349452 = await _0x4e4351.bot.downloadAndSaveMediaMessage(
        _0x680da4
      );
      let _0x536aa6 = await createUrl(_0x349452);
      if (!_0x536aa6) {
        return _0x4e4351.reply("*_Failed To Create Url!_*");
      }
      try {
        fs.unlink(_0x349452);
      } catch {}
      await _0x4e4351.send(util.format(_0x536aa6), {}, "David", _0x680da4);
    } catch (_0x2ee8cc) {
      await _0x4e4351.error(_0x2ee8cc + "\n\ncommand url", _0x2ee8cc);
    }
  }
);
cmd(
  {
    pattern: "upload",
    alias: ["url2"],
    category: "user",
    filename: __filename,
    desc: "image to url.",
    use: "<video | image>",
  },
  async (_0xbda24) => {
    try {
      let _0x7d6de1 = pmtypes.includes(_0xbda24.mtype)
        ? _0xbda24
        : _0xbda24.reply_message;
      if (!_0x7d6de1 || !pmtypes.includes(_0x7d6de1?.mtype)) {
        return _0xbda24.reply("*_Uhh Dear, Reply To An Image/Video!_*");
      }
      let _0xeb95de = await _0xbda24.bot.downloadAndSaveMediaMessage(_0x7d6de1);
      let _0x3e1ea8 = await createUrl(_0xeb95de, "uguMashi");
      try {
        fs.unlink(_0xeb95de);
      } catch {}
      if (!_0x3e1ea8 || !_0x3e1ea8.url) {
        return _0xbda24.reply("*_Failed To Create Url!_*");
      }
      await _0xbda24.send(util.format(_0x3e1ea8.url), {}, "David", _0x7d6de1);
    } catch (_0x1a2f02) {
      await _0xbda24.error(_0x1a2f02 + "\n\ncommand upload", _0x1a2f02);
    }
  }
);
smd(
  {
    pattern: "calc",
    desc: "calculate an equation.",
    category: "user",
    use: "<equation>",
    filename: __filename,
  },
  async (_0x5d95a7, _0x28af98) => {
    try {
      if (!_0x28af98) {
        return await _0x5d95a7.reply(
          "*Please enter a math operation*\n*Example: .calc 22+12*"
        );
      }
      let _0xcebecd = _0x28af98.replace(/\s+/g, "");
      if (!/^(\d+([-+%*/]\d+)+)$/.test(_0xcebecd)) {
        return await _0x5d95a7.reply(
          "Please enter a valid mathematical operation."
        );
      }
      const _0x38ba36 = (_0x3b53fe) => {
        return new Function("return " + _0x3b53fe)();
      };
      const _0x5e0640 = _0x38ba36(_0xcebecd);
      if (
        _0xcebecd.includes("/") &&
        _0xcebecd.split("/").some((_0x413293) => _0x413293 === "0")
      ) {
        return _0x5d95a7.reply("Cannot divide by zero.");
      }
      if (_0xcebecd.split(/[-+%*/]/).length <= 2) {
        const [_0x120f57, _0x1de7dc, _0x112a0e] =
          _0xcebecd.match(/\d+|[-+%*/]/g);
        return await _0x5d95a7.reply(
          _0x120f57 + " " + _0x1de7dc + " " + _0x112a0e + " = " + _0x5e0640
        );
      } else {
        return await _0x5d95a7.reply("Result: " + _0x5e0640);
      }
    } catch (_0x120f52) {
      return await _0x5d95a7.error(_0x120f52 + "\n\ncommand: calc", _0x120f52);
    }
  }
);
async function getDateTime() {
  const _0x2e0403 = new Date();
  const _0x142ad5 = _0x2e0403.toISOString().slice(0, 10);
  const _0x144a84 = _0x2e0403.toLocaleTimeString();
  return {
    date: _0x142ad5,
    time: _0x144a84,
  };
}
smd(
  {
    pattern: "repo",
    alias: ["git", "sc", "script"],
    desc: "Sends info about repo",
    category: "user",
    filename: __filename,
  },
  async (_0x45da98) => {
    try {
      let { data: _0x44f98c } = await axios.get(
        "https://api.github.com/repos/Ntee-j01/NTEEJ-MDd"
      );
      let _0x1c73f9 = (
        "\nNTEEJ-MD A simple Mutil Device WhatsApp Bot with rich library Created and Managed by *" +
        Config.ownername +
        "*. 👑\n\n  *❲❒❳ Stars:* " +
        (_0x44f98c?.stargazers_count || "None (🥲)") +
        " stars\n  *❲❒❳ Forks:* " +
        (_0x44f98c?.forks_count || "1000+") +
        " forks\n  *❲❒❳ Creator:* Nteej\n  *❲❒❳ Created:* " +
        (_0x44f98c?.created_at || "2024/06") +
        "\n  *❲❒❳ Repo:* _https://github.com/Ntee-j01/NTEEJ-MD_\n  *❲❒❳ Scan:* _" +
        scan +
        "_\n" +
        (Config.caption ? "\n\n" + Config.caption : "")
      ).trim();
      return await _0x45da98.sendUi(_0x45da98.jid, {
        caption: _0x1c73f9,
      });
    } catch (_0x5816fe) {
      await _0x45da98.error(_0x5816fe + "\n\ncommand: repo", _0x5816fe);
    }
  }
);
smd(
  {
    pattern: "status",
    alias: ["about", "info"],
    desc: "To check bot status",
    category: "user",
    filename: __filename,
  },
  async (_0x397531) => {
    try {
      const _0x2d09cb = process.uptime();
      timestampe = speed();
      latensie = speed() - timestampe;
      let _0x53eb40 = (
        " *I am " +
        Config.botname +
        "*\n  *❲❒❳ About:* A Simple WhatsApp Bot Created By *" +
        Config.ownername +
        "*.\n\n  *❲❒❳ Speed:* " +
        latensie.toFixed(4) +
        " ms\n  *❲❒❳ Uptime:* " +
        runtime(process.uptime()) +
        "\n  *❲❒❳ Version:* " +
        Config.VERSION +
        "\n  *❲❒❳ Owner:*  " +
        Config.ownername +
        "\n\n  *❲❒❳ Channel:* _" +
        gurl +
        "_ \n" +
        (Config.caption ? "\n\n" + Config.caption : "")
      ).trim();
      return await _0x397531.bot.sendUi(_0x397531.jid, {
        caption: _0x53eb40,
      });
    } catch {}
  }
);
smd(
  {
    pattern: "cpu",
    desc: "To check bot status",
    category: "user",
    filename: __filename,
  },
  async (_0x51c639) => {
    try {
      const _0x78d515 = process.memoryUsage();
      const _0x14b376 = os.cpus().map((_0x4baa78) => {
        _0x4baa78.total = Object.keys(_0x4baa78.times).reduce(
          (_0x124129, _0x54fdbe) => _0x124129 + _0x4baa78.times[_0x54fdbe],
          0
        );
        return _0x4baa78;
      });
      const _0x52bb92 = _0x14b376.reduce(
        (_0x371aab, _0x42f37d, _0x41ec3e, { length: _0x3f2c1a }) => {
          _0x371aab.total += _0x42f37d.total;
          _0x371aab.speed += _0x42f37d.speed / _0x3f2c1a;
          _0x371aab.times.user += _0x42f37d.times.user;
          _0x371aab.times.nice += _0x42f37d.times.nice;
          _0x371aab.times.sys += _0x42f37d.times.sys;
          _0x371aab.times.idle += _0x42f37d.times.idle;
          _0x371aab.times.irq += _0x42f37d.times.irq;
          return _0x371aab;
        },
        {
          speed: 0,
          total: 0,
          times: {
            user: 0,
            nice: 0,
            sys: 0,
            idle: 0,
            irq: 0,
          },
        }
      );
      timestampe = speed();
      latensie = speed() - timestampe;
      var _0x54755f = performance.now();
      var _0x366cd8 = performance.now();
      respon = (
        "*❲❒❳ " +
        Config.botname +
        " Server Info ❲❒❳*\n\n  *❲❒❳ Runtime:* " +
        runtime(process.uptime()) +
        "\n  *❲❒❳ Speed:* " +
        latensie.toFixed(3) +
        "/" +
        (_0x366cd8 - _0x54755f).toFixed(3) +
        " ms\n  *❲❒❳ RAM:* " +
        formatp(os.totalmem() - os.freemem()) +
        " / " +
        formatp(os.totalmem()) +
        "\n\n  *❲❒❳ Memory Usage:*\n      " +
        Object.keys(_0x78d515)
          .map(
            (_0x4a444a, _0xf623b7, _0x26f7ee) =>
              _0x4a444a.padEnd(
                Math.max(..._0x26f7ee.map((_0x470f51) => _0x470f51.length)),
                " "
              ) +
              ": " +
              formatp(_0x78d515[_0x4a444a])
          )
          .join("\n      ") +
        "\n\n" +
        (_0x14b376[0]
          ? "  *❲❒❳ Total CPU Usage:*\n  *" +
            _0x14b376[0].model.trim() +
            " (" +
            _0x52bb92.speed +
            " MHZ)*\n      " +
            Object.keys(_0x52bb92.times)
              .map(
                (_0x1a945a) =>
                  "-" +
                  (_0x1a945a + "").padEnd(6) +
                  ": " +
                  (
                    (_0x52bb92.times[_0x1a945a] * 100) /
                    _0x52bb92.total
                  ).toFixed(2) +
                  "%"
              )
              .join("\n      ") +
            "\n\n  *❲❒❳ CPU Core Usage (" +
            _0x14b376.length +
            " Core CPU)*\n  " +
            _0x14b376
              .map(
                (_0x1ada4d, _0x5999d4) =>
                  "*Core " +
                  (_0x5999d4 + 1) +
                  ": " +
                  _0x1ada4d.model.trim() +
                  " (" +
                  _0x1ada4d.speed +
                  " MHZ)*\n      " +
                  Object.keys(_0x1ada4d.times)
                    .map(
                      (_0x2cc08d) =>
                        "-" +
                        (_0x2cc08d + "").padEnd(6) +
                        ": " +
                        (
                          (_0x1ada4d.times[_0x2cc08d] * 100) /
                          _0x1ada4d.total
                        ).toFixed(2) +
                        "%"
                    )
                    .join("\n      ")
              )
              .join("\n\n")
          : "") +
        "\n"
      ).trim();
      return await _0x51c639.send(respon, {}, "", _0x51c639);
    } catch (_0x102a1d) {
      await _0x51c639.error(
        _0x102a1d + "\n\ncommand: cpu",
        _0x102a1d,
        "*_No responce from Server side, Sorry!!_*"
      );
    }
  }
);

smd(
  {
    pattern: "warn",
    fromMe: true,
    desc: "warn a user!",
    category: "user",
    filename: __filename,
    use: " < USER >",
  },
  async (_0xb9222e, _0x4cb71f) => {
    try {
      let _0x5746a6 = _0xb9222e.reply_message
        ? _0xb9222e.reply_message.sender
        : _0xb9222e.mentionedJid[0]
        ? _0xb9222e.mentionedJid[0]
        : false;
      if (!_0x5746a6) {
        return await _0xb9222e.send("*_Uhh please, reply to a user!!_*");
      }
      let _0x314399 =
        (await userdb.findOne({
          id: _0x5746a6,
        })) ||
        (await userdb.new({
          id: _0x5746a6,
        }));
      let _0x5980c1 = _0x314399.warn || {};
      if (!_0x5980c1[_0xb9222e.chat]) {
        _0x5980c1[_0xb9222e.chat] = [];
      }
      var _0x389244 = {
        chat: _0xb9222e.isGroup
          ? _0xb9222e.metadata?.subject || "GROUP"
          : "PRIVATE CHAT",
        reason: _0x4cb71f,
        date: _0xb9222e.date,
        warnedby: _0xb9222e.senderName,
      };
      _0x5980c1[_0xb9222e.chat].push(_0x389244);
      await userdb.updateOne(
        {
          id: _0x5746a6,
        },
        {
          warn: _0x5980c1,
        }
      );
      let _0x46237b = parseInt(global.warncount) || 3;
      if (
        _0x5980c1[_0xb9222e.chat].length > _0x46237b &&
        !_0xb9222e.checkBot(_0x5746a6)
      ) {
        if (_0xb9222e.isGroup) {
          if (_0xb9222e.isBotAdmin) {
            await _0xb9222e.send(
              "*_Hey @" +
                _0x5746a6.split("@")[0] +
                ", Kicking you from group!_*\n*_Because Your warn limit exceed!_*",
              {
                mentions: [_0x5746a6],
              }
            );
            await _0xb9222e.bot.groupParticipantsUpdate(
              _0xb9222e.chat,
              [_0x5746a6],
              "remove"
            );
          } else {
            return await _0xb9222e.send(
              "*_Hey @" +
                _0x5746a6.split("@")[0] +
                " Dont Spam, Your warn limit exceed!_*"
            );
          }
        } else {
          await _0xb9222e.send(
            "*_Hey @" +
              _0x5746a6.split("@")[0] +
              ", Blocking you!_*\n*_Because Your warn limit exceed!_*",
            {
              mentions: [_0x5746a6],
            }
          );
          await _0xb9222e.bot.updateBlockStatus(_0x5746a6, "block");
        }
      } else {
        return await _0xb9222e.send(
          "*_Hey @" + _0x5746a6.split("@")[0] + " warning added, Don't spam!_*",
          {
            mentions: [_0x5746a6],
          }
        );
      }
    } catch (_0x229851) {
      await _0xb9222e.error(_0x229851 + "\n\nCommand: warn ", _0x229851, false);
    }
  }
);
smd(
  {
    pattern: "resetwarn",
    desc: "create paste of text.",
    category: "user",
    filename: __filename,
    use: " user ",
  },
  async (_0x204e61, _0xad20a9) => {
    try {
      if (!_0x204e61.isCreator && !_0x204e61.isAdmin) {
        return await _0x204e61.reply(tlang().admin);
      }
      let _0x16177d = _0x204e61.reply_message
        ? _0x204e61.reply_message.sender
        : _0x204e61.mentionedJid[0]
        ? _0x204e61.mentionedJid[0]
        : false;
      if (!_0x16177d) {
        return await _0x204e61.send("*_Uhh please, reply to a user!!_*");
      }
      let _0x3397c7 =
        (await userdb.findOne({
          id: _0x16177d,
        })) ||
        (await userdb.new({
          id: _0x16177d,
        })) ||
        {};
      let _0x1aa30d = _0x3397c7.warn || {};
      if (
        _0x204e61.isCreator &&
        _0xad20a9.toLowerCase() === "all" &&
        _0x1aa30d
      ) {
        _0x1aa30d = {};
      } else {
        if (!_0x3397c7 || !_0x1aa30d || !_0x1aa30d[_0x204e61.chat]) {
          return await _0x204e61.send("*_User didn't have any warning yet!!_*");
        }
        delete _0x1aa30d[_0x204e61.chat];
      }
      await userdb.updateOne(
        {
          id: _0x16177d,
        },
        {
          warn: _0x1aa30d,
        }
      );
      await _0x204e61.reply(
        "*User is free as a bird now!*\n*All warns has been deleted!*"
      );
    } catch (_0x2b8f6c) {
      await _0x204e61.error(_0x2b8f6c + "\n\nCommand: resetwarn", _0x2b8f6c);
    }
  }
);



    //    MODERATION
    
 smd(
  {
    pattern: "act",
    alias: ["activate", "active"],
    desc: "Switches for varios works.",
    category: "moderation",
    filename: __filename,
  },
  async (_0x1c1427, _0x2c32fb) => {
    try {
      if (!_0x1c1427.isGroup) {
        return _0x1c1427.reply(tlang().group);
      }
      const _0x2e197f = _0x1c1427.botNumber;
      const _0x571a11 = _0x1c1427.isAdmin;
      let _0x14856e = _0x2c32fb?.split(" ")[0].toLowerCase()?.trim() || false;
      if (!_0x571a11 && !_0x1c1427.isCreator) {
        return _0x1c1427.reply(tlang().admin);
      }
      let _0x599658 =
        (await groupdb.findOne({
          id: _0x1c1427.chat,
        })) ||
        (await groupdb.new({
          id: _0x1c1427.chat,
        })) ||
        false;
      if (!_0x599658) {
        return await _0x1c1427.reply(
          "*_Uhh dear, Group not found in Databse!_*"
        );
      }
      switch (_0x14856e) {
        case "antilink":
          {
            if (_0x599658.antilink !== "false") {
              return await _0x1c1427.reply(
                "*_Antilink was alredy enabled here!_*"
              );
            }
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                antilink: "warn",
              }
            );
            await _0x1c1427.reply("*_Enabled antilink in current chat.!_*");
          }
          break;
        case "economy":
          {
            if (_0x599658.economy == "true") {
              return await _0x1c1427.reply("*_Economy was alredy enabled.!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                economy: "true",
              }
            );
            await _0x1c1427.reply("*_Economy enabled in current chat.!_*");
          }
          break;
        case "events":
        case "event":
          {
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                welcome: "true",
                goodbye: "true",
              }
            );
            return await _0x1c1427.reply("*Successfully Enabled Events!*");
          }
          break;
        case "nsfw":
          {
            if (_0x599658.nsfw == "true") {
              return await _0x1c1427.reply("*_NSFW is already enabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                nsfw: "true",
              }
            );
            await _0x1c1427.reply("*_Successfully Enabled NSFW_*");
          }
          break;
        case "bot":
          {
            if (_0x599658.botenable == "true") {
              return await _0x1c1427.reply("*_bot is already enabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                botenable: "true",
              }
            );
            await _0x1c1427.reply("*_Successfully Enabled bot_*");
          }
          break;
        default: {
          _0x1c1427.reply(
            "Please provide me term like.\n1-events\n2-antilink\n3-economy\n4-bot"
          );
        }
      }
    } catch (_0x54acfc) {
      await _0x1c1427.error(_0x54acfc + "\n\ncommand: act", _0x54acfc);
    }
  }
);
smd(
  {
    pattern: "deact",
    alias: ["deactive", "deactivate"],
    desc: "Switches for varios works.",
    category: "moderation",
    filename: __filename,
  },
  async (_0x3dfe85, _0x4d9655) => {
    try {
      if (!_0x3dfe85.isGroup) {
        return _0x3dfe85.reply(tlang().group);
      }
      const _0x6df183 = _0x3dfe85.botNumber;
      const _0x66f7b9 = _0x3dfe85.isAdmin;
      let _0x22f3c7 = _0x4d9655?.split(" ")[0].toLowerCase()?.trim() || false;
      if (!_0x22f3c7) {
        return _0x3dfe85.reply(
          "❌ Please provide me term like like\n1-events\n2-antilink\n3-nsfw\n4-bot\n5-economy"
        );
      }
      if (!_0x66f7b9 && !_0x3dfe85.isCreator) {
        return _0x3dfe85.reply(tlang().admin);
      }
      let _0x39a7fb =
        (await groupdb.findOne({
          id: _0x3dfe85.chat,
        })) ||
        (await groupdb.new({
          id: _0x3dfe85.chat,
        })) ||
        false;
      if (!_0x39a7fb) {
        return await _0x3dfe85.reply(
          "*_Uhh dear, request not be proceed due to error!_*"
        );
      }
      switch (_0x22f3c7) {
        case "antilink":
          {
            if (_0x39a7fb.antilink == "false") {
              return _0x3dfe85.reply("*_Antilink was alredy disabled_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                antilink: "false",
              }
            );
            _0x3dfe85.reply("*_disabled antilink in current chat!_*");
          }
          break;
        case "economy":
          {
            if (_0x39a7fb.economy == "false") {
              return _0x3dfe85.reply("*_Economy was alredy disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                economy: "false",
              }
            );
            _0x3dfe85.reply("*disabled Economy in current chat.*");
          }
          break;
        case "events":
        case "event":
          {
            if (_0x39a7fb.events == "false") {
              return _0x3dfe85.reply("*_Events are already disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                welcome: "false",
                goodbye: "false",
              }
            );
            return _0x3dfe85.reply("*Successfully disabled Events!*");
          }
          break;
        case "nsfw":
          {
            if (_0x39a7fb.nsfw == "false") {
              return _0x3dfe85.reply("*_NSFW is already disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                nsfw: "false",
              }
            );
            _0x3dfe85.reply("*Successfully disabled NSFW*");
          }
          break;
        case "bot":
          {
            if (_0x39a7fb.botenable == "false") {
              return await _0x3dfe85.reply("*_bot is already disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                botenable: "true",
              }
            );
            await _0x3dfe85.reply("*_Successfully disabled bot_*");
          }
          break;
        default: {
          _0x3dfe85.reply(
            "Please provide me term like.\n1-events\n2-antilink\n3-bot\n4-economy"
          );
        }
      }
    } catch (_0x27fa6e) {
      await _0x3dfe85.error(_0x27fa6e + "\n\ncommand: deact", _0x27fa6e);
    }
  }
);



