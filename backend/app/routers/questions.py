from __future__ import annotations

from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.database import get_db
from app.models.answer import Answer
from app.models.question import Question
from app.models.topic import Topic
from app.schemas.question import AnswerOut, AuthorOut, QuestionDetail, QuestionSummary, TopicOut

router = APIRouter(prefix="/questions", tags=["questions"])


def _author_out(model, is_anonymous: bool) -> Optional[AuthorOut]:
    if is_anonymous or model is None:
        return None
    return AuthorOut(id=model.id, full_name=model.full_name, stage=model.stage)


def _build_summary(q: Question) -> QuestionSummary:
    return QuestionSummary(
        id=q.id,
        title=q.title,
        body=q.body,
        topic=TopicOut.model_validate(q.topic),
        author=_author_out(q.author, q.is_anonymous),
        is_anonymous=q.is_anonymous,
        upvote_count=q.upvote_count,
        answer_count=q.answer_count,
        has_top_answer=q.has_top_answer,
        created_at=q.created_at,
        tags=[tag.name for tag in q.tags],
    )


def _build_answer(a: Answer) -> AnswerOut:
    return AnswerOut(
        id=a.id,
        body=a.body,
        author=_author_out(a.author, a.is_anonymous),
        is_anonymous=a.is_anonymous,
        upvote_count=a.upvote_count,
        is_top_answer=a.is_top_answer,
        created_at=a.created_at,
    )


@router.get("", response_model=List[QuestionSummary])
def list_questions(
    filter: str = Query(default="latest", pattern="^(latest|trending|unanswered)$"),
    topic: Optional[str] = Query(default=None, description="Topic slug to filter by"),
    db: Session = Depends(get_db),
) -> List[QuestionSummary]:
    stmt = (
        select(Question)
        .options(
            selectinload(Question.topic),
            selectinload(Question.tags),
            selectinload(Question.author),
        )
    )

    if topic:
        stmt = stmt.join(Question.topic).where(Topic.slug == topic)

    if filter == "trending":
        stmt = stmt.order_by(Question.upvote_count.desc())
    elif filter == "unanswered":
        stmt = stmt.where(Question.answer_count == 0).order_by(Question.created_at.desc())
    else:
        stmt = stmt.order_by(Question.created_at.desc())

    questions = db.execute(stmt).scalars().all()
    return [_build_summary(q) for q in questions]


@router.get("/{question_id}", response_model=QuestionDetail)
def get_question(question_id: int, db: Session = Depends(get_db)) -> QuestionDetail:
    stmt = (
        select(Question)
        .where(Question.id == question_id)
        .options(
            selectinload(Question.topic),
            selectinload(Question.tags),
            selectinload(Question.author),
            selectinload(Question.answers).selectinload(Answer.author),
        )
    )
    question = db.execute(stmt).scalar_one_or_none()
    if question is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question not found")

    answers = sorted(
        question.answers,
        key=lambda a: (not a.is_top_answer, -a.upvote_count),
    )

    return QuestionDetail(
        **_build_summary(question).model_dump(),
        answers=[_build_answer(a) for a in answers],
    )
