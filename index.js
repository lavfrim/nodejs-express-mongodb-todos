require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos.js');

console.log(process.env.PORT);
const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(todoRoutes);

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://frim:${process.env.PASSWORD}@cluster0-wtx5b.mongodb.net/todos`, {
            useNewUrlParser: true,
            useFindAndModify: false,
        });
        app.listen(PORT, () => {
            console.log('Server has been started');
        });
    } catch (err) {
        console.error(err);
        throw err;
    }
}

start();

