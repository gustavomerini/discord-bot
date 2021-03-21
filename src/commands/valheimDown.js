const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send("Parando...");
};

module.exports.help = {
  name: "down",
};
