from django.shortcuts import render
import json
import requests
from currency.models import *
from django.conf import settings

def get_currency_rate():
    """
    Use currency layer API, free API calls 1000 per month
    """
	#
    # url calling format = 'http://apilayer.net/api/live?access_key={}&currencies=EUR,CNY,GBP,MXN&format=1'
    #
    qs = Currency.objects.all().values_list('code', flat=True)
    url = 'http://apilayer.net/api/live?access_key={}&currencies={}&format=1'.format(settings.API_LAYER_ACCESS_KEY, ','.join(qs))

    r = requests.get(url)

    result = json.loads(r.text)

    for q in result['quotes']:
        code = q[3:]
        currency = Currency.objects.filter(code=code).first()

        if currency:
            rate = Rate.objects.create(currency=currency, rate=result['quotes'][q])