from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING, List, Optional

from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base

if TYPE_CHECKING:
    from app.models.question import Question
    from app.models.answer import Answer
    from app.models.vote import Vote
    from app.models.topic import Topic


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    hashed_password: Mapped[str] = mapped_column(String(255))
    full_name: Mapped[str] = mapped_column(String(100))
    # e.g. "year-1", "year-2", ..., "year-6", "postdoc", "faculty"
    stage: Mapped[Optional[str]] = mapped_column(String(20), nullable=True)
    field: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    bio: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    questions: Mapped[List[Question]] = relationship(back_populates="author")
    answers: Mapped[List[Answer]] = relationship(back_populates="author")
    votes: Mapped[List[Vote]] = relationship(back_populates="user")
    followed_topics: Mapped[List[Topic]] = relationship(
        secondary="topic_follows", back_populates="followers"
    )


class TopicFollow(Base):
    __tablename__ = "topic_follows"

    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), primary_key=True)
    topic_id: Mapped[int] = mapped_column(ForeignKey("topics.id"), primary_key=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
