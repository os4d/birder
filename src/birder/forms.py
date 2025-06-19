from typing import Any

from django import forms
from django.contrib.auth.forms import AuthenticationForm
from flags.forms import FlagStateForm as FlagStateForm_
from unfold.contrib.forms.widgets import WysiwygWidget
from unfold.widgets import BASE_INPUT_CLASSES, CHECKBOX_CLASSES, SELECT_CLASSES

from birder.models import Monitor, Project, User


class DateInput(forms.DateInput):
    input_type = "date"


class LoginForm(AuthenticationForm):
    username = forms.EmailField(label="Email", widget=forms.TextInput(attrs={"autofocus": True}))

    class Meta:
        model = User
        fields = ("username", "password")


class ChangeIconForm(forms.Form):
    icon = forms.URLField(required=False, assume_scheme="https")

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.fields["icon"].widget.attrs["class"] = " ".join(SELECT_CLASSES)

    @property
    def media(self) -> forms.Media:
        media = super().media
        media += forms.Media(
            js=[
                "admin/js/vendor/jquery/jquery.js",
                "admin/js/jquery.init.js",
                "change-icon.js",
            ],
            css={"screen": ["birder-admin.css"]},
        )
        return media


# class ProjectForm(forms.ModelForm):


class MonitorForm(forms.ModelForm):
    notes = forms.CharField(required=False, widget=WysiwygWidget)
    description = forms.CharField(required=False, widget=WysiwygWidget)

    class Meta:
        model = Monitor
        fields = (
            "project",
            "environment",
            "name",
            "position",
            "description",
            "notes",
            "strategy",
            "configuration",
        )


class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ("name", "environments", "public", "bitcaster_url", "icon")


class FlagStateForm(FlagStateForm_):
    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)

        self.fields["name"].widget.attrs["class"] = " ".join(SELECT_CLASSES)
        self.fields["condition"].widget.attrs["class"] = " ".join(SELECT_CLASSES)
        self.fields["value"].widget.attrs["class"] = " ".join(BASE_INPUT_CLASSES)
        self.fields["required"].widget.attrs["class"] = " ".join(CHECKBOX_CLASSES)
