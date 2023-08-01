from django.urls import path
from myappOne.views import (
    register,
    login,
    logout,
    EmailView,
    UserView,
)

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('logout/', logout, name='logout'),
    path('sendemail/', EmailView.as_view(), name='send-email'),
    path('me/', UserView.as_view(), name='user-list'),
    # path('me/<int:user_id>/', UserView.as_view(), name='user-detail'),
]

