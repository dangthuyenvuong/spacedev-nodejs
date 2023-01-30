import redis from 'redis'

const client = redis.createClient()

// Kết nối tới Redis
client.on("connect", function (err) {
    console.log("Connected to Redis");
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect();
// client.set('name', 'John Doe', redis.print);
// client.get('name');

// console.log('aaaaaaaa')
export default client

export const cache = {
    set: async function (name, value, cacheTime) {
        return client.set(name, JSON.stringify(value), { EX: cacheTime })
    },
    get: async function (name, cacheTime, callback) {
        let data = await client.get(name)

        if (data) {
            try {
                data = JSON.parse(data)
            } catch (err) {

            }
        } else if (callback) {
            data = await callback()
            this.set(name, data, cacheTime)
        }

        return data
    },
}