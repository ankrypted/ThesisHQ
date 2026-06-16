# FR1 — Register / Login Implementation (2026-06-15)

## In plain English

Before this change, ThesisHQ had no real "accounts" — the sidebar just showed
a hardcoded name ("Ankesh Prasad"), and anyone could open the app and see
everything. There was no way to sign up, log in, or log out.

This change adds real user accounts:

- New visitors land on a **Sign up** page, fill in their name, username,
  email, password, and (optionally) their PhD year/field, and get an account.
- Returning users land on a **Log in** page and sign in with email + password.
- Once logged in, the sidebar shows *your* name, initials, and stage/field
  instead of the hardcoded placeholder, and there's a logout button.
- If you're not logged in, you can't see the rest of the app — you're sent to
  the login page. If you *are* logged in, visiting the login/signup pages
  just bounces you back to the home feed.
- Your session is remembered (stored in the browser), so refreshing the page
  or closing/reopening the tab keeps you logged in for about a week.

## Why

This was **FR1** in [REQUIREMENTS.md](../REQUIREMENTS.md) — the biggest
"not implemented yet" gap. The `User` database model already existed, but
nothing actually created users or checked passwords. Without this, every
other "personal" feature (My Questions, My Answers, Saved, anonymous posting)
was attributed to nobody in particular.

## How — Technical Details

### Backend (FastAPI)

- **`backend/requirements.txt`** — added `bcrypt`, `pyjwt`, `email-validator`.
- **`backend/app/core/security.py`** (new) — password hashing
  (`bcrypt.hashpw` / `bcrypt.checkpw`) and JWT helpers
  (`create_access_token`, `decode_access_token`), using `SECRET_KEY` from
  the environment, `HS256`, 7-day expiry.
- **`backend/app/schemas/auth.py`** (new) — Pydantic request/response models:
  `UserRegister`, `UserLogin`, `UserOut`, `Token`.
- **`backend/app/routers/auth.py`** (new) — three endpoints:
  - `POST /auth/register` — creates a `User` row (hashed password), returns
    a JWT + user profile. Rejects duplicate email/username (400).
  - `POST /auth/login` — verifies email + password, returns a JWT + user
    profile. Wrong credentials → 401.
  - `GET /auth/me` — returns the current user, resolved from the
    `Authorization: Bearer <token>` header via a `get_current_user`
    dependency (`OAuth2PasswordBearer`).
- **`backend/app/main.py`** — registers the new `auth` router.
- **`backend/app/database.py`** — trivial whitespace cleanup (unrelated
  blank line removed by the formatter).

  > Note: the backend runs on Python 3.9, so dependency-injected parameters
  > had to use `Optional[str]` rather than the `str | None` syntax — the
  > newer union syntax breaks FastAPI's type resolution at startup on 3.9.

### Frontend (Angular)

- **`frontend/src/app/services/auth.service.ts`** (new) — `AuthService`
  holds `currentUser` (a signal) and `isAuthenticated` (computed). Calls
  `/auth/register` and `/auth/login`, and persists the JWT + user profile in
  `localStorage` so the session survives page reloads. `logout()` clears
  storage and redirects to `/login`.
- **`frontend/src/app/interceptors/auth.interceptor.ts`** (new) — an HTTP
  interceptor that attaches `Authorization: Bearer <token>` to every outgoing
  request if a token is stored.
- **`frontend/src/app/guards/auth.guard.ts`** (new) — two route guards:
  - `authGuard` — blocks access and redirects to `/login` if not logged in.
  - `guestGuard` — blocks access to `/login`/`/register` and redirects home
    if already logged in.
- **`frontend/src/app/pages/login/`** and **`.../register/`** (new) —
  standalone full-screen pages (no sidebar) styled to match the existing dark
  theme, using `FormsModule` + `[(ngModel)]` for the form fields.
- **`frontend/src/app/app.routes.ts`** — added `/login` and `/register` as
  top-level routes (guarded by `guestGuard`); the existing `LayoutComponent`
  route tree (home, questions, topics, etc.) is now guarded by `authGuard`.
- **`frontend/src/app/app.config.ts`** — registered `provideHttpClient`
  with the new auth interceptor.
- **`frontend/src/app/layout/layout.component.ts` / `.html`** — the sidebar
  user card now reads `auth.currentUser()` for name/initials/stage·field
  (computed via `userInitials()` / `userSubtitle()`), and the settings button
  was repurposed into a logout button calling `auth.logout()`.

### Misc

- **`.gitignore`** (new, repo root) — added so editor config (`.claude/`)
  and ad-hoc `*.log` files from running the dev servers don't get committed.

## Verification done

- Started both servers locally (FastAPI on `:8000`, Angular on `:8000`→`:4200`).
- Hit `/auth/register`, `/auth/login`, and `/auth/me` directly — confirmed
  correct success responses, JWT issuance, 401 on bad password, and 400 on
  duplicate email/username.
- Confirmed the Angular app builds with no errors and serves `/login` and `/`
  (200 OK).
- Test user removed from the database after verification.

## Commits

- `797279f` — feat: implement register/login (FR1)
- `8d973de` — docs: mark FR1 (register/login) as done in requirements
