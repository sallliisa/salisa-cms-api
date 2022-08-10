import dotenv from "dotenv";

dotenv.config();

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/salisaxyz";

export const config = {
  mongo: {
    uri: MONGO_URI,
  },
  server: {
    dev_port: 3000,
    prod_port: 80,
  },
};
