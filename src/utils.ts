import { Client, Message, TextChannel } from "discord.js";
import data from "./config.json";


const getCmd = (content: string, option: string): boolean => (content.startsWith(`${data.prefix} ${option}`))

const getAllUsers = async (msg: Message) => {
	const users = await msg.guild?.members.cache;
	return users;
}


const getAllUsersServer = async (cli: Client) => {
	const users = await cli.users.cache
	return users;
}

export { getCmd, getAllUsers, getAllUsersServer };
