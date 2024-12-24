from typing import TYPE_CHECKING

from environ import Env


if TYPE_CHECKING:
    ConfigItem: type = tuple[type, str]


CONFIG: "dict[str, ConfigItem]" = {"SECRET_KEY": (str, "")}
env = Env(**CONFIG)
