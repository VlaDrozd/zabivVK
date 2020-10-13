const easyvk = require("easyvk");
const config = require("config");

easyvk({
  username: config.get("username"),
  pasword: config.get("password"),
}).then(async (vk) => {

    setTimeout(async () => {
        let response = await vk.call("messages.send", {
            peer_id: 20000000 + config.get("conversation"),
            message: config.get("message"),
            random_id: easyvk.randomId()
          });

          console.log(response);
    },  new Date(config.get('time')) - new Date());

});


