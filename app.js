const easyvk = require("easyvk");
const config = require("config");
const fs = require("fs");
const readline = require("readline");
const path = require("path");
const sessionPath = path.join(__dirname, ".session-vk");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function setTimer(vk) {
  setTimeout(async () => {
    let response = await vk.call("messages.send", {
      peer_id: 20000000 + config.get("conversation"),
      message: config.get("message"),
      random_id: easyvk.randomId(),
    });

    console.log(response);
  }, new Date(config.get("time")) - new Date());
}

async function logInWith2Auth(params) {
  return new Promise((_2faNeed) => {
    function relogIn(_2faCode = "") {
      if (_2faCode) params.code = _2faCode;
      easyvk(params)
        .then(setTimer)
        .catch((err) => {
          if (!err.easyvk_error) {
            if (err.error_code == "need_validation") {
              _2faNeed({
                err: err,
                relogIn: relogIn,
              });
            }
          }
        });
    }

    relogIn();
  });
}

async function getSession() {
  let token = "";
  try {
    let data = fs.readFileSync(sessionPath);
    token = JSON.parse(data).access_token;
  } catch {}
  return token;
}

async function main() {
  let token = await getSession();
  if (token) {
    console.log(token);
    easyvk({ access_token: token }).then(setTimer);
  } else {
    logInWith2Auth({
      username: config.get("username"),
      password: config.get("password"),
      sessionFile: sessionPath,
      reauth: true,
    }).then(({ err: error, relogIn }) => {
      console.log(error.validation_type);

      rl.question(error.error + " ", (answer) => {
        let code = answer;
        relogIn(code);

        rl.close();
      });
    });
  }
}

main();
