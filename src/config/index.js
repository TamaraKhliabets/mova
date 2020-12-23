const { config } = require("dotenv");

const { parsed } = config();

const {
    PORT,
    MODE,
    DATA_BASE_NAME = "mova-data-base-user",
    MONGO_DB_CONNECTION_URL = `mongodb+srv://admin:G8G2Bfs5cBepEdr@cluster-mova-data-base.bnb39.mongodb.net/${DATA_BASE_NAME}?retryWrites=true&w=majority`,
    IN_PROD = MODE !== "prod",
    BASE_URL,
    URL = `${BASE_URL}${PORT}`
} = parsed;

module.exports = {
    PORT,
    MODE,
    DATA_BASE_NAME,
    MONGO_DB_CONNECTION_URL,
    IN_PROD,
    BASE_URL,
    URL
};
