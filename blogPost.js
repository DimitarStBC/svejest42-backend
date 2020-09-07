const { idleCount } = require("./db")

class blogPost {
    constructor(id, title, information) {
        this.id = id;
        this.title = title;
        this.information = information;
    }
}

exports.module = blogPost;