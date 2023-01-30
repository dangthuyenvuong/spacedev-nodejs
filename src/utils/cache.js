const memorize = {}

const cacheAdapter = {
    set: (name, value, cacheTime) => {
        memorize[name] = {
            data: value,
            iat: Date.now() + cacheTime * 1000
        };
    },
    get: (name) => {
        if (memorize[name] && memorize[name].iat > Date.now()) {
            return memorize[name].data
        }
    }
}

export const cacheGetMethod = (options = { cacheTime: 10, noCache: [], adapter: cacheAdapter }) => {
    let { noCache = [], adapter = cacheAdapter, cacheTime = 10 } = options

    return async (req, res, next) => {

        for (let url of noCache) {
            if (req.originalUrl.startsWith(url)) return next()
        }

        let data = await adapter.get(req.originalUrl)

        if (req.method === 'GET' && data) {
            return res.json(data)
        }

        res.on('finish', () => {
            if (!req.noCache && req.method === 'GET' && res.statusCode && !req.user) {
                adapter.set(req.originalUrl, res.jsonBody, cacheTime)
            }
        })

        next()
    }
}

/**
 * 60000 request/m
 * 
 * 1000 request/s
 * 
 * 1000 / 10 course -> 100 request/s
 * 
 * 10*100 -> 1000 - 999: cache hit ratio
 * 
 */