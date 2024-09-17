from .models import Customer, Book
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from .serializers import *
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
from django.core.mail import send_mail


@receiver(post_save, sender=Book)
def my_handler(sender, instance, **kwargs):
    print(f'Book {instance} has been saved.')


User = get_user_model()


class SignUpView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CustomerSerializer


class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data['token']
        return Response({
            'status': 'User Logged in Successfully',
            'token': token
        }, status=status.HTTP_200_OK)


class LogoutView(APIView):

    def post(self, request):
        request.user.auth_token.delete()
        return Response({'status': 'User logged out successfully'}, status=status.HTTP_200_OK)


class BuyBookViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = BuyBooksSerializer(data=request.data)
        if serializer.is_valid():
            customer_id = serializer.validated_data['customer_id']
            book_ids = serializer.validated_data['book_ids']

            try:
                customer = Customer.objects.get(id=customer_id)
            except Customer.DoesNotExist:
                return Response({'error': 'Customer not found'}, status=status.HTTP_404_NOT_FOUND)

            books = Book.objects.filter(id__in=book_ids)
            for book in books:
                book.quantity = book.quantity-1
                book.save()
            if books.count() != len(book_ids):
                return Response({'error': 'One or more books not found'}, status=status.HTTP_404_NOT_FOUND)

            customer.books.add(*books)
            return Response({'status': 'Books added to customer'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BuyBook(viewsets.ViewSet):
    # permission_classes = [IsAuthenticated]
    def buybook(self, book_ar, pk=None):
        try:
            customer = Customer.objects.get(pk=pk)
            bought_books = customer.books.append(book_ar)
            Customer.save(bought_books)
            return Response(
                f"{customer.username} has bought", status=status.HTTP_200_OK)

        except Customer.DoesNotExist:
            return Response(
                f"error: customers do not exist.", status=status.HTTP_404_NOT_FOUND)


class GetAllBooks(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class GetAllAddress(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticated]
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class Getadd(viewsets.ViewSet):
    def get(self, request, pk):
        try:
            customer = Customer.objects.get(pk=pk)
            add = customer.addresses.all()
            add_list = [ad.street for ad in add]
            add_list.extend([ad.city for ad in add])
            add_list.extend([ad.state for ad in add])
            if len(add_list) == 0:
                return Response({
                    "error": "Address of customers does not exist."
                }, status=status.HTTP_404_NOT_FOUND)
            adds = ', '.join(add_list)
            if len(adds) < 0:
                return Response({
                    "error": "An Error occured."
                }, status=status.HTTP_404_NOT_FOUND)
            else:
                return Response(
                    f"Address of {customer.username} is {adds}.", status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "error": "Address of customers does not exist."
            }, status=status.HTTP_404_NOT_FOUND)


# class GetAllCustomers(viewsets.ModelViewSet):
#     queryset = Customer.objects.all()
#     serializer_class = CustomerSerializer


class CommonBook(viewsets.ViewSet):
    def get(self, request, cust, cust2):
        try:
            customer = Customer.objects.get(pk=cust)
            cust2 = Customer.objects.get(pk=cust2)
            total_books_bought_by_customer = customer.total_books_bought.all()
            total_books2 = cust2.total_books_bought.all()
            common_books = total_books_bought_by_customer.intersection(
                total_books2)
            book_titles = [book.title for book in common_books]
            if len(book_titles) == 0:
                return Response(
                    "No Common Books", status=status.HTTP_200_OK)

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
                f"{customer.username} has {books}", status=status.HTTP_200_OK)

        except Customer.DoesNotExist:
            return Response(
                f"error: customers do not exist.", status=status.HTTP_404_NOT_FOUND)


class GetBuyerOfBookID(viewsets.ViewSet):
    def getbuyer(self, request, pk=None):
        try:
            book = Book.objects.get(pk=pk)
            buyers = book.buyers.all()
            buyer_list = [buyer.username for buyer in buyers]
            books = ', '.join(buyer_list)

            if len(books) > 0:
                return Response(
                    f"{book.title} is bought by {books}", status=status.HTTP_200_OK)
            else:
                return Response("This Book is bought by None", 200)

        except Customer.DoesNotExist:
            return Response(
                f"error: customers do not exist.", status=status.HTTP_404_NOT_FOUND)


class Webhook(viewsets.ViewSet):
    @csrf_exempt
    def getwebhook(self, request, pk):
        try:
            customer = Customer.objects.get(id=pk)
            subject = 'Welcome to Book Store'
            message = f'Hi {customer.username}, thank you for registering in Book Store'
            email_from = settings.EMAIL_HOST_USER
            recipient_list = [customer.email, 'aartibhawsar283@gmail.com']
            send_mail(subject, message, email_from, recipient_list)

            print("Mail has been sent", customer.username)

            return Response({'status': 'success', 'message': 'Email sent successfully.'})

        except Book.DoesNotExist:
            return Response({'status': 'error', 'message': 'Book not found.'}, status=404)
        except Customer.DoesNotExist:
            return Response({'status': 'error', 'message': 'Customer not found.'}, status=404)
