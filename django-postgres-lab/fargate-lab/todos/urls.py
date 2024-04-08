from django.urls import path
from . import views

urlpatterns = [
	path('list/',views.task_lists),
	path('add_task/',views.add_task, name='add_task'),
	path('delete_task/<int:todo_id>/',views.delete_task, name='delete_task')
]