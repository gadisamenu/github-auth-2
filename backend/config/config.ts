import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3000;
const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin&retryWrites=true&w=majority`;
const config = {
  PORT: port,
  MONGO_URL: url,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};

export default config;
