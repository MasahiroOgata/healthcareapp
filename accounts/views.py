from django.shortcuts import render
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from django.views import generic

from .forms import SignupForm


class SignupView(generic.CreateView):
    model = User
    form_class = SignupForm
    template_name = 'accounts/signup.html'
    success_url = reverse_lazy('index')