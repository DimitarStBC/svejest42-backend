const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// connection to pg






// get blogs

app.get('/blog', async (req, res) => {

    try {
        const allBlogPosts = await pool.query("SELECT * FROM blogposts");
        res.json(allBlogPosts.rows)
    } catch (error) {
        error;
    }

});

// get single blog

app.get('/blog/:title_id', async (req, res) => {
    try {
        const { title_id } = req.params;
        const blogPost = await pool.query("SELECT * FROM blogposts WHERE title_id = $1", [title_id])
        res.json(blogPost.rows[0]);
    } catch (error) {
        error
    }
})

// post blogs

app.post("/upload", async (req, res) => {
    try {

        const { title_id } = req.body;
        const { title } = req.body;
        const { information } = req.body

        const newID = await pool.query("INSERT INTO blogposts (title_id, title, information) VALUES($1, $2, $3)  RETURNING *", [title_id, title, information])
        res.json(newID);
        console.log('inside upload');
    } catch (error) {
        error;
    }
})


// delete blog

app.delete('/delete/:title_id', async (req, res) => {
    try {
        const { title_id } = req.params;
        const deleteTitle = await pool.query("DELETE FROM blogposts WHERE title_id = $1", [title_id])
        res.json("deleted");
    } catch (error) {
        error
    }
})



app.listen(PORT);