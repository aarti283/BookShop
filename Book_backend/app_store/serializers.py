from rest_framework import serializers
from .models  import*

class BookSerializer(serializers.ModelSerializer):
    class Meta():
        model = Book
        fields = "__all__"

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'