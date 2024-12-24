import sys
import traceback
from typing import TYPE_CHECKING, Any

from django import forms

if TYPE_CHECKING:
    from birder.models import Monitor

    Json: type = dict[str, "Json"] | list["Json"] | str | int | float | bool | None


class ConfigForm(forms.Form):
    DEFAULTS = {}

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        for k, v in self.fields.items():
            self.DEFAULTS[k] = v.initial


class BaseCheck:
    pragma: str
    config_class: type[ConfigForm]

    def __init__(self, owner: "Monitor") -> None:
        self.monitor: "Monitor" = owner
        if owner.pk:
            self.ready()

    def ready(self) -> None:
        pass

    @property
    def config(self) -> dict[str, Any]:
        cfg = {}
        cfg.update(self.monitor.configuration)
        frm = self.config_class(cfg)
        if frm.is_valid():
            return frm.cleaned_data
        return {}

    def _assert(self, condition: Any, msg: str = "", *args: Any, **kwargs: Any) -> None:
        if not condition:
            if not msg:
                try:
                    raise AssertionError
                except AssertionError:
                    f = sys.exc_info()[2].tb_frame.f_back
                stck = traceback.extract_stack(f)
                msg = str(stck[-1][-1])
            raise Exception(msg)

    def check(self) -> bool:
        """Perform the check."""