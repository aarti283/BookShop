import graphene
from graphene_django.types import DjangoObjectType
from .models import *



class BookType(DjangoObjectType):
    class Meta:
        model = Book
        fields = ("id", "title")
    
class Query(graphene.ObjectType):
    all_books = graphene.List(BookType)

    def resolve_all_books(root, info):
        return Book.objects.all()
    
schema_book = graphene.Schema(query=Query)

# Get Addresses
class CustomerType(DjangoObjectType):
    class Meta:
        model = Customer
        fields = ("username", "addresses")

class AddressType(DjangoObjectType):
    class Meta:
        model = Address
        fields = ("city", "state")

class Query2(graphene.ObjectType):
    customers = graphene.List(CustomerType)

    def resolve_customers(root, info):
        return Customer.objects.all()

schema = graphene.Schema(query=Query2)

