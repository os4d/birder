def test_index(django_app):
    assert django_app.get("/")
