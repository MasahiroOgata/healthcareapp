from django.core.serializers import serialize
from django.core.exceptions import PermissionDenied, ValidationError
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
#from django.contrib.auth.models import User
#from django.http import JsonResponse
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views import generic
from .models import Vital
from .vital_items import *
import datetime

class IndexView(LoginRequiredMixin, generic.ListView):
    paginate_by = 15
    def get_queryset(self):
        return Vital.objects.filter(user=self.request.user).order_by('-checked_up_at')
    
class CreateView(LoginRequiredMixin, generic.CreateView):
    model = Vital
    fields = ('body_temperature', 'blood_sugar_level', 'spo2_level', 'heart_rate',
              'blood_pressure_high', 'blood_pressure_low')
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        item = {'vital_items': vital_items}
        context.update(item)
        return context
    
    def form_valid(self, form):
        form.instance.user = self.request.user #User.objects.get(id=1) #ユーザーログイン機能作成後に変更
        form.instance.checked_up_at = datetime.datetime.now(datetime.timezone.utc)
        return super().form_valid(form)
    
    # def post(self, request, *args, **kwargs):
    #     self.object = None
    #     form = self.get_form()

    #     if form.is_valid():
    #         obj = form.save(commit=False)
    #         obj.user = self.request.user
    #         obj.checked_up_at = datetime.datetime.now(datetime.timezone.utc)
    #         try:
    #             obj.full_clean()  # モデルレベルのバリデーション
    #             obj.save()
    #             return self.form_valid(form)
    #         except ValidationError as e:
    #             form.add_error(None, e)  # モデルのclean()エラーをフォームに追加
    #     return self.form_invalid(form)
    
    # def form_valid(self, form):
    #     obj = form.save(commit=False)
    #     obj.user = self.request.user
    #     obj.checked_up_at = datetime.datetime.now(datetime.timezone.utc)
    #     try:
    #         obj.full_clean()  
    #     except ValidationError as e:
    #         form._update_errors(e)  
    #         return self.form_invalid(form)
    #     obj.save()
    #     # form.instance.user = self.request.user #User.objects.get(id=1) #ユーザーログイン機能作成後に変更
    #     # form.instance.checked_up_at = datetime.datetime.now(datetime.timezone.utc)
    #     return super().form_valid(form)
    
class EditView(LoginRequiredMixin, generic.UpdateView):
    model = Vital
    fields = ('body_temperature', 'blood_sugar_level', 'spo2_level',  'heart_rate',
              'blood_pressure_high', 'blood_pressure_low', 'checked_up_at')
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        item = {'vital_items': vital_items}
        context.update(item)
        return context
    
    def get_object(self, queryset=None):
        obj = super().get_object(queryset)
        if obj.user != self.request.user:
            raise PermissionDenied
        return obj
    
class DeleteView(LoginRequiredMixin, generic.DeleteView):
    model = Vital
    #template_name = 'healthcheck/vital_confirm_delete.html'
    success_url = reverse_lazy('index')
    
    def get_object(self, queryset=None):
        obj = super().get_object(queryset)
        if obj.user != self.request.user:
            raise PermissionDenied
        return obj
    
    # def post(self, request, *args, **kwargs):
    #     self.object = self.get_object()
    #     self.object.delete()
    
@login_required
def chart_view(request):
    object_list = Vital.objects.filter(user=request.user).order_by('-checked_up_at')
    json_data = serialize('json', object_list)
    return render(request, 'healthcheck/chart.html', {'object_list': object_list, 'object_list_json': json_data})
        