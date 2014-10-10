from django.shortcuts import render, render_to_response
from practice.models import Question
# Create your views here.


def latest_questions(request):
    questions = Question.objects.order_by('create_date')
    return render_to_response('latest_questions.html', locals())