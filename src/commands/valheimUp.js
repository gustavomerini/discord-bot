const axios = require("axios");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  try {
    await axios.default.post(`${config.baseUrl}/api/valheim/status`, {
      status: "down",
    });
    message.channel.send("Serber está iniciante, uhummmmmmmmmmmmmmmm");
  } catch(error) {
    console.error(error);
  }
};

module.exports.help = {
  name: "up",
};
