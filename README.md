# Angket — Scam Detection Platform

Community platform to report and detect scams. Frontend is React + Vite, backend is
Express + Supabase.

## Setup

### Database (required once)

Run `backend/schema.sql` in the Supabase Dashboard → SQL Editor for the project in
`backend/.env`. This creates the `profiles`, `categories`, `reports`, `subscriptions`,
and `verifications` tables and seeds the default scam categories.

To make the first user an admin:

```sql
update public.profiles set role = 'admin' where id = '<user-uuid>'
```

### Backend

```bash
cd backend
npm install
# configure backend/.env (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, PORT, CLIENT_ORIGIN)
npm run dev   # http://localhost:3000
```

### Frontend

```bash
npm install
npm run dev   # http://localhost:5173 (proxies /api -> http://localhost:3000)
```

## API

All endpoints are under `/api`:

- `POST /api/users/signup` — create an account
- `POST /api/users/login` — sign in, returns a JWT token
- `GET /api/users/me` — current user (auth required)
- `GET|POST /api/reports`, `GET /api/reports/:id` — community reports
- `GET /api/categories` — scam categories
- `GET /api/admin/*` — admin endpoints (auth + admin role required)

Scripts: frontend `npm run dev|build|lint`, backend `npm run dev|start|test`.
