from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import MovieViewset, RatingViewset, UserViewset
router = routers.DefaultRouter()
router.register('movie', MovieViewset)
router.register('rating', RatingViewset)
router.register('users', UserViewset)
urlpatterns = [
    path('', include(router.urls)),
]
