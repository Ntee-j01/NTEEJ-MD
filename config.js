//Nteej code
const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });

//=======[dependencies]====================//
global.SESSION_ID = process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUZQODJXc2txTDRlK0FiRjdhelcxK3B2YVVLZzk4VmJEQm4wWVNNT24zRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSjhFKzJkY3ZhWDArajZDRWw5VGx2Yk1TdGhZQTNUM3VYdjg4YlNLaElpMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNQnVvLyttK0V0dk9JajcvdHZCSC8vVm9hZFBTRm8xZllkSExMYkx3UVVzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZb1c3Mk1LalE3QUFwLzdaQmovSDcyT3BMVXZIZ1I0dnVZY25DVUMwSFdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklGMnBSRm5JWHJHSnpDWWJ0cURhS1dTNVIxcytBT2lKSmVEaXdxOGI0MUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZ3ZGxhR2hoQzd2SXhkRS8rNXFobElmZjdyTE5RWUY2cUVzUjV4Tzg0Vkk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0IraFpSU3RTcEVUUUJDa2Vud3l5OUoyV0hRYmlZRVBSRDhremNPVCtXWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmU1aDRuTjZzYUVvdFRMK3VsT1hrN1hEZ3lDSUwrVUtqcmJSTUhDZXBYST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1Ic0ZSYUVicXh2UXJnb3czcmdPZ1Q3cWNBSUxxSXhrRFpRZExvSGhUZ1BueWhSK0RVNUlhY0NzZExmQ2ltLzFEYVN1bVYyRnpMY0dlTXZWcCtDUkNnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIxLCJhZHZTZWNyZXRLZXkiOiJlWTV4RFVoTXZldjZlcW0rQ1QxV3pNV1JsZ2pMQzRNQlR0ZTh0UnJBc2NNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJpVkVGNUdmOFN4aVplUWhvVDJOeldRIiwicGhvbmVJZCI6IjA0YjJiYTAwLTI4OGQtNGJlNS04NGZmLWIxMmJiYWQ0NzVjMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIvSWNrNWJGcnlhdUdRM0tyYjNZTmo2UkFpVm89In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNVdzK3NaRzU5MkttelVsR2VGT1V6Qlp4WFRRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ik4xTkxMUTdaIiwibWUiOnsiaWQiOiIyNjM3MTQ0OTc1NDU6MjRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ09tTmpmTURFUDZ6Z0xRR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImlXanRubXdxdlZYL0x1ODd1VEdCU1ZFcm1VVDF6OVd5ZUY5V2ZnSjJNUkU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlR3Ti9nWTZDVkloSnlCb3JqRFFVOUYzM1hTdm94MXVlUmFNU0lsVWtnS0tkYUt0Y29vN2xtbkYwdXVDZk1GYkFiRHRqdkN1VGZBWEZ5cnlWRnhvdkNRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI3cWQyWG5RMnBCeFZvZ2ttVDJBSkV1NitIM0tOUGJZdE9IK29BVTJNVVVsdkd5TUVPaGpJVE94c3B3bmM0U2ZOcW9mNzBWNm1lWkgwdEdpRTRpeW9Ddz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNDQ5NzU0NToyNEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJZbG83WjVzS3IxVi95N3ZPN2t4Z1VsUks1bEU5Yy9Wc25oZlZuNENkakVSIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE5NjcxMzA3LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFqZyJ9";
global.MONGODB = process.env.MONGODB_URI || "";
global.DATABASE_URL = process.env.DATABASE_URL || "";
global.sudo = process.env.SUDO
  ? process.env.SUDO.replace(/[\s+]/g, "")
  : "null";
global.owner = process.env.OWNER_NUMBER
  ? process.env.OWNER_NUMBER.replace(/[\s+]/g, "")
  : "263714497545";
global.THUMB_IMAGE =
  process.env.THUMB_IMAGE ||
  process.env.IMAGE ||
  "https://i.postimg.cc/FssKzLK7/20240622-140407.jpg,https://i.postimg.cc/FssKzLK7/20240622-140407.jpg";
global.userImages =
  process.env.USER_IMAGES ||
  "https://i.postimg.cc/FssKzLK7/20240622-140407.jpg,https://i.postimg.cc/FssKzLK7/20240622-140407.jpg,https://i.postimg.cc/FssKzLK7/20240622-140407.jpg";
///===========[global iMPORTS]====================//

module.exports = {
  menu: process.env.MENU || "",
  HANDLERS: process.env.PREFIX || ".",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "1.0.0",
  caption: process.env.CAPTION || "`NTEEJ-MD`",
  author: process.env.PACK_AUTHER || "NTEEJ-MD",
  packname: process.env.PACK_NAME || "NTEEJ",
  botname: process.env.BOT_NAME || "NTEEJ-MD",
  ownername: process.env.OWNER_NAME || "Nteej",
  errorChat: process.env.ERROR_CHAT || "",
  KOYEB_API: process.env.KOYEB_API || "false",
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "",
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "",
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "",
  antilink_values: process.env.ANTILINK_VALUES || "all",
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  aitts_Voice_Id: process.env.AITTS_ID || "37",
  ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY || "",
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || "public",
  LANG: (process.env.THEME || "WhatsApp").toUpperCase(),
};
global.port = process.env.PORT;
global.appUrl = process.env.APP_URL || "";
global.email = "";
global.location = "";
global.allowJids = process.env.ALLOW_JID || "null";
global.blockJids = process.env.BLOCK_JID || "null";
global.timezone = process.env.TZ || process.env.TIME_ZONE || "Africa/Lagos";
global.github = process.env.GITHUB || "https://github.com/Ntee-j01/NTEEJ-MD";
global.gurl = process.env.GURL || "https://whatsapp.com/channel/0029Vae3GZF9Bb658QgSCl1I";
global.website = process.env.GURL || "https://chat.whatsapp.com/Er6RNNNVWV5LORN9Nr6hL7";
global.devs = "263714497545";
global.msg_style = process.env.STYLE || "4";
global.session_reset = process.env.SS_RESET || "false";
global.gdbye = process.env.GOODBYE || "false";
global.wlcm = process.env.WELCOME || "false";
global.warncount = process.env.WARN_COUNT || 3;
global.disablepm = process.env.DISABLE_PM || "false";
(global.disablegroup = process.env.DISABLE_GROUPS || "false"),
  (global.MsgsInLog = process.env.MSGS_IN_LOG || "true");
global.waPresence = process.env.WAPRESENCE || "null";
global.readcmds = process.env.READ_COMMAND || "false";
global.readmessage = process.env.READ_MESSAGE || "false";
global.readmessagefrom = process.env.READ_MESSAGE_FROM || "null";
global.read_status = process.env.AUTO_READ_STATUS || "false";
global.save_status = process.env.AUTO_SAVE_STATUS || "false";
global.save_status_from = process.env.SAVE_STATUS_FROM || "null";
global.read_status_from = process.env.READ_STATUS_FROM || "null";
global.api_smd = "https://api-smd-1.vercel.app";
global.scan = "https://mainv2-f66485a0f702.herokuapp.com/";
global.isMongodb = false;
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update'${__filename}'`);
  delete require.cache[file];
  require(file);
});
