from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User = get_user_model()


class BookSerializer(serializers.ModelSerializer):
    class Meta():
        model = Book
        fields = "__all__"


class AddressSerializer(serializers.ModelSerializer):
    class Meta():
        model = Address
        fields = "__all__"


class BuyBooksSerializer(serializers.Serializer):
    customer_id = serializers.IntegerField()
    book_ids = serializers.ListField(child=serializers.IntegerField())


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'countt', 'budget')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            countt=validated_data.get('countt', 0),
            budget=validated_data.get('budget', 0)
        )
        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    token = serializers.SerializerMethodField()

    def get_token(self, obj):
        user = User.objects.get(username=obj['username'])
        refresh = RefreshToken.for_user(user)
        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        return {'username': user.username, 'token': self.get_token(data)}
