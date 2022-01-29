const redis = require("redis");

const client = redis.createClient(6379, "127.0.0.1");

client.on("error", (err) => {
  console.log(err);
});

client.set("myname", "zhangsan", redis.print);
client.get("myname", (err, val) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(val);
  client.quit();
});
