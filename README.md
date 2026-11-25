# Askwise Workspace

Публичный сайт и интерфейс рабочего кабинета Askwise — ИИ-конвейера для
создания SEO-статей.

## Локальный запуск

```bash
npm install
npm run dev
```

Сайт откроется по адресу `http://127.0.0.1:5173`.

## Сборка

```bash
npm run build
```

Готовая статическая версия создаётся в папке `dist/`.

## Netlify

Конфигурация `netlify.toml` уже добавлена. При импорте репозитория в Netlify
будут использованы команды:

- build command: `npm run build`;
- publish directory: `dist`.

На временном адресе Netlify публичная часть и демонстрационный интерфейс
работают без production API. Реальные заявки и real-time подключаются позже
через защищённый HTTPS API production-конвейера; в Netlify не добавляются
секреты, токены или production-пароли.

Подробности: [docs/netlify-deployment.md](docs/netlify-deployment.md).
