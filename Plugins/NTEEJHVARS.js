// VARS
const Config = require("../config");
let {
  fancytext,
  tlang,
  tiny,
  runtime,
  formatp,
  botpic,
  prefix,
  sck1,
  smd,
} = require("../lib");
const axios = require("axios");
const appName = Config.HEROKU_APP_NAME
  ? Config.HEROKU_APP_NAME.toLowerCase()
  : "";
const authToken = Config.HEROKU_API_KEY;
const HEROKU = authToken && appName ? true : false;
const fetch = require("node-fetch");
let updateConfig = () => {
  try {
    let _0x3334e2 = "../config";
    delete require.cache[_0x3334e2];
    require(_0x3334e2);
    return true;
  } catch (_0x4ed960) {
    console.log(_0x4ed960);
  }
};
const heroku = {};
heroku.addvar = async (_0xd07de3, _0x48d352) => {
  try {
    const _0x5a040c = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    };
    const _0x2855d9 = await fetch(
      "https://api.heroku.com/apps/" + appName + "/config-vars",
      {
        method: "PATCH",
        headers: _0x5a040c,
        body: JSON.stringify({
          [_0xd07de3]: _0x48d352,
        }),
      }
    );
    const _0x22fb4f = await _0x2855d9.json();
    return {
      status: true,
      data: _0x22fb4f,
    };
  } catch (_0x479075) {
    return {
      status: false,
      data: _0x479075,
    };
  }
};
heroku.getallvar = async () => {
  try {
    const _0x22b1af = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
    };
    const _0x3bb50b = await fetch(
      "https://api.heroku.com/apps/" + appName + "/config-vars",
      {
        headers: _0x22b1af,
      }
    );
    const _0xfb3354 = await _0x3bb50b.json();
    let _0x6efaf0 =
      "   『 *" +
      appName +
      " VARS* 』 \n*________________________________________*\n";
    Object.keys(_0xfb3354).forEach((_0x792bf) => {
      _0x6efaf0 +=
        "*" +
        _0x792bf +
        " :*  " +
        (_0xfb3354[_0x792bf] ? "```" + _0xfb3354[_0x792bf] + "```" : "") +
        " \n";
    });
    return {
      status: true,
      data: _0x6efaf0,
    };
  } catch (_0x3932ac) {
    return {
      status: false,
      data: _0x3932ac.message || _0x3932ac,
    };
  }
};
heroku.getvar = async (_0xb1a22) => {
  try {
    const _0x5c6d03 = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
    };
    const _0x5605e7 = await fetch(
      "https://api.heroku.com/apps/" + appName + "/config-vars",
      {
        headers: _0x5c6d03,
      }
    );
    const _0x26040f = await _0x5605e7.json();
    return {
      status: true,
      data: _0x26040f[_0xb1a22],
    };
  } catch (_0x3bef2f) {
    return {
      status: false,
      data: _0x3bef2f.message || _0x3bef2f,
    };
  }
};
heroku.setvar = async (_0x25ad82, _0x3115e9) => {
  try {
    const _0x4207de = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    };
    fetch("https://api.heroku.com/apps/" + appName + "/config-vars", {
      method: "GET",
      headers: _0x4207de,
    })
      .then((_0x47bbf4) => {
        if (_0x47bbf4.ok) {
          return _0x47bbf4.json();
        } else {
          return {
            status: false,
            data: "Failed to fetch app variables. Status: " + _0x47bbf4.status,
          };
        }
      })
      .then((_0x387a92) => {
        if (_0x387a92.hasOwnProperty(_0x25ad82)) {
          const _0x17a922 = {
            ..._0x387a92,
          };
          _0x17a922[_0x25ad82] = _0x3115e9;
          return fetch(
            "https://api.heroku.com/apps/" + appName + "/config-vars",
            {
              method: "PATCH",
              headers: _0x4207de,
              body: JSON.stringify(_0x17a922),
            }
          );
        } else {
          return {
            status: false,
            data: "Variable not found in app",
          };
        }
      })
      .then((_0x58ea28) => {
        if (_0x58ea28.ok) {
          return {
            status: true,
            data: _0x58ea28,
          };
        }
      })
      .catch((_0x916fd3) => {
        return {
          status: false,
          data: _0x916fd3,
        };
      });
  } catch (_0x3d9ebc) {
    return {
      status: false,
      data: _0x3d9ebc,
    };
  }
};
heroku.setvar = async (_0x4d36a5, _0x4c84a1) => {
  try {
    const _0x2515a0 = {
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer " + authToken,
      "Content-Type": "application/json",
    };
    const _0x69e829 = await fetch(
      "https://api.heroku.com/apps/" + appName + "/config-vars",
      {
        method: "GET",
        headers: _0x2515a0,
      }
    );
    if (!_0x69e829.ok) {
      return {
        status: false,
        data: "Variable not found in heroku app",
      };
    }
    const _0x5ae1b2 = await _0x69e829.json();
    if (_0x5ae1b2.hasOwnProperty(_0x4d36a5)) {
      const _0x587d10 = {
        ..._0x5ae1b2,
      };
      _0x587d10[_0x4d36a5] = _0x4c84a1;
      const _0x4b3418 = await fetch(
        "https://api.heroku.com/apps/" + appName + "/config-vars",
        {
          method: "PATCH",
          headers: _0x2515a0,
          body: JSON.stringify(_0x587d10),
        }
      );
      if (_0x4b3418.ok) {
        return {
          status: true,
          data: _0x4b3418,
        };
      } else {
        return {
          status: false,
          data: "Failed to update app variable. Status: " + _0x4b3418.status,
        };
      }
    } else {
      return {
        status: false,
        data: "Variable not found in app",
      };
    }
  } catch (_0x5e8fe0) {
    return {
      status: false,
      data: _0x5e8fe0.message || _0x5e8fe0,
    };
  }
};
