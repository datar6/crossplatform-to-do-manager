# Cross-Platform Todo Manager

Сучасний кросплатформний Todo менеджер з монорепо архітектурою.

## 🚀 Технології

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, shadcn/ui
- **Backend**: NestJS, PostgreSQL, Prisma ORM  
- **Desktop**: Electron
- **State Management**: React Query

## 📦 Інсталяція

```bash
# Клонування та встановлення залежностей

git clone <repository>

cd crossplatform-todo-manager

npm run install:all

🏃‍♂️ Запуск
Розробка

# Приклад .env файлу (покласти в директорыю backend)
DATABASE_URL="postgresql://todo_user:todo_pass@localhost:5432/todo_db"

bash
# Запуск бази даних
npm run db:dev:up

# Міграції БД
cd backend && npm run db:migrate

# Запуск всіх сервісів
**npm run dev:full**

Продакшн збірка
bash
# Збірка frontend
cd app && npm run build

# Збірка Electron
cd src-electron && npm run build
🗂️ Структура
text
crossplatform-todo-manager/
├── app/                 # Next.js frontend
├── backend/            # NestJS API
├── src-electron/       # Electron desktop app
├── prisma/            # Database schema
└── docker-compose.yml # PostgreSQL
🌙 Темна тема
Додаток підтримує автоматичне перемикання тем. Використовуйте toggle у headerі.

📱 Функціональність
✅ CRUD операції для задач

✅ Фільтрація (всі/активні/виконані)

✅ Пошук по задачах

✅ Темна/світла тема

✅ Desktop версія (Electron)
