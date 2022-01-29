const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
    console.log(err);
})

redisClient.set('username', '张三')
redisClient.get('username', (err, val) => {
    if (err) {
        console.error(err);
        return
    }
    console.log('val:', val);
    redisClient.quit()
})