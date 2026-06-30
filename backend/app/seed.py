from __future__ import annotations

from sqlalchemy.orm import Session

from app.models.answer import Answer
from app.models.question import Question
from app.models.topic import Topic

TOPICS = [
    {"name": "Physics", "slug": "physics", "type": "domain", "color_key": "physics",
     "description": "Quantum mechanics, condensed matter, astrophysics, and all branches of physics research.",
     "question_count": 892, "follower_count": 1243},
    {"name": "Computer Science", "slug": "computer-science", "type": "domain", "color_key": "cs",
     "description": "Algorithms, machine learning, systems, theory, and software engineering research.",
     "question_count": 1243, "follower_count": 2156},
    {"name": "Mathematics", "slug": "mathematics", "type": "domain", "color_key": "math",
     "description": "Pure and applied mathematics — analysis, algebra, topology, probability, and more.",
     "question_count": 671, "follower_count": 934},
    {"name": "Chemistry", "slug": "chemistry", "type": "domain", "color_key": "chemistry",
     "description": "Organic, inorganic, physical, and analytical chemistry across all research contexts.",
     "question_count": 445, "follower_count": 612},
    {"name": "Economics", "slug": "economics", "type": "domain", "color_key": "economics",
     "description": "Micro and macroeconomics, econometrics, behavioural economics, and policy research.",
     "question_count": 334, "follower_count": 489},
    {"name": "Advisor & Committee", "slug": "advisor-committee", "type": "phd-life", "color_key": "phd-life",
     "description": "Navigating advisor relationships, committee dynamics, and academic mentorship.",
     "question_count": 234, "follower_count": 1891},
    {"name": "Funding & Grants", "slug": "funding-grants", "type": "phd-life", "color_key": "phd-life",
     "description": "Fellowship applications, grant writing, stipend issues, and funding strategies.",
     "question_count": 156, "follower_count": 1432},
    {"name": "Thesis Writing", "slug": "thesis-writing", "type": "phd-life", "color_key": "phd-life",
     "description": "Dissertation structure, writing productivity, LaTeX, and getting to the finish line.",
     "question_count": 278, "follower_count": 1923},
    {"name": "Qualifying Exams", "slug": "qualifying-exams", "type": "phd-life", "color_key": "phd-life",
     "description": "Preparing for quals, comprehensive exams, and the candidacy process.",
     "question_count": 143, "follower_count": 1102},
]

# topic name (as used by MOCK_QUESTIONS[*].topic) -> slug
TOPIC_SLUG_BY_NAME = {t["name"]: t["slug"] for t in TOPICS}

QUESTIONS = [
    {"id": 1, "title": "How do I derive the Schrödinger equation from first principles without assuming wave-particle duality?",
     "body": "Foundational derivation question about the Schrödinger equation.", "topic": "Physics",
     "is_anonymous": False, "upvote_count": 47, "answer_count": 12, "has_top_answer": True},
    {"id": 2, "title": "My advisor keeps postponing our meetings — 3 cancellations in a row. Is this normal or a red flag?",
     "body": "Advisor relationship concern.", "topic": "Advisor & Committee",
     "is_anonymous": True, "upvote_count": 89, "answer_count": 23, "has_top_answer": False},
    {"id": 3, "title": "Implementing multi-head attention from scratch — getting NaN loss after 3 epochs, can't figure out why",
     "body": "Debugging a transformer implementation.", "topic": "Computer Science",
     "is_anonymous": False, "upvote_count": 34, "answer_count": 8, "has_top_answer": False},
    {"id": 4, "title": "Got rejected from all 5 grants I applied to this cycle. How do I keep going?",
     "body": "Grant rejection support question.", "topic": "Funding & Grants",
     "is_anonymous": True, "upvote_count": 203, "answer_count": 41, "has_top_answer": False},
    {"id": 5, "title": "Proving uniform convergence of a sequence of functions — is my epsilon-delta argument correct?",
     "body": "Real analysis proof check.", "topic": "Mathematics",
     "is_anonymous": False, "upvote_count": 18, "answer_count": 5, "has_top_answer": False},
    {"id": 6, "title": "Interpreting 2D NMR NOESY spectrum for protein structure — unusual cross-peaks at 7.2 ppm",
     "body": "NMR spectroscopy interpretation question.", "topic": "Chemistry",
     "is_anonymous": False, "upvote_count": 29, "answer_count": 7, "has_top_answer": True},
    {"id": 7, "title": "What's a realistic timeline to read 200+ papers before my qualifying exam in 6 weeks?",
     "body": "Qual prep reading strategy.", "topic": "Qualifying Exams",
     "is_anonymous": True, "upvote_count": 76, "answer_count": 17, "has_top_answer": False},
    {"id": 8, "title": "Weak instruments in 2SLS: how bad is an F-statistic of 8.3 for my IV estimate?",
     "body": "Econometrics instrumental variables question.", "topic": "Economics",
     "is_anonymous": False, "upvote_count": 31, "answer_count": 9, "has_top_answer": False},
    {"id": 9, "title": "How do you structure a literature review when there are 500+ papers in your area?",
     "body": "Literature review organisation question.", "topic": "Thesis Writing",
     "is_anonymous": False, "upvote_count": 52, "answer_count": 14, "has_top_answer": False},
    {"id": 10, "title": "Best practices for reproducible ML experiments in a PhD context?",
     "body": "ML reproducibility tooling question.", "topic": "Computer Science",
     "is_anonymous": False, "upvote_count": 78, "answer_count": 21, "has_top_answer": True},
]

ANSWER_IDS_BY_QUESTION = {
    1: [101, 102, 103],
    2: [201, 202],
    3: [301, 302, 303],
    4: [401, 402, 403],
    5: [501],
    6: [601],
    7: [701, 702],
    8: [801],
}

ANSWERS = [
    {"id": 101, "question_id": 1, "is_anonymous": False, "upvote_count": 38, "is_top_answer": True},
    {"id": 102, "question_id": 1, "is_anonymous": False, "upvote_count": 14, "is_top_answer": False},
    {"id": 103, "question_id": 1, "is_anonymous": True, "upvote_count": 7, "is_top_answer": False},
    {"id": 201, "question_id": 2, "is_anonymous": True, "upvote_count": 52, "is_top_answer": True},
    {"id": 202, "question_id": 2, "is_anonymous": False, "upvote_count": 29, "is_top_answer": False},
    {"id": 301, "question_id": 3, "is_anonymous": True, "upvote_count": 21, "is_top_answer": True},
    {"id": 302, "question_id": 3, "is_anonymous": False, "upvote_count": 11, "is_top_answer": False},
    {"id": 303, "question_id": 3, "is_anonymous": False, "upvote_count": 17, "is_top_answer": True},
    {"id": 401, "question_id": 4, "is_anonymous": False, "upvote_count": 87, "is_top_answer": True},
    {"id": 402, "question_id": 4, "is_anonymous": True, "upvote_count": 43, "is_top_answer": False},
    {"id": 403, "question_id": 4, "is_anonymous": False, "upvote_count": 24, "is_top_answer": False},
    {"id": 501, "question_id": 5, "is_anonymous": False, "upvote_count": 12, "is_top_answer": True},
    {"id": 601, "question_id": 6, "is_anonymous": False, "upvote_count": 19, "is_top_answer": True},
    {"id": 701, "question_id": 7, "is_anonymous": True, "upvote_count": 34, "is_top_answer": True},
    {"id": 702, "question_id": 7, "is_anonymous": False, "upvote_count": 11, "is_top_answer": False},
    {"id": 801, "question_id": 8, "is_anonymous": False, "upvote_count": 18, "is_top_answer": True},
]


def seed_if_empty(db: Session) -> None:
    if db.query(Topic).first() is not None:
        return

    topics_by_slug: dict[str, Topic] = {}
    for t in TOPICS:
        topic = Topic(**t)
        db.add(topic)
        topics_by_slug[t["slug"]] = topic
    db.flush()

    for q in QUESTIONS:
        slug = TOPIC_SLUG_BY_NAME[q["topic"]]
        db.add(Question(
            id=q["id"],
            title=q["title"],
            body=q["body"],
            author_id=None,
            topic_id=topics_by_slug[slug].id,
            is_anonymous=q["is_anonymous"],
            upvote_count=q["upvote_count"],
            answer_count=q["answer_count"],
            has_top_answer=q["has_top_answer"],
        ))

    for a in ANSWERS:
        db.add(Answer(
            id=a["id"],
            body="Seeded answer body.",
            question_id=a["question_id"],
            author_id=None,
            is_anonymous=a["is_anonymous"],
            upvote_count=a["upvote_count"],
            is_top_answer=a["is_top_answer"],
        ))

    db.commit()
