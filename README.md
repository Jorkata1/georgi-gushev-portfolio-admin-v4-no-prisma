# Georgi Gushev Portfolio — Admin v4 (без Prisma)

Тази версия премахва Prisma и SQLite, за да няма проблеми с download на Prisma engine при `npm install`.
Админ панелът работи с локален JSON storage файл.

## Какво има

- публичен portfolio сайт
- project detail страници
- contact form API route
- SEO metadata, sitemap и robots
- admin login с cookie session
- CRUD админ панел за **проекти**
- **качване на изображения** за hero и gallery в проектите
- admin секция за **About**
- admin секция за **Experience**
- admin секция за **Education**
- admin секция за **Certifications**
- локален JSON storage в `storage/content-store.json`

## Технологии

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- Nodemailer

## Инсталация

```bash
npm install
npm run db:setup
npm run dev
```

`npm run db:setup` създава локалния content store файл с началните seed данни.

## Production build

```bash
npm run build
npm run start
```

## Админ панел

- `/admin/login`
- `/admin/projects`
- `/admin/about`
- `/admin/experience`
- `/admin/education`

## Admin login

Настрой в `.env.local`:

```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=change-me
ADMIN_SESSION_SECRET=replace-with-a-long-random-string
```

## Storage

Съдържанието се пази в:

```text
/storage/content-store.json
```

Качените изображения се пазят в:

```text
/public/uploads/projects
```

Важно: това е подходящо за локален компютър или собствен сървър. Не е устойчиво за Vercel serverless deployment.

## Contact form

Попълни SMTP настройките в `.env.local`, ако искаш формата да изпраща реални имейли.
