
require("dotenv").config();
const { Client, Events, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require("discord.js");
const { emoAd } = require("./ad-data.js");
const CLIENT_ID = "1050929742632726668";
// const GUILD_ID = "917465654968328234";  // Glumdark server ID

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
] });

const commands = [
  {
    name: "ad",
    description: "Blink twice to accept charges."
  },
]; 

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (interaction.commandName === "ad") {
    const adText = emoAd();
    await interaction.reply({ content: adText });
  }
});

const rest = new REST({ version: '10' }).setToken(process.env.CLIENT_TOKEN);
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    // The put method is used to fully refresh all commands in the guild with the current set
    const data = await rest.put(
      // Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      Routes.applicationCommands(CLIENT_ID),
      { body: commands },
    );
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();


// make sure this line is the last line
client.login(process.env.CLIENT_TOKEN);
