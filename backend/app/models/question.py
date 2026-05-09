from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.topic import Topic
    from app.models.answer import Answer
    from app.models.tag import Tag
    from app.models.vote import Vote


class Question(Base):
    __tablename__ = "questions"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String(300))
    body: Mapped[str] = mapped_column(Text)
    author_id: Mapped[Optional[int]] = mapped_column(
        ForeignKey("users.id"), nullable=True, index=True
    )
    topic_id: Mapped[int] = mapped_column(ForeignKey("topics.id"), index=True)
    is_anonymous: Mapped[bool] = mapped_column(Boolean, default=False)
    upvote_count: Mapped[int] = mapped_column(Integer, default=0)
    answer_count: Mapped[int] = mapped_column(Integer, default=0)
    has_top_answer: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    author: Mapped[Optional[User]] = relationship(back_populates="questions")
    topic: Mapped[Topic] = relationship(back_populates="questions")
    answers: Mapped[List[Answer]] = relationship(
        back_populates="question", cascade="all, delete-orphan"
    )
    tags: Mapped[List[Tag]] = relationship(
        secondary="question_tags", back_populates="questions"
    )
    votes: Mapped[List[Vote]] = relationship(
        back_populates="question", cascade="all, delete-orphan",
        foreign_keys="Vote.question_id"
    )
