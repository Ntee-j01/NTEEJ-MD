/////////////  NTEEJ FUN  ////////////////////////////



const {
 smd, 
 textToLogoGenerator, 
 prefix,
 tlang,
  Config,
  sleep,
  getBuffer,
  smdJson,
  smdBuffer,
  groupdb,
  audioEditor,
  randomeFunfacts,
  TelegraPh,
  lang,
  send,
fetchJson,
botpic,
  sendAnimeReaction
 } = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
let {cmd} = require("../lib/plugins");
const eco = require("discord-mongoose-economy");
const fs = require("fs");
const Config = require("../config");
const {
  parseJid,
  getAdmin
} = require("../lib/");


let ty = false;

try {
  if (isMongodb) {
    ty = eco.connect(MONGODB);
    console.log("Connected with discord economy!!");
  }
} catch (e) {
  ty = false;
}

const sck = groupdb;
if (ty) {
  smd(
    {
      pattern: "daily",
      desc: "daily gold.",
      category: "economy",
      filename: __filename,
      react: "💷"
    },
    async ({ reply, chat, isGroup, sender, error }) => {
      try {
        let zerogroup = (await sck.findOne({ id: chat })) || {};
        if (zerogroup?.economy == "false")
          return reply("*🚦Economy* is not active in current group.");
        if (!isGroup) return reply(tlang().group);
        const daily = await eco.daily(sender, "Suhail", 500); //give 500 for daily, can be changed
        if (daily.cd) {
          //cdL is already formatted cooldown Left
          return await reply(
            `🧧 You already claimed daily for today, come back in ${daily.cdL}🫡`
          );
        } else {
          reply(`you claimed daily ${daily.amount} 🪙 for today🎉.`);
        }
      } catch (e) {
        error(`${e}\n\ncommand: daily`, e);
      }
    }
  );

  smd(
    {
      pattern: "resetwallet",
      desc: "reset wallet of quoted user.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message) => {
      try {
        let zerogroup =
          (await sck.findOne({ id: message.chat })) ||
          (await sck.new({ id: message.chat }));
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("*🚦Economy* is not active in current group.");
        if (!isCreator) return message.reply(tlang().owner);
        let users = message.mentionedJid
          ? message.mentionedJid[0]
          : message.msg.contextInfo.participant || false;
        if (!users) return message.reply("Please give me user.");
        const balance = await eco.balance(users, "Suhail");
        await eco.deduct(users, "Suhail", balance.wallet);
        return await message.reply(
          `⛩️ User: @${users.split("@")[0]} \n *🧧 @${
            users.split("@")[0]
          } lost all 🪙 in wallet.*\n_Now live with that poverty.🫡_`,
          { mentions: [users] }
        );
      } catch (e) {
        message.error(`${e}\n\ncommand: resetwallet`, e);
      }
    }
  );
  //---------------------------------------------------------------------------
  smd(
    {
      pattern: "capacity",
      desc: "update capacity.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        let zerogroup =
          (await sck.findOne({ id: message.chat })) ||
          (await sck.new({ id: message.chat }));
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("*🚦Economy* is not active in current group.");
        if (!message.isGroup) return message.reply(tlang().group);
        if (!match)
          return message.reply(
            `💴 *Bank-capacity* 💳\n\n1 | *1000 sp* = 🪙100\n\n2 | *100000 sp* = 🪙1000\n\n3 | *10000000 sp* = 🪙10000000\n\nExample- ${prefix}capacity 1 OR ${prefix}bankupgrade 1000`
          );
        let user = message.mentionedJid
          ? message.mentionedJid[0]
          : message.msg.contextInfo.participant || false;

        let value = match.trim();
        let k = parseInt(value);
        const balance = await eco.balance(user, "Suhail");
        switch (value) {
          case "1000":
          case "1":
            if (k > balance.wallet)
              return message.reply(
                `*_You need to pay 🪙100 to increase bank capacity ~ 1000 sp_*`
              );
            const deduct1 = await eco.deduct(user, "Suhail", 100);
            const add1 = eco.giveCapacity(user, "Davidl", 1000);
            return await message.reply(
              `*1000 🪙diamond storage has been added in ${message.senderName} bank*`
            );

            break;
          case "100000":
          case "2":
            if (k < balance.wallet)
              return message.reply(
                `*You need to pay 🪙1000 to increase bank capacity ~ 100000 sp*`
              );
            const deduct2 = await eco.deduct(user, "Nteej", 1000);
            const add2 = eco.giveCapacity(user, "Nteej", 100000);
            return await message.reply(
              `*100000 🪙diamond storage has been added in ${message.pushName} bank*`
            );

            break;
          case "10000000":
          case "3":
            if (k < balance.wallet)
              return message.reply(
                `You need to pay 🪙10000 to increase bank capacity ~ 1000 sp`
              );
            const deduct3 = await eco.deduct(user, "David", 10000);
            const add3 = eco.giveCapacity(user, "David", 10000000);
            return await message.reply(
              `*10000000 🪙diamond storage has been added in ${message.pushName}\'s bank*`
            );

            break;
          default:
            await message.reply("*What are you trying to do📉*.");
        }
      } catch (e) {
        message.error(`${e}\n\ncommand: capacity`, e);
      }
    }
  );

  //---------------------------------------------------------------------------
  smd(
    {
      pattern: "deposit",
      desc: "deposit gold.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || {};
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("*🚦Economy* is not active in current group.");
        //  let users = message.mentionedJid ? message.mentionedJid[0] : message.msg.contextInfo.participant || false;
        if (!match)
          return message.reply(
            "Baka!! Provide the 💰amount you want to deposit!"
          );
        let d = parseInt(match);
        const deposit = await eco.deposit(message.sender, "David", d);
        const balance = await eco.balance(message.sender, "David");
        if (deposit.noten)
          return message.reply("You can't deposit what you don't have💰."); //if user states more than whats in his wallet
        return await message.reply(
          `⛩️ Sender: ${message.pushName}\n🍀Successfully 💰Deposited 🪙${deposit.amount} to your bank.Upgrade your bank capacity to add more money📈.`
        );
        //return await Aviator.bot.sendButtonText(message.chat,  `⛩️ Sender: ${message.pushName}\n🍀Successfully 💰Deposited 🪙${deposit.amount} to your bank.Upgrade your bank capacity to add more money📈.`, `${Config.ownername.split(' ')[0]}-Economy Version: 0.0.6`, message);
      } catch (e) {
        message.error(`${e}\n\ncommand: deposit`, e);
      }
    }
  );
  smd(
    {
      pattern: "lb",
      desc: "check leaderboard.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message) => {
      try {
        let h = await eco.lb("Suhail", 10);
        let str = `*Top ${h.length} users with more money in wallet.*\n`;
        const { sck1 } = require("../lib");
        let arr = [];
        for (let i = 0; i < h.length; i++) {
          var tname = message.bot.getName(h[i].userID);
          str += `*${
            i + 1
          }*\n╭─────────────◆\n│ *Name:-* _${tname}_\n│ *User:-* _@${
            h[i].userID.split("@")[0]
          }_\n│ *Wallet:-* _${h[i].wallet}_\n│ *Bank Amount:-* _${
            h[i].bank
          }_\n│ *Bank Capacity:-* _${h[i].bankCapacity}_\n╰─────────────◆\n\n`;
          arr.push(h[i].userID);
        }
        await message.reply(str, { mentions: arr });
      } catch (e) {
        message.error(`${e}\n\ncommand: lb`, e);
      }
    }
  );

  smd(
    {
      pattern: "transfer",
      desc: "transfer gold.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || {};
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("*🚦Economy* is not active in current group.");
        let value = match.trim().split(" ");
        if (value[0] === "")
          return message.reply(`Use ${prefix}transfer 100 @user`);
        let user = message.mentionedJid
          ? message.mentionedJid[0]
          : message.msg.contextInfo.participant || false;
        if (!user) return message.reply("Please give me any user🤦‍♂️.");
        const user1 = message.sender;
        const user2 = user;
        const word = value[0];
        const code = value[1];
        let d = parseInt(word);
        if (!d)
          return message.reply(
            "check your text plz u r using the command in a wrong way👀"
          );
        const balance = await eco.balance(user1, "Suhail");
        let a = balance.wallet < parseInt(word);
        //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
        if (a == true)
          return message.reply("you dont have sufficient money to transfer👎");

        const deduct = await eco.deduct(user1, "Suhail", value[0]);
        const give = await eco.give(user2, "Suhail", value[0]);
        return await message.reply(
          `*📠 Transaction successful of ${value[0]} 💰*`
        );
        // return await Aviator.bot.sendButtonText(message.chat, `*📠 Transaction successful of ${value[0]} 💰*`, `${Config.ownername.split(' ')[0]}-Economy Version: 0.0.6`, message);
      } catch (e) {
        message.error(`${e}\n\ncommand: transfer`, e);
      }
    }
  );

  //---------------------------------------------------------------------------
  smd(
    {
      pattern: "wallet",
      desc: "shows wallet.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message) => {
      try {
        let zerogroup =
          (await sck.findOne({ id: message.chat })) ||
          (await sck.new({ id: message.chat }));
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("*🚦Economy* is not active in current group.");
        const balance = await eco.balance(message.sender, "Suhail"); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
        return await message.reply(
          `*👛 ${message.pushName}'s Purse:*\n\n_🪙${balance.wallet}_`
        );
        //return await Aviator.bot.sendButtonText(message.chat, `*👛 ${message.pushName}'s Purse:*\n\n_🪙${balance.wallet}_`, `${Config.ownername.split(' ')[0]}-Economy Version: 0.0.6`, message);
      } catch (e) {
        message.error(`${e}\n\ncommand: wallet`, e);
      }
    }
  );

  //---------------------------------------------------------------------------
  smd(
    {
      pattern: "give",
      desc: "Add money in wallet.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        if (!message.isCreator)
          return message.reply(`*_Hey buddy, only my owner can give money!_*`);
        let users = message.mentionedJid
          ? message.mentionedJid[0]
          : message.msg?.contextInfo?.participant || false;
        if (!users) return message.reply("Please give me user to add money.");
        await eco.give(users, "Suhail", parseInt(match.split(" ")[0]));
        return await message.bot.sendMessage(
          message.chat,
          {
            text: `Added 📈 ${parseInt(match.split(" ")[0])} to @${
              users.split("@")[0]
            } wallet🛸.`,
            mentions: [users],
          },
          { quoted: message }
        );
      } catch (e) {
        message.error(`${e}\n\ncommand: give`, e);
      }
    }
  );

  //---------------------------------------------------------------------------
  smd(
    {
      pattern: "bank",
      desc: "shows bank amount.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message) => {
      try {
        let zerogroup =
          (await sck.findOne({ id: message.chat })) ||
          (await sck.new({ id: message.chat }));
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("*🚦Economy* is not active in current group.");
        const balance = await eco.balance(message.sender, "Suhail"); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
        return await message.reply(
          `🍀User: ${message.pushName}\n\n_🪙${balance.bank}/${balance.bankCapacity}_`
        );
        //return await Aviator.bot.sendButtonText(message.chat, `🍀User: ${message.pushName}\n\n_🪙${balance.bank}/${balance.bankCapacity}_`, `${Config.ownername.split(' ')[0]}-Economy \n Version: 0.0.6`, message);
      } catch (e) {
        message.error(`${e}\n\ncommand: bank`, e);
      }
    }
  );

  //---------------------------------------------------------------------------
  smd(
    {
      pattern: "rob",
      desc: "rob bank amount.",
      category: "economy",
      filename: __filename,
    },
    async (message) => {
      try {
        let zerogroup =
          (await sck.findOne({ id: message.chat })) ||
          (await sck.new({ id: message.chat }));
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("*🚦Economy* is not active in current group.");
        let users = message.mentionedJid
          ? message.mentionedJid[0]
          : message.msg.contextInfo.participant || false;
        if (!users) return message.reply("Please give me user to rob.");
        const user1 = message.sender;
        const user2 = users;
        const k = 1000;
        const balance1 = await eco.balance(user1, "David");
        const balance2 = await eco.balance(user2, "David");
        const typ = ["ran", "rob", "caught"];
        const random = typ[Math.floor(Math.random() * typ.length)];
        if (k > balance1.wallet)
          return message.reply(
            `*☹️ You don't have enough money to pay incase you get caught*`
          );
        if (k > balance2.wallet)
          return message.reply(`*Sorry, your victim is too poor 🤷🏽‍♂️ let go🫤.*`);
        let tpy = random;
        switch (random) {
          case "ran":
            await message.reply(
              `*Your victim escaped, be more scary next time🫰.*`
            );
            ////message.react('🥹')

            break;
          case "rob":
            const deduff = Math.floor(Math.random() * 1000);
            await eco.deduct(user2, "Suhail", deduff);
            await eco.give(message.sender, "Suhail", deduff);
            await message.reply(
              `*🤑 Robbery operation done successfully.🗡️*\nYou ran with ${deduff} amount in your wallet.`
            );
            ////message.react('💀')
            break;
          case "caught":
            const rmoney = Math.floor(Math.random() * 1000);
            await eco.deduct(user1, "Suhail", rmoney);
            await message.reply(
              `*Sorry FBI👮 caught up with you, you paid ${rmoney} 🪙 from wallet🥹.*`
            );
            ////message.react('😦')
            break;
          default:
            await message.reply("*What are you trying to do👀*.");
          //message.react('🤔')
        }
      } catch (e) {
        message.error(`${e}\n\ncommand: rob`, e);
      }
    }
  );

  //---------------------------------------------------------------------------
  smd(
    {
      pattern: "withdraw",
      desc: "withdraw money from bank account.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || {};
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("*🚦Economy* is not active in current group.");
        const user = message.sender;
        if (!match)
          return message.reply(
            "*Provide the amount💰 you want to withdraw💳!*"
          );
        const query = match.trim();
        const withdraw = await eco.withdraw(user, "Suhail", query);
        if (withdraw.noten)
          return message.reply("*🏧 Insufficient fund in bank🫤*"); //if user states more than whats in his wallet
        const add = eco.give(user, "Suhail", query);
        message.reply(
          `*🏧 ALERT* \n _🪙${withdraw.amount} has been withdrawn from your wallet💰._`
        );
      } catch (e) {
        message.error(`${e}\n\ncommand: withdraw`, e);
      }
    }
  );

  //---------------------------------------------------------------------------
  smd(
    {
      pattern: "gamble",
      desc: "gamble money.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || {};
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("*🚦Economy* is not active in current group.");
        const user = message.sender;
        //	if(message.chat!=="120363043857093839@g.us") return message.reply('This is not a economy group.')
        var texts = match.split(" ");
        var opp = texts[1]; // your value
        var value = texts[0].toLowerCase();
        var gg = parseInt(value);
        ///.mentionedJid[0] ? m.mentionedJid[0] : m.sender
        const balance = await eco.balance(user, "Suhail");
        const g = balance.wallet > parseInt(value);
        const k = 50;
        const a = k > parseInt(value);
        const twice = gg * 2;
        var hjkl;
        if (opp === "left") {
          hjkl =
            "https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/leftr.webp?raw=true";
        } else if (opp === "right") {
          hjkl =
            "https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/rightr.webp?raw=true";
        } else if (opp === "up") {
          hjkl =
            "https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/upr.webp?raw=true";
        } else if (opp === "down") {
          hjkl =
            "https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/downr.webp?raw=true";
        } else {
          message.reply(
            `Please provide direction(left,right,up,down).\nEg:- ${prefix}gamble 200 left`
          );
        }
        let media = await getBuffer(hjkl);
        message.reply(
          media,
          { packname: "David", author: "Economy" },
          "sticker"
        );
        const f = [
          "up",
          "right",
          "left",
          "down",
          "up",
          "left",
          "down",
          "right",
          "up",
          "down",
          "right",
          "left",
        ];
        const r = f[Math.floor(Math.random() * f.length)];
        if (!match)
          return message.reply(
            `Example:  ${prefix}gamble 100 direction(left,right,up,down)`
          );

        if (!value)
          return message.reply(
            "*Please, specify the amount you are gambling with!*"
          );
        if (!opp)
          return message.reply("*Specify the direction you are betting on!*");
        if (!gg)
          return message.reply(
            "*Check your text please, You are using the command in a wrong way*"
          );
        if (g == false)
          return message.reply(
            `*You don't have sufficient 🪙 Diamond to gamble with*`
          );
        if (a == true)
          return message.reply(
            `*Sorry ${message.pushName}, you can only gamble with more than 🪙50.*`
          );
        if (r == opp) {
          let give = await eco.give(user, "David", twice); //message.react('⭐️')
          return await message.reply(`*📈 You won 🪙${twice}*`);
          //return await Aviator.bot.sendButtonText(message.chat, `*📈 You won 🪙${twice}*`, `${Config.ownername.split(' ')[0]}-Economy \n Version: 0.0.6`, message);
        } else {
          let deduct = await eco.deduct(user, "David", texts[0]);

          //message.react('🤮')
          return await message.reply(`*📉 You lost 🪙${texts[0]}*`);
          //return await Aviator.bot.sendButtonText(message.chat,`*📉 You lost 🪙${texts[0]}*`, `${Config.ownername.split(' ')[0]}-Economy \n Version: 0.0.6`, message);
        }
      } catch (e) {
        message.error(`${e}\n\ncommand: gamble`, e);
      }
    }
  );

  //---------------------------------------------------------------------------
  smd(
    {
      pattern: "slot2",
      desc: "withdraw money from bank account.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message, match) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || {};
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("*🚦Economy* is not active in current group.");
        var today = new Date();
        if (today.getDay() == 6 || today.getDay() == 5 || today.getDay() == 0) {
          if (match == "help")
            return message.reply(
              `*1:* Use ${prefix}slot to play\n\n*2:* You must have 🪙100 in your wallet\n\n*3:* If you don't have money in wallet then 👛withdraw from your bank🏦\n\n*4:* If you don't have 🤑 money in your 🏦bank too then use economy features to 📈gain money`
            );
          if (match == "money")
            return message.reply(
              `*1:* Small Win --> +🪙20\n\n*2:* Small Lose --> -🪙20\n\n*3:* Big Win --> +🪙100\n\n*4:* Big Lose --> -🪙50\n\n*5:* 🎉 JackPot --> +🪙1000`
            );
          const fruit1 = ["🥥", "🍎", "🍇"];
          const fruit2 = ["🍎", "🍇", "🥥"];
          const fruit3 = ["🍇", "🥥", "🍎"];
          const fruit4 = "🍇";
          const lose = [
            "*You suck at playing this game*\n\n_--> 🍍-🥥-🍎_",
            "*Totally out of line*\n\n_--> 🥥-🍎-🍍_",
            "*Are you a newbie?*\n\n_--> 🍎-🍍-🥥_",
          ];
          const smallLose = [
            "*You cannot harvest coconut 🥥 in a pineapple 🍍 farm*\n\n_--> 🍍>🥥<🍍_",
            "*Apples and Coconut are not best Combo*\n\n_--> 🍎>🥥<🍎_",
            "*Coconuts and Apple are not great deal*\n\n_--> 🥥>🍎<🥥_",
          ];
          const won = [
            "*You harvested a basket of*\n\n_--> 🍎+🍎+🍎_",
            "*Impressive, You must be a specialist in plucking coconuts*\n\n_--> 🥥+🥥+🥥_",
            "*Amazing, you are going to be making pineapple juice for the family*\n\n_--> 🍍+🍍+🍍_",
          ];
          const near = [
            "*Wow, you were so close to winning pineapples*\n\n_--> 🍎-🍍+🍍_",
            "*Hmmm, you were so close to winning Apples*\n\n_--> 🍎+🍎-🍍_",
          ];
          const jack = [
            "*🥳 JackPot 🤑*\n\n_--> 🍇×🍇×🍇×🍇_",
            "*🎉 JaaackPooot!*\n\n_--> 🥥×🥥×🥥×🥥_",
            "*🎊 You Just hit a jackpot worth 🪙1000*",
          ];
          const user = message.sender;
          const k = 100;
          const balance1 = await eco.balance(user, "Suhail");
          if (k > balance1.wallet)
            return message.reply(
              `You are going to be spinning on your wallet, you need at least 🪙100`
            );
          const f1 = fruit1[Math.floor(Math.random() * fruit1.length)];
          const f2 = fruit2[Math.floor(Math.random() * fruit2.length)];
          const f3 = fruit3[Math.floor(Math.random() * fruit3.length)];
          //const f4 = fruit4[Math.floor(Math.random() * fruit4.length)];
          const mess1 = lose[Math.floor(Math.random() * lose.length)];
          const mess2 = won[Math.floor(Math.random() * won.length)];
          const mess3 = near[Math.floor(Math.random() * near.length)];
          const mess4 = jack[Math.floor(Math.random() * jack.length)];
          const mess5 = smallLose[Math.floor(Math.random() * smallLose.length)];
          if (match.split(" ")[0]) {
            let value = match.split(" ")[0];
            const balance = await eco.balance(message.sender, "Suhail");
            console.log(balance.wallet);
            if (value <= balance.wallet) {
              const deduff = Math.floor(Math.random() * value);
              if (f1 !== f2 && f2 !== f3) {
                const deduct1 = await eco.deduct(user, "Suhail", deduff);
                return message.reply(
                  `${mess1}\n\n*Big Lose -->* _🪙${deduff}_`
                );
              } else if (f1 == f2 && f2 == f3) {
                const give1 = await eco.give(user, "Suhail", deduff / 2);
                return message.reply(
                  `${mess2}\n*_Little Jackpot -->* _🪙${deduff / 2}_`
                );
              } else if (f1 == f2 && f2 !== f3) {
                const give2 = await eco.give(user, "Suhail", deduff);
                return message.reply(`${mess3}\n*Small Win -->* _🪙${deduff}_`);
              } else if (f1 !== f2 && f1 == f3) {
                const deduct2 = await eco.deduct(user, "Suhail", deduff);
                return message.reply(
                  `${mess5}\n\n*Small Lose -->* _🪙${deduff}_`
                );
              } else if (f1 !== f2 && f2 == f3) {
                const give4 = eco.give(user, "Suhail", deduff);
                return message.reply(
                  `${mess3}\n\n*Small Win -->* _🪙${deduff}_`
                );
              } else if (f1 == f2 && f2 == f3 && f3 == f4) {
                const give5 = eco.give(user, "Suhail", deduff * 20);
                return message.reply(
                  `${mess4}\n\n_🎊 JackPot --> _🪙${deduff * 20}_`
                );
              } else {
                return message.reply(`Do you understand what you are doing?`);
              }
            } else {
              return message.reply(
                "You don't have enough 💰amount in your👛 wallet.\n- Please don't provide 🤑amount."
              );
            }
          }
          if (f1 !== f2 && f2 !== f3) {
            const deduct1 = await eco.deduct(user, "Suhail", 50);
            message.reply(`${mess1}\n\n*Big Lose -->* _🪙50_`);
          } else if (f1 == f2 && f2 == f3) {
            const give1 = await eco.give(user, "Suhail", 100);
            message.reply(`${mess2}\n*_Little Jackpot -->* _🪙100_`);
          } else if (f1 == f2 && f2 !== f3) {
            const give2 = await eco.give(user, "Suhail", 20);
            message.reply(`${mess3}\n*Small Win -->* _🪙20_`);
          } else if (f1 !== f2 && f1 == f3) {
            const deduct2 = await eco.deduct(user, "Suhail", 20);
            message.reply(`${mess5}\n\n*Small Lose -->* _🪙20_`);
          } else if (f1 !== f2 && f2 == f3) {
            const give4 = eco.give(user, "Suhail", 20);
            message.reply(`${mess3}\n\n*Small Win -->* _🪙20_`);
          } else if (f1 == f2 && f2 == f3 && f3 == f4) {
            const give5 = eco.give(user, "Suhail", 1000);
            message.reply(`${mess4}\n\n_🎊 JackPot --> _🪙1000_`);
          } else {
            message.reply(`Do you understand what you are doing?`);
          }
        } else {
          message.reply(
            `*You can only play this game during weekends*\n\n*🌿 Friday*\n*🎏 Saturday*\n*🎐 Sunday*`
          );
        }
      } catch (e) {
        message.error(`${e}\n\ncommand: slot2`, e);
      }
    }
  );

  smd(
    {
      pattern: "slot",
      desc: "slot game.",
      category: "economy",
      filename: __filename,
      react: "💷",
    },
    async (message) => {
      try {
        let zerogroup = (await sck.findOne({ id: message.chat })) || {};
        let mongoschemas = zerogroup.economy || "false";
        if (mongoschemas == "false")
          return message.reply("*🚦Economy* is not active in current group.");
        const kg = 100;
        const balance1 = await eco.balance(message.sender, "Suhail");
        if (kg > balance1.wallet)
          return message.reply(
            `You are going to be spinning on your wallet, you need at least 🪙100`
          );
        var r_ban = new Array();
        r_ban[0] = "1 : 2 : 3";
        r_ban[1] = "1 : 2 : 3";
        r_ban[2] = "1 : 2 : 3";
        r_ban[3] = "4 : 3 : 3";
        r_ban[4] = "1 : 1 : 1";
        r_ban[5] = "5 : 2 : 5";
        r_ban[6] = "3 : 5 : 3";
        r_ban[7] = "1 : 3 : 6";
        r_ban[8] = "6 : 2 : 7";
        r_ban[9] = "1 : 6 : 3";
        r_ban[10] = "6 : 3 : 2";
        r_ban[11] = "5 : 5 : 6";
        r_ban[12] = "1 : 5 : 3";
        r_ban[13] = "4 : 1 : 7";
        r_ban[14] = "4 : 3 : 2";
        r_ban[15] = "4 : 3 : 2";
        r_ban[16] = "7 : 4 : 6";
        r_ban[17] = "6 : 5 : 1";
        r_ban[18] = "5 : 7 : 2";

        var p = Math.floor(19 * Math.random());
        var q = Math.floor(19 * Math.random());
        var r = Math.floor(19 * Math.random());
        var i = r_ban[p];
        var j = r_ban[q];
        var k = r_ban[r];
        console.log(i + "\n" + j + "\n" + k);
        let t = i.split(":");
        let tt = j.split(":");
        let ttt = k.split(":");
        var lol;
        if (t[2] === tt[1] && tt[1] === ttt[0]) lol = true;
        if (t[0] === tt[1] && tt[1] === ttt[2]) lol = true;
        if (t[0] === tt[0] && tt[0] === ttt[0]) lol = true;
        if (t[1] === tt[1] && tt[1] === ttt[1]) lol = true;
        if (t[2] === tt[2] && tt[2] === ttt[2]) lol = true;
        if (t[0] === tt[1] && tt[1] === ttt[2]) lol = true;
        if (t[2] === tt[1] && tt[1] === ttt[0]) lol = true;
        if (t[0] === t[1] && t[0] === t[2]) lol = true;
        if (tt[0] === tt[1] && tt[0] === tt[2]) lol = true;
        if (ttt[0] === ttt[1] && ttt[0] === ttt[2]) lol = true;
        if (t[0] === ttt[1] && t[0] === ttt[2]) lol = true;
        if (lol) {
          const deduff = Math.floor(Math.random() * 5000);
          const give2 = await eco.give(message.sender, "Suhail", deduff * 2);
          let st = `🎰 Slot Machine Result\n     ${i}\n\n     ${j}\n\n     ${k}\n\nWow Jackpot🎊.`;
          let str = st
            .replace(/1/g, `🔴`)
            .replace(/2/g, `🔵`)
            .replace(/3/g, `🟣`)
            .replace(/4/g, `🟢`)
            .replace(/5/g, `🟡`)
            .replace(/6/g, `⚪️`)
            .replace(/7/g, `⚫️`)
            .replace(/:/g, `  `);

          return await message.reply(`You got ${deduff * 10} in your wallet.`);
          // return await Aviator.bot.sendButtonText(message.chat,str+`You got ${deduff*10} in your wallet.`, `${Config.ownername.split(' ')[0]}-Economy \n Version: 0.0.6`, message);
        } else {
          const deduff = Math.floor(Math.random() * 300);
          const deduct1 = await eco.deduct(message.sender, "Suhail", deduff);
          let st = `\n🎰 Slot Machine Result\n     ${i}\n\n      ${j}\n\n      ${k}\n\nNot Jacpot📉 but lost `;
          let str = st
            .replace(/1/g, `🔴`)
            .replace(/2/g, `🔵`)
            .replace(/3/g, `🟣`)
            .replace(/4/g, `🟢`)
            .replace(/5/g, `🟡`)
            .replace(/6/g, `⚪️`)
            .replace(/7/g, `⚫️`)
            .replace(/:/g, `    `);
          return await message.reply(str + ` ${deduff}.`);
        }
      } catch (e) {
        message.error(`${e}\n\ncommand: slot`, e);
      }
    }
  );
}


const astro_patch_numGuess = {};
class GuessingGame {
  constructor() {
    this.attempts = 0;
    this.player = "";
    this.id = "";
    this.status = false;
    this.mode = "low";
    this.randomNumber = 0;
    this.guessedNumber = 0;
  }
}
const logoName =
  "█▄ █ █   █  █▄ ▄█  ██▄ ██▀ █▀▄\n█ ▀█ █▄█  █  ▀  █  █▄█ █▄▄ █▀▄";
  
  
  //.   GAMES CMD
  
smd(
  {
    cmdname: "guess",
    info: "Play Guessing Number game",
    filename: __filename,
    type: "game",
    use: "< easy | medium | hard >",
  },
  async (_0x435f9e, _0x4a2fab) => {
    try {
      const _0x131859 = _0x435f9e.chat;
      let _0x44b37a = astro_patch_numGuess[_0x131859];
      let _0x2bfba9 = _0x4a2fab.toLowerCase();
      let _0xc06dac =
        _0x44b37a && _0x44b37a?.player === _0x435f9e.sender
          ? true
          : _0x435f9e.isCreator;
      if (_0x2bfba9 === "end" && _0x44b37a) {
        if (_0xc06dac) {
          delete astro_patch_numGuess[_0x131859];
          return await _0x435f9e.reply(
            "*_Number Guessing Game ended. Goodbye!_*"
          );
        } else {
          return await _0x435f9e.reply(
            "*_You're not player of running game!!_*"
          );
        }
      } else if (_0x2bfba9 === "end" && !_0x44b37a) {
        return await _0x435f9e.reply(
          "*_Hey " +
            (_0x435f9e.senderName || "buddy") +
            ", There's no game running yet!!_*"
        );
      }
      if (_0x44b37a && _0x44b37a.status) {
        return await _0x435f9e.reply(
          "*_A game is already in progress in this chat._*\n To End the Game:  .Guess end"
        );
      }
      let _0x2f035f = "";
      let _0x29dc2e = 0;
      if (_0x2bfba9.includes("easy")) {
        _0x29dc2e = Math.floor(Math.random() * 100);
        _0x2f035f = "Easy";
      } else if (_0x2bfba9.includes("medium")) {
        _0x29dc2e = Math.floor(Math.random() * 1000);
        _0x2f035f = "Medium";
      } else if (_0x2bfba9.includes("hard")) {
        _0x29dc2e = Math.floor(Math.random() * 10000);
        _0x2f035f = "Hard";
      } else {
        return await _0x435f9e.send(
          logoName +
            "\n   𝗡𝘂𝗺𝗯𝗲𝗿 𝗚𝘂𝗲𝘀𝘀𝗶𝗻𝗴 𝗚𝗮𝗺𝗲 𝗠𝗲𝗻𝘂, \n\n*Uhh Dear, Choose " +
            (_0x2bfba9 ? "a Valid Option" : "an Option") +
            " First, Like _" +
            prefix +
            "Guess Normal_*\n*𝗔𝘃𝗮𝗶𝗹𝗮𝗯𝗹𝗲 𝗠𝗼𝗱𝗲𝘀:*\n  ▢ Easy   ( _0 to 100_)\n  ▢ Medium ( _0 to 1000_)\n  ▢ Hard   ( _0 to 10000_)\n  ▢ End  ( _End the Game_)\n"
        );
      }
      if (!_0x44b37a) {
        astro_patch_numGuess[_0x131859] = new GuessingGame();
      }
      _0x44b37a = astro_patch_numGuess[_0x131859];
      _0x44b37a.status = true;
      _0x44b37a.randomNumber = _0x29dc2e;
      _0x44b37a.mode = _0x2f035f;
      _0x44b37a.player = _0x435f9e.sender;
      _0x44b37a.id = _0x435f9e.chat;
      await _0x435f9e.reply(
        logoName +
          "\n  𝗡𝘂𝗺𝗯𝗲𝗿 𝗚𝘂𝗲𝘀𝘀𝗶𝗻𝗴 𝗚𝗮𝗺𝗲 𝗦𝘁𝗮𝗿𝘁𝗲𝗱\n\n*𝗦𝗲𝗹𝗲𝗰𝘁𝗲𝗱 𝗠𝗼𝗱𝗲 : _" +
          _0x44b37a.mode +
          "_* \n\t▢ *_Well, I'm thinking of a number between " +
          (_0x44b37a.mode === "Easy"
            ? "1 and 100"
            : _0x44b37a.mode === "Medium"
            ? "1 and 1000"
            : "1 and 10000") +
          "._*\n\n*𝗬𝗼𝘂𝗿 𝗧𝗮𝘀𝗸 :*\n   _▢ You Task is to Guess That Number._\n   _▢ Checks How Sharp is Your Memory._\n   _▢ Lets see How Many Attempts You Take To Guess Number._"
      );
    } catch (_0x55d9e4) {
      await _0x435f9e.error(_0x55d9e4 + "\n\ncommand:guess", _0x55d9e4);
    }
  }
);
const astro_patch_cfg = {};
const quotes = [
  "Connect Four: Where strategy meets fun!",
  "Let the battle of four-in-a-row begin!",
  "It's time to connect and conquer!",
  "Can you outsmart your opponent in Connect Four?",
  "Challenge your mind with Connect Four's strategic gameplay.",
  "Connect Four: A game of wits and tactics.",
  "Four in a row, that's the way to go!",
  "Connect Four: Unleash your strategic genius.",
  "Get ready to drop and connect your way to victory!",
  "Connect Four: Where every move counts.",
  "Prove your skills in the ultimate Connect Four showdown!",
  "Connect Four: The classic game of strategy and anticipation.",
  "Connect Four: Easy to learn, hard to master.",
  "Who will be the first to connect their pieces and claim victory?",
  "Prepare for a thrilling battle of strategy in Connect Four.",
  "Get ready to connect and win!",
  "Who will be the Connect Four champion?",
  "Strategize and conquer the board!",
  "Let the Connect Four battle begin!",
  "Connect Four: The ultimate test of skill!",
];
class ConnectFourGame {
  constructor() {
    this.player1 = "";
    this.player2 = "";
    this.rowsMatrix = 6;
    this.columnsMatrix = 7;
    this.currentPlayer = "";
    this.gameStatus = false;
    this.attempts = {};
    this.matrix = [
      ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
      ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
      ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
      ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
      ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
      ["⚪", "⚪", "⚪", "⚪", "⚪", "⚪", "⚪"],
    ];
  }
  async updateLastIndex(_0xff60d2) {
    let _0x47973e = this.currentPlayer === this.player1 ? "🔵" : "🔴";
    let _0x2aa8d4 = this.matrix.length - 1;
    while (_0x2aa8d4 > 0 && this.matrix[_0x2aa8d4][_0xff60d2] !== "⚪") {
      _0x2aa8d4--;
    }
    if (this.matrix[_0x2aa8d4][_0xff60d2] == "⚪") {
      this.matrix[_0x2aa8d4][_0xff60d2] = _0x47973e;
      return true;
    } else {
      return false;
    }
  }
  async printMatrix() {
    let _0x14453f = "";
    for (let _0x90aa39 = 0; _0x90aa39 < this.matrix.length; _0x90aa39++) {
      _0x14453f += "\n| ";
      for (
        let _0x5cfaf1 = 0;
        _0x5cfaf1 < this.matrix[_0x90aa39].length;
        _0x5cfaf1++
      ) {
        _0x14453f += this.matrix[_0x90aa39][_0x5cfaf1] + " | ";
      }
    }
    return _0x14453f;
  }
  async checkWin() {
    let _0x1ec623 = this.currentPlayer === this.player1 ? "🔵" : "🔴";
    for (let _0x5a1b58 = 0; _0x5a1b58 < this.matrix.length; _0x5a1b58++) {
      for (
        let _0x498289 = 0;
        _0x498289 <= this.matrix[_0x5a1b58].length - 4;
        _0x498289++
      ) {
        if (
          this.matrix[_0x5a1b58][_0x498289] === _0x1ec623 &&
          this.matrix[_0x5a1b58][_0x498289 + 1] === _0x1ec623 &&
          this.matrix[_0x5a1b58][_0x498289 + 2] === _0x1ec623 &&
          this.matrix[_0x5a1b58][_0x498289 + 3] === _0x1ec623
        ) {
          return this.currentPlayer;
        }
      }
    }
    for (let _0x14a347 = 0; _0x14a347 <= this.matrix.length - 4; _0x14a347++) {
      for (
        let _0x22245c = 0;
        _0x22245c < this.matrix[_0x14a347].length;
        _0x22245c++
      ) {
        if (
          this.matrix[_0x14a347][_0x22245c] === _0x1ec623 &&
          this.matrix[_0x14a347 + 1][_0x22245c] === _0x1ec623 &&
          this.matrix[_0x14a347 + 2][_0x22245c] === _0x1ec623 &&
          this.matrix[_0x14a347 + 3][_0x22245c] === _0x1ec623
        ) {
          return this.currentPlayer;
        }
      }
    }
    for (let _0x24e1a4 = 0; _0x24e1a4 <= this.matrix.length - 4; _0x24e1a4++) {
      for (
        let _0x21c69f = 0;
        _0x21c69f <= this.matrix[_0x24e1a4].length - 4;
        _0x21c69f++
      ) {
        if (
          this.matrix[_0x24e1a4][_0x21c69f] === _0x1ec623 &&
          this.matrix[_0x24e1a4 + 1][_0x21c69f + 1] === _0x1ec623 &&
          this.matrix[_0x24e1a4 + 2][_0x21c69f + 2] === _0x1ec623 &&
          this.matrix[_0x24e1a4 + 3][_0x21c69f + 3] === _0x1ec623
        ) {
          return this.currentPlayer;
        }
      }
    }
    for (let _0x1306cd = 0; _0x1306cd <= this.matrix.length - 4; _0x1306cd++) {
      for (
        let _0x205612 = this.matrix[_0x1306cd].length - 1;
        _0x205612 >= 3;
        _0x205612--
      ) {
        if (
          this.matrix[_0x1306cd][_0x205612] === _0x1ec623 &&
          this.matrix[_0x1306cd + 1][_0x205612 - 1] === _0x1ec623 &&
          this.matrix[_0x1306cd + 2][_0x205612 - 2] === _0x1ec623 &&
          this.matrix[_0x1306cd + 3][_0x205612 - 3] === _0x1ec623
        ) {
          return this.currentPlayer;
        }
      }
    }
    return null;
  }
}
smd(
  {
    cmdname: "cfg",
    info: "Start Connect Four game session.",
    filename: __filename,
    type: "game",
    use: "< @user >",
  },
  async (_0x211ed5) => {
    const _0x4f21cc = _0x211ed5.chat;
    let _0x20d34d = astro_patch_cfg[_0x4f21cc];
    if (_0x20d34d && _0x20d34d.gameStatus) {
      return await _0x211ed5.send(
        "*A game is already in progress in this chat.*\n*Game Between :- _@" +
          _0x20d34d.player1.split("@")[0] +
          "_ vs _@" +
          _0x20d34d.player2.split("@")[0] +
          '_*\n_If You @{message.sender.split("@")[0]} wants to Play,_ \n_Then Delete Cfg Session:- {prefix}delcfg_\n',
        {
          mentions: [_0x20d34d.player1, _0x20d34d.player2],
        }
      );
    }
    if (!_0x20d34d) {
      _0x20d34d = new ConnectFourGame();
      astro_patch_cfg[_0x4f21cc] = _0x20d34d;
    }
    try {
      let _0x33f19d = _0x211ed5.quoted
        ? _0x211ed5.quoted.sender
        : _0x211ed5.mentionedJid
        ? _0x211ed5.mentionedJid[0]
        : "-";
      _0x33f19d = _0x33f19d === _0x211ed5.sender ? "" : "" + _0x33f19d;
      if (_0x33f19d.includes("@")) {
        _0x20d34d.player1 = _0x211ed5.sender;
        _0x20d34d.player2 = _0x33f19d;
        _0x20d34d.gameStatus = true;
      } else if (!_0x20d34d.player1 || _0x20d34d.player1 === _0x211ed5.sender) {
        _0x20d34d.player1 = _0x211ed5.sender;
        return await _0x211ed5.send(
          "▄▀▀ ▄▀▄ █▄ █ █▄ █ ▄▀▀ ▀█▀ \n▀▄▄ ▀▄▀ █ ▀█ █ ▀█ ▀▄▄    █\n   𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝗙𝗼𝘂𝗿 𝗚𝗮𝗺𝗲 𝗦𝗲𝘀𝘀𝗶𝗼𝗻 \n\n*Connect Four Game Session Created...*\n*room Id : _cfg-" +
            _0x4f21cc.split("@")[0] +
            "_*\n\n_Player 1: @" +
            _0x20d34d.player1.split("@")[0] +
            " Joined_\n_Waiting For Another Player To Start Game..._\n\n*Type _.cfg to Join This Game Session.*",
          {
            mentions: [_0x20d34d.player1],
          }
        );
      } else if (_0x211ed5.sender != _0x20d34d.player1) {
        _0x20d34d.player2 = _0x211ed5.sender;
        _0x20d34d.gameStatus = true;
      }
    } catch (_0x264edb) {
      await _0x211ed5.reply("errors : " + _0x264edb);
    }
    if (_0x20d34d.gameStatus) {
      _0x20d34d.currentPlayer = _0x20d34d.player1;
      _0x20d34d.attempts[_0x20d34d.player1] = 0;
      _0x20d34d.attempts[_0x20d34d.player2] = 0;
      let _0x364961 = await _0x20d34d.printMatrix();
      let _0x2d3c4c =
        "▄▀▀ ▄▀▄ █▄ █ █▄ █ ▄▀▀ ▀█▀\n▀▄▄ ▀▄▀ █ ▀█ █ ▀█ ▀▄▄    █\n   𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝗙𝗼𝘂𝗿 𝗚𝗮𝗺𝗲 𝗦𝘁𝗮𝗿𝘁𝗲𝗱 \n\n" +
        _0x364961 +
        " \n◣━━━━━━━━━━ ━━━━━━━━━━◢\n\n*Connet Four Game Session started* \n*room Id : _cfg-" +
        _0x4f21cc.split("@")[0] +
        "_*\n\n*Current Turn: _@" +
        _0x20d34d.player1.split("@")[0] +
        "_*\n*Next Turn :  _@" +
        _0x20d34d.player2.split("@")[0] +
        "_*\n*_Hey @" +
        _0x20d34d.currentPlayer.split("@")[0] +
        ", Please take your turn_*\n▢ _Enter Line Number Between *'1'* to *'7'*_\n\n*Connect Four Game Task :*\n  _Player Needs To Connect Four Colors in a Sequence,_\n  _You can Connect Four Colors ▢Horizontally, ▢Vertically, ▢Diagonally._         \n\n*Lets Play :- _" +
        quotes[Math.floor(Math.random() * quotes.length)] +
        "_*\n";
      await _0x211ed5.send(_0x2d3c4c, {
        mentions: [
          _0x20d34d.player1,
          _0x20d34d.player2,
          _0x20d34d.currentPlayer,
        ],
      });
    }
  }
);
smd(
  {
    pattern: "delcfg",
    desc: "deletes Connect Four running session.",
    filename: __filename,
    category: "game",
  },
  async ({
    chat: _0xa871db,
    isCreator: _0x5157de,
    send: _0x4b76e6,
    reply: _0x28e18a,
    sender: _0xea0ced,
    senderName: _0x2c14e6,
  }) => {
    let _0x202014 = astro_patch_cfg[_0xa871db];
    if (_0x202014) {
      if (
        !_0x5157de &&
        _0xea0ced !== _0x202014.player2 &&
        _0xea0ced !== _0x202014.player1
      ) {
        await _0x28e18a(
          "*_Hey " + _0x2c14e6 + ", You're not player of running game_*\n"
        );
      } else {
        delete astro_patch_cfg[_0xa871db];
        await _0x28e18a(
          "▄▀▀ ▄▀▄ █▄ █ █▄ █ ▄▀▀ ▀█▀\n▀▄▄ ▀▄▀ █ ▀█ █ ▀█ ▀▄▄    █\n   𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝗙𝗼𝘂𝗿 𝗚𝗮𝗺𝗲 𝗗𝗲𝗹𝗲𝘁𝗲𝗱\n\n*Room Id : _cfg-" +
            _0xa871db.split("@")[0] +
            "_ Cleared Successfully*\n*_Connect Four Game Session Deleted From This Chat..._*\n"
        );
      }
    } else {
      await _0x28e18a(
        "▄▀▀ ▄▀▄ █▄ █ █▄ █ ▄▀▀ ▀█▀ \n▀▄▄ ▀▄▀ █ ▀█ █ ▀█ ▀▄▄    █\n  𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝗙𝗼𝘂𝗿 𝗚𝗮𝗺𝗲 404𝗘𝗿𝗿𝗼𝗿   \n\n*Uhh Dear, _Theres No Game Started yet in This Chat_*\n"
      );
    }
  }
);
smd(
  {
    on: "text",
  },
  async (_0xcabf04, _0x265843) => {
    const _0x4d1cd7 = _0xcabf04.chat;
    const _0x47f35e = astro_patch_cfg[_0x4d1cd7];
    if (!_0x47f35e) {
      return;
    }
    let _0x5acce8 = parseInt(
      _0xcabf04.text ? _0xcabf04.text.split(" ")[0] : "NaN"
    );
    if (
      _0x47f35e.gameStatus &&
      _0x47f35e.currentPlayer === _0xcabf04.sender &&
      !isNaN(_0x5acce8)
    ) {
      try {
        let _0x423cec = _0x5acce8 - 1;
        if (_0x423cec < 0 || _0x423cec >= _0x47f35e.columnsMatrix) {
          return;
        }
        let _0x3e702a = await _0x47f35e.updateLastIndex(_0x423cec);
        if (!_0x3e702a) {
          return await _0xcabf04.bot.sendMessage(
            _0xcabf04.chat,
            {
              text:
                "*_Invalid move Dear @" +
                _0x47f35e.currentPlayer.split("@")[0] +
                ", Line you enter is completely Filled. Please Give Other Line Numbers._*",
              mentions: [_0x47f35e.currentPlayer],
            },
            {
              quoted: _0xcabf04,
            }
          );
        }
        let _0x1521ca = (await _0x47f35e.checkWin()) || false;
        _0x47f35e.attempts[_0x47f35e.currentPlayer]++;
        let _0x3fe5ce = await _0x47f35e.printMatrix();
        _0x47f35e.currentPlayer =
          _0x47f35e.currentPlayer === _0x47f35e.player1
            ? _0x47f35e.player2
            : _0x47f35e.player1;
        if (!_0x1521ca) {
          let _0x2c98f1 =
            "▄▀▀ ▄▀▄ █▄ █ █▄ █ ▄▀▀ ▀█▀ \n▀▄▄ ▀▄▀ █ ▀█ █ ▀█ ▀▄▄    █\n   𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝗙𝗼𝘂𝗿 cfg_𝗲 𝗕𝗼𝗮𝗿𝗱\n\n" +
            _0x3fe5ce +
            "\n◣━━━━━━━━━━ ━━━━━━━━━━◢\n\n*Current Turn " +
            (_0x47f35e.currentPlayer === _0x47f35e.player1 ? "🔵" : "🔴") +
            " : _@" +
            _0x47f35e.currentPlayer.split("@")[0] +
            "_*\n*Nextt Turn  " +
            (_0x47f35e.currentPlayer === _0x47f35e.player1 ? "🔴" : "🔵") +
            " : _@" +
            (_0x47f35e.currentPlayer === _0x47f35e.player1
              ? _0x47f35e.player2
              : _0x47f35e.player1
            ).split("@")[0] +
            "_*\n\n ▢ *_Please take your turn to Break Pattern_*\n ▢ _Enter Line Number Between *'1'* to *'7'*_\n\n*Connent Four Game Quote :*\n  ▢ _" +
            quotes[Math.floor(Math.random() * quotes.length)] +
            "_\n";
          return await _0xcabf04.send(_0x2c98f1, {
            mentions: [_0x47f35e.player1, _0x47f35e.player2],
          });
        } else {
          delete astro_patch_cfg[_0x4d1cd7];
          return await _0xcabf04.send(
            "▄▀▀ ▄▀▄ █▄ █ █▄ █ ▄▀▀ ▀█▀ \n▀▄▄ ▀▄▀ █ ▀█ █ ▀█ ▀▄▄    █\n   𝗖𝗼𝗻𝗻𝗲𝗰𝘁 𝗙𝗼𝘂𝗿 𝗚𝗮𝗺𝗲 𝗙𝗶𝗻𝗶𝘀𝗵𝗲𝗱\n\n*𝗪𝗶𝗻𝗻𝗲𝗿 𝗢𝗳 𝗧𝗵𝗲 𝗚𝗮𝗺𝗲 𝗜𝘀: _@" +
              _0x1521ca.split("@")[0] +
              "_*\n*𝗟𝗼𝗼𝘀𝗲𝗿 𝗢𝗳 𝗧𝗵𝗲 𝗚𝗮𝗺𝗲 𝗜𝘀: _@" +
              _0x47f35e.currentPlayer.split("@")[0] +
              "_*\n\n" +
              _0x3fe5ce +
              "\n◣━━━━━━━━━━ ━━━━━━━━━━◢     \n\n*_Congratulations! @" +
              _0x1521ca.split("@")[0] +
              " you win the Game!_* \n_You Connect Four Colors in_ '" +
              _0x47f35e.attempts[_0x1521ca] +
              "' _Turns._\n\n_Connect Four Game Session Finished Now_\n_Type_ .Cfg _to Start Again Connect Four Session._\n",
            {
              mentions: [_0x47f35e.player1, _0x47f35e.player2],
            }
          );
        }
      } catch (_0x30983e) {
        return await console.log("Connect Four Game Error : ", _0x30983e);
      }
    }
  }
);
const countries = {
  Afghanistan: "Kabul",
  Albania: "Tirana",
  Algeria: "Algiers",
  Angola: "Luanda",
  Argentina: "Buenos Aires",
  Armenia: "Yerevan",
  Australia: "Canberra",
  Austria: "Vienna",
  Azerbaijan: "Baku",
  Bahamas: "Nassau",
  Bahrain: "Manama",
  Bangladesh: "Dhaka",
  Barbados: "Bridgetown",
  Belarus: "Minsk",
  Belgium: "Brussels",
  Belize: "Belmopan",
  Benin: "Porto-Novo",
  Bhutan: "Thimphu",
  Bolivia: "Sucre",
  Botswana: "Gaborone",
  Brazil: "Brasília",
  Bulgaria: "Sofia",
  "Burkina Faso": "Ouagadougou",
  Burundi: "Gitega",
  "Cabo Verde": "Praia",
  Cambodia: "Phnom Penh",
  Cameroon: "Yaoundé",
  Canada: "Ottawa",
  "Central African Republic": "Bangui",
  Chad: "N'Djamena",
  Chile: "Santiago",
  China: "Beijing",
  Colombia: "Bogotá",
  Comoros: "Moroni",
  "Costa Rica": "San jose",
  "Cote d'Ivoire": "Yamoussoukro",
  Croatia: "Zagreb",
  Cuba: "Havana",
  Cyprus: "Nicosia",
  "Czech Republic": "Prague",
  Denmark: "Copenhagen",
  Djibouti: "Djibouti",
  Dominica: "Roseau",
  "Dominican Republic": "Santo Domingo",
  Ecuador: "Quito",
  Egypt: "Cairo",
  "El Salvador": "San Salvador",
  "Equatorial Guinea": "Malabo",
  Eritrea: "Asmara",
  Estonia: "Tallinn",
  Eswatini: "Mbabane",
  Ethiopia: "Addis Ababa",
  Fiji: "Suva",
  Finland: "Helsinki",
  France: "Paris",
  Gabon: "Libreville",
  Gambia: "Banjul",
  Georgia: "Tbilisi",
  Germany: "Berlin",
  Ghana: "Accra",
  Greece: "Athens",
  Grenada: "St. George's",
  Guatemala: "Guatemala City",
  Guinea: "Conakry",
  "Guinea-Bissau": "Bissau",
  Guyana: "Georgetown",
  Haiti: "Port prince",
  Honduras: "Tegucigalpa",
  Hungary: "Budapest",
  Iceland: "Reykjavik",
  India: "New Delhi",
  Indonesia: "Jakarta",
  Iran: "Tehran",
  Iraq: "Baghdad",
  Ireland: "Dublin",
  Israel: "Jerusalem",
  Italy: "Rome",
  Jamaica: "Kingston",
  Japan: "Tokyo",
  Jordan: "Amman",
  Kazakhstan: "Nur Sultan",
  Kenya: "Nairobi",
  Kiribati: "Tarawa",
  "Korea, North": "Pyongyang",
  "Korea, South": "Seoul",
  Kosovo: "Pristina",
  Kuwait: "Kuwait",
  Kyrgyzstan: "Bishkek",
  Laos: "Vientiane",
  Latvia: "Riga",
  Lebanon: "Beirut",
  Lesotho: "Maseru",
  Liberia: "Monrovia",
  Libya: "Tripoli",
  Liechtenstein: "Vaduz",
  Lithuania: "Vilnius",
  Luxembourg: "Luxembourg City",
  Madagascar: "Antananarivo",
  Malawi: "Lilongwe",
  Malaysia: "Kuala Lumpur",
  Maldives: "Male",
  Mali: "Bamako",
  Malta: "Valletta",
  "Marshall Islands": "Majuro",
  Mauritania: "Nouakchott",
  Mauritius: "Port Louis",
  Mexico: "Mexico City",
  Micronesia: "Palikir",
  Moldova: "Chisinau",
  Monaco: "Monaco",
  Mongolia: "Ulaanbaatar",
  Montenegro: "Podgorica",
  Morocco: "Rabat",
  Mozambique: "Maputo",
  Myanmar: "Naypyidaw",
  Namibia: "Windhoek",
  Nauru: "Yaren",
  Nepal: "Kathmandu",
  Netherlands: "Amsterdam",
  "New Zealand": "Wellington",
  Nicaragua: "Managua",
  Niger: "Niamey",
  Nigeria: "Abuja",
  "North Macedonia": "Skopje",
  Norway: "Oslo",
  Oman: "Muscat",
  Pakistan: "Islamabad",
  Palau: "Ngerulmud",
  Palestine: "Ramallah",
  Panama: "Panama City",
  Paraguay: "Asunción",
  Peru: "Lima",
  Philippines: "Manila",
  Poland: "Warsaw",
  Portugal: "Lisbon",
  Qatar: "Doha",
  Romania: "Bucharest",
  Russia: "Moscow",
  Rwanda: "Kigali",
  "Saint Kitts": "Basseterre",
  "Saint Lucia": "Castries",
  Samoa: "Apia",
  "San Marino": "San Marino",
  "Saudi Arabia": "Riyadh",
  Senegal: "Dakar",
  Serbia: "Belgrade",
  Seychelles: "Victoria",
  "Sierra Leone": "Freetown",
  Singapore: "Singapore",
  Slovakia: "Bratislava",
  Slovenia: "Ljubljana",
  "Solomon Islands": "Honiara",
  Somalia: "Mogadishu",
  "South Africa": "Pretoria",
  "South Sudan": "Juba",
  Spain: "Madrid",
  "Sri Lanka": "Colombo",
  Sudan: "Khartoum",
  Suriname: "Paramaribo",
  Sweden: "Stockholm",
  Switzerland: "Bern",
  Syria: "Damascus",
  Taiwan: "Taipei",
  Tajikistan: "Dushanbe",
  Tanzania: "Dodoma",
  Thailand: "Bangkok",
  "Timor-Leste": "Dili",
  Togo: "Lome",
  Tonga: "Nuku'alofa",
  Tunisia: "Tunis",
  Turkey: "Ankara",
  Turkmenistan: "Ashgabat",
  Tuvalu: "Funafuti",
  Uganda: "Kampala",
  Ukraine: "Kyiv",
  "United Arab Emirates": "Abu Dhabi",
  "United Kingdom": "London",
  "United States": "Washington",
  Uruguay: "Montevideo",
  Uzbekistan: "Tashkent",
  Vanuatu: "Port Vila",
  Vatican: "Vatican City",
  Venezuela: "Caracas",
  Vietnam: "Hanoi",
  Yemen: "Sana",
  Zambia: "Lusaka",
  Zimbabwe: "Harare",
};
let captions = {
  waitTime: 30,
  winReward: 2000,
  onStart:
    "*Capital Finding Game Started*\n*Player:* _@$player_\n*Task :* _Tell the Capital of *$country*_\n\n_Your Time Starts Now, You Have $waitTime seconds to Answer_",
  onTimeOut:
    "*Game Over, run out of time*\n\n*Player:* _@$player_\n*Reason:* _TimeOut!, You're not responed_\n\n*Answer:*\n The Capital of *$country* is *$capital*",
  onLimitEnd:
    "*Game Over, Attempts limit Exceed*\n\n*Player:* _@$player_\n*Reason:* _Not responed right answer in 3 attemps_\n\n*Answer:*\n The Capital of *$country* is *$capital*",
  onWrongAns:
    "*_Uhh dear, Your answer is not correct_*\n\n*Player:* _@$player_\n_You have *$attempt more attempt!*_\n\n*You have $waitTime seconds to answer!*",
  onWinGame:
    "*_Waoww, Your Answer is Correct_*\n*Player:* _@$player_\n\n_Capital of *$country* is *$capital*._\n_You give right answer in *$attempt attepmt*_\n_$amount cash added in your wallet_",
};
let astro_patch_Capital = {
  id: "",
  player: "",
  country: "",
  capital: "",
  attempts: 0,
  waitTime: 20,
  preAns: "previousAnswer",
  timer: "",
};
async function timerFuntions(_0x538b5f, _0x59929b) {
  await _0x538b5f.bot.sendMessage(_0x538b5f.chat, {
    text: captions.onTimeOut
      .replace("$player", _0x59929b.player.split("@")[0])
      .replace("$country", _0x59929b.country)
      .replace("$capital", _0x59929b.capital),
    mentions: [_0x59929b.player],
  });
  delete astro_patch_Capital[_0x538b5f.sender];
}
smd(
  {
    pattern: "co",
    alias: ["capital"],
    desc: "Find capital of the city",
    category: "game",
    filename: __filename,
  },
  async (_0x45934d) => {
    const _0x304497 = Object.keys(countries);
    let _0x4f5d8a = _0x304497[Math.floor(Math.random() * _0x304497.length)];
    let _0x59e991 = countries[_0x4f5d8a];
    console.log("country : ", _0x4f5d8a);
    console.log("capital : ", _0x59e991);
    if (!astro_patch_Capital[_0x45934d.sender]) {
      astro_patch_Capital[_0x45934d.sender] = {
        id: _0x45934d.chat,
        player: _0x45934d.sender,
        country: _0x4f5d8a,
        capital: _0x59e991,
        attempts: 0,
        waitTime: captions.waitTime,
        preAns: _0x45934d.text,
        timer: "",
      };
    }
    let _0x5645fb = astro_patch_Capital[_0x45934d.sender];
    await _0x45934d.bot.sendMessage(_0x45934d.chat, {
      text: captions.onStart
        .replace("$player", _0x5645fb.player.split("@")[0])
        .replace("$country", _0x5645fb.country)
        .replace("$waitTime", _0x5645fb.waitTime),
      mentions: [_0x5645fb.player],
    });
    _0x5645fb.timer = setTimeout(() => {
      timerFuntions(_0x45934d, _0x5645fb);
    }, _0x5645fb.waitTime * 1000);
  }
);
let hcg_Logo = "█▄█ ▀ █▀▄ █▀▄ ██▀ █▄ █\n█   █ █ █▄▀ █▄▀ █▄▄ █ ▀█\n  ".trim();
const astro_patch_hcg = {};
class HiddenCardGame {
  constructor() {
    this.column = 4;
    this.row = 4;
    this.player1 = "";
    this.player2 = "";
    this.currentPlayer = "";
    this.board = [];
    this.hiddenCardIndex = 7;
    this.gameStatus = false;
    this.attempts = {};
  }
  startGame(_0x133f2f, _0x26c29f) {
    this.player1 = _0x133f2f;
    this.player2 = _0x26c29f;
    this.attempts[this.player1] = 0;
    this.attempts[this.player2] = 0;
    this.currentPlayer = _0x133f2f;
    this.board = this.createBoard();
    this.gameStatus = true;
  }
  createBoard() {
    const _0x1cc73d = [];
    for (let _0x24ec78 = 0; _0x24ec78 < this.row; _0x24ec78++) {
      const _0x55d31f = [];
      for (let _0x45d52c = 0; _0x45d52c < this.column; _0x45d52c++) {
        _0x55d31f.push("🈲");
      }
      _0x1cc73d.push(_0x55d31f);
    }
    return _0x1cc73d;
  }
  makeMove(_0xa4cc81, _0xb34f99) {
    if (!this.gameStatus) {
      return "";
    }
    if (_0xa4cc81 !== this.currentPlayer) {
      return "*_Hey Buddy, It's not your turn._*";
    }
    this.attempts[this.currentPlayer]++;
    const _0x52c4bf = _0xb34f99 - 1;
    if (this.isValidMove(_0x52c4bf)) {
      if (_0x52c4bf === this.hiddenCardIndex) {
        this.board[Math.floor(_0x52c4bf / this.row)][_0x52c4bf % this.column] =
          "🃏";
        let _0x5b6677 = this.displayBoard();
        this.gameStatus = false;
        return (
          hcg_Logo +
          "  𝗤𝗨𝗘𝗘𝗡 𝗖𝗔𝗥𝗗 𝗙𝗢𝗨𝗡𝗗`\n\n*𝗪𝗶𝗻𝗻𝗲𝗿 𝗜𝘀: _@" +
          _0xa4cc81.split("@")[0] +
          "_*\n*𝗟𝗼𝗼𝘀𝗲𝗿 𝗜𝘀: _@" +
          (_0xa4cc81 === this.player1 ? this.player2 : this.player1).split(
            "@"
          )[0] +
          "_*\n\n" +
          _0x5b6677 +
          " \n\n\n*_Congratulations!_* \n  *_@" +
          _0xa4cc81.split("@")[0] +
          " you won the Game!!*_ \n_You found the Hidden Card in " +
          this.attempts[this.currentPlayer] +
          " Attempts._\n\n_Hidden Queen Game Session Finished Now_\n_Type *.hcg* to Start Hidden Queen Session._\n\n```\t 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗦𝘂𝗵𝗮𝗶𝗹 𝗠𝗱 ```\n"
        );
      } else {
        this.board[Math.floor(_0x52c4bf / this.row)][_0x52c4bf % this.column] =
          "🟦";
        const _0x3d1f61 = this.checkGameResult();
        if (_0x3d1f61 === "continue") {
          this.currentPlayer =
            _0xa4cc81 === this.player1 ? this.player2 : this.player1;
          return (
            hcg_Logo +
            "  𝗤𝗨𝗘𝗘𝗡 𝗖𝗔𝗥𝗗 𝗚𝗔𝗠𝗘` \n\n" +
            this.displayBoard() +
            "\n\n_Current Turn: @" +
            this.currentPlayer.split("@")[0] +
            "_\n_Next @" +
            (this.currentPlayer === this.player1
              ? this.player2
              : this.player1
            ).split("@")[0] +
            "_\n\n\n ▢ *_Please take your turn & find card_*\n ▢ _Enter a number b/w *1* to *" +
            this.row * this.column +
            "* !!!_\n\n```\t 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗦𝘂𝗵𝗮𝗶𝗹 𝗠𝗱 ```"
          );
        } else {
          this.gameStatus = false;
          return "┏━━━━━━━━━━━━━━━━━━┓\n┃     𝗛𝗖𝗚---𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗚𝗔𝗠𝗘     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n\t*_Damnn!!! The hidden card was not found. Game over._*\n\n```\t 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗯𝘆 𝗦𝘂𝗵𝗮𝗶𝗹 𝗠𝗱 ```";
        }
      }
    } else {
      return (
        "┏━━━━━━━━━━━━━━━━━━┓\n┃     𝗛𝗖𝗚---𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗠𝗢𝗩𝗘     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n𝗡𝗢𝗧𝗘:\n  Hey _@" +
        this.currentPlayer.split("@")[0] +
        "_ (•̪●), \n▢ _You provide an Invalid or Already used number_\n▢ _Provide a number between *1* and *" +
        this.row * this.column +
        "* !!!_\n\n```\t Powered by Suhail MD ```"
      );
    }
  }
  isValidMove(_0x59acbc) {
    return (
      _0x59acbc >= 0 &&
      _0x59acbc < this.row * this.column &&
      this.board[Math.floor(_0x59acbc / this.row)][_0x59acbc % this.column] ===
        "🈲"
    );
  }
  checkGameResult() {
    if (this.board.some((_0x59f339) => _0x59f339.includes("🈲"))) {
      return "continue";
    } else {
      return "end";
    }
  }
  displayBoard() {
    let _0x4a7e34 = "\t ";
    let _0x5f3cda = "◣━━";
    for (let _0x52b6e0 = 0; _0x52b6e0 < this.row; _0x52b6e0++) {
      for (let _0x23bf9b = 0; _0x23bf9b < this.column; _0x23bf9b++) {
        _0x4a7e34 += this.board[_0x52b6e0][_0x23bf9b] + " ";
      }
      _0x5f3cda += "━━";
      _0x4a7e34 += "\n\t ";
    }
    _0x5f3cda += "◢";
    return "\t " + _0x4a7e34.trim() + "\n" + _0x5f3cda;
  }
}
smd(
  {
    pattern: "hcg",
    desc: "Starts a Hidden Card Game.",
    filename: __filename,
    category: "game",
  },
  async (_0x2f9c0f, _0x40c02a) => {
    const _0x2ffd5e = _0x2f9c0f.chat;
    let _0x53feb3 = astro_patch_hcg[_0x2ffd5e];
    if (_0x53feb3 && _0x53feb3.gameStatus) {
      return await _0x2f9c0f.reply(
        "*_A game is already in progress in this chat._*"
      );
    }
    if (!_0x53feb3) {
      _0x53feb3 = new HiddenCardGame();
      astro_patch_hcg[_0x2ffd5e] = _0x53feb3;
    }
    let _0x42c980 = _0x2f9c0f.quoted
      ? _0x2f9c0f.quoted.sender
      : _0x2f9c0f.mentionedJid
      ? _0x2f9c0f.mentionedJid[0]
      : false;
    let _0x2e5c0c = 5;
    let _0x57fb8 = 5;
    if (_0x40c02a) {
      _0x2e5c0c = parseInt(_0x40c02a) || 5;
      _0x2e5c0c = _0x2e5c0c > 2 && _0x2e5c0c < 8 ? _0x2e5c0c : 5;
    }
    _0x53feb3.row = _0x2e5c0c;
    _0x53feb3.column = _0x2e5c0c;
    if (!_0x53feb3.player1 || _0x2f9c0f.sender === _0x53feb3.player1) {
      if (_0x42c980 && _0x42c980 !== _0x2f9c0f.sender) {
        _0x53feb3.player1 = _0x2f9c0f.sender;
        _0x53feb3.player2 = _0x42c980;
        _0x53feb3.startGame(_0x53feb3.player1, _0x53feb3.player2);
      } else {
        _0x53feb3.player1 = _0x2f9c0f.sender;
        return await _0x2f9c0f.send(
          "┏━━━━━━━━━━━━━━━━━━┓\n┃     𝗛𝗜𝗗𝗗𝗘𝗡 𝗖𝗔𝗥𝗗 𝗚𝗔𝗠𝗘     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n_*Hidden Card Game Created...*_\n_Player 1: @" +
            _0x53feb3.player1.split("@")[0] +
            " Joined_\n_Waiting For Another Player To Start Game..._\n\n*Type _" +
            prefix +
            "Hcg_ to Join This Game.*",
          {
            mentions: [_0x53feb3.player1],
          }
        );
      }
    } else if (_0x2f9c0f.sender !== _0x53feb3.player1) {
      _0x53feb3.player2 = _0x2f9c0f.sender;
      _0x53feb3.startGame(_0x53feb3.player1, _0x53feb3.player2);
    }
    if (_0x53feb3.gameStatus) {
      _0x53feb3.hiddenCardIndex = Math.floor(
        Math.random() * (_0x53feb3.row * _0x53feb3.column)
      );
      return await _0x2f9c0f.send(
        "┏━━━━━━━━━━━━━━━━━━┓\n┃     𝗛𝗜𝗗𝗗𝗘𝗡 𝗖𝗔𝗥𝗗 𝗚𝗔𝗠𝗘     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n*Hidden Card Game started*\n_Current Turn: @" +
          _0x53feb3.currentPlayer.split("@")[0] +
          "_\n_Next Turn : @" +
          (_0x53feb3.currentPlayer === _0x53feb3.player1
            ? _0x53feb3.player2
            : _0x53feb3.player1
          ).split("@")[0] +
          "_\n\n_Board Size : *" +
          _0x53feb3.row +
          "x" +
          _0x53feb3.column +
          '*_\n_Theres a Hidden Queen Card *"🃏"* in Board_\n_Enter a number to find the Queen Card_\n\n' +
          _0x53feb3.displayBoard() +
          " ",
        {
          mentions: [
            _0x53feb3.player1,
            _0x53feb3.player2,
            _0x53feb3.currentPlayer,
          ],
        }
      );
    }
  }
);
smd(
  {
    cmdname: "delhcg",
    info: "deletes hidden card running session.",
    filename: __filename,
    type: "game",
  },
  async ({
    chat: _0x4cf9b7,
    isCreator: _0x43e54f,
    send: _0x35cae7,
    reply: _0x24df9e,
    sender: _0x434bc1,
  }) => {
    let _0x3c3320 = astro_patch_hcg[_0x4cf9b7];
    if (_0x3c3320) {
      if (
        !_0x43e54f &&
        _0x434bc1 !== _0x3c3320.player2 &&
        _0x434bc1 !== _0x3c3320.player1
      ) {
        await _0x35cae7(
          "┏━━━━━━━━━━━━━━━━━━┓\n┃     𝗛𝗜𝗗𝗗𝗘𝗡 𝗖𝗔𝗥𝗗 𝗚𝗔𝗠𝗘     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n*Uhh Please, _You are not a Player of running game!!!_\n"
        );
      } else {
        delete astro_patch_hcg[_0x4cf9b7];
        await _0x24df9e(
          "\n" +
            hcg_Logo +
            "𝗖𝗔𝗥𝗗 𝗚𝗔𝗠𝗘 𝗗𝗘𝗟𝗘𝗧𝗘𝗗\n\n*Room Id : _hcg-" +
            _0x4cf9b7.split("@")[0] +
            "_ Cleared Successfully*\n*_Hidden Card Game Session Deleted From This Chat..._*\n"
        );
      }
    } else {
      _0x24df9e(
        "┏━━━━━━━━━━━━━━━━━━┓\n┃   𝗤𝗨𝗘𝗘𝗡 𝗖𝗔𝗥𝗗 404𝗘𝗿𝗿𝗼𝗿    ┃\n┗━━━━━━━━━━━━━━━━━━┛ \n\n*Uhh Dear, _Theres No Game Started yet in This Chat_*\n"
      );
    }
  }
);
cmd(
  {
    on: "text",
  },
  async (_0x16aecb) => {
    if (!_0x16aecb || _0x16aecb.isBaileys) {
      return;
    }
    const _0x5d0144 = _0x16aecb.chat;
    const _0x2091f2 = parseInt(_0x16aecb.text ? _0x16aecb.text : "null");
    try {
      const _0x35d41c = astro_patch_hcg[_0x5d0144];
      if (
        _0x35d41c &&
        _0x35d41c.gameStatus &&
        _0x35d41c.currentPlayer === _0x16aecb.sender &&
        !isNaN(_0x2091f2) &&
        _0x16aecb.text
      ) {
        const _0x2b3010 = _0x35d41c.makeMove(_0x16aecb.sender, _0x2091f2);
        if (!_0x35d41c.gameStatus) {
          delete astro_patch_hcg[_0x16aecb.chat];
        }
        if (_0x2b3010) {
          await send(_0x16aecb, _0x2b3010, {
            mentions: [_0x35d41c.player1, _0x35d41c.player2],
          });
        } else {
          ("");
        }
      }
    } catch (_0x40ad36) {
      console.log("Hidden card game error : ", _0x40ad36);
    }
    try {
      const _0x34ca41 = astro_patch_numGuess[_0x5d0144];
      if (_0x34ca41) {
        if (
          _0x34ca41.id === _0x16aecb.chat &&
          _0x34ca41.player === _0x16aecb.sender &&
          !isNaN(_0x2091f2)
        ) {
          _0x34ca41.guessedNumber = _0x2091f2;
          _0x34ca41.attempts++;
          if (_0x34ca41.guessedNumber < _0x34ca41.randomNumber) {
            await _0x16aecb.send(
              logoName +
                "\n  𝗡𝘂𝗺𝗯𝗲𝗿 𝗬𝗼𝘂 𝗚𝘂𝗲𝘀𝘀𝗲𝗱 𝗶𝘀 𝗟𝗼𝘄\n\n*Player : _@" +
                _0x34ca41.player.split("@")[0] +
                "_*  \n*Attempts :* _" +
                _0x34ca41.attempts +
                " yet_\n\n*Number Info:*\n *_▢ Its Too Low Number!_*\n *_▢ Try to Guess a High Number From ' " +
                _0x34ca41.guessedNumber +
                "'._* \n *_▢ Make Sure to guess Number Between " +
                (_0x34ca41.mode === "Easy"
                  ? "1 and 100"
                  : _0x34ca41.mode === "Medium"
                  ? "1 and 1000"
                  : "1 and 10000") +
                "._*\n",
              {
                mentions: [_0x34ca41.player],
              },
              ""
            );
          } else if (_0x34ca41.guessedNumber > _0x34ca41.randomNumber) {
            await _0x16aecb.send(
              logoName +
                "\n 𝗡𝘂𝗺𝗯𝗲𝗿 𝗬𝗼𝘂 𝗚𝘂𝗲𝘀𝘀𝗲𝗱 𝗶𝘀 𝗛𝗶𝗴𝗵\n\n*Player : _@" +
                _0x34ca41.player.split("@")[0] +
                "_*  \n*Attempts :* _" +
                _0x34ca41.attempts +
                " yet_\n\n*Number Info:*\n *_▢ Its Too High Number!_*\n *_▢ Try to Guess a Smaller Number From ' " +
                _0x34ca41.guessedNumber +
                "'._* \n *_▢ Make Sure to guess Number Between " +
                (_0x34ca41.mode === "Easy"
                  ? "1 and 100"
                  : _0x34ca41.mode === "Medium"
                  ? "1 and 1000"
                  : "1 and 10000") +
                "._*\n",
              {
                mentions: [_0x34ca41.player],
              }
            );
          } else {
            await _0x16aecb.send(
              logoName +
                "\n  𝗡𝘂𝗺𝗯𝗲𝗿 𝗚𝘂𝗲𝘀𝘀𝗶𝗻𝗴 𝗚𝗮𝗺𝗲 𝗙𝗶𝗻𝗶𝘀𝗵𝗲𝗱\n\n*𝗠𝗼𝗱𝗲 You Played : _" +
                _0x34ca41.mode.toUpperCase() +
                "_* \n*_Congratulations! @" +
                _0x34ca41.player.split("@")[0] +
                " you won the Game!_* \n  _▢ You guessed the correct number ' *" +
                _0x34ca41.randomNumber +
                "* '._\n  _▢ You take " +
                _0x34ca41.attempts +
                " attempts to Guess that Number._\n",
              {
                mentions: [_0x34ca41.player],
              }
            );
            delete astro_patch_numGuess[_0x5d0144];
          }
        }
      }
    } catch (_0x1fe0b3) {
      console.log(
        "Error in Number Guess Game, from command.On() --> ",
        _0x1fe0b3
      );
    }
    try {
      const _0x2e9c6b = astro_patch_Capital[_0x16aecb.sender];
      if (
        _0x2e9c6b &&
        _0x2e9c6b.id === _0x5d0144 &&
        _0x2e9c6b.player === _0x16aecb.sender &&
        _0x2e9c6b.preAns !== _0x16aecb.text
      ) {
        _0x2e9c6b.attempts += 1;
        clearTimeout(_0x2e9c6b.timer);
        _0x2e9c6b.preAns = _0x2e9c6b.text;
        if (_0x16aecb.text.toLowerCase() === _0x2e9c6b.capital.toLowerCase()) {
          let _0x15c4a0 = parseInt(captions.winReward) || 2000;
          await _0x16aecb.bot.sendMessage(_0x5d0144, {
            text: captions.onWinGame
              .replace("$player", _0x2e9c6b.player.split("@")[0])
              .replace("$country", _0x2e9c6b.country)
              .replace("$capital", _0x2e9c6b.capital)
              .replace("$amount", "" + _0x15c4a0)
              .replace("$attempt", "" + _0x2e9c6b.attempts),
            mentions: [_0x2e9c6b.player],
          });
          delete astro_patch_Capital[_0x16aecb.sender];
          try {
            if (global.isMongodb) {
              await eco.give(_0x2e9c6b.player, "Suhail", _0x15c4a0);
            }
          } catch {}
        } else if (_0x2e9c6b.attempts <= 3) {
          await _0x16aecb.bot.sendMessage(_0x5d0144, {
            text: captions.onWrongAns
              .replace("$player", _0x2e9c6b.player.split("@")[0])
              .replace("$attempt", "" + (3 - _0x2e9c6b.attempts))
              .replace("$waitTime", _0x2e9c6b.waitTime),
            mentions: [_0x2e9c6b.player],
          });
          _0x2e9c6b.timer = setTimeout(() => {
            timerFuntions(_0x16aecb, _0x2e9c6b);
          }, _0x2e9c6b.waitTime * 1000);
        } else if (_0x2e9c6b.attempts > 3) {
          await _0x16aecb.bot.sendMessage(_0x5d0144, {
            text: captions.onLimitEnd
              .replace("$player", _0x2e9c6b.player.split("@")[0])
              .replace("$country", _0x2e9c6b.country)
              .replace("$capital", _0x2e9c6b.capital),
            mentions: [_0x2e9c6b.player],
          });
          delete astro_patch_Capital[_0x16aecb.sender];
        }
      }
    } catch (_0x588e9e) {
      console.log("Error in game Capital Of Country --> ", _0x588e9e);
    }
  }
);
const games = {};
const astro_patch_wcg = {};
const numbersArray = [40, 45, 50];
class WordChainGame {
  constructor() {
    this.player1 = "";
    this.player2 = "";
    this.currentPlayer = "";
    this.previousWord = "";
    this.wordChain = "";
    this.wordsCount = 0;
    this.wordLength = 4;
    this.longestWordBy = "Theres No Word yet";
    this.gameStatus = false;
    this.botPlayer = false;
    this.wrongAttempts = {};
    this.maxAttempts = 5;
    this.turnTimeLimit = 45;
    this.turnStartTime = 45;
    this.currentRemTime = 45;
    this.turnIntervalId = null;
  }
  stopTurn() {
    clearInterval(this.turnIntervalId);
  }
  async AwaitForSeconds(_0x3dad62) {
    await new Promise((_0x4ac2f5) => setTimeout(_0x4ac2f5, _0x3dad62 * 1000));
    this.botPlayer = false;
  }
  async startTurn(_0x346961) {
    this.turnIntervalId = setInterval(() => {
      const _0x27a820 = Math.floor((Date.now() - this.turnStartTime) / 1000);
      this.currentRemTime = this.turnTimeLimit - _0x27a820;
      if (this.currentRemTime === 0 && this.gameStatus) {
        try {
          this.botPlayer = true;
          if (this.wordsCount !== 0 && this.player2 && this.player1) {
            _0x346961.send(
              "*_Damn, Time's up!_*\n _@" +
                this.currentPlayer.split("@")[0] +
                " Lost Game...!_",
              {
                mentions: [this.currentPlayer],
              }
            );
            this.currentPlayer =
              this.currentPlayer === this.player1 ? this.player2 : this.player1;
            let _0x3a725c =
              "@" +
              this.currentPlayer.split("@")[0] +
              " Won The Game.\nWrong Attempt By Player : " +
              this.wrongAttempts[this.currentPlayer] +
              "\n\n\t\t*Game Information*\n\nTotal Chain Words : " +
              this.wordsCount +
              "  \n" +
              this.longestWordBy +
              "\n*_Chain Started From :-_*  " +
              this.wordChain +
              " ...!  \n";
            _0x346961.send(_0x3a725c, {
              mentions: [this.currentPlayer],
            });
          } else if (this.wordsCount === 0 && this.player2 && this.player1) {
            _0x346961.bot.sendMessage(_0x346961.from, {
              text:
                "*Wcg Session Terminated,* \nPLayer1 @" +
                this.player1.split("@")[0] +
                " And Player2 @" +
                this.player2.split("@")[0] +
                " both didn't take any move yet*",
              mentions: [this.player1, this.player2],
            });
          } else if (!this.player2 || !this.player1) {
            _0x346961.bot.sendMessage(_0x346961.chat, {
              text: "*Word Chain Game Session Expired,*\n*Reason : _One Player Still Missing_*",
            });
          }
          this.stopTurn();
          delete astro_patch_wcg[_0x346961.chat];
        } catch (_0x2eafa3) {
          return _0x346961.reply("Error while ending game : " + _0x2eafa3);
        }
      } else if (this.currentRemTime === 10) {
        this.botPlayer = true;
        if (this.player2 && this.player1) {
          let _0x3ed90a =
            "*Reminder : Game Terminates After " +
            this.currentRemTime +
            "s*\n\n*_Waiting For @" +
            this.currentPlayer.split("@")[0] +
            "'s Responce_*    \n_Take Your Turn, Otherwise Game Terminates_\n_Make Sure Your Word Must Start With *" +
            this.previousWord.slice(-1) +
            "* , and Must Have Atleast *" +
            this.wordLength +
            "* letters_\n\nYou Still Have *" +
            this.currentRemTime +
            "Secs* to Answer\nGive Your Best To Make Difficult For Opponent";
          _0x346961.send(
            _0x3ed90a,
            {
              mentions: [this.currentPlayer],
            },
            "suhail"
          );
        } else if (!this.player2 || !this.player1) {
          _0x346961.bot.sendMessage(_0x346961.jid, {
            text:
              "_Still Waiting For Player to Start Word Chain Game..._\n _Type *" +
              prefix +
              "wcg* to Join The Game_  \nOtherwise : _Wcg Session Expires After " +
              this.currentRemTime +
              "s_",
          });
        }
        this.AwaitForSeconds(1);
      }
    }, 1000);
  }
}
smd(
  {
    pattern: "wcg",
    desc: "starts a Word Chain game.",
    filename: __filename,
    category: "game",
  },
  async (_0x5a8e18, _0x42e9b0) => {
    const _0x3e403e = _0x5a8e18.chat;
    let _0x17a140 = astro_patch_wcg[_0x3e403e];
    if (_0x42e9b0.startsWith("end") && _0x17a140) {
      _0x17a140.stopTurn();
      delete astro_patch_wcg[_0x3e403e];
      return await _0x5a8e18.reply("Game ended. Goodbye!");
    }
    if (_0x17a140 && _0x17a140.gameStatus) {
      return await _0x5a8e18.reply(
        "A game is already in progress in this chat.\nType ```.wcg end``` Terminate the Session"
      );
    }
    let _0x44a1fc = _0x5a8e18.quoted
      ? _0x5a8e18.quoted.sender
      : _0x5a8e18.mentionedJid
      ? _0x5a8e18.mentionedJid[0]
      : false;
    if (!_0x17a140) {
      _0x17a140 = new WordChainGame();
      astro_patch_wcg[_0x3e403e] = _0x17a140;
    }
    if (!_0x17a140.player1 || _0x5a8e18.sender === _0x17a140.player1) {
      if (_0x44a1fc && _0x44a1fc !== _0x5a8e18.sender) {
        _0x17a140.player1 = _0x5a8e18.sender;
        _0x17a140.player2 = _0x44a1fc;
        _0x17a140.gameStatus = true;
      } else {
        _0x17a140.player1 = _0x5a8e18.sender;
        _0x17a140.turnStartTime = Date.now();
        _0x17a140.startTurn(_0x5a8e18);
        return await _0x5a8e18.bot.sendMessage(_0x5a8e18.from, {
          text:
            "_Game Starting..._\nPLayer 1 : _@" +
            _0x17a140.player1.split("@")[0] +
            " Joined_ \n\n_Needs Another Player To Start Game..._\nType *_" +
            prefix +
            "wcg_* to Join This Game.",
          mentions: [_0x17a140.player1],
        });
      }
    } else if (_0x5a8e18.sender !== _0x17a140.player1) {
      _0x17a140.player2 = _0x5a8e18.sender;
      _0x17a140.gameStatus = true;
    }
    if (_0x17a140.gameStatus) {
      _0x17a140.stopTurn();
      _0x17a140.botPlayer = true;
      _0x17a140.turnStartTime = Date.now();
      _0x17a140.startTurn(_0x5a8e18);
      _0x17a140.wrongAttempts[_0x17a140.player1] = 0;
      _0x17a140.wrongAttempts[_0x17a140.player2] = 0;
      _0x17a140.previousWord = String.fromCharCode(
        "a".charCodeAt(0) + Math.floor(Math.random() * 26)
      );
      _0x17a140.wordChain = _0x17a140.previousWord;
      _0x17a140.currentPlayer = _0x17a140.player1;
      _0x17a140.AwaitForSeconds(3);
      return await _0x5a8e18.bot.sendMessage(_0x5a8e18.chat, {
        text:
          "*_Game started Now..._*\n _Turn : @" +
          _0x17a140.player1.split("@")[0] +
          "_\n _Next @" +
          _0x17a140.player2.split("@")[0] +
          "_\n *Let's play! :* @" +
          _0x17a140.currentPlayer.split("@")[0] +
          "'s Word Must Start With *_\"" +
          _0x17a140.previousWord +
          '"_* .\n_you Have ' +
          _0x17a140.turnTimeLimit +
          "Secs to Answer_\n",
        mentions: [
          _0x17a140.player1,
          _0x17a140.player2,
          _0x17a140.currentPlayer,
        ],
      });
    }
  }
);
smd(
  {
    cmdname: "delwcg",
    info: "deletes word chain game running session.",
    filename: __filename,
    type: "game",
  },
  async ({
    chat: _0x4d8134,
    isCreator: _0x283363,
    send: _0x52d274,
    reply: _0x54222a,
    sender: _0x2b145d,
    isAdmin: _0x1bb0fc,
  }) => {
    let _0x19b4bc = astro_patch_wcg[_0x4d8134];
    if (_0x19b4bc) {
      if (
        !_0x283363 &&
        _0x2b145d !== _0x19b4bc.player2 &&
        _0x2b145d !== _0x19b4bc.player1 &&
        !_0x1bb0fc
      ) {
        await _0x52d274(
          "┏━━━━━━━━━━━━━━━━━━┓\n┃     WORD CHAIN GAME     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n*Uhh Please, _You are not a Player of running game!!!_\n"
        );
      } else {
        _0x19b4bc.stopTurn();
        await _0x54222a(
          (
            "┏━━━━━━━━━━━━━━━━━━┓\n┃     WORD CHAIN GAME     ┃\n┗━━━━━━━━━━━━━━━━━━┛\n\n*Room Id : _wcg-" +
            _0x4d8134.split("@")[0] +
            "_ Cleared Successfully*\n*_Word Chain Game Session Deleted From This Chat..._*\n\n\n\n" +
            (_0x19b4bc.wordsCount > 0
              ? "\t*Game Information*\n\nTotal Chain Words : " +
                _0x19b4bc.wordsCount +
                "  \n" +
                _0x19b4bc.longestWordBy +
                "\n*_Chain Started From :-_*  " +
                _0x19b4bc.wordChain +
                " ...!"
              : "") +
            "\n\n"
          ).trim()
        );
        console.log("counts : ", _0x19b4bc.wordsCount);
        delete astro_patch_hcg[_0x4d8134];
      }
    } else {
      _0x54222a(
        "┏━━━━━━━━━━━━━━━━━━┓\n┃   WORD CHAIN 404Error    ┃\n┗━━━━━━━━━━━━━━━━━━┛ \n\n*Uhh Dear, _Theres No Game Started yet in This Chat_*\n"
      );
    }
  }
);
smd(
  {
    on: "text",
  },
  async (_0x31d911, _0x9c17da, { isCreator: _0x561706 }) => {
    if (_0x31d911.isBot) {
      return;
    }
    const _0x2b4276 = _0x31d911.chat;
    const _0x1dda4f = astro_patch_wcg[_0x2b4276];
    if (!_0x1dda4f) {
      return;
    }
    const _0x2339e2 = _0x31d911.user;
    if (
      _0x1dda4f.gameStatus &&
      _0x1dda4f.currentPlayer === _0x31d911.sender &&
      _0x31d911.text &&
      !_0x1dda4f.botPlayer
    ) {
      const _0x679d9a = _0x9c17da.split(" ")[0].trim().toLowerCase();
      if (
        _0x679d9a.length >= _0x1dda4f.wordLength &&
        _0x679d9a.charAt(0) === _0x1dda4f.previousWord.slice(-1)
      ) {
        if (_0x679d9a.length > _0x1dda4f.wordLength) {
          _0x1dda4f.longestWordBy =
            "Longest Word With " +
            _0x679d9a.length +
            " letters is *" +
            _0x679d9a +
            "* by @" +
            _0x1dda4f.currentPlayer.split("@")[0];
        }
        _0x1dda4f.wordsCount++;
        _0x1dda4f.botPlayer = true;
        _0x1dda4f.stopTurn();
        _0x1dda4f.turnStartTime = Date.now();
        _0x1dda4f.startTurn(_0x31d911);
        _0x1dda4f.previousWord = _0x679d9a;
        _0x1dda4f.wordChain += "\t⇢" + _0x1dda4f.previousWord;
        _0x1dda4f.turnTimeLimit = Math.floor(Math.random() * 10) + 35;
        await _0x31d911.bot.sendMessage(_0x31d911.chat, {
          react: {
            text: "✅",
            key: _0x31d911.key,
          },
        });
        _0x1dda4f.currentPlayer =
          _0x1dda4f.currentPlayer === _0x1dda4f.player1
            ? _0x1dda4f.player2
            : _0x1dda4f.player1;
        let _0x3dc7a4 =
          "\n*Word Accepted...? ✅*\n_Current Turn : @" +
          _0x1dda4f.currentPlayer.split("@")[0] +
          "_\n_Next Turn : @" +
          (_0x1dda4f.currentPlayer === _0x1dda4f.player1
            ? _0x1dda4f.player2
            : _0x1dda4f.player1
          ).split("@")[0] +
          "_\n\n_Your word must start with *'" +
          _0x1dda4f.previousWord.slice(-1).toUpperCase() +
          "'* , and must have atleast *'" +
          _0x1dda4f.wordLength +
          "'* letters_\n_you have *" +
          _0x1dda4f.turnTimeLimit +
          "Secs* to answer_\n_Total words yet : " +
          _0x1dda4f.wordsCount +
          "\n\n            ";
        if (_0x2339e2 === _0x1dda4f.currentPlayer) {
          _0x1dda4f.AwaitForSeconds(3);
        } else {
          _0x1dda4f.botPlayer = false;
        }
        return await _0x31d911.bot.sendMessage(_0x31d911.from, {
          text: _0x3dc7a4,
          mentions: [_0x1dda4f.player1, _0x1dda4f.player2],
        });
      } else if (!_0x1dda4f.botPlayer) {
        _0x1dda4f.botPlayer = true;
        await _0x31d911.bot.sendMessage(_0x31d911.chat, {
          react: {
            text: "❎",
            key: _0x31d911.key,
          },
        });
        if (!_0x1dda4f.wrongAttempts[_0x1dda4f.currentPlayer]) {
          _0x1dda4f.wrongAttempts[_0x1dda4f.currentPlayer] = 1;
        } else {
          _0x1dda4f.wrongAttempts[_0x1dda4f.currentPlayer]++;
        }
        if (
          _0x1dda4f.wrongAttempts[_0x1dda4f.currentPlayer] >=
          _0x1dda4f.maxAttempts
        ) {
          _0x1dda4f.stopTurn();
          delete astro_patch_wcg[_0x2b4276];
          let _0x422e2e = _0x1dda4f.wordChain.split(",");
          return await _0x31d911.reply(
            "Wrong Attempt Exceeds! : " +
              _0x1dda4f.wrongAttempts[_0x1dda4f.currentPlayer] +
              "\n Game Terminated, " +
              _0x1dda4f.currentPlayer.split("@")[0] +
              " Can't Find a Word That should start with \"" +
              _0x1dda4f.previousWord.slice(-1) +
              '".\n\n\n*Total Chain Words : ' +
              _0x422e2e.length +
              "\n Started From : " +
              _0x422e2e.join("\t⇢") +
              "  \n\nGame ended.*"
          );
        }
        let _0x552145 =
          _0x679d9a.charAt(0) === _0x1dda4f.previousWord.slice(-1)
            ? _0x679d9a.length > _0x1dda4f.wordLength
              ? "_Word Length is Smaller Then " +
                _0x1dda4f.wordLength +
                " letters_"
              : "Invalid Word"
            : "Given Word Not Start With '" +
              _0x1dda4f.previousWord.slice(-1) +
              "'";
        let _0x358bf0 =
          "Word Not Accepted...? ❎\nReason : _" +
          _0x552145 +
          "_\n\n_Current Turn : @" +
          _0x1dda4f.currentPlayer.split("@")[0] +
          "_\n_Next Turn : @" +
          (_0x1dda4f.currentPlayer === _0x1dda4f.player1
            ? _0x1dda4f.player2
            : _0x1dda4f.player1
          ).split("@")[0] +
          "_\n\n_You Word Must Start With *" +
          _0x1dda4f.previousWord.slice(-1) +
          "* , and Must Have Atleast *4* letters_\n_Try Again, you Still Have " +
          _0x1dda4f.currentRemTime +
          "Secs to Answer_\n";
        await _0x31d911.sendMessage(_0x31d911.chat, {
          text: _0x358bf0,
          mentions: [_0x1dda4f.player1, _0x1dda4f.player2],
        });
        if (_0x1dda4f.currentPlayer === _0x2339e2) {
          return await _0x1dda4f.AwaitForSeconds(3);
        } else {
          _0x1dda4f.botPlayer = false;
        }
      }
    }
  }
);
const stickers = [
  "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-1.webp",
  "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-2.webp",
  "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-3.webp",
  "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-3.webp",
  "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-4.webp",
  "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-4.webp",
  "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-5.webp",
  "https://raw.githubusercontent.com/SuhailTechInfo/Suhail-Md-Media/main/ᴅɪᴄᴇ/sᴜʜᴀɪʟ-ᴍᴅ-ᴅɪᴄᴇ-6.webp",
];
smd(
  {
    pattern: "dice",
    desc: "Rolling Dice Game",
    filename: __filename,
    category: "game",
  },
  async (_0x1894c6) => {
    try {
      try {
        const _0x4cde9e = Math.floor(Math.random() * stickers.length);
        return await _0x1894c6.bot.sendMessage(_0x1894c6.chat, {
          sticker: {
            url: stickers[_0x4cde9e],
          },
          packname: "ᴅɪᴄᴇ",
          author: "sᴜʜᴀɪʟ-ᴍᴅ",
        });
      } catch (_0xd37c6a) {
        const _0x312d64 = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
        const _0xdf7a0 = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣"];
        let _0x1d0302 = Math.floor(Math.random() * _0x312d64.length);
        let _0x58b954 = await _0x1894c6.bot.sendMessage(_0x1894c6.chat, {
          text: _0x312d64[_0x1d0302],
        });
        return await _0x1894c6.react(_0xdf7a0[_0x1d0302], _0x58b954);
      }
    } catch (_0x54b873) {
      await _0x1894c6.error(_0x54b873 + "\n\ncommand: dice", _0x54b873);
    }
  }
);
let A = ["😺", "👻", "⏳", "🍫"];
let B = ["🥳", "🍂", "😎", "💀"];
let C = ["💍", "🍁", "🔥", "💥"];
let D = ["✨", "❄️", "⭐", "🌚"];
let gtc = {};
function getEmojy(_0x87048e) {
  return _0x87048e[Math.floor(Math.random() * _0x87048e.length)];
}
const randomChar = require("anime-character-random");
smd(
  {
    cmdname: "gtc",
    info: "Guess the anime name, a new game",
    type: "game",
    filename: __filename,
    use: "<guess name>",
  },
  async (_0x525366) => {
    try {
      const _0x620752 = await randomChar.GetChar();
      const _0xad866 = [
        _0x620752.OtherCharacterList[0],
        _0x620752.OtherCharacterList[1],
        _0x620752.OtherCharacterList[2],
        _0x620752.CharacterName,
      ];
      const _0x1051f1 = _0xad866.sort(() => Math.random() - 0.5);
      let _0x5a9511 = _0x1051f1.indexOf(_0x620752.CharacterName);
      let _0x54e542 = getEmojy(A);
      var _0x1bf40d = getEmojy(B);
      var _0x45283d = getEmojy(C);
      var _0x2b5e13 = getEmojy(D);
      let _0x2e99fd =
        "*[GUESS THE ANIME NAME]*\n\n_React the message with correct emojy!_\n\n\n" +
        _0x54e542 +
        ") " +
        _0x1051f1[0] +
        "\n" +
        _0x1bf40d +
        ") " +
        _0x1051f1[1] +
        "\n" +
        _0x45283d +
        ") " +
        _0x1051f1[2] +
        "\n" +
        _0x2b5e13 +
        ") " +
        _0x1051f1[3] +
        "\n\n\n" +
        Config.caption +
        "\n";
      let { key: _0xdff25a } = await _0x525366.send(
        _0x620752.CharacterImage,
        {
          caption: _0x2e99fd,
        },
        "image"
      );
      let _0x525613 = _0xdff25a.id;
      gtc[_0x525613] = {};
      gtc[_0x525613].emojies = [_0x54e542, _0x1bf40d, _0x45283d, _0x2b5e13];
      gtc[_0x525613].ans = _0x620752.CharacterName;
      gtc[_0x525613].emoji = gtc[_0x525613].emojies[_0x5a9511];
      console.log("gtc : ", gtc[_0x525613]);
    } catch (_0x5e93e0) {
      await _0x525366.error(_0x5e93e0 + "\n\ncommand: gtc(game)", _0x5e93e0);
    }
  }
);
smd(
  {
    on: "text",
  },
  async (_0x3344e4) => {
    if (_0x3344e4.reaction || _0x3344e4.reply_message) {
      let _0x2fce2b = _0x3344e4.reaction
        ? _0x3344e4.msg.key.id
        : _0x3344e4.reply_message
        ? _0x3344e4.reply_message.id
        : false;
      if (!gtc[_0x2fce2b] || !gtc[_0x2fce2b].emojies.includes(_0x3344e4.text)) {
        return;
      }
      console.log("gtc : ", gtc);
      if (_0x3344e4.text == gtc[_0x2fce2b].emoji) {
        await _0x3344e4.send(
          "*_Waow you @" +
            _0x3344e4.senderNum +
            " Guess the Correct Name!_*\n*_[NAME IS]: '" +
            gtc[_0x2fce2b].emoji +
            ") " +
            gtc[_0x2fce2b].ans +
            "'_*",
          {
            mentions: [_0x3344e4.sender],
          }
        );
        delete gtc[_0x2fce2b];
      } else {
        if (!gtc[_0x2fce2b][_0x3344e4.sender]) {
          gtc[_0x2fce2b][_0x3344e4.sender] = 1;
        } else {
          gtc[_0x2fce2b][_0x3344e4.sender]++;
        }
        if (gtc[_0x2fce2b][_0x3344e4.sender] >= 2) {
          await _0x3344e4.send(
            "*Hey @" +
              _0x3344e4.senderNum +
              "You Lose!*\n_Better luck next time!_\n*Name is:* " +
              gtc[_0x2fce2b].emoji +
              ") " +
              gtc[_0x2fce2b].ans,
            {
              mentions: [_0x3344e4.sender],
            }
          );
          delete gtc[_0x2fce2b];
        } else if (gtc[_0x2fce2b][_0x3344e4.sender] > 0) {
          await _0x3344e4.send(
            "*Hey @" +
              _0x3344e4.senderNum +
              " InCorrect answer!*\n_Try another emoji, you have one move!_",
            {
              mentions: [_0x3344e4.sender],
            }
          );
        }
      }
    }
  }
);
smd(
  {
    pattern: "ttt",
    desc: "Play TicTacToe",
    filename: __filename,
    category: "game",
  },
  async (_0xe274e9, _0x2df401) => {
    let _0xf9f8b5 = require("../lib/ttt");
    this.game = this.game ? this.game : {};
    if (
      Object.values(this.game).find(
        (_0x8e29bc) =>
          _0x8e29bc.id.startsWith("tictactoe") &&
          [_0x8e29bc.game.playerX, _0x8e29bc.game.playerO].includes(
            _0xe274e9.sender
          )
      )
    ) {
      return _0xe274e9.reply("_A game is already going on_");
    }
    var _0xa3e5ff = Object.values(this.game).find(
      (_0x5bdc17) =>
        _0x5bdc17.state === "WAITING" &&
        (_0x2df401 ? _0x5bdc17.name === _0x2df401 : true)
    );
    let _0x89a570 = _0xe274e9.sender;
    let _0x17f1a7 = _0xe274e9.quoted
      ? _0xe274e9.quoted.sender
      : _0xe274e9.mentionedJid
      ? _0xe274e9.mentionedJid[0]
      : false;
    if (!_0xa3e5ff && _0x17f1a7 && _0x89a570 && _0x89a570 != _0x17f1a7) {
      _0xa3e5ff = {
        id: "tictactoe-" + +new Date(),
        x: _0xe274e9.chat,
        o: "",
        game: new _0xf9f8b5(_0x17f1a7, "o"),
        state: "WAITING",
      };
      if (_0x2df401) {
        _0xa3e5ff.name = _0x2df401;
      }
      this.game[_0xa3e5ff.id] = _0xa3e5ff;
    }
    let _0x26e17d = Object.values(this.game).find(
      (_0x337ecd) =>
        _0x337ecd.state === "WAITING" &&
        (_0x2df401 ? _0x337ecd.name === _0x2df401 : true)
    );
    if (_0x26e17d) {
      _0x26e17d.o = _0xe274e9.chat;
      _0x26e17d.game.playerO = _0xe274e9.sender || _0xe274e9.mentionedJid[0];
      _0x26e17d.state = "PLAYING";
      let _0x563dae = _0x26e17d.game.render().map((_0x4eec74) => {
        return {
          X: "❌",
          O: "⭕",
          1: "1️⃣",
          2: "2️⃣",
          3: "3️⃣",
          4: "4️⃣",
          5: "5️⃣",
          6: "6️⃣",
          7: "7️⃣",
          8: "8️⃣",
          9: "9️⃣",
        }[_0x4eec74];
      });
      let _0x3a639c =
        "\nCurrent turn: @" +
        _0x26e17d.game.currentTurn.split("@")[0] +
        "\nRoom ID: " +
        _0x26e17d.id +
        "\n" +
        _0x563dae.slice(0, 3).join("  ") +
        "\n" +
        _0x563dae.slice(3, 6).join("  ") +
        "\n" +
        _0x563dae.slice(6).join("  ") +
        "\n";
      return await _0xe274e9.bot.sendMessage(_0xe274e9.chat, {
        text: _0x3a639c,
        mentions: [_0x26e17d.game.currentTurn],
      });
    } else {
      _0x26e17d = {
        id: "tictactoe-" + +new Date(),
        x: _0xe274e9.chat,
        o: "",
        game: new _0xf9f8b5(_0xe274e9.sender, "o"),
        state: "WAITING",
      };
      if (_0x2df401) {
        _0x26e17d.name = _0x2df401;
      }
      _0xe274e9.reply("_Waiting for player,use .ttt to join this game._ ");
      this.game[_0x26e17d.id] = _0x26e17d;
    }
  }
);
smd(
  {
    pattern: "delttt",
    desc: "deletes TicTacToe running session.",
    filename: __filename,
    category: "game",
  },
  async (_0x1abbe9) => {
    try {
      this.game = this.game ? this.game : false;
      let _0x25fffe = Object.values(this.game).find((_0x1649fb) =>
        _0x1649fb.id.startsWith("tictactoe")
      );
      let _0x3a992a =
        (_0x1abbe9.isGroup && _0x1abbe9.isAdmin) || _0x1abbe9.isCreator
          ? true
          : false;
      if (_0x25fffe) {
        if (
          _0x3a992a ||
          [_0x25fffe.game.playerX, _0x25fffe.game.playerO].includes(
            _0x1abbe9.sender
          )
        ) {
          delete this.game;
          return _0x1abbe9.reply(
            "_Successfully Deleted running TicTacToe game._"
          );
        } else {
          return _0x1abbe9.reply(
            "*Uhh Please, _You are not a Player of running game!!!_"
          );
        }
      } else {
        return _0x1abbe9.reply("No TicTacToe game🎮 is running.");
      }
    } catch (_0x483b2b) {
      await _0x1abbe9.error(_0x483b2b + "\n\ncommand: delttt", _0x483b2b);
    }
  }
);
smd(
  {
    on: "text",
  },
  async (_0x303e73) => {
    this.game = this.game ? this.game : {};
    let _0x5aaad7 = Object.values(this.game).find(
      (_0x16bcc1) =>
        _0x16bcc1.id &&
        _0x16bcc1.game &&
        _0x16bcc1.state &&
        _0x16bcc1.id.startsWith("tictactoe") &&
        [_0x16bcc1.game.playerX, _0x16bcc1.game.playerO].includes(
          _0x303e73.sender
        ) &&
        _0x16bcc1.state == "PLAYING"
    );
    if (_0x5aaad7) {
      let _0x5ade22;
      let _0x3fbb59 = false;
      let _0x1e00eb = false;
      let _0x560530 = false;
      if (!/^([1-9]|(me)?give_up|surr?ender|off|skip)$/i.test(_0x303e73.text)) {
        return;
      }
      _0x560530 = !/^[1-9]$/.test(_0x303e73.text);
      if (_0x303e73.sender !== _0x5aaad7.game.currentTurn) {
        if (!_0x560530) {
          return true;
        }
      }
      if (
        !_0x560530 &&
        (_0x5ade22 = _0x5aaad7.game.turn(
          _0x303e73.sender === _0x5aaad7.game.playerO,
          parseInt(_0x303e73.text) - 1
        )) < 1
      ) {
        _0x303e73.reply(
          {
            "-3": "The game is over.",
            "-2": "Invalid",
            "-1": "_Invalid Position_",
            0: "_Invalid Position_",
          }[_0x5ade22]
        );
        return true;
      }
      if (_0x303e73.sender === _0x5aaad7.game.winner) {
        _0x3fbb59 = true;
      } else if (_0x5aaad7.game.board === 511) {
        _0x1e00eb = true;
      }
      let _0x2929f6 = _0x5aaad7.game.render().map((_0x584d3c) => {
        return {
          X: "❌",
          O: "⭕",
          1: "1️⃣",
          2: "2️⃣",
          3: "3️⃣",
          4: "4️⃣",
          5: "5️⃣",
          6: "6️⃣",
          7: "7️⃣",
          8: "8️⃣",
          9: "9️⃣",
        }[_0x584d3c];
      });
      if (_0x560530) {
        _0x5aaad7.game._currentTurn =
          _0x303e73.sender === _0x5aaad7.game.playerX;
        _0x3fbb59 = true;
      }
      let _0x283c15 = _0x560530
        ? _0x5aaad7.game.currentTurn
        : _0x5aaad7.game.winner;
      let _0x28a3a4 =
        "Room ID: " +
        _0x5aaad7.id +
        "\n\n" +
        _0x2929f6.slice(0, 3).join("  ") +
        "\n" +
        _0x2929f6.slice(3, 6).join("  ") +
        "\n" +
        _0x2929f6.slice(6).join("  ") +
        "\n" +
        (_0x3fbb59
          ? "@" + _0x283c15.split("@")[0] + " Won ! and got 2000💎 in wallet🤑"
          : _0x1e00eb
          ? "Game Tied,well done to both of you players."
          : "Current Turn " +
            ["❌", "⭕"][_0x5aaad7.game._currentTurn * 1] +
            " @" +
            _0x5aaad7.game.currentTurn.split("@")[0]) +
        "\n⭕:- @" +
        _0x5aaad7.game.playerO.split("@")[0] +
        "\n❌:- @" +
        _0x5aaad7.game.playerX.split("@")[0];
      if (
        (_0x5aaad7.game._currentTurn ^ _0x560530
          ? _0x5aaad7.x
          : _0x5aaad7.o) !== _0x303e73.chat
      ) {
        _0x5aaad7[_0x5aaad7.game._currentTurn ^ _0x560530 ? "x" : "o"] =
          _0x303e73.chat;
      }
      if (_0x3fbb59 && isMongodb) {
        await eco.give(_0x303e73.sender, "Suhail", 2000);
      }
      if (_0x3fbb59 || _0x1e00eb) {
        await _0x303e73.bot.sendMessage(_0x303e73.chat, {
          text: _0x28a3a4,
          mentions: [_0x5aaad7.game.playerO, _0x5aaad7.game.playerX],
        });
        delete this.game[_0x5aaad7.id];
      } else {
        await _0x303e73.bot.sendMessage(_0x303e73.chat, {
          text: _0x28a3a4,
          mentions: [_0x5aaad7.game.playerO, _0x5aaad7.game.playerX],
        });
      }
    }
  }
);


     ///    FAKEREPLY CMD

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


//.          FOREX CMD

smd(
 {
    pattern: "forex1",
    category: "forex",
    desc: "Fetches the latest forex news",
    filename: __filename,
    use: "forexnews",
  },
  async (message) => {
    try {
      const apiUrl =
        "https://api.polygon.io/v2/reference/news?apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        return message.send("*No forex news available at the moment.*");
      }

      const articles = data.results;
      let output = "";
      articles.forEach((article, index) => {
        output += `*Title:* ${article.title}\n`;
        output += `*Publisher:* ${article.publisher.name}\n`;
        output += `*Published UTC:* ${article.published_utc}\n`;
        output += `*Article URL:* ${article.article_url}\n\n`;

        if (index < articles.length - 1) {
          output += "---\n\n";
        }
      });

      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(error, "*Failed to fetch forex news.*");
    }
  }
);
smd(
  {
    pattern: "fxstatus",
    category: "forex",
    desc: "Fetches the current status of the forex market",
    filename: __filename,
    use: "fxstatus",
  },
  async (message) => {
    try {
      const apiUrl =
        "https://api.polygon.io/v1/marketstatus/now?apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data) {
        return message.send("*Failed to fetch forex market status.*");
      }

      let output = "*Forex Market Status:*\n";
      output += `After Hours: ${data.afterHours ? "Closed" : "Open"}\n`;
      output += `Market: ${data.market ? "Open" : "Closed"}\n`;

      const currencies = data.currencies;
      output += "\n*Currencies:*\n";
      output += `Crypto: ${currencies.crypto}\n`;
      output += `FX: ${currencies.fx}\n`;

      const exchanges = data.exchanges;
      output += "\n*Exchanges:*\n";
      output += `NASDAQ: ${exchanges.nasdaq}\n`;
      output += `NYSE: ${exchanges.nyse}\n`;
      output += `OTC: ${exchanges.otc}\n`;

      const indicesGroups = data.indicesGroups;
      output += "\n*Indices Groups:*\n";
      output += `S&P: ${indicesGroups.s_and_p}\n`;
      output += `Societe Generale: ${indicesGroups.societe_generale}\n`;
      output += `MSCI: ${indicesGroups.msci}\n`;
      output += `FTSE Russell: ${indicesGroups.ftse_russell}\n`;
      output += `MStar: ${indicesGroups.mstar}\n`;
      output += `MStarC: ${indicesGroups.mstarc}\n`;
      output += `CCCY: ${indicesGroups.cccy}\n`;
      output += `CGI: ${indicesGroups.cgi}\n`;
      output += `NASDAQ: ${indicesGroups.nasdaq}\n`;
      output += `Dow Jones: ${indicesGroups.dow_jones}\n`;

      output += `\n*Server Time:* ${data.serverTime}\n`;

      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(error, "*Failed to fetch forex market status.*");
    }
  }
);

smd(
  {
    pattern: "fxpairs",
    category: "forex",
    desc: "Fetches a list of active forex currency pairs",
    filename: __filename,
    use: "fxpairs",
  },
  async (message) => {
    try {
      const apiUrl =
        "https://api.polygon.io/v3/reference/tickers?market=fx&active=true&apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || !data.results || data.results.length === 0) {
        return message.send("*Failed to fetch forex currency pairs.*");
      }

      let output = "*Active Forex Currency Pairs:*\n\n";
      data.results.forEach((pair) => {
        output += `${pair.ticker}: ${pair.name}\n`;
      });

      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(error, "*Failed to fetch forex currency pairs.*");
    }
  }
);
smd(
  {
    pattern: "fxexchange",
    category: "forex",
    desc: "Fetches the latest foreign exchange rates against the US Dollar",
    filename: __filename,
    use: "fxexchange [currency_code]",
  },
  async (message, match) => {
    try {
      const currencyCode = match || "USD";
      const apiUrl = `https://api.exchangerate-api.com/v4/latest/${currencyCode}`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || !data.rates) {
        return message.send(
          `*Failed to fetch exchange rates for ${currencyCode}.*`
        );
      }

      let output = `*Foreign Exchange Rates (${data.base})*\n\n`;
      for (const [currency, rate] of Object.entries(data.rates)) {
        output += `${currency}: ${rate.toFixed(4)}\n`;
      }

      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(error, "*Failed to fetch exchange rates.*");
    }
  }
);
smd(
  {
    pattern: "stocktickers",
    category: "forex",
    desc: "Fetches a list of active stock tickers",
    filename: __filename,
    use: "stocktickers [limit]",
  },
  async (message, match) => {
    try {
      const limit = match || 100;
      const apiUrl = `https://api.polygon.io/v3/reference/tickers?active=true&limit=${limit}&apiKey=Y4iTYoJANwppB8I3Bm4QVWdV5oXlvc45`;
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || !data.results || data.results.length === 0) {
        return message.send("*No active stock tickers found.*");
      }

      let output = `*Active Stock Tickers (Limit: ${limit}):*\n\n`;
      data.results.forEach((ticker) => {
        output += `${ticker.ticker}: ${ticker.name}\n`;
      });

      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(error, "*Failed to fetch stock tickers.*");
    }
  }
);


      ///.     FUN CMDS

smd
} = require("../lib");
const fetch = require("node-fetch");
smd({
  cmdname: "question",
  info: "Random Question.",
  type: "pastime",
  filename: __filename
}, async (_0x526dda, _0x570e21, {
  smd: _0x59940a
}) => {
  try {
    await _0x526dda.reply(await randomeFunfacts(_0x59940a));
  } catch (_0x2763aa) {
    await _0x526dda.error(_0x2763aa + "\n\ncommand: " + _0x59940a, _0x2763aa);
  }
});
smd({
  cmdname: "truth",
  info: "truth and dare(truth game.).",
  type: "pastime",
  filename: __filename
}, async (_0xc2b276, _0x3b493e, {
  smd: _0x52be61
}) => {
  try {
    await _0xc2b276.reply(await randomeFunfacts(_0x52be61));
  } catch (_0x28b284) {
    await _0xc2b276.error(_0x28b284 + "\n\ncommand: " + _0x52be61, _0x28b284);
  }
});
smd({
  cmdname: "dare",
  info: "truth and dare(dare game.).",
  type: "pastime",
  filename: __filename
}, async (_0x330b72, _0x34d36a, {
  smd: _0x2a0858
}) => {
  try {
    await _0x330b72.reply(await randomeFunfacts(_0x2a0858));
  } catch (_0x27a0b8) {
    await _0x330b72.error(_0x27a0b8 + "\n\ncommand: " + _0x2a0858, _0x27a0b8);
  }
});
smd({
  cmdname: "joke",
  info: "Sends Joke in chat.",
  type: "pastime",
  filename: __filename
}, async (_0x330ac0, _0x8b468d, {
  smd: _0x2e3522
}) => {
  try {
    await _0x330ac0.reply(await randomeFunfacts(_0x2e3522));
  } catch (_0x1817a2) {
    await _0x330ac0.error(_0x1817a2 + "\n\ncommand: " + _0x2e3522, _0x1817a2);
  }
});
smd({
  cmdname: "joke2",
  info: "Sends Joke in chat.",
  type: "pastime",
  filename: __filename
}, async (_0x5c9c52, _0x6b6e25, {
  smd: _0x64ba
}) => {
  try {
    await _0x5c9c52.reply(await randomeFunfacts(_0x64ba));
  } catch (_0x35fd84) {
    await _0x5c9c52.error(_0x35fd84 + "\n\ncommand: " + _0x64ba, _0x35fd84);
  }
});
smd({
  cmdname: "fact",
  info: "Sends fact in chat.",
  type: "pastime",
  filename: __filename
}, async (_0x1dc7e3, _0x16aaa1, {
  smd: _0x375b98
}) => {
  try {
    await _0x1dc7e3.reply(await randomeFunfacts(_0x375b98));
  } catch (_0x1e1a8b) {
    await _0x1dc7e3.error(_0x1e1a8b + "\n\ncommand: " + _0x375b98, _0x1e1a8b);
  }
});
smd({
  cmdname: "quotes",
  info: "Sends quotes in chat.",
  type: "pastime",
  filename: __filename
}, async (_0x12963f, _0x4f30d2, {
  smd: _0x3462d1
}) => {
  try {
    await _0x12963f.reply(await randomeFunfacts(_0x3462d1));
  } catch (_0x18e714) {
    await _0x12963f.error(_0x18e714 + "\n\ncommand: " + _0x3462d1, _0x18e714);
  }
});
smd({
  cmdname: "define",
  info: "urban dictionary.",
  type: "pastime",
  filename: __filename
}, async (_0x460337, _0x614c0a) => {
  try {
    let _0x328d73 = _0x614c0a ? _0x614c0a : _0x460337.reply_text;
    if (!_0x328d73) {
      return await _0x460337.send("*_Hey " + _0x460337.senderName + ", please provide a text!_*");
    }
    let {
      data: _0x330600
    } = await axios.get("http://api.urbandictionary.com/v0/define?term=" + _0x328d73);
    var _0x27eb8f = _0x330600 ? "*Word:* ```" + _0x328d73 + "``` \n*Definition:* ```" + _0x330600.list[0].definition.replace(/\[/g, "").replace(/\]/g, "") + "``` \n*Example:* ```" + _0x330600.list[0].example.replace(/\[/g, "").replace(/\]/g, "") + "```" : "*_No results found for given word_*";
    return _0x460337.reply(_0x27eb8f);
  } catch (_0x1d0916) {
    await _0x460337.error(_0x1d0916 + "\n\ncommand: define", _0x1d0916, "*No result for:* ```" + text + "```");
  }
});



 ////.       REACTIONS CMD

smd(
  {
    pattern: "poke",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime poke reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(bot, cmdName, "poked to", "poked to everyone.");
  }
);
//-----------------------------------------------------------------------
smd(
  {
    pattern: "hug",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime hug reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(bot, cmdName, "hug to", "hug with everyone.");
  }
);
//-----------------------------------------------------------------------
smd(
  {
    pattern: "hold",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime hand hold reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(
      bot,
      "handhold",
      "hold hand of",
      "holded hand of everyone"
    );
  }
);
//-----------------------------------------------------------------------
smd(
  {
    pattern: "hifi",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime hifi reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(
      bot,
      "highfive",
      "highfive with",
      "highfive with everyone."
    );
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "bite",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime bite reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(bot, cmdName, "bitten to", "bitten to everyone.");
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "blush",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime blush reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(bot, cmdName, "blushed to", "blushed to everyone.");
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "punch",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime punch reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(bot, "kick", "punched to", "punched everyone.");
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "pat",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime pated reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(
      bot,
      cmdName,
      "patted with",
      "patted with everyone."
    );
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "kiss",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime kiss reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(
      bot,
      cmdName,
      "kissed with",
      "kissed with everyone."
    );
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "kill",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime kill reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(bot, cmdName, "kill ", "kill everyone over here");
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "happy",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime happy reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(
      bot,
      "dance",
      "feel happy with",
      "feel happy with everyone"
    );
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "dance",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime dance reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(
      bot,
      cmdName,
      "dance with",
      "dance with everyone over here"
    );
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "yeet",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime yeet reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(bot, cmdName, "yeeted to", "yeeted with everyone");
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "wink",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime wink reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(
      bot,
      cmdName,
      "winked with",
      "winked with everyone"
    );
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "slap",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime slap reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(bot, cmdName, "slap to", "slap to everyone");
  }
);

smd(
  {
    pattern: "bonk",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime bonk reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(bot, cmdName, "bonked to", "bonked to everyone");
  }
);

smd(
  {
    pattern: "bully",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime bully reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(bot, cmdName, "bullied to", "bullied to everyone");
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "cringe",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime cringe reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(bot, cmdName, "cringed to", "cringed to everyone");
  }
);
//---------------------------------------------------------------------------
smd(
  {
    pattern: "cuddle",
    category: "reaction",
    use: "<quote|reply|tag>",
    filename: __filename,
    desc: "send Anime cuddle reaction.",
  },
  async (bot, text, { cmdName }) => {
    await sendAnimeReaction(
      bot,
      cmdName,
      "cuddled with",
      "cuddled with everyone"
    );
  }
);


    //.       LOGO CMDS


smd(
  {
    cmdname: "deepsea",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x24125a, _0x4f77c0, { cmdName: _0x2d0eda }) => {
    try {
      if (!_0x4f77c0) {
        return _0x24125a.reply(
          "*_Example : " + (prefix + _0x2d0eda) + " Asta_*"
        );
      }
      return await textToLogoGenerator(
        _0x24125a,
        "create-3d-deep-sea-metal-text-effect-online-1053",
        _0x4f77c0
      );
    } catch (_0x82c892) {
      return await _0x24125a.error(
        _0x82c892 + "\n\ncmdName: " + _0x2d0eda,
        _0x82c892
      );
    }
  }
);
smd(
  {
    cmdname: "horror",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x22e0c1, _0x4b2154, { cmdName: _0x3f34e1 }) => {
    try {
      if (!_0x4b2154) {
        return _0x22e0c1.reply(
          "*_Example : " + (prefix + _0x3f34e1) + " Asta_*"
        );
      }
      return await textToLogoGenerator(
        _0x22e0c1,
        "horror-blood-text-effect-online-883",
        _0x4b2154
      );
    } catch (_0x327e65) {
      return await _0x22e0c1.error(
        _0x327e65 + "\n\ncmdName: " + _0x3f34e1,
        _0x327e65
      );
    }
  }
);
smd(
  {
    cmdname: "whitebear",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x42806c, _0x1d8c69, { cmdName: _0x20d4b4 }) => {
    try {
      if (!_0x1d8c69) {
        return _0x42806c.reply(
          "*_Example : " + (prefix + _0x20d4b4) + " Asta_*"
        );
      }
      return await textToLogoGenerator(
        _0x42806c,
        "online-black-and-white-bear-mascot-logo-creation-1012",
        _0x1d8c69
      );
    } catch (_0x2e7f76) {
      return await _0x42806c.error(
        _0x2e7f76 + "\n\ncmdName: " + _0x20d4b4,
        _0x2e7f76
      );
    }
  }
);
smd(
  {
    cmdname: "joker",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x25bc1d, _0x216b18, { cmdName: _0x67b214 }) => {
    try {
      if (!_0x216b18) {
        return _0x25bc1d.reply(
          "*_Example : " + (prefix + _0x67b214) + " Asta_*"
        );
      }
      return await textToLogoGenerator(
        _0x25bc1d,
        "create-logo-joker-online-934",
        _0x216b18
      );
    } catch (_0x4906be) {
      return await _0x25bc1d.error(
        _0x4906be + "\n\ncmdName: " + _0x67b214,
        _0x4906be
      );
    }
  }
);
smd(
  {
    cmdname: "metallic",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x209bcb, _0x550f0a, { cmdName: _0x92ce9a }) => {
    try {
      if (!_0x550f0a) {
        return _0x209bcb.reply(
          "*_Example : " + (prefix + _0x92ce9a) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x209bcb,
        "create-a-metallic-text-effect-free-online-1041",
        _0x550f0a
      );
    } catch (_0x462544) {
      return await _0x209bcb.error(
        _0x462544 + "\n\ncmdName: " + _0x92ce9a,
        _0x462544
      );
    }
  }
);
smd(
  {
    cmdname: "steel",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x287ddf, _0x2bf771, { cmdName: _0x23d32d }) => {
    try {
      if (!match) {
        return _0x287ddf.reply(
          "*_Example : " + (prefix + _0x23d32d) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x287ddf,
        "steel-text-effect-online-921",
        match
      );
    } catch (_0x2017d3) {
      return await _0x287ddf.error(
        _0x2017d3 + "\n\ncmdName: " + _0x23d32d,
        _0x2017d3
      );
    }
  }
);
smd(
  {
    cmdname: "harrypotter",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x1658cc, _0x217edf, { cmdName: _0x1f1d94 }) => {
    try {
      if (!_0x217edf) {
        return _0x1658cc.reply(
          "*_Example : " + (prefix + _0x1f1d94) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x1658cc,
        "create-harry-potter-text-effect-online-1025",
        _0x217edf
      );
    } catch (_0x5a7364) {
      return await _0x1658cc.error(
        _0x5a7364 + "\n\ncmdName: " + _0x1f1d94,
        _0x5a7364
      );
    }
  }
);
smd(
  {
    cmdname: "underwater",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x4db464, _0x2be604, { cmdName: _0x46bb33 }) => {
    try {
      if (!_0x2be604) {
        return _0x4db464.reply(
          "*_Example : " + (prefix + _0x46bb33) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x4db464,
        "3d-underwater-text-effect-generator-online-1013",
        _0x2be604
      );
    } catch (_0x3a28cb) {
      return await _0x4db464.error(
        _0x3a28cb + "\n\ncmdName: " + _0x46bb33,
        _0x3a28cb
      );
    }
  }
);
smd(
  {
    cmdname: "luxury",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x507353, _0x2e2993, { cmdName: _0x4b0f74 }) => {
    try {
      if (!_0x2e2993) {
        return _0x507353.reply(
          "*_Example : " + (prefix + _0x4b0f74) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x507353,
        "3d-luxury-gold-text-effect-online-1003",
        _0x2e2993
      );
    } catch (_0x518394) {
      return await _0x507353.error(
        _0x518394 + "\n\ncmdName: " + _0x4b0f74,
        _0x518394
      );
    }
  }
);
smd(
  {
    cmdname: "glue",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x106fc0, _0x9fed0e, { cmdName: _0x5b5c5c }) => {
    try {
      if (!_0x9fed0e) {
        return _0x106fc0.reply(
          "*_Example : " + (prefix + _0x5b5c5c) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x106fc0,
        "create-3d-glue-text-effect-with-realistic-style-986",
        _0x9fed0e
      );
    } catch (_0x266ed5) {
      return await _0x106fc0.error(
        _0x266ed5 + "\n\ncmdName: " + _0x5b5c5c,
        _0x266ed5
      );
    }
  }
);
smd(
  {
    cmdname: "fabric",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x2c5e4d, _0x54dc94, { cmdName: _0x201030 }) => {
    try {
      if (!_0x54dc94) {
        return _0x2c5e4d.reply(
          "*_Example : " + (prefix + _0x201030) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x2c5e4d,
        "fabric-text-effect-online-964",
        _0x54dc94
      );
    } catch (_0xee07bf) {
      return await _0x2c5e4d.error(
        _0xee07bf + "\n\ncmdName: " + _0x201030,
        _0xee07bf
      );
    }
  }
);
smd(
  {
    cmdname: "toxic",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0xb24628, _0x1daf45, { cmdName: _0x317c2e }) => {
    try {
      if (!_0x1daf45) {
        return _0xb24628.reply(
          "*_Example : " + (prefix + _0x317c2e) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0xb24628,
        "toxic-text-effect-online-901",
        _0x1daf45
      );
    } catch (_0x2a3ccf) {
      return await _0xb24628.error(
        _0x2a3ccf + "\n\ncmdName: " + _0x317c2e,
        _0x2a3ccf
      );
    }
  }
);
smd(
  {
    cmdname: "ancient",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x19ea9c, _0x2712a3, { cmdName: _0x3da883 }) => {
    try {
      if (!_0x2712a3) {
        return _0x19ea9c.reply(
          "*_Example : " + (prefix + _0x3da883) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x19ea9c,
        "3d-golden-ancient-text-effect-online-free-1060",
        _0x2712a3
      );
    } catch (_0x34eacf) {
      return await _0x19ea9c.error(
        _0x34eacf + "\n\ncmdName: " + _0x3da883,
        _0x34eacf
      );
    }
  }
);
smd(
  {
    cmdname: "cloud",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x3580cc, _0x4759ef, { cmdName: _0x25c70f }) => {
    try {
      if (!_0x4759ef) {
        return _0x3580cc.reply(
          "*_Example : " + (prefix + _0x25c70f) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x3580cc,
        "create-a-cloud-text-effect-on-the-sky-online-1004",
        _0x4759ef
      );
    } catch (_0xf4188b) {
      return await _0x3580cc.error(
        _0xf4188b + "\n\ncmdName: " + _0x25c70f,
        _0xf4188b
      );
    }
  }
);
smd(
  {
    cmdname: "transformer",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x33543a, _0x550c65, { cmdName: _0x5932cf }) => {
    try {
      if (!_0x550c65) {
        return _0x33543a.reply(
          "*_Example : " + (prefix + _0x5932cf) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x33543a,
        "create-a-transformer-text-effect-online-1035",
        _0x550c65
      );
    } catch (_0x1cc1e5) {
      return await _0x33543a.error(
        _0x1cc1e5 + "\n\ncmdName: " + _0x5932cf,
        _0x1cc1e5
      );
    }
  }
);
smd(
  {
    cmdname: "thunder",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x177d36, _0x30ff16, { cmdName: _0x51912b }) => {
    try {
      if (!_0x30ff16) {
        return _0x177d36.reply(
          "*_Example : " + (prefix + _0x51912b) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x177d36,
        "online-thunder-text-effect-generator-1031",
        _0x30ff16
      );
    } catch (_0x40c4a4) {
      return await _0x177d36.error(
        _0x40c4a4 + "\n\ncmdName: " + _0x51912b,
        _0x40c4a4
      );
    }
  }
);
smd(
  {
    cmdname: "scifi",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x1c1874, _0x2049f9, { cmdName: _0x5462f4 }) => {
    try {
      if (!_0x2049f9) {
        return _0x1c1874.reply(
          "*_Example : " + (prefix + _0x5462f4) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x1c1874,
        "create-3d-sci-fi-text-effect-online-1050",
        _0x2049f9
      );
    } catch (_0x3c5966) {
      return await _0x1c1874.error(
        _0x3c5966 + "\n\ncmdName: " + _0x5462f4,
        _0x3c5966
      );
    }
  }
);
smd(
  {
    cmdname: "sand",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x435d39, _0x3c787b, { cmdName: _0x4839f1 }) => {
    try {
      if (!_0x3c787b) {
        return _0x435d39.reply(
          "*_Example : " + (prefix + _0x4839f1) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x435d39,
        "write-in-sand-summer-beach-free-online-991",
        _0x3c787b
      );
    } catch (_0x576498) {
      return await _0x435d39.error(
        _0x576498 + "\n\ncmdName: " + _0x4839f1,
        _0x576498
      );
    }
  }
);
smd(
  {
    cmdname: "rainbow",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x273636, _0x44fbfa, { cmdName: _0xf45ca4 }) => {
    try {
      if (!_0x44fbfa) {
        return _0x273636.reply(
          "*_Example : " + (prefix + _0xf45ca4) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x273636,
        "3d-rainbow-color-calligraphy-text-effect-1049",
        _0x44fbfa
      );
    } catch (_0x16cb64) {
      return await _0x273636.error(
        _0x16cb64 + "\n\ncmdName: " + _0xf45ca4,
        _0x16cb64
      );
    }
  }
);
smd(
  {
    cmdname: "pencil",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0xf01fbd, _0x152a11, { cmdName: _0x3bd3be }) => {
    try {
      if (!_0x152a11) {
        return _0xf01fbd.reply(
          "*_Example : " + (prefix + _0x3bd3be) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0xf01fbd,
        "create-a-sketch-text-effect-online-1044",
        _0x152a11
      );
    } catch (_0x234892) {
      return await _0xf01fbd.error(
        _0x234892 + "\n\ncmdName: " + _0x3bd3be,
        _0x234892
      );
    }
  }
);
smd(
  {
    cmdname: "neon",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x260877, _0x1b1b16, { cmdName: _0x3fd4bb }) => {
    try {
      if (!_0x1b1b16) {
        return _0x260877.reply(
          "*_Example : " + (prefix + _0x3fd4bb) + " Asta_*"
        );
      }
      return await textToLogoGenerator(
        _0x260877,
        "create-3d-neon-light-text-effect-online-1028",
        _0x1b1b16
      );
    } catch (_0x26693d) {
      return await _0x260877.error(
        _0x26693d + "\n\ncmdName: " + _0x3fd4bb,
        _0x26693d
      );
    }
  }
);
smd(
  {
    cmdname: "magma",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x4d2f55, _0x49d874, { cmdName: _0x4f01f0 }) => {
    try {
      if (!_0x49d874) {
        return _0x4d2f55.reply(
          "*_Example : " + (prefix + _0x4f01f0) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x4d2f55,
        "create-a-magma-hot-text-effect-online-1030",
        _0x49d874
      );
    } catch (_0x508ab4) {
      return await _0x4d2f55.error(
        _0x508ab4 + "\n\ncmdName: " + _0x4f01f0,
        _0x508ab4
      );
    }
  }
);
smd(
  {
    cmdname: "leaves",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x356d68, _0x474228, { cmdName: _0x31efdc }) => {
    try {
      if (!_0x474228) {
        return _0x356d68.reply(
          "*_Example : " + (prefix + _0x31efdc) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x356d68,
        "natural-leaves-text-effect-931",
        _0x474228
      );
    } catch (_0x351398) {
      return await _0x356d68.error(
        _0x351398 + "\n\ncmdName: " + _0x31efdc,
        _0x351398
      );
    }
  }
);
smd(
  {
    cmdname: "discovery",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x5840f6, _0x1526fa, { cmdName: _0x12cadb }) => {
    try {
      if (!_0x1526fa) {
        return _0x5840f6.reply(
          "*_Example : " + (prefix + _0x12cadb) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x5840f6,
        "create-space-text-effects-online-free-1042",
        _0x1526fa
      );
    } catch (_0x3bfc3b) {
      return await _0x5840f6.error(
        _0x3bfc3b + "\n\ncmdName: " + _0x12cadb,
        _0x3bfc3b
      );
    }
  }
);
smd(
  {
    cmdname: "christmas",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x2b9514, _0x537b5d, { cmdName: _0x5b77bc }) => {
    try {
      if (!_0x537b5d) {
        return _0x2b9514.reply(
          "*_Example : " + (prefix + _0x5b77bc) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x2b9514,
        "christmas-tree-text-effect-online-free-1057",
        _0x537b5d
      );
    } catch (_0x2bb3a8) {
      return await _0x2b9514.error(
        _0x2bb3a8 + "\n\ncmdName: " + _0x5b77bc,
        _0x2bb3a8
      );
    }
  }
);
smd(
  {
    cmdname: "candy",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x4a4e04, _0x195908, { cmdName: _0x53545f }) => {
    try {
      if (!_0x195908) {
        return _0x4a4e04.reply(
          "*_Example : " + (prefix + _0x53545f) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x4a4e04,
        "create-christmas-candy-cane-text-effect-1056",
        _0x195908
      );
    } catch (_0x31f91a) {
      return await _0x4a4e04.error(
        _0x31f91a + "\n\ncmdName: " + _0x53545f,
        _0x31f91a
      );
    }
  }
);
smd(
  {
    cmdname: "1917",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x20b5a4, _0xde1750, { cmdName: _0x3f5e61 }) => {
    try {
      if (!_0xde1750) {
        return _0x20b5a4.reply(
          "*_Example : " + (prefix + _0x3f5e61) + " Nteej_*"
        );
      }
      return await textToLogoGenerator(
        _0x20b5a4,
        "1917-style-text-effect-online-980",
        _0xde1750
      );
    } catch (_0x1ff89b) {
      return await _0x20b5a4.error(
        _0x1ff89b + "\n\ncmdName: " + _0x3f5e61,
        _0x1ff89b
      );
    }
  }
);
smd(
  {
    cmdname: "blackpink",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (_0x1ff0b0, _0x50896d, { cmdName: _0x56f3bb }) => {
    try {
      if (!_0x50896d) {
        return _0x1ff0b0.reply(
          "*_Example : " + (prefix + _0x56f3bb) + " Asta_*"
        );
      }
      return await textToLogoGenerator(
        _0x1ff0b0,
        "create-blackpink-logo-style-online-1001",
        _0x50896d
      );
    } catch (_0x3b8642) {
      return await _0x1ff0b0.error(
        _0x3b8642 + "\n\ncmdName: " + _0x56f3bb,
        _0x3b8642
      );
    }
  }
);


smd(
  {
    cmdname: "glow",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Asta_*`);
      await require("../lib").textToLogoGenerator(
        message,
        "hieu-ung-chu/tao-hieu-ung-chu-mam-anh-sang-74",
        match,
        "ser",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

smd(
  {
    cmdname: "glitch",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Asta_*`);
      return await textToLogoGenerator(
        message,
        "tao-hieu-ung-chu-digital-glitch-truc-tuyen-941",
        match,
        "suhail",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

smd(
  {
    cmdname: "pixel",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Asta_*`);
      return await textToLogoGenerator(
        message,
        "tao-hieu-ung-chu-pixel-glitch-truc-tuyen-940",
        match,
        "suhail",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

smd(
  {
    cmdname: "grafiti",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Asta_*`);
      return await textToLogoGenerator(
        message,
        "tao-hieu-ung-chu-graffiti-duong-pho-an-tuong-online-795",
        match,
        "suhail",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

smd(
  {
    cmdname: "grafiti2",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      if (!match)
        return message.reply(`*_Example : ${prefix + cmdName} Asta_*`);
      return await textToLogoGenerator(
        message,
        "hieu-ung-chu/chu-graffiti-online-mau-8-182",
        match,
        "suhail",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

smd(
  {
    cmdname: "grafiti3",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      //if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      return await textToLogoGenerator(
        message,
        "tao-hieu-ung-chu-graffiti-sieu-ngau-online-794",
        text1,
        text2
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);
//================================================================================================
smd(
  {
    cmdname: "grafiti4",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      //if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text1)
        return await message.reply(`*_Example : ${prefix + cmdName} text1_*`);
      return await textToLogoGenerator(
        message,
        "hieu-ung-chu/tao-cover-graffiti-online-181",
        text1,
        text2 || "ser",
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

smd(
  {
    cmdname: "gradient",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      // if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      await textToLogoGenerator(
        message,
        "tao-logo-gradient-3d-truc-tuyen-501",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

smd(
  {
    cmdname: "wtone",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      // if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      await textToLogoGenerator(
        message,
        "tao-logo-chu-truc-tuyen-499",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

smd(
  {
    cmdname: "phub",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      // if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      await textToLogoGenerator(
        message,
        "tao-logo-phong-cach-pornhub-612",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

smd(
  {
    cmdname: "avenger",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      //if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      return await textToLogoGenerator(
        message,
        "tao-logo-3d-phong-cach-avengers-445",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);

smd(
  {
    cmdname: "marvel",
    type: "logo",
    info: "Some text to image feature with various styles.",
    filename: __filename,
  },
  async (message, match, { cmdName }) => {
    try {
      ///if (!text) return message.reply(`*_Example : ${prefix+cmdName} text1;text2_*`);
      let text1 = match ? match.split(";")[0] : "";
      let text2 = match ? match.split(";")[1] : "";
      if (!text2 || !text1)
        return await message.reply(
          `*_Example : ${prefix + cmdName} text1;text2_*`
        );
      return await textToLogoGenerator(
        message,
        "tao-logo-phong-cach-marvel-419",
        text1,
        text2,
        "1"
      );
    } catch (e) {
      return await message.error(`${e}\n\ncmdName: ${cmdName}`, e);
    }
  }
);


//.         NEWS CMD

smd(
  {
    pattern: "wanews",
    alias: ["wa"],
    desc: "Fetches the latest WhatsApp beta news for Android.",
    category: "news",
    filename: __filename,
    use: "wanews",
  },
  async (message, input) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/details/wabetainfo";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || data.status !== 200 || !data.result) {
        return message.send("*Failed to fetch WhatsApp beta news.*");
      }

      const { title, subtitle, date, image, link, desc, QandA } = data.result;

      let output = `*${title}*\n\n`;
      output += `${subtitle}\n`;
      output += `${date}\n\n`;
      output += `${desc}\n\n`;
      output += `*Link:* ${link}\n\n`;

      if (image) {
        output += `![Image](${image})\n\n`;
      }

      if (QandA && QandA.length > 0) {
        output += "*Q&A:*\n";
        QandA.forEach((qa) => {
          output += `*${qa.question}*\n${qa.answer}\n\n`;
        });
      }

      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(
        error + "\n\nCommand: wanews",
        error,
        "*Failed to fetch WhatsApp beta news.*"
      );
    }
  }
);


smd(
  {
    pattern: "iosnews",
    alias: ["ios"],
    desc: "Fetches the latest iOS news.",
    category: "news",
    filename: __filename,
    use: "iosnews",
  },
  async (message, input) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/details/ios";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || data.status !== 200 || !data.result) {
        return message.send("*Failed to fetch iOS news.*");
      }

      const { title, link, images, desc } = data.result;

      let output = `*${title}*\n\n`;
      output += `${desc}\n\n`;
      output += `*Link:* ${link}\n\n`;

      if (images && images.length > 0) {
        output += "*Images:*\n";
        images.forEach((image) => {
          output += `${image}\n`;
        });
        output += "\n";
      }

      return message.send(output, { quoted: message });
    } catch (error) {
      console.error(error);
      return message.error(
        error + "\n\nCommand: iosnews",
        error,
        "*Failed to fetch iOS news.*"
      );
    }
  }
);

smd(
  {
    pattern: "googlenews",
    alias: ["gnews"],
    desc: "Fetches the latest Google news.",
    category: "news",
    filename: __filename,
    use: "googlenews",
  },
  async (message, input) => {
    try {
      const { GMSNEWS } = require("gms-mobile-news");

      const news = await GMSNEWS();

      news
        .latest_news()
        .then((result) => {
          const { title, date, link, image, short_desc, full_desc } =
            result.result;

          let output = `*${title}*\n\n`;
          output += `*Date:* ${date}\n\n`;
          output += `${short_desc}\n\n`;
          output += `*Link:* ${link}\n\n`;
          output += `*Image:* ${image}\n\n`;
          output += `*Full Description:*\n${full_desc}`;

          return message.send(output, { quoted: message });
        })
        .catch((error) => {
          console.log(error);
          return message.reply("*Failed to fetch Google news.*");
        });
    } catch (error) {
      await message.error(
        error + "\n\nCommand: googlenews",
        error,
        "*Failed to fetch Google news.*"
      );
    }
  }
);
smd(
  {
    pattern: "spacenews",
    desc: "Fetches articles from the Spaceflight News API.",
    category: "news",
    filename: __filename,
    use: "!spacenews",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.spaceflightnewsapi.net/v4/articles/";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || !data.results || data.results.length === 0) {
        return await m.send(
          "*Failed to fetch articles from Spaceflight News API.*"
        );
      }

      const article = data.results[0];
      const { title, url, image_url, summary, published_at } = article;

      let output = `*Title:* ${title}\n\n`;
      output += `*Summary:* ${summary}\n\n`;
      output += `*Published At:* ${published_at}\n\n`;
      output += `*URL:* ${url}`;

      // If image_url is available, add it to the output
      if (image_url) {
        output += `\n\n*Image:* ${image_url}`;
      }

      await m.send(output);
    } catch (e) {
      await m.error(`${e}\n\ncommand: spacenews`, e);
    }
  }
);

smd(
  {
    pattern: "technews",
    alias: ["tn"],
    desc: "Fetches the latest tech news.",
    category: "news",
    filename: __filename,
    use: "technews",
  },
  async (message, input) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/details/tnews";
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data || data.status !== 200) {
        return await message.reply("*Failed to fetch tech news.*");
      }

      const { title, link, img, desc } = data.result;

      let output = `*${title}*\n\n`;
      output += `${desc}\n\n`;
      output += `*Link:* ${link}\n\n`;
      output += `*Image:* ${img}`;

      return await message.send(output, { quoted: message });
    } catch (error) {
      await message.error(
        error + "\n\nCommand: technews",
        error,
        "*Failed to fetch tech news.*"
      );
    }
  }
);
smd(
  {
    pattern: "population",
    desc: "Fetches current population statistics.",
    category: "statistics",
    filename: __filename,
    use: "!population",
  },
  async (m) => {
    try {
      const apiUrl = "https://api.maher-zubair.tech/details/population";
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data || data.status !== 200 || !data.result) {
        return await m.send("*Failed to fetch population statistics.*");
      }

      const { current, this_year, today } = data.result;
      const { total, male, female } = current;
      const { births, deaths } = today;

      let output = "*Current Population Statistics*\n\n";
      output += `Total Population: ${total}\n`;
      output += `Male: ${male}\n`;
      output += `Female: ${female}\n\n`;
      output += "*Today's Statistics*\n";
      output += `Births: ${births}\n`;
      output += `Deaths: ${deaths}`;

      await m.send(output);
    } catch (e) {
      await m.error(`${e}\n\ncommand: population`, e);
    }
  }
);
smd(
  {
    pattern: "animesearch",
    category: "news",
    desc: "Searches for an anime",
    use: '<query>',
    filename: __filename
  },
  async (m, client) => {
    try {
      const query = m.text.split(' ').slice(1).join(' ');
      if (!query) return client.sendMessage(m.from, { text: 'Please provide an anime title to search.' }, { quoted: m });

      const response = await fetch(`https://api.maher-zubair.tech/anime/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.status !== 200) return client.sendMessage(m.from, { text: `Error: ${data.result}` }, { quoted: m });

      const anime = data.result;
      const animeInfo = `
*Title:* ${anime.title.romaji}
*English Title:* ${anime.title.english}
*Native Title:* ${anime.title.native}
*Format:* ${anime.format}
*Episodes:* ${anime.episodes}
*Duration:* ${anime.duration} mins
*Status:* ${anime.status}
*Season:* ${anime.season} ${anime.seasonYear}
*Source:* ${anime.source}
*Genres:* ${anime.genres.join(', ')}
*Start Date:* ${anime.startDate.day}/${anime.startDate.month}/${anime.startDate.year}
*End Date:* ${anime.endDate.day}/${anime.endDate.month}/${anime.endDate.year}
*Average Score:* ${anime.averageScore}
*Synonyms:* ${anime.synonyms.join(', ')}

*Description:*
${anime.description}
      `;

      client.sendMessage(m.from, { text: animeInfo }, { quoted: m });
    } catch (error) {
      console.error(error);
      client.sendMessage(m.from, { text: 'An error occurred while searching for the anime.' }, { quoted: m });
    }
  }
);
smd({
  pattern: 'nasanews',
  fromMe: false,
  desc: 'Get the latest NASA news',
  type: 'news'
}, async (message, match) => {
  try {
      const response = await axios.get('https://api.maher-zubair.tech/details/nasa');
      const data = response.data.result;
      
      const news = `
🚀 *Title:* ${data.title}
📅 *Date:* ${data.date}
📝 *Explanation:* ${data.explanation}
🔗 *More Info:* [Read More](${data.url})
📢 *Copyright:* ${data.copyright}
      `;
      
      await message.send(news, { quoted: message.data });
  } catch (error) {
      console.error('Error fetching NASA news:', error);
      await message.send('_Failed to fetch NASA news._', { quoted: message.data });
  }
});


//.        SSAVER CMD

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


     //// USER CMD


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


       /////// GIFSEARCH CMD

smd(
  {
    cmdname: "gifsearch",
    alias: ["gify", "tenor"],
    category: "search",
    use: "[text]",
    info: "Searches gif",
  },
  async (_0x483f63, _0x5e7b36) => {
    try {
      if (!_0x5e7b36) {
        return _0x483f63.reply("Sorry you did not give any search term!");
      }
      const _0x4da793 = require("axios");
      const _0x1abfb4 = await _0x4da793
        .get(
          "https://g.tenor.com/v1/search?q=" +
            _0x5e7b36 +
            "&key=LIVDSRZULELA&limit=8"
        )
        .catch(() => {});
      if (
        !_0x1abfb4.data ||
        !_0x1abfb4.data.results ||
        !_0x1abfb4.data.results[0]
      ) {
        return _0x483f63.reply("*Could not find*");
      }
      let _0xf0dc5b =
        _0x1abfb4.data.results.length > 5 ? 5 : _0x1abfb4.data.results.length;
      for (let _0x344f87 = 0; _0x344f87 < _0xf0dc5b; _0x344f87++) {
        _0x483f63.send(
          _0x1abfb4.data.results?.[_0x344f87]?.media[0]?.mp4?.url,
          {
            caption: Config.caption,
            gifPlayback: true,
          },
          "smdvid",
          _0x483f63
        );
      }
    } catch (_0x3ae817) {
      _0x483f63.error(
        _0x3ae817 + "\n\nCommand: gifsearch",
        _0x3ae817,
        "*Could not find*"
      );
    }
  }
);



     ////// HACK CMD

smd({ cmdname: "hack", type: "fun", info: "hacking prank", filename: __filename }, async (citel) => {
  const messages = [
    "Injecting Malware",
    " █ 10%",
    " █ █ 20%",
    " █ █ █ 30%",
    " █ █ █ █ 40%",
    " █ █ █ █ █ 50%",
    " █ █ █ █ █ █ 60%",
    " █ █ █ █ █ █ █ 70%",
    " █ █ █ █ █ █ █ █ 80%",
    " █ █ █ █ █ █ █ █ █ 90%",
    " █ █ █ █ █ █ █ █ █ █ 100%",
    "System hyjacking on process.. \\n Conecting to Server error to find 404 ",
    "Device successfully connected... \\n Riciving data...",
    "Data hyjacked from divice 100% completed \\n killing all evidence killing all malwares...",
    " HACKING COMPLETED ",
    " SENDING LOG DOCUMENTS...",
    " SUCCESSFULLY SENT DATA AND Connection disconnected",
    "BACKLOGS CLEARED"
  ];

  let editedMessage;
  for (const message of messages) {
    editedMessage = await citel.send(editedMessage || message);
    await sleep(1000);
    editedMessage = await citel.edit(editedMessage, message);
  }
});


     //////     CHATS CMD

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
});

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
});

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
});

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
});

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
});

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
});

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
});

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

});

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
});

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
});

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
});


      ////// AUDIO CMD

// Bass effect
smd(
 {
   cmdname: "bass",
   info: "adds bass in given sound",
   type: "audio",
   use: "<reply to any audio>",
 },
 async (cld, _, { smd: cmdName }) => {
   try {
     return await audioEditor(cld, cmdName, cld);
   } catch (err) {
     return await cld.error(err + " \n\nCommand: " + cmdName, err);
   }
 }
);

// Blown effect
smd(
 {
   cmdname: "blown",
   info: "adds blown in given sound",
   type: "audio",
   use: "<reply to any audio>",
 },
 async (cld, _, { smd: cmdName }) => {
   try {
     return await audioEditor(cld, cmdName, cld);
   } catch (err) {
     return await cld.error(err + " \n\nCommand: " + cmdName, err);
   }
 }
);

// Deep effect
smd(
 {
   cmdname: "deep",
   info: "adds deep in given sound",
   type: "audio",
   use: "<reply to any audio>",
 },
 async (cld, _, { smd: cmdName }) => {
   try {
     return await audioEditor(cld, cmdName, cld);
   } catch (err) {
     return await cld.error(err + " \n\nCommand: " + cmdName, err);
   }
 }
);

// Earrape effect
smd(
 {
   cmdname: "earrape",
   info: "adds earrape in given sound",
   type: "audio",
   use: "<reply to any audio>",
 },
 async (cld, _, { smd: cmdName }) => {
   try {
     return await audioEditor(cld, cmdName, cld);
   } catch (err) {
     return await cld.error(err + " \n\nCommand: " + cmdName, err);
   }
 }
);

// Fast effect
smd(
 {
   cmdname: "fast",
   info: "adds fast in given sound",
   type: "audio",
   use: "<reply to any audio>",
 },
 async (cld, _, { smd: cmdName }) => {
   try {
     return await audioEditor(cld, cmdName, cld);
   } catch (err) {
     return await cld.error(err + " \n\nCommand: " + cmdName, err);
   }
 }
);

// Fat effect
smd(
 {
   cmdname: "fat",
   info: "adds fat in given sound",
   type: "audio",
   use: "<reply to any audio>",
 },
 async (cld, _, { smd: cmdName }) => {
   try {
     return await audioEditor(cld, cmdName, cld);
   } catch (err) {
     return await cld.error(err + " \n\nCommand: " + cmdName, err);
   }
 }
);

// Nightcore effect
smd(
 {
   cmdname: "nightcore",
   info: "adds nightcore in given sound",
   type: "audio",
   use: "<reply to any audio>",
 },
 async (cld, _, { smd: cmdName }) => {
   try {
     return await audioEditor(cld, cmdName, cld);
   } catch (err) {
     return await cld.error(err + " \n\nCommand: " + cmdName, err);
   }
 }
);

// Reverse effect
smd(
 {
   cmdname: "reverse",
   info: "adds reverse in given sound",
   type: "audio",
   use: "<reply to any audio>",
 },
 async (cld, _, { smd: cmdName }) => {
   try {
     return await audioEditor(cld, cmdName, cld);
   } catch (err) {
     return await cld.error(err + " \n\nCommand: " + cmdName, err);
   }
 }
);

// Robot effect
smd(
 {
   cmdname: "robot",
   info: "adds robot in given sound",
   type: "audio",
   use: "<reply to any audio>",
 },
 async (cld, _, { smd: cmdName }) => {
   try {
     return await audioEditor(cld, cmdName, cld);
   } catch (err) {
     return await cld.error(err + " \n\nCommand: " + cmdName, err);
   }
 }
);

// Slow effect
smd(
 {
   cmdname: "slow",
   info: "adds slow in given sound",
   type: "audio",
   use: "<reply to any audio>",
 },
 async (cld, _, { smd: cmdName }) => {
   try {
     return await audioEditor(cld, cmdName, cld);
   } catch (err) {
     return await cld.error(err + " \n\nCommand: " + cmdName, err);
   }
 }
);

// Smooth effect
smd(
 {
   cmdname: "smooth",
   info: "adds smooth in given sound",
   type: "audio",
   use: "<reply to any audio>",
 },
 async (cld, _, { smd: cmdName }) => {
   try {
     return await audioEditor(cld, cmdName, cld);
   } catch (err) {
     return await cld.error(err + " \n\nCommand: " + cmdName, err);
   }
 }
);

// Tupai effect
smd(
 {
   cmdname: "tupai",
   info: "adds tupai in given sound",
   type: "audio",
   use: "<reply to any audio>",
 },
 async (cld, _, { smd: cmdName }) => {
   try {
     return await audioEditor(cld, cmdName, cld);
   } catch (err) {
     return await cld.error(err + " \n\nCommand: " + cmdName, err);
   }
 }
);


 ////.       LOGO CMD

smd(
  {
    pattern: "aesthetic",
    category: "wallpaper",
    filename: __filename,
    desc: "Get an aesthetic wallpaper.",
  },
  async (m) => {
    try {
      let apiUrl = "https://api.maher-zubair.tech/wallpaper/asthetic";
      let response = await fetch(apiUrl);
      let jsonResponse = await response.json();

      if (jsonResponse.status === 200) {
        await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
      } else {
        await m.send("*_Request not be preceed!!_*");
      }
    } catch (error) {
      await m.error(
        error + "\n\ncommand: aesthetic",
        error,
        "*_No responce from API, Sorry!!_*"
      );
    }
  }
);
smd(
    {
      pattern: "bike",
      category: "wallpaper",
      filename: __filename,
      desc: "Get a bike wallpaper.",
    },
    async (m) => {
      try {
        let apiUrl = "https://api.maher-zubair.tech/wallpaper/bike";
        let response = await fetch(apiUrl);
        let jsonResponse = await response.json();
  
        if (jsonResponse.status === 200) {
          await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
        } else {
          await m.send("*_Request not be preceed!!_*");
        }
      } catch (error) {
        await m.error(
          error + "\n\ncommand: bike",
          error,
          "*_No responce from API, Sorry!!_*"
        );
      }
    }
  );
  // Command 2: cr7
smd(
    {
      pattern: "cr7",
      category: "wallpaper",
      filename: __filename,
      desc: "Get a CR7 (Cristiano Ronaldo) wallpaper.",
    },
    async (m) => {
      try {
        let apiUrl = "https://api.maher-zubair.tech/wallpaper/cr7";
        let response = await fetch(apiUrl);
        let jsonResponse = await response.json();
  
        if (jsonResponse.status === 200) {
          await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
        } else {
          await m.send("*_Request not be preceed!!_*");
        }
      } catch (error) {
        await m.error(
          error + "\n\ncommand: cr7",
          error,
          "*_No responce from API, Sorry!!_*"
        );
      }
    }
  );
  // Command 3: cat
smd(
    {
      pattern: "cat",
      category: "wallpaper",
      filename: __filename,
      desc: "Get a cat wallpaper.",
    },
    async (m) => {
      try {
        let apiUrl = "https://api.maher-zubair.tech/wallpaper/cat";
        let response = await fetch(apiUrl);
        let jsonResponse = await response.json();
  
        if (jsonResponse.status === 200) {
          await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
        } else {
          await m.send("*_Request not be preceed!!_*");
        }
      } catch (error) {
        await m.error(
          error + "\n\ncommand: cat",
          error,
          "*_No responce from API, Sorry!!_*"
        );
      }
    }
  );
  // Command 4: dog
smd(
    {
      pattern: "dog",
      category: "wallpaper",
      filename: __filename,
      desc: "Get a dog wallpaper.",
    },
    async (m) => {
      try {
        let apiUrl = "https://api.maher-zubair.tech/wallpaper/dog";
        let response = await fetch(apiUrl);
        let jsonResponse = await response.json();
  
        if (jsonResponse.status === 200) {
          await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
        } else {
          await m.send("*_Request not be preceed!!_*");
        }
      } catch (error) {
        await m.error(
          error + "\n\ncommand: dog",
          error,
          "*_No responce from API, Sorry!!_*"
        );
      }
    }
  );
  // Command 5: messi
smd(
    {
      pattern: "messi",
      category: "wallpaper",
      filename: __filename,
      desc: "Get a Lionel Messi wallpaper.",
    },
    async (m) => {
      try {
        let apiUrl = "https://api.maher-zubair.tech/wallpaper/messi";
        let response = await fetch(apiUrl);
        let jsonResponse = await response.json();
  
        if (jsonResponse.status === 200) {
          await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
        } else {
          await m.send("*_Request not be preceed!!_*");
        }
      } catch (error) {
        await m.error(
          error + "\n\ncommand: messi",
          error,
          "*_No responce from API, Sorry!!_*"
        );
      }
    }
  );
  // Command 6: mlegend
smd(
    {
      pattern: "mlegend",
      category: "wallpaper",
      filename: __filename,
      desc: "Get a Mobile Legends wallpaper.",
    },
    async (m) => {
      try {
        let apiUrl = "https://api.maher-zubair.tech/wallpaper/mlegend";
        let response = await fetch(apiUrl);
        let jsonResponse = await response.json();
  
        if (jsonResponse.status === 200) {
          await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
        } else {
          await m.send("*_Request not be preceed!!_*");
        }
      } catch (error) {
        await m.error(
          error + "\n\ncommand: mlegend",
          error,
          "*_No responce from API, Sorry!!_*"
        );
      }
    }
  );
  // Command 7: pubg
smd(
    {
      pattern: "pubg",
      category: "wallpaper",
      filename: __filename,
      desc: "Get a PUBG wallpaper.",
    },
    async (m) => {
      try {
        let apiUrl = "https://api.maher-zubair.tech/wallpaper/pubg";
        let response = await fetch(apiUrl);
        let jsonResponse = await response.json();
  
        if (jsonResponse.status === 200) {
          await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
        } else {
          await m.send("*_Request not be preceed!!_*");
        }
      } catch (error) {
        await m.error(
          error + "\n\ncommand: pubg",
          error,
          "*_No responce from API, Sorry!!_*"
        );
      }
    }
  );
  
  // Command 8: random
  smd(
    {
      pattern: "random",
      category: "wallpaper",
      filename: __filename,
      desc: "Get a random wallpaper.",
    },
    async (m) => {
      try {
        let apiUrl = "https://api.maher-zubair.tech/wallpaper/random";
        let response = await fetch(apiUrl);
        let jsonResponse = await response.json();
  
        if (jsonResponse.status === 200) {
          await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
        } else {
          await m.send("*_Request not be preceed!!_*");
        }
      } catch (error) {
        await m.error(
          error + "\n\ncommand: random",
          error,
          "*_No responce from API, Sorry!!_*"
        );
      }
    }
  );
  
  // Command 9: car
  smd(
    {
      pattern: "car",
      category: "wallpaper",
      filename: __filename,
      desc: "Get a car wallpaper.",
    },
    async (m) => {
      try {
        let apiUrl = "https://api.maher-zubair.tech/wallpaper/car";
        let response = await fetch(apiUrl);
        let jsonResponse = await response.json();
  
        if (jsonResponse.status === 200) {
          await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
        } else {
          await m.send("*_Request not be preceed!!_*");
        }
      } catch (error) {
        await m.error(
          error + "\n\ncommand: car",
          error,
          "*_No responce from API, Sorry!!_*"
        );
      }
    }
  );
  
  // Command 10: blackpink
  smd(
    {
      pattern: "blackpink",
      category: "wallpaper",
      filename: __filename,
      desc: "Get a Blackpink wallpaper.",
    },
    async (m) => {
      try {
        let apiUrl = "https://api.maher-zubair.tech/wallpaper/blackpink";
        let response = await fetch(apiUrl);
        let jsonResponse = await response.json();
  
        if (jsonResponse.status === 200) {
          await m.send(jsonResponse.url, { caption: Config.caption }, "image", m);
        } else {
          await m.send("*_Request not be preceed!!_*");
        }
      } catch (error) {
        await m.error(
          error + "\n\ncommand: blackpink",
          error,
          "*_No responce from API, Sorry!!_*"
        );
      }
    }
  );
   










