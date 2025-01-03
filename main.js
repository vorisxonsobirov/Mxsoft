const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Токен Telegram-бота
const botToken = '7916610016:AAFFD8YefmuKm6w0gg89qJ1c0eAuYvdiy6s';
// Укажите ваш chat_id
const chatId = '1723957261';

app.use(bodyParser.json());
app.use(cors()); // Подключение CORS

// Обработчик POST-запроса от формы
app.post('/submit', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: 'Все поля обязательны для заполнения!' });
    }

    // Получаем текущее время
    const currentTime = new Date().toLocaleString("ru-RU", {
        timeZone: "Asia/Tashkent", // Указываем нужный часовой пояс
        hour12: false,
    });

    // Формируем сообщение для Telegram
    const text = `
📝 Новая заявка:
👤 Имя: ${name}
📧 Email: ${email}
📞 Телефон: ${phone}
💬 Сообщение: ${message}
⏰ Время отправки: ${currentTime}
    `;

    try {
        // Отправляем данные в Telegram
        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text,
        });

        // Уведомление об успешной отправке
        res.json({ message: 'Данные успешно отправлены в Telegram!' });
    } catch (error) {
        console.error('Ошибка отправки в Telegram:', error.message);
        res.status(500).json({ message: 'Ошибка при отправке данных в Telegram' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});



const corsOptions = {
  origin: '*', // Разрешает доступ с любых доменов
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions)); // Используем с настраиваемыми опциями
