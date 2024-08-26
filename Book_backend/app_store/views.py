from django.shortcuts import render, get_object_or_404
from .models import Customer, Book
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .serializers import *
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


@receiver(post_save, sender=Book)
def my_handler(sender, instance, **kwargs):
    print(f'Book {instance} has been saved.')


class GetAllBooks(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class GetAllCustomers(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CommonBook(viewsets.ViewSet):
    def get(self, request, cust, cust2):
        try:
            customer = Customer.objects.get(pk=cust)
            cust2 = Customer.objects.get(pk=cust2)

            # Assuming this is a ManyToManyField
            total_books_bought_by_customer = customer.total_books_bought.all()
            total_books2 = cust2.total_books_bought.all()
            common_books = total_books_bought_by_customer.intersection(
                total_books2)
            book_titles = [book.title for book in common_books]

            return Response({
                "common_books": ', '.join(book_titles)
            }, status=status.HTTP_200_OK)

        except Customer.DoesNotExist:
            return Response({
                "error": "One or both customers do not exist."
            }, status=status.HTTP_404_NOT_FOUND)


class CustomerBooks(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    def getcustomerbook(self, request, pk=None):
        try:
            customer = Customer.objects.get(pk=pk)
            bought_books = customer.books.all()
            book_titles = [book.title for book in bought_books]
            books = ', '.join(book_titles)

            return Response(
                f"{customer.name} has {books}", status=status.HTTP_200_OK)

        except Customer.DoesNotExist:
            return Response(
                f"error: customers do not exist.", status=status.HTTP_404_NOT_FOUND)


class GetBuyerOfBookID(viewsets.ViewSet):
    def getbuyer(self, request, pk=None):
        try:
            book = Book.objects.get(pk=pk)
            buyers = book.buyers.all()
            buyer_list = [buyer.name for buyer in buyers]
            books = ', '.join(buyer_list)

            if len(books) > 0:
                return Response(
                    f"{book.title} is bought by {books}", status=status.HTTP_200_OK)
            else:
                return Response("This Book is bought by None", 200)

        except Customer.DoesNotExist:
            return Response(
                f"error: customers do not exist.", status=status.HTTP_404_NOT_FOUND)


def buy_book_view(request, cust, book, cust2):
    customer = Customer.objects.get(pk=cust)
    cust2 = Customer.objects.get(pk=cust2)

    total_books_bought_by_customer = customer.total_books_bought
    total_books2 = cust2.total_books_bought
    t3 = total_books_bought_by_customer.intersection(total_books2)
    book_titles = [book.title for book in t3]

    print("Common books: ", ', '.join(book_titles))
    print("common books: ", t3)
    print(f"{customer.name} has bought {total_books_bought_by_customer} books.")
    books = Book.objects.get(pk=book)
    xyz = books.buyers()
    print(f"{books.title} has bought {xyz} books.")
    return HttpResponse("success")
