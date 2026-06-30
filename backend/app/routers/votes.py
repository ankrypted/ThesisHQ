from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.answer import Answer
from app.models.question import Question
from app.models.user import User
from app.models.vote import Vote
from app.routers.auth import get_current_user
from app.schemas.vote import MyVotesResponse, VoteToggleResponse

router = APIRouter(prefix="/votes", tags=["votes"])


@router.post("/questions/{question_id}", response_model=VoteToggleResponse)
def toggle_question_vote(
    question_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> VoteToggleResponse:
    question = db.get(Question, question_id)
    if question is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Question not found")

    existing = db.execute(
        select(Vote).where(Vote.user_id == current_user.id, Vote.question_id == question_id)
    ).scalar_one_or_none()

    if existing is not None:
        db.delete(existing)
        question.upvote_count = max(0, question.upvote_count - 1)
        upvoted = False
    else:
        db.add(Vote(user_id=current_user.id, question_id=question_id))
        question.upvote_count += 1
        upvoted = True

    db.commit()
    db.refresh(question)
    return VoteToggleResponse(upvoted=upvoted, upvote_count=question.upvote_count)


@router.post("/answers/{answer_id}", response_model=VoteToggleResponse)
def toggle_answer_vote(
    answer_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> VoteToggleResponse:
    answer = db.get(Answer, answer_id)
    if answer is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Answer not found")

    existing = db.execute(
        select(Vote).where(Vote.user_id == current_user.id, Vote.answer_id == answer_id)
    ).scalar_one_or_none()

    if existing is not None:
        db.delete(existing)
        answer.upvote_count = max(0, answer.upvote_count - 1)
        upvoted = False
    else:
        db.add(Vote(user_id=current_user.id, answer_id=answer_id))
        answer.upvote_count += 1
        upvoted = True

    db.commit()
    db.refresh(answer)
    return VoteToggleResponse(upvoted=upvoted, upvote_count=answer.upvote_count)


@router.get("/me", response_model=MyVotesResponse)
def my_votes(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> MyVotesResponse:
    votes = db.execute(select(Vote).where(Vote.user_id == current_user.id)).scalars().all()
    return MyVotesResponse(
        question_ids=[v.question_id for v in votes if v.question_id is not None],
        answer_ids=[v.answer_id for v in votes if v.answer_id is not None],
    )
