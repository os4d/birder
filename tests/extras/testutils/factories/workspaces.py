import factory
from country_workspace.workspaces.models import CountryChecker

from testutils.factories import AutoRegisterModelFactory, OfficeFactory


class CountryCheckerFactory(AutoRegisterModelFactory):
    name = factory.Sequence(lambda d: "DataChecker-%s" % d)

    country_office = factory.SubFactory(OfficeFactory)

    class Meta:
        model = CountryChecker
