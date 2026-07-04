# Typed models for the YoutubeVideo SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Yts:
    code: int
    result: dict
    status: bool
    creator: Optional[str] = None


@dataclass
class YtsLoadMatch:
    code: Optional[int] = None
    creator: Optional[str] = None
    result: Optional[dict] = None
    status: Optional[bool] = None

