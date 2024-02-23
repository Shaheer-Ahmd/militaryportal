from dataclasses import dataclass
from enum import Enum

@dataclass(frozen=True)
class UserType(str, Enum):
    """User type enum"""
    ARMY_CHIEF = 1
    GENERAL = 2
    COLONEL = 3

@dataclass
class User:
    id: str
    name: str
    email: str
    password: str
    type: UserType