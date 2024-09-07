//      WHATSAPP

const { updateProfilePicture, parsedJid } = require("../lib");
const {
  sck,
  smd,
  send,
  Config,
  tlang,
  sleep,
  getAdmin,
  prefix,
} = require("../lib");
const astro_patch = require("../lib/plugins");
const { cmd } = astro_patch;
const grouppattern = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}/g;
smd(
  {
    cmdname: "join",
    info: "joins group by link",
    type: "whatsapp",
    fromMe: true,
    filename: __filename,
    use: "<group link.>",
  },
  async (_0x466dd8, _0x5b1338) => {
    try {
      if (_0x466dd8.reply_message && _0x466dd8.reply_message.groupInvite) {
        var _0x29e5fc = await _0x466dd8.bot.groupAcceptInviteV4(
          _0x466dd8.chat,
          _0x466dd8.reply_message.msg
        );
        if (_0x29e5fc && _0x29e5fc.includes("joined to:")) {
          return await send(_0x466dd8, "*_Joined_*", {}, "", _0x466dd8);
        }
      }
      let _0x208739 = _0x5b1338 ? _0x5b1338 : _0x466dd8.reply_text;
      const _0x47ed60 = _0x208739.match(grouppattern);
      if (!_0x47ed60) {
        return await _0x466dd8.reply("*_Uhh Please, provide group link_*");
      }
      let _0x4263be = _0x47ed60[0]
        .split("https://chat.whatsapp.com/")[1]
        .trim();
      await _0x466dd8.bot
        .groupAcceptInvite(_0x4263be)
        .then((_0x7f3222) => send(_0x466dd8, "*_Joined_*", {}, "", _0x466dd8))
        .catch((_0x1d6aea) =>
          _0x466dd8.send("*_Can't Join, Group Id not found!!_*")
        );
    } catch (_0x5d3484) {
      await _0x466dd8.error(
        _0x5d3484 + "\n\ncommand: join",
        _0x5d3484,
        "*_Can't Join, Group Id not found, Sorry!!_*"
      );
    }
  }
);
smd(
  {
    cmdname: "newgc",
    info: "Create New Group",
    type: "whatsapp",
    filename: __filename,
    use: "<group link.>",
  },
  async (_0x1d2f1f, _0x3c558e, { smd: _0x2e7a79, cmdName: _0x49994a }) => {
    try {
      if (!_0x1d2f1f.isCreator) {
        return _0x1d2f1f.reply(tlang().owner);
      }
      if (!_0x3c558e) {
        return await _0x1d2f1f.reply(
          "*_provide Name to Create new Group!!!_*\n*_Ex: " +
            (prefix + _0x2e7a79) +
            " My Name Group @user1,2,3.._*"
        );
      }
      let _0x379d99 = _0x3c558e;
      if (_0x379d99.toLowerCase() === "info") {
        return await _0x1d2f1f.send(
          (
            "\n  *Its a command to create new Gc*\n  \t```Ex: " +
            (prefix + cmd) +
            " My new Group```\n  \n*You also add peoples in newGc*\n  \t```just reply or mention Users```\n  "
          ).trim()
        );
      }
      let _0x5a5c26 = [_0x1d2f1f.sender];
      if (_0x1d2f1f.quoted) {
        _0x5a5c26.push(_0x1d2f1f.quoted.sender);
      }
      if (_0x1d2f1f.mentionedJid && _0x1d2f1f.mentionedJid[0]) {
        _0x5a5c26.push(..._0x1d2f1f.mentionedJid);
        try {
          mentionJids.forEach((_0x3e3852) => {
            var _0x30af68 = _0x3e3852.split("@")[0].trim();
            _0x379d99 = _0x379d99.replace(new RegExp("@" + _0x30af68, "g"), "");
          });
        } catch {}
      }
      const _0x37b490 = _0x379d99.substring(0, 60);
      const _0x417018 = await Suhail.bot.groupCreate(_0x37b490, [..._0x5a5c26]);
      if (_0x417018) {
        let _0x2c6495 = await _0x1d2f1f.bot.sendMessage(_0x417018.id, {
          text: "*_Hey Buddy, Welcome to new Group_*\n" + Config.caption,
        });
        try {
          var _0x3a49e9 = await Suhail.bot.groupInviteCode(_0x417018.id);
        } catch {
          var _0x3a49e9 = false;
        }
        var _0x2608ab = "https://chat.whatsapp.com/";
        var _0x2fe2c7 = "" + _0x2608ab + _0x3a49e9;
        var _0x539d8f = {
          externalAdReply: {
            title: "𝙉𝙏𝙀𝙀𝙅-𝙈𝘿",
            body: "" + _0x37b490,
            renderLargerThumbnail: true,
            thumbnail: log0,
            mediaType: 1,
            mediaUrl: _0x2fe2c7,
            sourceUrl: _0x2fe2c7,
          },
        };
        return await send(
          _0x1d2f1f,
          (
            "*_Hurray, New group created!!!_*\n" +
            (_0x3a49e9 ? "*_" + _0x2fe2c7 + "_*" : "")
          ).trim(),
          {
            contextInfo: _0x539d8f,
          },
          "",
          _0x2c6495
        );
      } else {
        await _0x1d2f1f.send("*_Can't create new group, Sorry!!_*");
      }
    } catch (_0x33d6f3) {
      await _0x1d2f1f.error(
        _0x33d6f3 + "\n\ncommand: " + _0x49994a,
        _0x33d6f3,
        "*_Can't create new group, Sorry!!_*"
      );
    }
  }
);


smd({
	pattern: 'clear',
	fromMe: true,
	desc: 'delete whatsapp chat',
	type: 'whatsapp'
}, async (message, match) => { 
    try{   
	await message.bot.chatModify({
                
		delete: true,
		lastMessages: [{
			key: message.key,
			messageTimestamp: message.messageTimestamp
		}]
	}, message.jid)

	await message.send('_Cleared!_')
    }catch(e){ message.error(`${e}\n\nCommand : clear` , e, false) }
})




smd({
	pattern: 'archive',
	fromMe: true,
	desc: 'archive whatsapp chat',
	type: 'whatsapp'
}, async (message, match) => {
    try{
	const lstMsg = {
		message: message.message,
		key: message.key,
		messageTimestamp: message.messageTimestamp
	};
	await message.bot.chatModify({
		archive: true,
		lastMessages: [lstMsg]
	}, message.jid);
	await message.send('_Archived_')
}catch(e){ message.error(`${e}\n\nCommand : archive` , e, false) }
})




smd({
	pattern: 'unarchive',
	fromMe: true,
	desc: 'unarchive whatsapp chat',
	type: 'whatsapp'
}, async (message, match) => {
    try{
	const lstMsg = {
		message: message.message,
		key: message.key,
		messageTimestamp: message.messageTimestamp
	};
	await message.bot.chatModify({
		archive: false,
		lastMessages: [lstMsg]
	}, message.jid);
	await message.send('_Unarchived_')
}catch(e){ message.error(`${e}\n\nCommand : unarchive` , e, false) }
})



smd({
	pattern: 'chatpin',
  alias :["pinchat"],
	fromMe: true,
	desc: 'pin a chat',
	type: 'whatsapp'
}, async (message, match) => {
    try{
	await message.bot.chatModify({
		pin: true
	}, message.jid);
	await message.send('_Pined_')
}catch(e){ message.error(`${e}\n\nCommand : chatpin` , e, false) }
})



smd({
	pattern: 'unpin',
  alias :["unpinchat","chatunpin"],
	fromMe: true,
	desc: 'unpin a msg',
	type: 'whatsapp'
}, async (message, match) => {
    try{
	await message.bot.chatModify({
		pin: false
	}, message.jid);
	await message.send('_Unpined_')
}catch(e){ message.error(`${e}\n\nCommand : unpin` , e, false) }
})



smd({
	pattern: 'markread',
	fromMe: true,
	desc: 'mark as readed',
	type: 'whatsapp'
}, async (message, match) => {

    try{
  let msg = await message.react("🍁")
	await message.bot.chatModify(
		{ markRead: true, lastMessages: [message] }, 
    message.jid
    );
	//await message.send('_Chat mark as Readed!_')
    }catch(e){ message.error(`${e}\n\nCommand : markread` , e, false) }
})



smd({
	pattern: 'markunread',  
	fromMe: true,
	desc: 'mark as UnRead',
	type: 'whatsapp'
}, async (message, match) => {

    try{
  let msg = await message.send("🍁",{},"react")
  console.log({msg})
	await message.bot.chatModify(
		{ markRead: false, lastMessages: [message] }, 
    message.jid
    );


	//await message.send('_Chat mark as UnRead!_')
    }catch(e){ message.error(`${e}\n\nCommand : markunread` , e, false) }
})




smd({
	pattern: 'unmutechat',
	fromMe: true,
	desc: 'unmute a chat',
	type: 'whatsapp'
}, async (message, match) => {
    try{
	await message.bot.chatModify( { mute: null }, message.jid );
	await message.send('_Chat Unmuted!_')
}catch(e){ message.error(`${e}\n\nCommand : unmutechat` , e, false) }

})

smd({
	pattern: 'profilename',
	fromMe: true,
	desc: 'To change your profile name',
	type: 'whatsapp'
}, async (message, match) => {
    try{
	match = match || message.reply_message.text
	if (!match) return await message.send('*Need Name!*\n*Example: profilename your name*.')
	await message.bot.updateProfileName(match)
	await message.send('_Profile name updated!_')
}catch(e){ message.error(`${e}\n\nCommand : profilename` , e, false) }
})



      // WHATSAPP SETTINGS
      
// ============================ PRIVACY SETTINGS ============================ 


smd({
	pattern: 'getprivacy',
	fromMe: true,
	desc: 'get your privacy settings',
	type: 'whatsapp settings'
}, async (message, match) => {
	const {
		readreceipts,
		profile,
		status,
		online,
		last,
		groupadd,
		calladd
	} = await message.bot.fetchPrivacySettings(true);
	const msg = `*♺ whatsapp privacy settings*

*ᝄ name :* ${(message.fromMe &&  message.pushName ? message.pushName :  message.bot.user.name).split("\n").join("  ") }
*ᝄ number :* ${message.user.split("@")[0]}

*ᝄ online :* ${online}
*ᝄ profile :* ${profile}
*ᝄ last seen :* ${last}
*ᝄ whts status :* ${status}
*ᝄ read receipt :* ${readreceipts}

*ᝄ who can add in group :* ${groupadd}
*ᝄ who can call :* ${calladd}`;
	let img = await message.getpp(message.user)
	await message.send(img, {
		caption: msg
	}, 'img');
})





smd({
	pattern: 'lastseen',
	fromMe: true,
	desc: 'to change lastseen privacy',
	type: 'whatsapp settings'
}, async (message, match, {smd }) => {
    try{
	if (!match) return await message.send(`_*Example:-* .lastseen all_\n_to change last seen privacy settings_`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join(' / ')}* values_`);
	await message.bot.updateLastSeenPrivacy(match)
	await message.send(`_Privacy settings *last seen* Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : lastseen` , e, false) }
})


smd({
	pattern: 'online',
	fromMe: true,
	desc: 'to change online privacy',
	type: 'whatsapp settings'
}, async (message, match,) => {
    try{
	if (!match) return await message.send(`_*Example:-* .online all_\n_to change *online*  privacy settings_`);
	const available_privacy = ['all', 'match_last_seen'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.bot.updateOnlinePrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : online` , e, false) }
})


smd({
	pattern: 'mypp',
	fromMe: true,
	desc: 'privacy setting profile picture',
	type: 'whatsapp settings'
}, async (message, match) => {
    try{
	if (!match) return await message.send(`_*Example:-* .mypp all_\n_to change *profile picture*  privacy settings_`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.bot.updateProfilePicturePrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : mypp` , e, false) }
})

smd({
	pattern: 'mystatus',
	fromMe: true,
	desc: 'privacy for my status',
	type: 'whatsapp settings'
}, async (message, match,) => {
    try{
	if (!match) return await message.send(`_*Example:-* .mystatus all_\n_to change *status*  privacy settings_`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.bot.updateStatusPrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : mystatus` , e, false) }
})

smd({
	pattern: 'read',
	fromMe: true,
	desc: 'privacy for read message',
	type: 'whatsapp settings'
}, async (message, match, cmd) => {
    try{
	if (!match) return await message.send(`_*Example:-* .read all_\n_to change *read and receipts message*  privacy settings_`);
	const available_privacy = ['all', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.bot.updateReadReceiptsPrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : read` , e, false) }
})

smd({
	pattern: 'groupadd',
	fromMe: true,
	desc: 'privacy for group add',
	type: 'whatsapp settings'
}, async (message, match, cmd) => {
    try{
	if (!match) return await message.send(`_*Example:-* .groupadd all_\n_to change *group add*  privacy settings_`);
	const available_privacy = ['all', 'contacts', 'contact_blacklist', 'none'];
	if (!available_privacy.includes(match)) return await message.send(`_action must be *${available_privacy.join('/')}* values_`);
	await message.bot.updateGroupsAddPrivacy(match)
	await message.send(`_Privacy Updated to *${match}*_`);
}catch(e){ message.error(`${e}\n\nCommand : groupadd` , e, false) }
})

let {
  runtime,
  formatp,
  prefix,
  smd,
  smdBuffer,
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const os = require("os");
const speed = require("performance-now");
const Config = require("../config");
const cheerio = require("cheerio");
smd({
  cmdname: "messages",
  alias: ["countmessage", "msgcount"],
  desc: "Check how many users continuesly active in chat!",
  category: "whatsapp",
  filename: __filename
}, async (_0x1cec94, _0x2535b1, {
  store: _0x264360
}) => {
  try {
    let _0x5af784 = {};
    _0x264360.messages[_0x1cec94.jid].array.forEach(_0x2ec32f => {
      const _0xd05e4b = _0x2ec32f.pushName || (_0x1cec94.isGroup ? _0x2ec32f.key.participant : _0x2ec32f.key.remoteJid || "unknown").split("@")[0];
      _0x5af784[_0xd05e4b] = (_0x5af784[_0xd05e4b] || 0) + 1;
    });
    let _0x599777 = Object.entries(_0x5af784);
    if (!_0x599777 || !_0x599777[0]) {
      return await _0x1cec94.reply("_No messages found!_");
    }
    const _0x338160 = Object.entries(_0x5af784).map(([_0x4630e3, _0x3a7f93]) => "\t*" + (_0x4630e3?.split("\n").join(" ") || "unknown") + "*  ➪  _" + _0x3a7f93 + "_").join("\n");
    var _0x370694 = ("*LIST OF ACTIVE USERS IN CURRENT CHAT*\n_Note: Sometimes Data will be reset when bot restart!_\n\n*Total Users: _" + _0x599777.length + "_*\n\n*USERNAME ➪ MESSAGE COUNT(s)*\n" + _0x338160 + "\n\n" + Config.caption).trim();
    await _0x1cec94.send(_0x370694, {
      contextInfo: {
        ...(await _0x1cec94.bot.contextInfo("ACTIVE USERS", _0x1cec94.senderName))
      }
    }, "asta", _0x1cec94);
  } catch (_0x225db9) {
    console.log({
      e: _0x225db9
    });
  }
});
let commandHistory = [];
smd({
  on: "main"
}, async (_0x297aaa, _0x35b575, {
  icmd: _0x5e5446
}) => {
  try {
    if (_0x5e5446 && _0x297aaa.cmd) {
      commandHistory.push({
        user: _0x297aaa.sender,
        command: _0x297aaa.cmd,
        timestamp: new Date()
      });
    }
  } catch (_0x4bf40a) {
    await _0x297aaa.error(_0x4bf40a + "\n\ncommand : listmessage", _0x4bf40a, "*ERROR!*");
  }
});

smd({
  cmdname: "tovv",
  alias: ["toviewonce"],
  desc: "send viewonce for Replied image/video Message",
  category: "whatsapp",
  filename: __filename
}, async (_0x241c6f, _0x5ce27a) => {
  try {
    let _0x1d26ad = _0x241c6f.image || _0x241c6f.video ? _0x241c6f : _0x241c6f.reply_message && (_0x241c6f.reply_message.image || _0x241c6f.reply_message.video) ? _0x241c6f.reply_message : false;
    if (!_0x1d26ad) {
      return await _0x241c6f.reply("_Reply to image/video with caption!_");
    }
    let _0x60cca4 = await _0x241c6f.bot.downloadAndSaveMediaMessage(_0x1d26ad);
    let _0x8cde12 = _0x1d26ad.image ? "image" : "video";
    if (_0x60cca4) {
      _0x241c6f.bot.sendMessage(_0x241c6f.chat, {
        [_0x8cde12]: {
          url: _0x60cca4
        },
        caption: _0x5ce27a,
        mimetype: _0x1d26ad.mimetype,
        fileLength: "99999999",
        viewOnce: true
      }, {
        quoted: _0x1d26ad
      });
    } else {
      _0x241c6f.reply("*Request Denied!*");
    }
  } catch (_0x2422e7) {
    await _0x241c6f.error(_0x2422e7 + "\n\ncommand : tovv", _0x2422e7, false);
  }
});

//nteej
const moment = require("moment-timezone");
const Config = require("../config");
let { smd, prefix, updateProfilePicture, parsedJid } = require("../lib");
const { cmd } = require("../lib/plugins");

const mtypes = ["imageMessage"];

// Set profile picture
smd(
  {
    pattern: "pp",
    desc: "Set profile picture",
    category: "whatsapp",
    use: "<reply to image>",
    fromMe: true,
    filename: __filename,
  },
  async (cld) => {
    try {
      let reply = mtypes.includes(cld.mtype) ? cld : cld.reply_message;
      if (!reply || !mtypes.includes(reply?.mtype || "need_Media")) {
        return await cld.reply("*Reply to an image, dear*");
      }
      return await updateProfilePicture(cld, cld.user, reply, "pp");
    } catch (err) {
      await cld.error(err + "\n\ncommand : pp", err);
    }
  }
);

// Set full screen profile picture
smd(
  {
    pattern: "fullpp",
    desc: "Set full screen profile picture",
    category: "whatsapp",
    use: "<reply to image>",
    fromMe: true,
    filename: __filename,
  },
  async (cld) => {
    try {
      let reply = mtypes.includes(cld.mtype) ? cld : cld.reply_message;
      if (!reply || !mtypes.includes(reply?.mtype || "need_Media")) {
        return await cld.reply("*Reply to an image, dear*");
      }
      return await updateProfilePicture(cld, cld.user, reply, "fullpp");
    } catch (err) {
      await cld.error(err + "\n\ncommand : fullpp", err);
    }
  }
);

// Remove profile picture
smd(
  {
    pattern: "rpp",
    desc: "remove profile picture",
    category: "whatsapp",
    use: "<chat>",
    fromMe: true,
    filename: __filename,
  },
  async (cld) => {
    try {
      await cld.removepp();
      cld.send("*_Profile picture removed successfully!_*");
    } catch (err) {
      await cld.error(err + "\n\ncommand : rpp", err);
    }
  }
);

// Update bio
smd(
  {
    pattern: "bio",
    desc: "update profile status of whatsapp",
    category: "whatsapp",
    use: "<text>",
    fromMe: true,
    filename: __filename,
  },
  async (cld, text) => {
    try {
      if (!text) {
        return await cld.send(
          "*_provide text to update profile status!_*\n*_Example: " +
            prefix +
            "bio NTEEJ-MD_*"
        );
      }
      await cld.bot.updateProfileStatus(text);
      cld.send("*Profile status updated successfully!*");
    } catch (err) {
      await cld.error(err + "\n\ncommand : bio", err);
    }
  }
);

// Send Picture-in-Picture (PiP) video
cmd(
  {
    pattern: "ptv",
    desc: "send ptv Message of video",
    category: "whatsapp",
    filename: __filename,
  },
  async (cld, _, { cmdName }) => {
    try {
      if (!cld.quoted) {
        return await cld.send("*Uhh Please, reply to video*");
      }
      let mtype = cld.quoted.mtype;
      if (mtype !== "videoMessage") {
        return await cld.send("*Uhh Dear, reply to a video message*");
      }
      return await cld.bot.forwardOrBroadCast(cld.chat, cld.quoted, {}, "ptv");
    } catch (err) {
      await cld.error(err + "\n\ncommand : ptv", err);
    }
  }
);

// Save message to log number
cmd(
  {
    pattern: "save",
    desc: "Save Message to log number",
    category: "whatsapp",
    filename: __filename,
  },
  async (cld, _, { cmdName }) => {
    try {
      let reply = cld.reply_message;
      if (!reply) {
        return await cld.send("*Uhh Please, reply to to a Message*");
      }
      let sent = await cld.bot.forwardOrBroadCast(cld.user, reply);
    } catch (err) {
      await cld.error(err + "\n\ncommand : save", err);
    }
  }
);

// Get quoted message
cmd(
  {
    pattern: "quoted",
    desc: "get reply Message from Replied Message",
    category: "user",
    filename: __filename,
  },
  async (cld) => {
    try {
      if (!cld.quoted) {
        return await cld.send("*_Uhh Dear, Reply to a Message_*");
      }
      let quoted = await cld.bot.serializeM(await cld.getQuotedObj());
      if (!quoted || !quoted.quoted) {
        return await cld.replay(
          "*Message you replied does not contain a reply Message*"
        );
      }
      try {
        await cld.react("✨", cld);
        return await cld.bot.copyNForward(cld.chat, quoted.quoted, false);
      } catch (err) {
        await cld.bot.forward(cld.chat, quoted.quoted, {}, cld);
        console.log(err);
      }
    } catch (err) {
      await cld.error(err + "\n\ncommand : quoted", err);
    }
  }
);

// Get blocklist
cmd(
  {
    pattern: "blocklist",
    desc: "get list of all Blocked Numbers",
    category: "whatsapp",
    fromMe: true,
    filename: __filename,
    use: "<text>",
  },
  async (cld) => {
    try {
      const blockedUsers = await cld.bot.fetchBlocklist();
      if (blockedUsers.length === 0) {
        return await cld.reply("Uhh Dear, You don't have any Blocked Numbers.");
      }
      let text =
        "\n*≡ List*\n\n*_Total Users:* " +
        blockedUsers.length +
        "_\n\n┌─⊷ \t*BLOCKED USERS*\n";
      for (let i = 0; i < blockedUsers.length; i++) {
        text +=
          "▢ " + (i + 1) + ":- wa.me/" + blockedUsers[i].split("@")[0] + "\n";
      }
      text += "└───────────";
      return await cld.bot.sendMessage(cld.chat, { text });
    } catch (err) {
      await cld.error(err + "\n\ncommand : blocklist", err);
    }
  }
);

// Send location
// Location Command
cmd(
  {
    pattern: "location",
    desc: "Adds *readmore* in given text.",
    category: "whatsapp",
    filename: __filename,
  },
  async (message, args) => {
    try {
      if (!args) {
        return await message.reply(
          "*Give Coordinates To Send Location!*\n *Ex: " +
            prefix +
            "location 24.121231,55.1121221*"
        );
      }

      const latitude = parseFloat(args.split(",")[0]) || "";
      const longitude = parseFloat(args.split(",")[1]) || "";

      if (!latitude || isNaN(latitude) || !longitude || isNaN(longitude)) {
        return await message.reply("*_Coordinates Not In Format, Try Again_*");
      }

      await message.reply(
        "*----------LOCATION------------*\n```Sending Location Of Given Data:\n Latitude: " +
          latitude +
          "\n Longitude: " +
          longitude +
          "```\n\n" +
          Config.caption
      );

      return await message.sendMessage(
        message.jid,
        {
          location: {
            degreesLatitude: latitude,
            degreesLongitude: longitude,
          },
        },
        {
          quoted: message,
        }
      );
    } catch (error) {
      await message.error(error + "\n\ncommand : location", error);
    }
  }
);

// List Personal Chats Command
smd(
  {
    pattern: "listpc",
    category: "whatsapp",
    desc: "Finds info about personal chats",
    filename: __filename,
  },
  async (message, isPattern, { store }) => {
    try {
      message.react("🫡");
      const personalChats = await store.chats
        .all()
        .filter((chat) => chat.id.endsWith(".net"))
        .map((chat) => chat);

      let result =
        " 「  " +
        Config.botname +
        "'s pm user list  」\n\nTotal " +
        personalChats.length +
        " users are text in personal chat.";

      for (const chat of personalChats) {
        result +=
          "\n\nUser: @" +
          chat.id.split("@")[0] +
          "\nMessages : " +
          chat.unreadCount +
          "\nLastchat : " +
          moment(chat.conversationTimestamp * 1000)
            .tz(timezone)
            .format("DD/MM/YYYY HH:mm:ss");
      }

      message.bot.sendTextWithMentions(message.chat, result, message);
    } catch (error) {
      return await message.error(
        error + "\n\n command: listpc",
        error,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);

// List Group Chats Command
smd(
  {
    pattern: "listgc",
    category: "whatsapp",
    desc: "Finds info about all active groups",
    filename: __filename,
  },
  async (message, isPattern, { store, Void }) => {
    try {
      message.react("🫡");
      const groupChats = await store.chats
        .all()
        .filter((chat) => chat.id.endsWith("@g.us"))
        .map((chat) => chat);

      let result =
        " 「  " +
        Config.botname +
        "'s group user list  」\n\nTotal " +
        groupChats.length +
        " active Groups found!";

      for (const chat of groupChats) {
        const metadata = await Void.groupMetadata(chat.id);
        result +=
          "\n\nName : " +
          metadata.subject +
          " " +
          (metadata.owner ? "\nOwner : @" + metadata.owner.split("@")[0] : "") +
          "\nID : " +
          chat.id +
          "\nMade : " +
          (metadata.creation
            ? moment(metadata.creation * 1000)
                .tz("Asia/Kolkata")
                .format("DD/MM/YYYY HH:mm:ss")
            : metadata.creation) +
          "\nMember : " +
          (metadata.participants.length || 0) +
          "\n\nMessages : " +
          chat.unreadCount +
          "\nLastchat : " +
          moment(chat.conversationTimestamp * 1000)
            .tz(timezone)
            .format("DD/MM/YYYY HH:mm:ss");
      }

      message.send(result, {}, "suhail", message);
    } catch (error) {
      return await message.error(
        error + "\n\n command: listpc",
        error,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);

// Create vCard Command
cmd(
  {
    pattern: "vcard",
    desc: "Create Contact by given name.",
    category: "whatsapp",
    filename: __filename,
  },
  async (message, args) => {
    try {
      if (!message.quoted) {
        return message.reply("*Please Reply to User With Name*");
      }

      if (!args) {
        return message.reply(
          "Please Give Me User Name, \n *Example : " +
            prefix +
            "vcard NTEEJ-MD* "
        );
      }

      let nameArray = args.split(" ");
      if (nameArray.length > 3) {
        args = nameArray.slice(0, 3).join(" ");
      }

      const vCard =
        "BEGIN:VCARD\nVERSION:3.0\nFN:" +
        args +
        "\nORG:;\nTEL;type=CELL;type=VOICE;waid=" +
        message.quoted.sender.split("@")[0] +
        ":+" +
        owner[0] +
        "\nEND:VCARD";

      const contactMessage = {
        contacts: {
          displayName: args,
          contacts: [
            {
              vcard: vCard,
            },
          ],
        },
      };

      return await message.bot.sendMessage(message.chat, contactMessage, {
        quoted: message,
      });
    } catch (error) {
      await message.error(error + "\n\ncommand : vcard", error);
    }
  }
);

// Edit Message Command
smd(
  {
    pattern: "edit",
    fromMe: true,
    desc: "edit message that sended by bot",
    type: "whatsapp",
  },
  async (message, args) => {
    try {
      const botMessage =
        message.reply_message && message.reply_message.fromMe
          ? message.reply_message
          : false;

      if (!botMessage) {
        return await message.reply("_Reply to a message that sent by you!_");
      }

      if (!args) {
        return await message.reply("_Need text, Example: edit hi_");
      }

      return await message.edit(args, {
        edit: botMessage,
      });
    } catch (error) {
      await message.error(error + "\n\ncommand : edit", error);
    }
  }
);

// Forward Message Command
smd(
  {
    pattern: "forward",
    alias: ["send"],
    desc: "forward your messages in jid",
    type: "whatsapp",
  },
  async (message, args) => {
    try {
      if (!message.reply_message) {
        return message.reply("*_Reply to something!_*");
      }

      const jids = await parsedJid(args);
      if (!jids || !jids[0]) {
        return await message.send(
          "*Provide jid to forward message*\n*use _" +
            prefix +
            "jid,_ to get jid of users!*"
        );
      }

      for (let i = 0; i < jids.length; i++) {
        message.bot.forwardOrBroadCast(jids[i], message.reply_message);
      }
    } catch (error) {
      await message.error(error + "\n\ncommand : forward", error);
    }
  }
);

// Block User Command
smd(
  {
    cmdname: "block",
    info: "blocks a person",
    fromMe: true,
    type: "whatsapp",
    filename: __filename,
    use: "<quote/reply user.>",
  },
  async (message) => {
    try {
      let user = message.reply_message
        ? message.reply_message.sender
        : !message.isGroup
        ? message.from
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : "";

      if (!user && !user.includes("@s.whatsapp.net")) {
        return await message.reply("*Uhh dear, reply/mention an User*");
      }

      if (message.checkBot(user)) {
        return await message.reply("*Huh, I can't block my Creator!!*");
      }

      await message.bot
        .updateBlockStatus(user, "block")
        .then(() => {
          message.react("✨", message);
        })
        .catch(() => message.reply("*_Can't block user, Sorry!!_*"));
    } catch (error) {
      await message.error(error + "\n\ncommand: block", error, false);
    }
  }
);

// Unblock User Command
smd(
  {
    cmdname: "unblock",
    info: "Unblocked user.",
    type: "whatsapp",
    fromMe: true,
    filename: __filename,
  },
  async (message) => {
    try {
      let user = message.reply_message
        ? message.reply_message.sender
        : !message.isGroup
        ? message.from
        : message.mentionedJid[0]
        ? message.mentionedJid[0]
        : "";

      if (!user && !user.includes("@s.whatsapp.net")) {
        return await message.reply("*Uhh dear, reply/mention an User*");
      }

      await message.bot
        .updateBlockStatus(user, "unblock")
        .then(() =>
          message.send(
            "*@" + user.split("@")[0] + " Unblocked Successfully..!*",
            {
              mentions: [users],
            }
          )
        )
        .catch(() =>
          message.reply("*_Can't Unblock user, Make sure user blocked!!_*")
        );
    } catch (error) {
      await message.error(error + "\n\ncommand: unblock", error);
    }
  }
);

// Download View Once Message Command
cmd(
  {
    pattern: "vv",
    alias: ["viewonce", "retrive"],
    desc: "download viewOnce Message.",
    category: "whatsapp",
    use: "<query>",
    react: "👀",
    filename: __filename,
  },
  async (message, args) => {
    try {
      let viewOnceMessage = false;

      if (message.reply_message) {
        if (
          message.reply_message.viewOnce ||
          (message.device === "ios" &&
            /audioMessage|videoMessage|imageMessage/g.test(
              message.reply_message.mtype
            ))
        ) {
          viewOnceMessage = message.reply_message;
        }
      }

      viewOnceMessage.mtype = viewOnceMessage.mtype2;

      if (!viewOnceMessage) {
        return message.reply("```Please Reply A ViewOnce Message```");
      }

      const downloadedMedia = await message.bot.downloadAndSaveMediaMessage(
        viewOnceMessage.msg
      );

      const viewOnceMessageKey = {
        key: viewOnceMessage.key,
        message: {
          conversation: "```[VIEWONCE FOUND DOWNLOAD 100%]```",
        },
      };

      await message.bot.sendMessage(
        message.jid,
        {
          [viewOnceMessage.mtype2.split("Mess")[0]]: {
            url: downloadedMedia,
          },
          caption: viewOnceMessage.body,
        },
        {
          quoted: viewOnceMessageKey,
        }
      );
    } catch (error) {
      await message.error(error + "\n\ncommand: vv", error);
    }
  }
);

smd(
  {
    pattern: "#",
    alias: ["ssaver"],
    desc: "Save whatsapp status",
    category: "whatsapp",
    filename: __filename,
    use: "< status >",
  },
  async (message) => {
    try {
      let mm =
        message.reply_message && message.reply_message.status
          ? message.reply_message
          : false;
      if (mm) {
        message.bot.forwardOrBroadCast(message.user, mm, {
          quoted: { key: mm.key, message: mm.message },
        });
      } else message.send("*reply to whatsapp status*");
    } catch (e) {
      await message.error(`${e}\n\ncommand : #(Status Saver)`, e, false);
    }
  }
);
//========================= [ SAVE STORY BY REPLYING (send,give) ] =========================\\
const regexSend = new RegExp(
  `\\b(?:${["send", "share", "snd", "give", "save", "sendme", "forward"].join(
    "|"
  )})\\b`,
  "i"
);
smd({ on: "quoted" }, async (message, text) => {
  try {
    let mm = message.reply_message.status ? message.reply_message : false;
    if (mm && regexSend.test(text.toLowerCase())) {
      message.bot.forwardOrBroadCast(
        message.fromMe ? message.user : message.from,
        mm,
        { quoted: { key: mm.key, message: mm.message } }
      );
    }
  } catch (e) {
    console.log(e);
  }
});

//========================= [ WAPRESENCE & READ MSGS ] =========================\\
global.waPresence =
  process.env.WAPRESENCE && process.env.WAPRESENCE === "online"
    ? "available"
    : process.env.WAPRESENCE || "";
global.readmessage = process.env.READ_MESSAGE || global.readmessage || "false";
global.readmessagefrom =
  process.env.READ_MESSAGE_FROM || global.readmessagefrom || "false";
global.readcmds = process.env.READ_COMMAND || global.readcmds || "true";
global.YT_PROMOTE = "https://youtube.com/@TheProMentor2024"; // PAID PROMOTION TO GET YOUTUBE SUBSCRIBERS

let status = false,
  times = 0;
smd({ on: "main" }, async (message, text, { icmd }) => {
  try {

    if (message.status) return;
    if (
      `${global.readmessagefrom}`.includes(message.senderNum) ||
      ["yes", "true", "ok", "sure"].includes(global.readmessage) ||
      (icmd && ["yes", "true", "ok", "sure"].includes(global.readcmds))
    )
      message.bot.readMessages([message.key]);
  } catch (e) {
    console.log(e);
  }
});

smd({ on: "text" }, async (message, text, { icmd }) => {
  try {
    if (
      ["unavailable", "available", "composing", "recording", "paused"].includes(
        waPresence
      )
    )
      message.bot.sendPresenceUpdate(waPresence, message.from);
    if (message.isAsta && !message.fromMe && !message.text.startsWith("$"))
      message.react("👑");
  } catch (e) {
    console.log(e);
  }
});

//========================= [ SAVE & READ STORY ] =========================\\
global.read_status =
  process.env.AUTO_READ_STATUS || global.read_status || "false";
global.save_status =
  process.env.AUTO_SAVE_STATUS || global.save_status || "false";
global.save_status_from = process.env.SAVE_STATUS_FROM || "null";
global.read_status_from =
  process.env.READ_STATUS_FROM ||
  global.read_status_from ||
  "263714497545";
smd({ on: "status" }, async (message, text) => {
  try {
    if (
      `${global.read_status_from}`
        .split(",")
        .includes(message.key.participant.split("@")[0]) ||
      ["yes", "true", "ok", "sure"].includes(global.read_status) ||
      message.fromMe ||
      message.isAsta
    ) {
      await message.bot.readMessages([{ ...message.key, fromMe: false }]);
    }
    if (
      (`${global.save_status_from}`
        .split(",")
        .includes(message.key.participant.split("@")[0]) ||
        ["yes", "true", "ok", "sure"].includes(global.save_status)) &&
      !message.fromMe
    ) {
      await message.bot.forwardOrBroadCast(message.user, message, {
        quoted: { key: message.key, message: message.message },
      });
    }
  } catch (e) {
    console.log(e);
  }
});
