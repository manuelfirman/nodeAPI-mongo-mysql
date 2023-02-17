const ENGINE_DB = process.env.ENGINE_DB;

const db = (ENGINE_DB === "nosql") ? "mongo" : "mysql";
const pathModels = (ENGINE_DB === "nosql") ? "./no-sql" : "./mysql";

const models = {
    userModel: require(`${pathModels}/users.${db}`),
    storageModel: require(`${pathModels}/storage.${db}`),
    tracksModel: require(`${pathModels}/tracks.${db}`),
}

module.exports = models;