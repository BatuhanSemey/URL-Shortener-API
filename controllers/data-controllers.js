const validator = require('validator')
const shortid = require('shortid')
const axios = require('axios')
const createPath = require('../helpers/create-path')
const bdUrls = require('../models/bd-url')

const getMain = (req, res) => {
    console.log('Запрос на главную');
    res.render(createPath('index'))
}

const postUrl = async (req, res) => {
    const { url } = req.body

    //Проверяем на наличие url и валидацию
    if (!url || !validator.isURL(url)) {
        return res.status(400).send('Некорректный URL')
    }

    try {
        //Пробуем подключится по url
        const response = await axios.get(url)

        //Проверяем статус url
        if (response.status !== 200) {
            return res.status(400).send('URL не доступен');
        }

        //Генерируем уникальный код
        const shortCode = shortid.generate()

        console.log(`${url} валидный`);
        console.log(shortCode);

        //Закидываем в бд
        const data = new bdUrls({ originalUrl: url, shortCode: shortCode })
        console.log(data);

        data
            .save()
            .then((result) => res.render('index', { shortCode }))
            .catch((e) => console.log(e))

    }
    catch (e) {
        return res.status(400).send('Некорректный URL');
    }
}

const getUrl = (req, res) => {
    const { shortcode } = req.params;
    console.log(shortcode);

    bdUrls
        .findOne({ shortCode: shortcode })
        .then((result) => {
            if (result) {
                console.log(result);
                //return res.json({ originalUrl: result.originalUrl, shortCode: result.shortCode })
                return res.redirect(302, result.originalUrl)
            }
            else {
                res.status(404).send('HTTP 404 Not found.')
            }

        })
        .catch((e) => console.log(e))
}


module.exports = {
    getMain,
    postUrl,
    getUrl
}