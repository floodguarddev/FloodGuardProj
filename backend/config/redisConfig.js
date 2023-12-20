const { createClient } = require("redis");

let REDIS_PW = process.env.REDIS_PW;
let REDIS_HOST = process.env.REDIS_HOST;
let REDIS_PORT = process.env.REDIS_PORT;

const redisClient = createClient({
  password: REDIS_PW,
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT ? parseInt(REDIS_PORT) : 6379,
  },
});

redisClient.on("error", (error) => console.error(`Error : ${error}`));
redisClient.on("connect", ()=> console.log(`Redis Connected` ));
redisClient.connect();

module.exports = {redisClient};