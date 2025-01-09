from django import forms
from django.contrib.auth.forms import AuthenticationForm

from birder.models import User


class DateInput(forms.DateInput):
    input_type = "date"


class LoginForm(AuthenticationForm):
    username = forms.EmailField(label="Email", widget=forms.TextInput(attrs={"autofocus": True}))

    class Meta:
        model = User
        fields = ("username", "password")
