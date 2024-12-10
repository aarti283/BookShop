from django.contrib.auth import get_user_model
from django.db import models
from django.contrib.auth.models import AbstractUser


class Book(models.Model):
    title = models.CharField(max_length=30)
    price = models.IntegerField()
    quantity = models.IntegerField()
    img_url = models.URLField(
        max_length=200, default="https://5.imimg.com/data5/SELLER/Default/2021/1/OK/HV/TZ/119567041/ikigai-500x500.jpeg")

    @property
    def buyers(self):
        return Customer.objects.filter(books=self.id)

    def __str__(self) -> str:
        return self.title


class Customer(AbstractUser):
    countt = models.IntegerField(default=0)
    books = models.ManyToManyField(
        Book, blank=True, related_name="customer_books")
    budget = models.IntegerField(default=0)
    is_author = models.BooleanField(default=False)
    
    @property
    def total_books_bought(self):
        return self.books.all()

    def __str__(self) -> str:
        return self.username
    
    


class Address(models.Model):
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='addresses')
    street = models.CharField(max_length=255, default='godrej')
    city = models.CharField(max_length=100, default='pune')
    state = models.CharField(max_length=100, default='maharashtra')

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state}"
