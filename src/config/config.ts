import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_DBNAME = process.env.MONGO_DBNAME || "";

export const config = {
  mongo: {
    uri: MONGO_URI,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    dbname: MONGO_DBNAME,
  },
  server: {
    dev_port: 8000,
    prod_port: 80,
  },
};
