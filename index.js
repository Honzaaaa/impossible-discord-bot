// Importing modules.
const Discord = require("discord.js");
const colors = require("colors");
const title = require("console-title");
const fs = require("fs")

// Creating client.
const client = new Discord.Client();

// Importing files.
const config = require("./config.json");
const load = require("./cmd/load.js")

// Getting time.
const date = new Date();

const day = date.getDay();
const mon = date.getMonth();
const yea = date.getYear();
const hou = date.getHours();
const min = date.getMinutes();
const sec = date.getSeconds();

const fulltime = ´${hou}:${min}:${sec}´;
const fulldate = ´${day}:${mon}:${yea}´;

// Now, the code.
client.login(config.token);

client.on("ready", () => {
  client.user.setPresence("Loading...");
  console.log(´[${fulltime}] | Loading...´);
  load(client);
  client.user.setPresence("Helping you with making your server a better place.", { type: "COMPETING" });
});

client.on("ratelimit", () => {
  client.user.setPresence("Being rate limited! Please wait 5 seconds.");
  console.log(´[${fulltime}] | Rate limit warning! Freezing to 5 seconds.´);
  setTimeout(() => {
    client.user.setPresence("Helping you with making your server a better place.", { type: "COMPETING" });
    return;
  }, 5000);
});

client.on("disconnect", () => {
  console.log(´[${fulltime}] | Disconnected! Trying to reconnect.´)
  client.login(config.token);
});
