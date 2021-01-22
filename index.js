// Importing modules
const Discord = require("discord.js");
const colors = require("colors");
const title = require("console-title");

// Creating client
const client = new Discord.Client();

// Importing files
const config = require("./config.json");

// Getting time
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
