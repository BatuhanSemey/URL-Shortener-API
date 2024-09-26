const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const PORT = 5000;
const url = `mongodb+srv://Batuhan:subaru667@batuhan.ucjhrg3.mongodb.net/saveUrl?retryWrites=true&w=majority&appName=Batuhan`

const app = express()



const routesData = require('./routes/data-routes')

// Middleware для обработки JSON-запросов
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'))
app.use(express.static(path.join(__dirname, './public')));
app.use(routesData)


//Подключение к серверу
app.listen(PORT, () => {
    console.log(`Сервер запущен http://localhost:${PORT}`)
})

//Подключение к БД
mongoose
    .connect(url)
    .then(() => console.log('БД успешно подключен'))
    .catch((e) => console.log(e))



