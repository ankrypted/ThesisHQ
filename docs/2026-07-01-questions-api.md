# Questions API — Implementation Log

**Date:** 2026-07-01  
**Status:** Done

---

## What was built

Two read endpoints for questions, backed by the existing SQLAlchemy `Question`, `Answer`, `Topic`, and `Tag` models.

### Files created / modified

| File | Change |
|---|---|
| `backend/app/schemas/question.py` | New — Pydantic schemas for question responses |
| `backend/app/routers/questions.py` | New — GET /questions and GET /questions/{id} |
| `backend/app/schemas/__init__.py` | Updated — exports new schemas |
| `backend/app/main.py` | Updated — includes questions router |

---

## Endpoints

### `GET /questions`

Returns a list of question summaries for the home feed.

**Query params:**
- `filter` — `latest` (default) | `trending` | `unanswered`
- `topic` — optional topic slug to filter by (e.g. `computer-science`)

**Sorting:**
- `latest` → `ORDER BY created_at DESC`
- `trending` → `ORDER BY upvote_count DESC`
- `unanswered` → `WHERE answer_count = 0 ORDER BY created_at DESC`

**Response shape (`QuestionSummary`):**
```json
{
  "id": 1,
  "title": "...",
  "body": "...",
  "topic": { "id": 1, "name": "Physics", "slug": "physics", "type": "domain", "color_key": "physics" },
  "author": { "id": 5, "full_name": "Sarah Chen", "stage": "Year 3" },  // null if anonymous
  "is_anonymous": false,
  "upvote_count": 47,
  "answer_count": 12,
  "has_top_answer": true,
  "created_at": "2026-06-28T10:00:00",
  "tags": ["quantum-mechanics", "derivation"]
}
```

### `GET /questions/{id}`

Returns a single question with its answers included.

**Response shape (`QuestionDetail`):** Same as `QuestionSummary` plus:
```json
{
  "answers": [
    {
      "id": 101,
      "body": "...",
      "author": { "id": 2, "full_name": "Prof. Amir Zadeh", "stage": "Faculty" },
      "is_anonymous": false,
      "upvote_count": 38,
      "is_top_answer": true,
      "created_at": "2026-06-28T11:00:00"
    }
  ]
}
```

Answers are sorted: top answers first, then by `upvote_count DESC`.

Returns `404` if question not found.

---

## Anonymity rule

Both endpoints enforce: if `is_anonymous = true` or `author_id = null`, `author` is returned as `null` in the response. The real author is never exposed for anonymous posts.

---

## Next steps

- Wire frontend home page to `GET /questions` (replace mock data)
- Wire question-detail page to `GET /questions/{id}` (replace mock data)
- Build `POST /questions` (ask a question)
- Build `POST /questions/{id}/answers` (write an answer)
- Build `GET /topics` (topics page)
