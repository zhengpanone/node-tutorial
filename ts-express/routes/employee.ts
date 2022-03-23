// routes.employee.ts
// https://juejin.cn/post/6962083577320177701
import express from 'express'
import bodyParser from 'body-parser'
import query from '../models/query'

const router = express.Router()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/getEmployee', async (req, res) => {
    let queryAllSql = `select * from employee`
    let { name = "", departmentId } = req.query;
    let sql = `${queryAllSql}`
    try {
        let result = await query(sql)
        result.forEach((item: any) => {
            item.key = item.id
        });
        res.json({
            flag: 1,
            data: result
        })
    } catch (e) {
        res.json({
            flag: 1,
            msg: e.toString()
        })
    }


})

router.post('/createEmployee', urlencodedParser, async (req, res) => {
    res.json({
        flag: 1,
        msg: "No DB"
    })
})

export =router