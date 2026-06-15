# ThesisHQ — Requirements

ThesisHQ is a Quora-style Q&A platform for PhD/thesis students.

## Functional Requirements (FRs)

**User & Auth**
- FR1: Users can register and log in ✅ (JWT auth, register/login/me endpoints, Login/Register pages)
- FR2: Users can post questions/answers anonymously (toggle exists in composer)

**Questions**
- FR3: Users can ask a question via a composer modal, selecting a topic and adding tags
- FR4: Users can browse a home feed of questions, filterable by Latest / Trending / Unanswered
- FR5: Users can view a question detail page with its answers
- FR6: Users can write an answer to a question

**Topics & Discovery**
- FR7: Users can browse all topics (domain topics e.g. Physics, CS, Math; and PhD-life topics e.g. Advisor & Committee, Funding, Mental Health)
- FR8: A "Trending This Week" widget surfaces popular questions, clickable to the question detail page

**Personal Library**
- FR9: Users can save/bookmark questions and view them on a Saved page
- FR10: Users can view their own posted questions with stats (My Questions)
- FR11: Users can view their own posted answers (My Answers)

**Voting**
- FR12: Users can upvote questions and answers (Vote model exists; UI/endpoint not yet wired)

**Backend**
- FR13: A REST API (FastAPI) backs all of the above, persisting data in SQLite via SQLAlchemy

## Non-Functional Requirements (NFRs)

- NFR1 — **Usability**: Dark-themed, Quora-style 3-column UI consistent across all pages
- NFR2 — **Performance**: Page loads and feed rendering should feel instant for a dataset of hundreds of questions/answers (no pagination/infinite-scroll required at this scale)
- NFR3 — **Maintainability**: Frontend uses Angular standalone components with a shared layout/services pattern; backend uses modular SQLAlchemy models and FastAPI routers
- NFR4 — **Portability**: Runs locally via `ng serve` (port 4200) and FastAPI/Uvicorn, with CORS configured between them
- NFR5 — **Security**: Anonymous posting must not leak the real author's identity in API responses; auth (once added) must hash passwords and use sessions/tokens
- NFR6 — **Data Persistence**: SQLite for development; schema should be portable to Postgres for production without major rework
- NFR7 — **Scalability** (thesis-scope): Designed to support a single small academic community (hundreds of users), not internet-scale traffic

## Status vs. Scope (gaps as of 2026-06-15)

- FR1 (auth/login) is now implemented
- Voting endpoints (FR12) are modeled but not implemented
- No real API routes for questions/answers/topics/tags yet — frontend still runs on mock data for everything except auth
