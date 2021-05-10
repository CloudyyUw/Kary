import Client from "./src/structures/Client";
import dotenv from "dotenv";

const client = new Client(process.env.TOKEN);
client.connect();