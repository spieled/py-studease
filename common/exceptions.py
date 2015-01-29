# -*- coding: utf-8 -*-
__author__ = '刘少平'
from django.http.request import HttpRequest
from django.http.response import HttpResponse
from common import useragent, Util, emailUtil
from datetime import datetime
import traceback
import sys


class GlobalExceptionHandlerMiddleware(object):
    def process_exception(self, request, exception):
        BR = "<br/>"
        error = ""
        user = request.user
        if not user:
            user = "游客"
        remote_addr = request.META.get('REMOTE_ADDR')
        remote_addr_ip, remote_addr_num, remote_addr_ars = Util.getip_chinaz(remote_addr)
        uri = request.META.get('PATH_INFO', '')
        is_ajax = request.is_ajax()
        user_agent_str = request.META.get('HTTP_USER_AGENT', '')
        print('user_agent_str: ', user_agent_str)
        user_agent_os, user_agent_browser = useragent.check_user_agent(user_agent_str)
        method = request.method
        params = {}
        if method == 'POST':
            for k, v in request.POST.items():
                params[k] = v
        if method == "GET":
            for k, v in request.GET.items():
                params[k] = v

        error += "发生时间：" + str(datetime.now()) + BR
        error += "客户端地址：" + remote_addr_ip + " &emsp; " + remote_addr_ars + BR
        error += "请求URI：" + uri + BR
        error += "请求方式：" + method + BR
        error += "是否为AJAX请求：" + str(is_ajax) + BR
        error += "请求BODY：" + str(params) + BR
        error += "User-Agent：" + user_agent_str + BR
        error += "操作系统：" + user_agent_os.name + BR
        error += "浏览器：" + user_agent_browser.name + BR
        error += "登录用户：" + str(user) + BR
        error += "异常类型：" + exception.__class__.__name__ + BR
        error += "异常信息：" + str(exception) + BR
        error += "异常追踪信息：" + BR + BR.join(traceback.format_exception(*sys.exc_info())) + BR

        emailUtil.send_mail_text(['472458220@qq.com'], 'Pystudease Error Report', error, sub_type='html')

        return HttpResponse("出现异常：" + BR + error)
