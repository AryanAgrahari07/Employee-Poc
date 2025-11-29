require("dotenv").config();
const http = require("http");
const app = require("./app");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(PORT, () => {
  logger.info(`Server ready at http://localhost:${PORT}/graphql`);
});
