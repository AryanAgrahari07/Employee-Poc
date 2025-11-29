// simple loader to validate env
require("dotenv").config();

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not set — check .env");
}
if (!process.env.JWT_SECRET) {
  console.warn("JWT_SECRET not set — set it for authentication");
}

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PORT: process.env.PORT || 4000
};
