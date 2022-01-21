const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select * from blog where 1=1 `
    if (author) {
        sql += `and author='${author}'`
    } if (keyword) {
        sql += `and title like '%${keyword}%'`
    }
    sql += ` order by createtime desc;`
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blog where id=${id} `
    return exec(sql).then(rows => {
        return rows[0]
    })
}
const newBlog = (blogData = {}) => {
    const { title, content, author } = blogData
    let sql = `insert into blog (title,content,author,createtime) values('${title}','${content}','${author}',${Date.now()});`
    return exec(sql).then(insertData => {
        console.log(insertData);
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    const { title, content } = blogData
    let sql = `update blog set title='${title}', content='${content}' where id=${id}`
    return exec(sql).then(updateData => {
        console.log(updateData);
        if (updateData.affectedRows > 0) {
            return true
        }
        return false
    })
}

const deleteBlog = (id, author) => {
    let sql = `delete from blog where id='${id}' and author='${author}'`
    return exec(sql).then(deltetData => {
        if (deltetData.affectedRows > 0) {
            return true
        }
        return false
    })
}

module.exports = {
    getList, getDetail, newBlog, updateBlog, deleteBlog
}