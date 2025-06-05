import pytest
from django.urls import reverse
from testutils.selenium import Browser

from birder.models import Monitor

pytestmark = pytest.mark.selenium


@pytest.mark.asyncio
async def test_crawl(browser: Browser, monitor: Monitor):
    project = monitor.project
    url = reverse("project-env", kwargs={"project_id": project.pk, "env": monitor.environment.name})

    browser.login()
    browser.open(url)
    browser.click(f"#monitor-{monitor.pk}")
    browser.click("#project-title")
    browser.select_option_by_text("select[name=env]", "production")
