import os
import sys
from pathlib import Path

here = Path(__file__).parent
sys.path.insert(0, str(here / "../src"))
sys.path.insert(0, str(here / "extras"))


def pytest_configure(config):
    os.environ["DJANGO_SETTINGS_MODULE"] = "birder.config.settings"
    os.environ["SECRET_KEY"] = "super-secret"
    import django
    django.setup()
