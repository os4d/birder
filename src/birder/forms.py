from django import forms
from django.contrib.auth.forms import AuthenticationForm

from birder.models import Monitor, Project, User


class DateInput(forms.DateInput):
    input_type = "date"


class LoginForm(AuthenticationForm):
    username = forms.EmailField(label="Email", widget=forms.TextInput(attrs={"autofocus": True}))

    class Meta:
        model = User
        fields = ("username", "password")


class MonitorForm(forms.ModelForm):
    class Meta:
        model = Monitor
        fields = "__all__"


class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = "__all__"
