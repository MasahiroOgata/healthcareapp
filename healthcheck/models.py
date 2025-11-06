from django.core.exceptions import ValidationError
from django.db import models
from pytz import timezone
from datetime import datetime
from django.urls import reverse


class Vital(models.Model):
    body_temperature = models.FloatField(null=True, blank=True, verbose_name='体温')
    blood_sugar_level = models.IntegerField(null=True, blank=True, verbose_name='血糖値')
    spo2_level = models.IntegerField(null=True, blank=True, verbose_name='酸素飽和度')
    heart_rate = models.IntegerField(null=True, blank=True, verbose_name='心拍数')
    blood_pressure_high = models.IntegerField(null=True, blank=True, verbose_name='最高血圧')
    blood_pressure_low = models.IntegerField(null=True, blank=True, verbose_name='最低血圧')
    checked_up_at = models.DateTimeField(verbose_name='測定日時')

    user = models.ForeignKey('auth.User', on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        super().clean()
        if bool(self.blood_pressure_high) != bool(self.blood_pressure_low):
            raise ValidationError('血圧の数値を両方入力してください')
        if self.blood_pressure_high and self.blood_pressure_high < self.blood_pressure_low:
            raise ValidationError('血圧の上下の値が逆になっています')

    def __str__(self):
        return str(self.id) + ':' + self.user.username + ':' + str(self.checked_up_at.astimezone(timezone('Asia/Tokyo')))
    
    def get_absolute_url(self):
        return reverse('index')

