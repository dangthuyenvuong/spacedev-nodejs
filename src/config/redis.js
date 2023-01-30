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

export const expressAdapter = {
    set: async (name, value, cacheTime) => {
        return client.set(name, JSON.stringify(value), { EX: cacheTime })
    },
    get: async (name) => {
        let data = await client.get(name)
        try {
            if(data) return JSON.parse(data)
        }catch(err) {
            return null
        }
    }
}

