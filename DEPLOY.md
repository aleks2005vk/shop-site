# Shop Site - Deployment Guide

## Быстрый деплой

### Vercel (РЕКОМЕНДУЕТСЯ)

```bash
cd shopsite
npm install -g vercel
vercel login
vercel deploy
```

### Netlify

```bash
cd shopsite
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=dist
```

## Environment Setup

Создайте `.env.production`:

```
VITE_API_URL=https://api.example.com
VITE_ENV=production
```

## Build & Test

```bash
cd shopsite

# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm run preview
```

## Checklist перед деплоем

- [ ] `npm run build` без ошибок
- [ ] `npm run preview` работает
- [ ] API endpoints сконфигурированы
- [ ] Redux store работает
- [ ] Images загружаются
- [ ] .env в .gitignore

## Troubleshooting

### Module not found

```bash
npm install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Port conflicts

```bash
npm run preview -- --port 3000
```

### Build fails

```bash
npm install --no-save @vitejs/plugin-react
npm run build
```
