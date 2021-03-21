const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({ disableEveryone: true });
bot.commands = new Discord.Collection();

fs.readdir("./src/commands/", (err, files) => {
  if (err) console.log(err);

  let jsfile = files.filter((f) => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

//Playing Message
bot.on("ready", async () => {
  console.log(
    `${bot.user.username} is online on ${bot.guilds.cache.size} servers!`
  );

  bot.user.setActivity("My Code", { type: "PLAYING" });
});

//Command Manager
bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  const prefix = config.prefix;
  const messageArray = message.content.split(" ");
  const id = message.channel.id;
  const cmd = messageArray[0];
  const args = messageArray.slice(1);

  //Check for prefix
  if (!cmd.startsWith(config.prefix)) return;

  const commandfile = bot.commands.get(cmd.slice(prefix.length));
  if ((cmd === "!up" || cmd === "!down") && id !== process.env.VALHEIM_ID) {
    console.log("aborting, wrong channel");
    return;
  }
  if (commandfile) commandfile.run(bot, message, args);
});

bot.login(process.env.API_KEY);
