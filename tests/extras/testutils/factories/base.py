import typing

import factory
from factory.base import FactoryMetaClass
from factory.django import DjangoModelFactory

TAutoRegisterModelFactory = typing.TypeVar("TAutoRegisterModelFactory", bound="AutoRegisterModelFactory")

factories_registry: dict[str, TAutoRegisterModelFactory] = {}


class AutoRegisterFactoryMetaClass(FactoryMetaClass):
    def __new__(cls, class_name, bases, attrs):
        new_class = super().__new__(cls, class_name, bases, attrs)
        factories_registry[new_class._meta.model] = new_class
        return new_class


class AutoRegisterModelFactory(factory.django.DjangoModelFactory, metaclass=AutoRegisterFactoryMetaClass):
    pass


def get_factory_for_model(
    _model,
) -> type[TAutoRegisterModelFactory] | type[DjangoModelFactory]:
    class Meta:
        model = _model

    bases = (AutoRegisterModelFactory,)
    if _model in factories_registry:
        return factories_registry[_model]  # noqa
    t = type(f"{_model._meta.model_name}AutoCreatedFactory", bases, {"Meta": Meta})
    factories_registry[_model] = t
    return t  # noqa
