CONSTANCE_BACKEND = "constance.backends.database.DatabaseBackend"


CONSTANCE_ADDITIONAL_FIELDS = {
    "email": [
        "django.forms.EmailField",
        {},
    ],
    "group_select": [
        "birder.utils.constance.GroupChoiceField",
        {"initial": None},
    ],
    "duration": [
        "birder.utils.constance.DurationField",
        {"initial": None},
    ],
    "read_only_text": [
        "django.forms.fields.CharField",
        {
            "required": False,
            "widget": "birder.utils.constance.ObfuscatedInput",
        },
    ],
    "write_only_text": [
        "django.forms.fields.CharField",
        {
            "required": False,
            "widget": "birder.utils.constance.WriteOnlyTextarea",
        },
    ],
    "write_only_input": [
        "django.forms.fields.CharField",
        {
            "required": False,
            "widget": "birder.utils.constance.WriteOnlyInput",
        },
    ],
}

CONSTANCE_CONFIG = {
    "NEW_USER_IS_STAFF": (False, "Set NEW_USER_DEFAULT_GROUP new user as staff", bool),
    "NEW_USER_DEFAULT_GROUP": (
        None,
        "Group to assign to any new user",
        "group_select",
    ),
    "HARD_THRESHOLD": (86400, "System Wide Threshold", int),
    "RETENTION_POLICY": ("1 month", "System Wide Threshold", "duration"),
    "CACHE_PREFIX": ("birder", "Cache global prefix", str),
    "DATETIME_FORMAT": ("%Y %b %d %H:%M", "Datetime format", str),
    "DATE_FORMAT": ("%Y %b %d", "Datetime format", str),
    "TIME_FORMAT": ("%H:%M", "Time format", str),
    "TOKEN_LENGTH": (255, "Monitor token length", int),
}
