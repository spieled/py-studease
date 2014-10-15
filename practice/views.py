from django.shortcuts import render, render_to_response
from practice.models import Question, Answer
# Create your views here.


def latest_questions(request):
    questions = Question.objects.order_by('create_date')
    return render_to_response('latest_questions.html', locals())


def practice(request, id):
    question = Question.objects.get(pk=id)
    answers = Answer.objects.filter(question=question)
    return render_to_response('practice.html', locals())


def verify(request, questionId, answerId):
    answer = Answer.objects.get(pk=answerId)
    # question = answer.question.pk
    if answer.right and answer.question.pk == questionId:
        print("恭喜你，答对了")
        return
    else:
        print("很遗憾，你答错了")
        return