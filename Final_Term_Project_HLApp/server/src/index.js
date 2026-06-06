import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import { createApp } from "./app.js";

dotenv.config();

const port = process.env.PORT || 5000;

await connectDatabase();

const app = createApp();

app.listen(port, () => {
  console.log(`Healthcare API listening on port ${port}`);
});

