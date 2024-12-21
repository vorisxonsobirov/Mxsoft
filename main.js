const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Ваш токен бота
const botToken = '7916610016:AAFFD8YefmuKm6w0gg89qJ1c0eAuYvdiy6s'; // Замени на свой токен
// chat_id вашей группы
const chatId = '1723957261'; // Замени на ID своей группы

app.use(bodyParser.json());
app.use(cors());

// Обработчик POST-запроса
app.post('/submit', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'Все поля обязательны для заполнения!' });
  }

  const currentTime = new Date().toLocaleString("ru-RU", {
    timeZone: "Asia/Tashkent",
    hour12: false,
  });

  const text = `
📝 Новая заявка:
👤 Имя: ${name}
📧 Email: ${email}
📞 Телефон: ${phone}
💬 Сообщение: ${message}
⏰ Время отправки: ${currentTime}
  `;

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: text,
    });
    res.json({ message: 'Данные успешно отправлены в Telegram!' });
  } catch (error) {
    console.error('Ошибка отправки в Telegram:', error.message);
    res.status(500).json({ message: 'Ошибка при отправке данных в Telegram' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});




const corsOptions = {
  origin: '*', // Разрешить все домены (для разработки)
};
app.use(cors(corsOptions)); // Убедитесь, что CORS настроен правильно
