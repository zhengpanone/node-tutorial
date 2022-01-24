const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    console.log(d.toGMTString());
    return d.toGMTString()
}


const handleUserRouter = (req, res) => {

    const method = req.method
    // 登录
    if (method === 'POST' && req.path === '/api/user/login') {

        const { username, password } = req.body
        // const { username, password } = req.query get方法
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                // 操作cookie
                res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
                return new SuccessModel('登录成功')
            } else {
                return new ErrorModel('登录失败')
            }
        })

    }

    if (method === 'GET' && req.path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(new SuccessModel())
        } else {
            return Promise.resolve(new ErrorModel("还未登录"))
        }
    }
}

module.exports = handleUserRouter