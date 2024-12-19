const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Ваш токен бота
const botToken = '7916610016:AAFFD8YefmuKm6w0gg89qJ1c0eAuYvdiy6s'; // Используйте свой токен
// chat_id вашей группы (например, -1234567890)
const chatId = '-4610291239'; // Убедитесь, что это правильный chat_id вашей группы

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


const hamburger = document.querySelector(".nav__hamburger");
const linksContainer = document.querySelector(".nav__menu");
const links = document.querySelectorAll(".nav__menu__link");

hamburger.addEventListener("click", () => {
  linksContainer.classList.toggle("active");
  hamburger.classList.toggle("active");
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(max-width: 550px)").matches) {
    closeMenu();
  }
});

if (window.matchMedia("(max-witdh: 550px").matches) {
  closeMenu();
}

function closeMenu() {
  links.forEach((link) => {
    link.addEventListener("click", () => {
      linksContainer.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });
}
// Проверка работы меню
hamburger.addEventListener("click", () => {
   if (linksContainer.classList.contains("active")) {
     console.log("Меню открыто");
   } else {
     console.log("Меню закрыто");
   }
 });
 