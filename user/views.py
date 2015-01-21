from django.shortcuts import render, render_to_response
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import auth
from common import Util
import json
# Create your views here.


def profile(request):
    return HttpResponse('profile')


def login(request):
    """
    登录逻辑
    """
    if not request.method == 'POST':
        return Util.json_response(False, '用户登录仅接受POST请求')
    username = request.POST.get('username')
    password = request.POST.get('password')
    if not username:
        return Util.json_response(False, '用户名不能为空')
    if not password:
        return Util.json_response(False, '密码不能为空')
    user = auth.authenticate(username=username, password=password)
    if not user:
        return Util.json_response(False, '用户名或密码不正确')
    auth.login(request, user)
    return Util.json_response(True)


def register(request):
    """
    注册逻辑
    """
    if not request.method == 'POST':
        return Util.json_response(False, '用户注册仅接受POST请求')
    username = request.POST.get('username')
    password = request.POST.get('password')
    password_confirm = request.POST.get('password_confirm')
    email = request.POST.get('email')
    if not username:
        return Util.json_response(False, '用户名不能为空')
    if not password:
        return Util.json_response(False, '密码不能为空')
    if not password_confirm:
        return Util.json_response(False, '确认密码不能为空')
    # if not email:
    #     return Util.json_response(False, '邮箱不能为空')

    if not Util.equals(password, password_confirm):
        return Util.json_response(False, '密码也确认密码不一致')

    try:
        user = User.objects.create_user(username=username, email=email, password=password)
    except Exception as e:
        return Util.json_response(False, "用户名"+username+"已经注册了")
    user.is_active = True
    user.save
    return Util.json_response(True)


def logout(request):
    """
    退出登录
    """
    auth.logout(request)
    return Util.json_response(True)