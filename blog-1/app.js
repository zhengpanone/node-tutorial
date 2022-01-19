const handleUserRouter = require('./src/router/user')
const handleBlogRouter = require('./src/router/blog')
const querystring = require('querystring')
// 处理Post Data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method in ['GET', 'DELETE']) {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })

        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise;

}


const serverHandle = (req, res) => {
    res.setHeader('Content-type', 'application/json')
    /* const resData = {
        name: 'Node Js Learn',
        site: 'http://test',
        env: process.env.NODE_ENV
    }
    res.end(
        JSON.stringify(resData)
    ) */
    // 处理blog路由
    const url = req.url
    req.path = url.split('?')[0]

    //解析query
    req.query = querystring.parse(url.split('?')[1])

    // 处理post data
    getPostData(req).then(postData => {
        req.body = postData
        // 处理blog 路由
        const blogData = handleBlogRouter(req, res)
        if (blogData) {
            res.end(JSON.stringify(blogData))
            return
        }
        // 处理user路由
        const userData = handleUserRouter(req, res)
        if (userData) {
            res.end(JSON.stringify(userData))
            return
        }
        //未命中路由
        res.writeHead(404, { "Content-type": 'text/plain' })
        res.write('404 Not Found\n')
        res.end()
    })


}

module.exports = serverHandle

