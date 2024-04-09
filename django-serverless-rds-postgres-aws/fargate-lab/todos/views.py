from django.shortcuts import render, redirect
from django.template import loader

# Create your views here.


from django.http import HttpResponse,HttpRequest
from .models import Todo

def task_lists(request):
	context = {'todo_list':Todo.objects.all()}
	template = loader.get_template("todos/index.html")
	return HttpResponse(template.render(context, request))
def add_task(request:HttpRequest):
	todo = Todo(task = request.POST['tasks'])
	todo.save()
	return redirect('/todos/list/')
def delete_task(request, todo_id):
	task_to_delete = Todo.objects.get(id=todo_id)
	task_to_delete.delete()
	return redirect('/todos/list/')