from __future__ import annotations

from typing import List

from pydantic import BaseModel


class VoteToggleResponse(BaseModel):
    upvoted: bool
    upvote_count: int


class MyVotesResponse(BaseModel):
    question_ids: List[int]
    answer_ids: List[int]
