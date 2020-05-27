from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Currency)
class CurrencyAdmin(admin.ModelAdmin):
	list_display = ['__str__']
	search_fields = ['name', 'code']


@admin.register(Rate)
class RateAdmin(admin.ModelAdmin):
	list_display = ['currency', 'rate', 'create_time']
	list_filter = ['currency']
	readonly_fields = ['create_time']