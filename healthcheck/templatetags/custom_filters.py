import math
from django import template

register = template.Library()

@register.filter(name='getattr')
def getattr_safe(obj, attr_name):
    try:
        return getattr(obj, attr_name)
    except (AttributeError, TypeError):
        return None
    
@register.filter
def get_field_value(form, field_name):
    """フォームフィールドの value を取得するフィルター"""
    field = form[field_name]
    return field.value()

@register.filter
def log(value, base=math.e):
    try:
        value = float(value)
        base = float(base)
        return math.log(value, base)
    except (ValueError, TypeError):
        return ''
