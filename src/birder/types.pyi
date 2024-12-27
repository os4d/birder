from typing import TYPE_CHECKING

if TYPE_CHECKING:
    Json: type = dict[str, "Json"] | list["Json"] | str | int | float | bool | None
