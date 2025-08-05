from django.urls import path
from django.views.generic import RedirectView
from . import views

urlpatterns = [
    path('index/', views.IndexView.as_view(), name='index'),
    path('create/', views.CreateView.as_view(), name='create'),
    path('edit/<int:pk>', views.EditView.as_view(), name='edit'),
    path('delete/<int:pk>', views.DeleteView.as_view(), name='delete'),
    path('chart/', views.chart_view, name="chart"),
    path('', RedirectView.as_view(url='/index/')),

]