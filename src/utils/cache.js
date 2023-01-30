const memorize = {}

export const cacheGetMethod = (options = { cacheTime: 10, noCache: [] }) => {
    let { noCache = [] } = options


    return (req, res, next) => {

        for(let url of noCache) {
            if(req.originalUrl.startsWith(url)) return next()
        }

        if (req.method === 'GET' && memorize[req.originalUrl]) {
            if (memorize[req.originalUrl].iat > Date.now()) {
                res.json(memorize[req.originalUrl].data)
                return
            }
        }

        res.on('finish', () => {
            if (!req.noCache && req.method === 'GET' && res.statusCode) {
                memorize[req.originalUrl] = {
                    data: res.jsonBody,
                    iat: Date.now() + options.cacheTime * 1000
                };
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
 * 10*100 -> 1000 - 999
 * 
 */