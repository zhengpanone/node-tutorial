const handleUserRouter = (req, res) => {
    const { method, url } = req
    const path = url.split('?')[0]
    // 登录
    if (method === 'POSt' && path === '/api/user/login') {
        return {
            msg: '登录接口'
        }
    }
}

module.exports = handleUserRouter