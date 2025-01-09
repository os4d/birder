# Generated by Django 5.1.4 on 2025-01-09 18:07

import django.contrib.auth.models
import django.contrib.auth.validators
import django.core.validators
import django.db.models.deletion
import django.db.models.functions.text
import django.utils.timezone
import strategy_field.fields
import timezone_field.fields
from django.conf import settings
from django.db import migrations, models

import birder.utils.security


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                ("last_login", models.DateTimeField(blank=True, null=True, verbose_name="last login")),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "username",
                    models.CharField(
                        error_messages={"unique": "A user with that username already exists."},
                        help_text="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
                        max_length=150,
                        unique=True,
                        validators=[django.contrib.auth.validators.UnicodeUsernameValidator()],
                        verbose_name="username",
                    ),
                ),
                ("first_name", models.CharField(blank=True, max_length=150, verbose_name="first name")),
                ("last_name", models.CharField(blank=True, max_length=150, verbose_name="last name")),
                ("email", models.EmailField(blank=True, max_length=254, verbose_name="email address")),
                (
                    "is_staff",
                    models.BooleanField(
                        default=False,
                        help_text="Designates whether the user can log into this admin site.",
                        verbose_name="staff status",
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        help_text="Designates whether this user should be treated as active. Unselect this instead of deleting accounts.",
                        verbose_name="active",
                    ),
                ),
                ("date_joined", models.DateTimeField(default=django.utils.timezone.now, verbose_name="date joined")),
                ("time_zone", timezone_field.fields.TimeZoneField(default="UTC")),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Specific permissions for this user.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "verbose_name": "user",
                "verbose_name_plural": "users",
                "abstract": False,
            },
            managers=[
                ("objects", django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name="Environment",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=255, unique=True)),
            ],
            options={
                "constraints": [
                    models.UniqueConstraint(django.db.models.functions.text.Lower("name"), name="unique_env_name")
                ],
            },
        ),
        migrations.CreateModel(
            name="Monitor",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=255, unique=True)),
                ("position", models.PositiveIntegerField(default=0)),
                (
                    "description",
                    models.TextField(blank=True, help_text="short description  do display in the monitor detail page"),
                ),
                ("notes", models.TextField(blank=True, help_text="Notes about the monitor. Only visible to Staff")),
                ("custom_icon", models.CharField(blank=True, default="", max_length=255)),
                ("strategy", strategy_field.fields.StrategyField()),
                ("configuration", models.JSONField(default=dict, help_text="Checker configuration")),
                ("data", models.BinaryField(blank=True, default=None, null=True)),
                ("data_file", models.FileField(blank=True, default=None, null=True, upload_to="")),
                (
                    "token",
                    models.CharField(
                        blank=True,
                        default=birder.utils.security.get_random_token,
                        editable=False,
                        help_text="Token to use for external API invocation",
                        max_length=1000,
                    ),
                ),
                ("active", models.BooleanField(default=True)),
                (
                    "warn_threshold",
                    models.PositiveIntegerField(
                        default=1,
                        help_text="how many consecutive failures (or missing notifications in case or remote invocation) produce a warning",
                        validators=[
                            django.core.validators.MinValueValidator(0),
                            django.core.validators.MaxValueValidator(9),
                        ],
                    ),
                ),
                (
                    "err_threshold",
                    models.PositiveIntegerField(
                        default=5,
                        help_text="how many consecutive failures (or missing notifications in case or remote invocation) produce an error",
                        validators=[
                            django.core.validators.MinValueValidator(0),
                            django.core.validators.MaxValueValidator(9),
                        ],
                    ),
                ),
                (
                    "verbosity",
                    models.IntegerField(
                        choices=[(0, "None"), (1, "Success"), (2, "Failure"), (3, "Error"), (4, "Full")], default=0
                    ),
                ),
                (
                    "env",
                    models.ForeignKey(
                        blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to="birder.environment"
                    ),
                ),
            ],
            options={
                "ordering": ("name",),
            },
        ),
        migrations.CreateModel(
            name="LogCheck",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("status", models.CharField(default="", max_length=255)),
                ("timestamp", models.DateTimeField(default=django.utils.timezone.now)),
                ("payload", models.TextField(blank=True)),
                (
                    "monitor",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="logs", to="birder.monitor"
                    ),
                ),
            ],
            options={
                "ordering": ["-timestamp"],
            },
        ),
        migrations.CreateModel(
            name="Project",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("name", models.CharField(max_length=255, unique=True)),
                (
                    "bitcaster_url",
                    models.URLField(blank=True, help_text="The URL to the Bitcaster notification endpoint."),
                ),
            ],
            options={
                "constraints": [
                    models.UniqueConstraint(django.db.models.functions.text.Lower("name"), name="unique_program_name")
                ],
            },
        ),
        migrations.AddField(
            model_name="monitor",
            name="project",
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="birder.project"),
        ),
        migrations.CreateModel(
            name="UserRole",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("project", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="birder.project")),
                ("role", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="auth.group")),
                ("user", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name="DataHistory",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("date", models.DateField(auto_now_add=True)),
                ("data", models.BinaryField(default=None, null=True)),
                (
                    "monitor",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name="datalog", to="birder.monitor"
                    ),
                ),
            ],
            options={
                "constraints": [
                    models.UniqueConstraint(models.F("monitor"), models.F("date"), name="unique_data_day_monitor")
                ],
            },
        ),
        migrations.AddConstraint(
            model_name="monitor",
            constraint=models.UniqueConstraint(
                models.F("project"), django.db.models.functions.text.Lower("name"), name="unique_project_monitor_name"
            ),
        ),
    ]
