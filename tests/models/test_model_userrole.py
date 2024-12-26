from birder.models import UserRole


def test_model_monitor(user_role: UserRole):
    assert str(user_role)
