from django.http import HttpResponse, HttpRequest
from django.shortcuts import render, redirect


def home(request):
    return HttpResponse('Welcome to Hello Django!')

def todos(request):
	return redirect('/todos/list/')