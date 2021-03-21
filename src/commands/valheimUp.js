const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  message.channel.send("Iniciando...");
};

module.exports.help = {
  name: "up",
};
