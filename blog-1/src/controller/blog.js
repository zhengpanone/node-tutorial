

const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: '标题A',
            content: '内容A',
            createTime: 1546610491112,
            author: '张三'
        }, {
            id: 2,
            title: '标题B',
            content: '内容B',
            createTime: 1546610491345,
            author: '张三'
        }
    ]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1546610491112,
        author: '张三'
    }
}
const newBlog = (blogData = {}) => {
    console.log("new blog data: " + JSON.stringify(blogData));
    return { id: 3 }
}

const updateBlog = (id, blogData = {}) => {
    console.log(id, blogData);
    return true
}

const deleteBlog = (id) => {
    console.log(id);
    return true
}

module.exports = {
    getList, getDetail, newBlog, updateBlog, deleteBlog
}