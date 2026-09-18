import express from 'express';
import { setupApp } from "./setup-app";

// Создание приложения
const app = express();
setupApp(app);

// process - это глобальный объект в Node.js, который содержит информацию о текущем процессе выполнения.
// process.env - это объект, содержащий все переменные окружения, доступные нашему приложению.
const PORT = process.env.PORT || 3000;

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
