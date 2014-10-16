from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from practice.models import Question, Answer
import json
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

    # 找到正确答案
    correct_answers = Answer.objects.filter(question=answer.question, right=True)

    if answer.right and str(answer.question_id) == questionId:
        print("恭喜你，答对了")
        return HttpResponse(json.dumps({'success': True, 'msg': '恭喜你，答对了！', 'correct_answers': [str(cn.pk) for cn in correct_answers]}))
    else:
        print("很遗憾，你答错了")
        return HttpResponse(json.dumps({'success': True, 'msg': '很遗憾，你答错了！', 'correct_answers': [str(cn.pk) for cn in correct_answers]}))