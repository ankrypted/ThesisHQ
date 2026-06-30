# FR12 — Voting Implementation (in progress, 2026-06-30)

## Goal
Implement real upvoting for questions and answers (FR12), backed by the actual
database (not localStorage), per the user's choice to build real backend
voting rather than a frontend-only mock.

## The catch we hit first
Questions/answers/topics currently only exist as **frontend mock data**
(`frontend/src/app/data/mock-data.ts`) — FR13 (real API for these resources)
hasn't been started yet. So there was nothing in the real database for a vote
row to point at via its `question_id`/`answer_id` foreign keys.

**Decision (confirmed with user):** seed the real database with the existing
mock questions/answers/topics, using the **same IDs** as the mock data
(question IDs 1–10, answer IDs 101–702, etc.) so that:
- The frontend keeps rendering all its existing rich mock content (titles,
  authors, tags, "time ago" strings) exactly as before — no UI changes to
  question/answer rendering itself.
- The backend has real `Question`/`Answer` rows under the *same IDs*, so vote
  endpoints can attach `Vote` rows to them via real foreign keys.
- This is a deliberate scope decision, not full FR13 — we are not adding
  CRUD endpoints for questions/answers/topics today, only enough seeded data
  to make voting real.

## Plan
1. **Backend seed script** (`backend/app/seed.py`) — inserts Topics (from
   `MOCK_TOPICS`), Questions (from `MOCK_QUESTIONS`, explicit IDs 1–10,
   `author_id = NULL`), Answers (from `MOCK_ANSWERS`, explicit IDs,
   `author_id = NULL`). Idempotent — skips if topics already exist. Runs on
   app startup.
2. **Vote schemas** (`backend/app/schemas/vote.py`) — toggle response
   (`upvoted`, `upvote_count`) and "my votes" response (lists of voted
   question/answer IDs).
3. **Vote router** (`backend/app/routers/votes.py`):
   - `POST /votes/questions/{id}` — toggle current user's upvote on a
     question (auth required), updates `Question.upvote_count`.
   - `POST /votes/answers/{id}` — same for answers.
   - `GET /votes/me` — IDs of everything the current user has upvoted, so the
     frontend can render the correct initial "voted" state.
4. **Frontend `VoteService`** (`services/vote.service.ts`) — signals for
   voted question/answer IDs and a local count-override map, calls the
   endpoints above, loads `/votes/me` on login.
5. **Wire vote buttons** into the home feed question cards and the question
   detail page (question + each answer).

## Known limitation (accepted for this session)
Vote *counts* shown for items the current user hasn't personally voted on
still come from the seeded baseline, not a live aggregate refetch — there's
no "list questions" endpoint yet (that's FR13). Only the count for an item
right after *you* vote on it is guaranteed live (returned directly by the
toggle endpoint). This is fine for a single-user/demo context; revisit once
FR13 lands.

## Status log
- [x] Explored Vote/Question/Answer models, confirmed FK setup, confirmed no
      seed data exists.
- [x] Confirmed scope decision with user (real backend, seeded mock data).
- [x] Backend: `app/seed.py` — seeds 9 topics, 10 questions (IDs 1–10), 16
      answers (IDs matching mock data: 101–103, 201–202, 301–303, 401–403,
      501, 601, 701–702, 801), idempotent on `seed_if_empty`.
- [x] Backend: `app/schemas/vote.py` (`VoteToggleResponse`, `MyVotesResponse`)
      and `app/routers/votes.py` (`POST /votes/questions/{id}`,
      `POST /votes/answers/{id}`, `GET /votes/me`), reusing `get_current_user`
      from `app/routers/auth.py`.
- [x] Backend: wired into `main.py` (seed runs on startup after
      `create_tables`; router registered). Deleted the stale local
      `thesishq.db` so the seed would run on a clean DB.
- [x] Verified live: register → toggle question 1 vote (47→48, `upvoted:true`)
      → `/votes/me` shows `question_ids:[1]` → toggle again (48→47,
      `upvoted:false`) → toggle answer 101 (38→39) → voting a nonexistent
      question ID returns 404 → voting without a token returns 401.
- [ ] Frontend: VoteService
- [ ] Frontend: wire into home feed + question detail
- [ ] End-to-end test (browser)
- [ ] Commit + push
