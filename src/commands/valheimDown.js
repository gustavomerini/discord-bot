const axios = require("axios");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  try {
    await axios.post(`${config.baseUrl}/api/valheim/status`, {
      status: "down",
    });
    message.channel.send("Serber está parante");
    bot.user.setActivity(" 🔴 OFF THE LINE 🔴 ", { type: "O SERBER ESTÁ:" });
  } catch (error) {
    console.error(error);
  }
};

module.exports.help = {
  name: "down",
};
