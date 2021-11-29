const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");


dotenv.config({
  path: `backend/config/.env.development`,
});

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});