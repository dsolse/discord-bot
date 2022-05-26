import { Client, Intents, TextChannel } from "discord.js";
import { config } from "dotenv";
import { getAllUsers, getAllUsersServer, getCmd } from "./utils"

config()

const ints = {
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
	]
}

const cliente: Client = new Client(ints);


cliente.login(process.env.DISCORD_TOKEN)

cliente.on("ready", async () => {
	console.log("ready")
	cliente.channels.fetch(String(process.env.SERVER_ID)).
		then(channel => {
			(channel as TextChannel | any).send("Buenos días, jóvenes!")
		})
})

cliente.on("messageCreate", async (msg) => {
	const contentMsg = msg.content;
	if (getCmd(contentMsg, "help")) {
		msg.channel.send("Cual es la pregunta?")
	}

	if (getCmd(contentMsg, "dato")) {
		msg.channel.send("No se si sabían, pero desde el 2007 no se hace un censo 😪 🤬")
	}

	if (getCmd(contentMsg, "callAll")) {
		const users = await getAllUsers(msg);
		const mentions = users?.reduce((prev, next) => {
			return (prev += ` <@${next.id}>`)
		}, "")
		//users?.forEach((current: any) => mentions += `<@${current.id}>`, "")
		msg.channel.send(`Hey, reúnanse!!! dejen de ser porno ${mentions}`)
		console.log("guild membre", mentions)
	}
})
