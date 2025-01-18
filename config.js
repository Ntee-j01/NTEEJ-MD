//Nteej code
const fs = require("fs-extra");
if (fs.existsSync(".env"))
  require("dotenv").config({ path: __dirname + "/.env" });

    // DEPENDENCIES

global.SESSION_ID = process.env.SESSION_ID || ""; // Session id here
global.MONGODB = process.env.MONGODB_URI || ""; // Dont edit
global.DATABASE_URL = process.env.DATABASE_URL || ""; // Dont edit
global.sudo = process.env.SUDO
  ? process.env.SUDO.replace(/[\s+]/g, "")
  : "null"; // Dont edit
global.owner = process.env.OWNER_NUMBER
  ? process.env.OWNER_NUMBER.replace(/[\s+]/g, "")
  : "263774638594"; // owner number

 ///      DONT EDIT HERE

global.THUMB_IMAGE =
  process.env.THUMB_IMAGE ||
  process.env.IMAGE ||
  "https://i.postimg.cc/Z5zY71qy/PSX-20250106-022606.jpg.jpg";
global.userImages =
  process.env.USER_IMAGES ||
  "https://i.postimg.cc/Z5zY71qy/PSX-20250106-022606.jpg";
  
  
///===========[GLOBALl iMPORTS]====================//

module.exports = {
  menu: process.env.MENU || "",
  HANDLERS: process.env.PREFIX || ".",
  BRANCH: process.env.BRANCH || "main",
  VERSION: process.env.VERSION || "1.0.0",
  caption: process.env.CAPTION || "`NTEEJ-MD V2`",
  author: process.env.PACK_AUTHER || "NTEEJ-MD V2",
  packname: process.env.PACK_NAME || "NTEEJ",
  botname: process.env.BOT_NAME || "NTEEJ-MD V2",
  
  ///////////////////////////////////////////////////
  
  ownername: process.env.OWNER_NAME || "Nteej", // owner name

  errorChat: process.env.ERROR_CHAT || "",
  KOYEB_API: process.env.KOYEB_API || "false", // leave blank
  REMOVE_BG_KEY: process.env.REMOVE_BG_KEY || "", // leave blank
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "", // leave blank
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || "", // leave blank
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || "", // leave blank
  antilink_values: process.env.ANTILINK_VALUES || "all", 
  HEROKU: process.env.HEROKU_APP_NAME && process.env.HEROKU_API_KEY,
  aitts_Voice_Id: process.env.AITTS_ID || "37",
  ELEVENLAB_API_KEY: process.env.ELEVENLAB_API_KEY || "", // leave blank
  WORKTYPE: process.env.WORKTYPE || process.env.MODE || "public",
  LANG: (process.env.THEME || "WhatsApp").toUpperCase(),
};
global.port = process.env.PORT;
global.appUrl = process.env.APP_URL || "";
global.email = "nteejtech@yahoo.com";
global.location = "";
global.allowJids = process.env.ALLOW_JID || "null";
global.blockJids = process.env.BLOCK_JID || "null";
global.timezone = process.env.TZ || process.env.TIME_ZONE || "Africa/Harare";
global.github = process.env.GITHUB || "https://github.com/Ntee-j01/NTEEJ-MD";
global.gurl = process.env.GURL || "https://whatsapp.com/channel/0029Vae3GZF9Bb658QgSCl1I";
global.website = process.env.GURL || "https://chat.whatsapp.com/Er6RNNNVWV5LORN9Nr6hL7";
global.devs = "263714497545";
global.msg_style = process.env.STYLE || "4";
global.session_reset = process.env.SS_RESET || "false";
global.gdbye = process.env.GOODBYE || "false"; // goodbye message
global.wlcm = process.env.WELCOME || "false"; // welcome message 
global.warncount = process.env.WARN_COUNT || 3; // group warning times
global.disablepm = process.env.DISABLE_PM || "false"; // set true to enable private mode
(global.disablegroup = process.env.DISABLE_GROUPS || "false"), // group disable
  (global.MsgsInLog = process.env.MSGS_IN_LOG || "true"); 
global.waPresence = process.env.WAPRESENCE || "null"; // WhatsApp always online 
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
