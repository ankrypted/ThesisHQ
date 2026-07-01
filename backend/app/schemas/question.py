from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel


class TopicOut(BaseModel):
    id: int
    name: str
    slug: str
    type: str
    color_key: str

    class Config:
        from_attributes = True


class AuthorOut(BaseModel):
    id: int
    full_name: str
    stage: Optional[str] = None

    class Config:
        from_attributes = True


class AnswerOut(BaseModel):
    id: int
    body: str
    author: Optional[AuthorOut]
    is_anonymous: bool
    upvote_count: int
    is_top_answer: bool
    created_at: datetime


class QuestionSummary(BaseModel):
    id: int
    title: str
    body: str
    topic: TopicOut
    author: Optional[AuthorOut]
    is_anonymous: bool
    upvote_count: int
    answer_count: int
    has_top_answer: bool
    created_at: datetime
    tags: List[str]


class QuestionDetail(QuestionSummary):
    answers: List[AnswerOut]
