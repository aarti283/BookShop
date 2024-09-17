import graphene
from graphene_django.types import DjangoObjectType
from .models import *

# Get Profile


class CustomerType(DjangoObjectType):
    class Meta:
        model = Customer
        fields = ("username", "addresses", "books")


class AddressType(DjangoObjectType):
    class Meta:
        model = Address
        fields = ("city", "state")


class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = ("title", "url")


class Query(graphene.ObjectType):
    customers = graphene.List(CustomerType)

    def resolve_customers(root, info):
        return Customer.objects.all()


schema = graphene.Schema(query=Query)
