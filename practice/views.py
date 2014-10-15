from django.shortcuts import render, render_to_response
from django.utils import simplejson
from django.http import HttpResponse
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
    print('questionId: ' + questionId)
    print('answer.question.pk: ' + str(answer.question_id))
    if answer.right and str(answer.question_id) == questionId:
        print("恭喜你，答对了")
        return HttpResponse(simplejson.dumps({'success': True, 'msg': '恭喜你，答对了'}), mimetype='json/application')
    else:
        print("很遗憾，你答错了")
        return HttpResponse(simplejson.dumps({'success': True, 'msg': '很遗憾，你答错了'}), mimetype='json/application')