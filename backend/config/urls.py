from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from journeys.views import JourneyViewSet

router = DefaultRouter()
router.register(r'journeys', JourneyViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]