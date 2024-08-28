from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register('Books', GetAllBooks, basename='Bookslist')
# router.register('Customers', GetAllCustomers, basename='Customers')
router.register(r'buy-book', CommonBook, basename='buy-book')
router.register(r'buybook', BuyBookViewSet, basename='buybook')

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    
    path('common-books/<int:cust>/<int:cust2>/', CommonBook.as_view({'get': 'get'}), name='common-books'),
    path('Books of Customer/<int:pk>/', CustomerBooks.as_view({'get': 'getcustomerbook'}), name='cutomer-books'),
    path('Get Buyers of Book/<int:pk>/', GetBuyerOfBookID.as_view({'get': 'getbuyer'}), name='get-buyers'),
]
