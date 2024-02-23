from dataclasses import dataclass
from typing import Dict, List, Union


@dataclass(frozen=True)
class Response:
    """Response object"""

    message: str
    status_code: int
    data: Union[Dict, List] = None
