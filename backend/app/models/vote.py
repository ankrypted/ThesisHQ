from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING, Optional

from sqlalchemy import DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.question import Question
    from app.models.answer import Answer


class Vote(Base):
    __tablename__ = "votes"
    __table_args__ = (
        # one upvote per user per question, one per answer
        UniqueConstraint("user_id", "question_id", name="uq_vote_user_question"),
        UniqueConstraint("user_id", "answer_id", name="uq_vote_user_answer"),
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), index=True)
    question_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("questions.id"), nullable=True, index=True
    )
    answer_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("answers.id"), nullable=True, index=True
    )
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user: Mapped[User] = relationship(back_populates="votes")
    question: Mapped[Optional[Question]] = relationship(
        back_populates="votes", foreign_keys=[question_id]
    )
    answer: Mapped[Optional[Answer]] = relationship(
        back_populates="votes", foreign_keys=[answer_id]
    )
