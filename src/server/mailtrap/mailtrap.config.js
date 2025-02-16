import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;

export const mailtrapClient = new MailtrapClient({
	token: TOKEN,
	endpoint: process.env.MAILTRAP_ENDPOINT,
});

export const sender = { name: "Verify your email", email: "mailtrap@demomailtrap.com" };

