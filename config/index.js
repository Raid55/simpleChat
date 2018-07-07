require('dotenv').config();

module.exports = {
	NODE_ENV: process.env.NODE_ENV || "dev",
	MONGO_CONN: process.env.CHAT_MONGO_CONN || "mongodb://localhost:27017/chat_app",
	PORT: process.env.CHAT_PORT || 3000,
	TOKEN_SECRET: process.env.CHAT_TOKEN_SECRET || "keyboard_cat",
	TOKEN_ISS: process.env.CHAT_TOKEN_ISS || "chat_app",
	TOKEN_EXP: process.env.CHAT_TOKEN_EXP || "7d", // default to 7 day exp
};
