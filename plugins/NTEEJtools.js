// TOOLS

const DB = require("../lib/scraper");
const { smd } = require("../lib");
const simpleGit = require("simple-git");
const git = simpleGit();
const fs = require("fs");
if (!fs.existsSync("./.git")) {
  throw "UPDATE COMMAND NOT WORKS B'COZ GIT NOT FOUND IN APP!";
}
try {
  const Heroku = require("heroku-client");
  async function updateHerokuApp() {
    try {
      const heroku = new Heroku({ token: process.env.HEROKU_API_KEY });
      await git.fetch();
      const commits = await git.log(["main..origin/main"]);
      if (commits.total === 0) {
        return "You already have latest version installed.";
      } else {
        const app = await heroku.get(`/apps/${process.env.HEROKU_APP_NAME}`);
        const gitUrl = app.git_url.replace(
          "https://",
          `https://api:${process.env.HEROKU_API_KEY}@`
        );
        try {
          await git.addRemote("heroku", gitUrl);
        } catch (e) {
          print("Heroku remote adding error", e);
        }
        await git.push("heroku", "main");
        return "Bot updated. Restarting.";
      }
    } catch (e) {
      print(e);
      return "Can't Update, Request Denied!";
    }
  }

  //---------------------------------------------------------------------------
  smd(
    {
      pattern: "update",
      desc: "Shows repo's refreshed commits.",
      category: "tools",
      fromMe: true,
      react: "🍂",
      filename: __filename,
      use:
        process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY
          ? "[ start ]"
          : "",
    },
    async (citel, text) => {
      try {
        let commits = await DB.syncgit();
        if (commits.total === 0)
          return await citel.reply(`*BOT IS UPTO DATE...!!*`);
        let update = await DB.sync();
        await citel.bot.sendMessage(
          citel.chat,
          { text: update.replace(/Astropeda/, "NTEEJ-MD") },
          { quoted: citel }
        );

        if (
          text == "start" &&
          process.env.HEROKU_APP_NAME &&
          process.env.HEROKU_API_KEY
        ) {
          citel.reply("Build started...");
          const update = await updateHerokuApp();
          return await citel.reply(update);
        }
      } catch (e) {
        citel.error(`${e}\n\nCommand: update`, e, "ERROR!");
      }
    }
  );
  
  smd(
  {
    cmdname: "getsudo",
    alias: ["mods", "gsudo"],
    info: "get sudo users list.",
    fromMe: true,
    type: "tools",
    filename: __filename,
  },
  async (_0xf78029) => {
    let _0x204a80 = global.sudo
      .split(",")
      .filter((_0x4a441f) => _0x4a441f && _0x4a441f !== "null")
      .map((_0x471040) => _0x471040.trim());
    let _0x10bccf = _0x204a80
      .map(
        (_0x247f5e, _0xc999b3) =>
          "  " + (_0xc999b3 + 1) + " 〄 @" + _0x247f5e + "\n\n"
      )
      .join("");
    let _0x1babe2 = [
      _0xf78029.sender,
      ..._0x204a80.map((_0xb3507b) => _0xb3507b + "@s.whatsapp.net"),
    ];
    if (!_0x10bccf || !_0x204a80 || !_0x204a80[0]) {
      return await _0xf78029.reply(
        "*There's no mods/sudo added for your bot!*"
      );
    }
    let _0x762894 = (
      "\n   👤 *" +
      (Config.botname ? Config.botname : "NTEEJ-MD") +
      " MODS* 👤\n   \n" +
      _0x10bccf
    ).trim();
    return await _0xf78029.reply(
      "https://telegra.ph/file/5fd51597b0270b8cff15b.png",
      {
        caption: _0x762894,
        mentions: _0x1babe2,
      },
      "img",
      _0xf78029
    );
  }
);
smd(
  {
    pattern: "setsudo",
    alias: ["ssudo", "setmod"],
    fromMe: true,
    desc: "Make sudo to a user",
    category: "tools",
    filename: __filename,
  },
  async (_0x61d6ff) => {
    try {
      let _0x24d586 = _0x61d6ff.reply_message
        ? _0x61d6ff.reply_message.sender
        : _0x61d6ff.mentionedJid[0]
        ? _0x61d6ff.mentionedJid[0]
        : "";
      if (!_0x24d586 || !_0x24d586.includes("@s.whatsapp.net")) {
        return await _0x61d6ff.reply("*Uhh dear, reply/mention an User*");
      }
      let _0xf1255f = _0x24d586.split("@")[0];
      if (global.sudo.includes(_0xf1255f)) {
        return _0x61d6ff.reply("*Number Already Exist In Sudo!*");
      }
      global.sudo += "," + _0xf1255f;
      let _0x376ddc = HEROKU
        ? await heroku.addvar("SUDO", global.sudo)
        : {
            status: false,
          };
      if (_0x376ddc && _0x376ddc.status) {
        return _0x61d6ff.reply(
          "*" +
            _0xf1255f +
            " Added Succesfully.*\nSudo Numbers : ```" +
            global.sudo +
            "```"
        );
      } else if (!_0x376ddc || !_0x376ddc?.status) {
        if (HEROKU) {
          await _0x61d6ff.reply(
            "*_Request terminated due to error!_*\n\n  There's no responce from _HEROKU_, \n  please check that you put valid _HEROKU_APP_NAME_ and _HEROKU_API_KEY_"
          );
        }
        await _0x61d6ff.reply("*User temporary added in sudo.*");
      }
    } catch (_0x356a31) {
      await _0x61d6ff.error(_0x356a31 + "\n\ncommand: setsudo", _0x356a31);
    }
  }
);
smd(
  {
    pattern: "delsudo",
    alias: ["dsudo", "delmod"],
    fromMe: true,
    desc: "delete sudo user.",
    category: "tools",
    filename: __filename,
  },
  async (_0xd149b4) => {
    try {
      let _0x45285f = _0xd149b4.reply_message
        ? _0xd149b4.reply_message.sender
        : _0xd149b4.mentionedJid[0]
        ? _0xd149b4.mentionedJid[0]
        : "";
      if (!_0x45285f || !_0x45285f.includes("@s.whatsapp.net")) {
        return await _0xd149b4.reply("*Uhh dear, reply/mention an User*");
      }
      let _0x3c1f41 = _0x45285f.split("@")[0];
      let _0x5a3afd = "," + _0x3c1f41;
      if (global.sudo.includes(_0x5a3afd)) {
        global.sudo = global.sudo.replace(_0x5a3afd, "");
      } else {
        return await _0xd149b4.reply("*_User not found in the Sudo List!_*");
      }
      let _0x69f761 = HEROKU
        ? await heroku.addvar("SUDO", global.sudo)
        : {
            status: false,
          };
      if (_0x69f761 && _0x69f761.status) {
        return _0xd149b4.reply(
          "*" +
            _0x3c1f41 +
            " Deleted Succesfully.*\nSudo Numbers : ```" +
            global.sudo +
            "```"
        );
      } else if (!_0x69f761 || !_0x69f761?.status) {
        if (HEROKU) {
          await _0xd149b4.reply(
            "*_Request terminated due to error!_*\n\n  There's no responce from _HEROKU_, \n  please check that you put valid _HEROKU_APP_NAME_ and _HEROKU_API_KEY_"
          );
        }
        await _0xd149b4.reply("*User removed from sudo.*");
      }
    } catch (_0x38beee) {
      await _0xd149b4.error(_0x38beee + "\n\ncommand: delsudo", _0x38beee);
    }
  }
);
smd(
  {
    pattern: "allvar",
    alias: ["getallvar", "allvars"],
    desc: "To get All  Heroku Vars",
    fromMe: true,
    category: "tools",
    filename: __filename,
  },
  async (_0x301429) => {
    try {
      let _0x30be20 = await heroku.getallvar();
      console.log({
        result: _0x30be20,
      });
      if (_0x30be20.status) {
        return _0x301429.send(_0x30be20.data);
      } else {
        console.error(_0x30be20.data);
        _0x301429.reply(
          "*_There's no responce from HEROKU_*, \n  please check that you put valid\n  _HEROKU_APP_NAME_ & _HEROKU_API_KEY_\n``` See Console to check whats the err```"
        );
      }
    } catch (_0x27dcbd) {
      await _0x301429.error(_0x27dcbd + "\n\ncommand: allvar", _0x27dcbd);
    }
  }
);
smd(
  {
    pattern: "newvar",
    alias: ["addvar", "avar"],
    desc: "To Set Heroku Vars",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (_0x23a9e4, _0x5eb901, { cmdName: _0x5d321d }) => {
    try {
      if (!_0x5eb901) {
        return _0x23a9e4.reply(
          "*Use " + (prefix + _0x5d321d) + " CAPTION:Suhail Md*"
        );
      }
      const _0x6c193a = _0x5eb901.indexOf(":");
      const _0x41a396 = _0x5eb901.slice(0, _0x6c193a).toUpperCase().trim();
      const _0x440f12 = _0x5eb901.slice(_0x6c193a + 1).trim();
      process.env[_0x41a396] = _0x440f12;
      updateConfig();
      if (!_0x440f12) {
        return msg.reply(
          "*Uhh Please, Provide Value After ':' !*\n*Example : " +
            (prefix + smd) +
            " AUTO_SAVE_STATUS:true*"
        );
      }
      let _0x451d76 = await heroku.addvar(_0x41a396, _0x440f12);
      if (_0x451d76 && _0x451d76.status) {
        return _0x23a9e4.reply(
          "*" + _0x41a396 + ":* [ " + _0x440f12 + " ]  *Added successfully.*"
        );
      } else if (!_0x451d76 || !_0x451d76.status) {
        console.error(result.data);
        await _0x23a9e4.reply(
          "*_Can't add " +
            _0x5d321d +
            " due to error!_*\n\n  _please check that you put valid_\n  _*HEROKU_APP_NAME* and *HEROKU_API_KEY*_"
        );
      }
    } catch (_0x5763ff) {
      await _0x23a9e4.error(_0x5763ff + "\n\ncommand: " + _0x5d321d, _0x5763ff);
    }
  }
);
smd(
  {
    pattern: "getvar",
    desc: "To Get A Heroku Var",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (_0x303701, _0x1d8719, { cmdName: _0x4d5fc7 }) => {
    try {
      if (!_0x1d8719) {
        return _0x303701.reply(
          "*Please give me Variable Name*\n*Example : " +
            (prefix + _0x4d5fc7) +
            " CAPTION*"
        );
      }
      const _0x31c9ad = _0x1d8719.split(" ")[0].toUpperCase();
      let _0x510fef = await heroku.getvar(_0x31c9ad);
      if (_0x510fef.status) {
        if (_0x510fef.data) {
          return _0x303701.reply("*" + _0x31c9ad + " :* " + _0x510fef.data);
        } else {
          return _0x303701.reply(
            "*" +
              _0x31c9ad +
              "* does not exist in Heroku *" +
              appName +
              "* app."
          );
        }
      } else if (!_0x510fef || !_0x510fef.status) {
        console.error(result.data);
        await _0x303701.reply(
          "*_There's no responce from HEROKU_*, \n  _please check that you put valid_\n  _*HEROKU_APP_NAME* & *HEROKU_API_KEY*_"
        );
      }
    } catch (_0x3c6608) {
      await _0x303701.error(_0x3c6608 + "\n\ncommand: " + _0x4d5fc7, _0x3c6608);
    }
  }
);
smd(
  {
    pattern: "setvar",
    desc: "To Set Heroku Vars",
    category: "tools",
    fromMe: true,
    filename: __filename,
  },
  async (_0xf720ad, _0x4492c1, { smd: _0x14ba4c }) => {
    try {
      if (!_0x4492c1) {
        return _0xf720ad.reply(
          "*Uhh dear, Give me variable name*\n*Example : " +
            prefix +
            "setvar PREFIX:null*"
        );
      }
      const _0x3adbd0 = _0x4492c1.indexOf(":");
      const _0x495c42 = _0x4492c1.slice(0, _0x3adbd0).toUpperCase().trim();
      const _0xaca022 = _0x4492c1.slice(_0x3adbd0 + 1).trim();
      if (!_0xaca022) {
        return msg.reply(
          "*Uhh Please, Provide value after ':' !*\n*Example : " +
            (prefix + _0x14ba4c) +
            " AUTO_READ_STATUS:true*"
        );
      }
      process.env[_0x495c42] = _0xaca022;
      updateConfig();
      let _0x20767c = await heroku.setvar(_0x495c42, _0xaca022);
      if (_0x20767c.status) {
        await _0xf720ad.reply(
          "*" + _0x495c42 + ":* [ " + _0xaca022 + " ]  *updated successfully.*"
        );
      } else if (!_0x20767c || !_0x20767c.status) {
        console.error(_0x20767c.data);
        await _0xf720ad.reply(_0x20767c.data);
      }
    } catch (_0x536b03) {
      await _0xf720ad.error(_0x536b03 + "\n\ncommand: " + _0x14ba4c, _0x536b03);
    }
  }
);

smd({
  cmdname: "feature",
  alias: ["totalfeature", "features", "asta"],
  category: "tools",
  filename: __filename,
  info: "get counting for total features!"
}, async _0x4e7c63 => {
  try {
    const _0x4de967 = require("../lib/plugins");
    let _0x4cf8ed = Object.values(_0x4de967.commands).length;
    try {
      let {
        key: _0x2d7cf6
      } = await _0x4e7c63.send("Counting... 0", {}, "asta", _0x4e7c63);
      for (let _0x16a10f = 0; _0x16a10f <= _0x4cf8ed; _0x16a10f++) {
        if (_0x16a10f % 15 === 0) {
          await _0x4e7c63.send("Counting... " + _0x16a10f, {
            edit: _0x2d7cf6
          }, "asta", _0x4e7c63);
        } else if (_0x4cf8ed - _0x16a10f < 10) {
          await _0x4e7c63.send("Counting... " + _0x16a10f, {
            edit: _0x2d7cf6
          }, "asta", _0x4e7c63);
        }
      }
      await _0x4e7c63.send("*Feature Counting Done!*", {
        edit: _0x2d7cf6
      }, "asta", _0x4e7c63);
    } catch (_0x28ce7e) {}
    let _0x50f17a = " *乂 Q U E E N _ A N I T A - V 2 - ＢＯＴ ＦＥＡＴＵＲＥ*\n\n\n  ◦ _Total Features ➪ " + _0x4cf8ed + "_\n  \n*◦ BOT FEATURES*\n\n      Plugins ➪ " + Object.values(_0x4de967.commands).filter(_0x54d4bf => _0x54d4bf.pattern).length + "_\n      _Msg Listener ➪ " + Object.values(_0x4de967.commands).filter(_0x2376a3 => _0x2376a3.on).length + "_\n      _Call Listener ➪ " + Object.values(_0x4de967.commands).filter(_0x54a19b => _0x54a19b.call).length + "_\n      _Group Listener ➪ " + Object.values(_0x4de967.commands).filter(_0x35381c => _0x35381c.group).length + "_\n  \n\n" + Config.caption;
    await _0x4e7c63.bot.relayMessage(_0x4e7c63.chat, {
      requestPaymentMessage: {
        currencyCodeIso4217: "PK",
        amount1000: _0x4cf8ed * 1000,
        requestFrom: "2348039607375@s.whatsapp.net",
        noteMessage: {
          extendedTextMessage: {
            text: _0x50f17a,
            contextInfo: {
              mentionedJid: [_0x4e7c63.sender],
              externalAdReply: {
                showAdAttribution: true
              }
            }
          }
        }
      }
    }, {});
  } catch (_0x979e23) {
    await _0x4e7c63.error(_0x979e23 + "\n\ncommand : feature", _0x979e23, false);
  }
});

smd({
   cmdname: "poetry",
  alias: ["shairi", "shayeri"],
  type: "tools",
  info: "get randome poetry lines"
}, async _0x4d032f => {
  try {
    let _0x45fa91 = await fetch("https://shizoapi.onrender.com/api/texts/shayari?apikey=shizo");
    let {
      result: _0x1aa994
    } = await _0x45fa91.json();
    _0x4d032f.reply(_0x45fa91 && _0x1aa994 ? _0x1aa994 : "_Request Denied from Server!_");
  } catch (_0x303ba6) {
    await _0x4d032f.error(_0x303ba6 + "\n\ncommand : poetry", _0x303ba6, false);
  }
});
smd({
  cmdname: "ping2",
  alias: ["botstatus", "statusbot", "p2"],
  type: "tools",
  info: "get randome poetry lines"
}, async _0xdfc3ca => {
  try {
    const _0x37ca41 = process.memoryUsage();
    const _0x4a72de = os.cpus().map(_0x39cb6a => {
      _0x39cb6a.total = Object.keys(_0x39cb6a.times).reduce((_0x432663, _0x5a155c) => _0x432663 + _0x39cb6a.times[_0x5a155c], 0);
      return _0x39cb6a;
    });
    const _0x410388 = _0x4a72de.reduce((_0x8a6a46, _0x3dde47, _0x4edc26, {
      length: _0x378aa4
    }) => {
      _0x8a6a46.total += _0x3dde47.total;
      _0x8a6a46.speed += _0x3dde47.speed / _0x378aa4;
      _0x8a6a46.times.user += _0x3dde47.times.user;
      _0x8a6a46.times.nice += _0x3dde47.times.nice;
      _0x8a6a46.times.sys += _0x3dde47.times.sys;
      _0x8a6a46.times.idle += _0x3dde47.times.idle;
      _0x8a6a46.times.irq += _0x3dde47.times.irq;
      return _0x8a6a46;
    }, {
      speed: 0,
      total: 0,
      times: {
        user: 0,
        nice: 0,
        sys: 0,
        idle: 0,
        irq: 0
      }
    });
    let _0xce26d = speed();
    let _0x3db049 = speed() - _0xce26d;
    neww = performance.now();
    oldd = performance.now();
    respon = ("\nResponse Speed " + _0x3db049.toFixed(4) + " _Second_ \n " + (oldd - neww) + " _miliseconds_\n\nRuntime : " + runtime(process.uptime()) + "\n\n💻 Info Server\nRAM: " + formatp(os.totalmem() - os.freemem()) + " / " + formatp(os.totalmem()) + "\n\n_NodeJS Memory Usaage_\n" + Object.keys(_0x37ca41).map((_0x19d575, _0x3942d9, _0x3fa08c) => _0x19d575.padEnd(Math.max(..._0x3fa08c.map(_0x6548cb => _0x6548cb.length)), " ") + ": " + formatp(_0x37ca41[_0x19d575])).join("\n") + "\n\n" + (_0x4a72de[0] ? "_Total CPU Usage_\n" + _0x4a72de[0].model.trim() + " (" + _0x410388.speed + " MHZ)\n" + Object.keys(_0x410388.times).map(_0xffc60c => "- *" + (_0xffc60c + "*").padEnd(6) + ": " + (_0x410388.times[_0xffc60c] * 100 / _0x410388.total).toFixed(2) + "%").join("\n") + " " : "") + "\n\n ").trim();
    _0xdfc3ca.reply(respon);
  } catch (_0x13d03e) {
    await _0xdfc3ca.error(_0x13d03e + "\n\ncommand : ping2", _0x13d03e, false);
  }
});

smd({
  pattern: "checkmail",
  alias: ["readmail", "reademail"],
  type: "tools",
  info: "check mails in your temporary email address!"
}, async _0x39080b => {
  try {
    const _0x13bdf9 = _0x39080b.sender;
    const _0x1ca6eb = secmailData[_0x13bdf9];
    if (!_0x1ca6eb || !_0x1ca6eb.email) {
      return await _0x39080b.reply("*You haven't created a temporary email.*\n  *Use _" + prefix + "tempmail_ to create email first!*");
    }
    const _0xb59e7d = await tempmail.mails(_0x1ca6eb.login, _0x1ca6eb.domain);
    if (!_0xb59e7d || !_0xb59e7d[0] || _0xb59e7d.length === 0) {
      return await _0x39080b.reply("*EMPTY  ➪ No mails received yet!* \n*Use _" + prefix + "delmail_ to delete mail!*");
    }
    var _0x392c45 = false;
    try {
      _0x392c45 = await smdBuffer(tmpUrl);
    } catch (_0x27f4a4) {}
    for (const _0x2b6dd0 of _0xb59e7d) {
      const _0x587f7f = await tempmail.emailContent(_0x1ca6eb.login, _0x1ca6eb.domain, _0x2b6dd0.id);
      console.log({
        emailContent: _0x587f7f
      });
      if (_0x587f7f) {
        const _0xa4d211 = "\n  *From* ➪ " + _0x2b6dd0.from + "\n  *Date* ➪  " + _0x2b6dd0.date + "\n  *EMAIL ID* ➪  [" + _0x2b6dd0.id + "]\n  *Subject* ➪  " + _0x2b6dd0.subject + "\n  *Content* ➪  " + _0x587f7f;
        await _0x39080b.reply(_0xa4d211, {
          contextInfo: {
            ...(await _0x39080b.bot.contextInfo("*EMAIL ➪ " + _0x2b6dd0.id + "*", _0x39080b.senderName, _0x392c45))
          }
        }, "smd", _0x39080b);
        ;
      }
    }
  } catch (_0x4473c8) {
    console.log(_0x4473c8);
    await _0x39080b.reply("*Request Denied!*");
  }
});
smd({
  pattern: "delmail",
  alias: ["deletemail", "deltemp", "deltmp"],
  type: "tools",
  info: "Delete tempory email address!"
}, async _0x536927 => {
  try {
    const _0x35c5db = _0x536927.sender;
    if (secmailData[_0x35c5db]) {
      delete secmailData[_0x35c5db];
      await _0x536927.reply("*Successfully deleted the email address.*");
    } else {
      await _0x536927.reply("*No email address to delete.*");
    }
  } catch (_0x527b01) {
    console.log(_0x527b01);
    await _0x536927.reply("*Request Denied!*");
  }
});
const tempmail = {};
tempmail.create = async () => {
  const _0x4b8b0a = "https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1";
  try {
    let _0x64d3a = await fetch(_0x4b8b0a);
    if (!_0x64d3a.ok) {
      throw new Error("HTTP error! status: " + _0x64d3a.status);
    }
    let _0x3d6ee6 = await _0x64d3a.json();
    return _0x3d6ee6;
  } catch (_0x5fcd34) {
    console.log(_0x5fcd34);
    return null;
  }
};
tempmail.mails = async (_0xf78957, _0x22b96c) => {
  const _0x52bcfa = "https://www.1secmail.com/api/v1/?action=getMessages&login=" + _0xf78957 + "&domain=" + _0x22b96c;
  try {
    let _0x334113 = await fetch(_0x52bcfa);
    if (!_0x334113.ok) {
      throw new Error("HTTP error! status: " + _0x334113.status);
    }
    let _0x21e568 = await _0x334113.json();
    return _0x21e568;
  } catch (_0x470fd0) {
    console.log(_0x470fd0);
    return null;
  }
};
tempmail.emailContent = async (_0x2bb874, _0x365dd7, _0x53af41) => {
  const _0x525052 = "https://www.1secmail.com/api/v1/?action=readMessage&login=" + _0x2bb874 + "&domain=" + _0x365dd7 + "&id=" + _0x53af41;
  try {
    let _0x5287ec = await fetch(_0x525052);
    if (!_0x5287ec.ok) {
      throw new Error("HTTP error! status: " + _0x5287ec.status);
    }
    let _0x321f50 = await _0x5287ec.json();
    const _0x2d0a5f = _0x321f50.htmlBody;
    console.log({
      htmlContent: _0x2d0a5f
    });
    const _0x59fd31 = cheerio.load(_0x2d0a5f);
    const _0x492dcb = _0x59fd31.text();
    return _0x492dcb;
  } catch (_0x47924e) {
    console.log(_0x47924e);
    return null;
  }
};

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
   type: "tools",
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
   type: "tools",
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
   type: "tools",
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


  smd(
    {
      pattern: "updatenow",
      desc:
        process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY
          ? "Temporary update for heroku app!"
          : "update your bot by repo!.",
      fromMe: true,
      category: "tools",
      filename: __filename,
    },
    async (citel) => {
      try {
        let commits = await DB.syncgit();
        if (commits.total === 0)
          return await citel.reply(`*YOU HAVE LATEST VERSION INSTALLED!*`);
        let update = await DB.sync();
        let text = " *> Please Wait Updater Started...!*\n " + update + "";
        await citel.bot.sendMessage(citel.jid, { text });
        await require("simple-git")().reset("hard", ["HEAD"]);
        await require("simple-git")().pull();
        await citel.reply(
          process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY
            ? "*BOT Temporary Updated on `HEROKU`!\nIt'll reset when your bot restarts!*"
            : "*Successfully updated. Now You Have Latest Version Installed!*"
        );
      } catch (e) {
        citel.error(`${e}\n\nCommand: updatenow`, e, "ERROR!");
      }
    }
  );
} catch (e) {}
