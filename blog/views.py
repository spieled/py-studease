from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
# from django.views.decorators.cache import cache_page

from blog.forms import ContactForm, BlogForm, CommentForm
from blog.models import *
from datetime import datetime
import logging


# Create your views here.

logger = logging.getLogger('blog')


def index(request):
    blogs = Blog.objects.order_by('createDate')
    paginator = Paginator(blogs, 2)
    page = request.GET.get('page')
    # if True:
    #     raise RuntimeError('坑爹程序员手动抛出了一个异常')
    try:
        blogs = paginator.page(page)
    except PageNotAnInteger as e1:
        print(str(page), ' is not an integer', e1)
        blogs = paginator.page(1)
    except EmptyPage:
        print(page, ' out of index')
        blogs = paginator.page(paginator.num_pages)
    return render_to_response("blog/index.html", {'blogs': blogs})


@login_required()
def add_blog(request):
    if request.method == 'POST':
        form = BlogForm(request.POST)
        if form.is_valid():
            print('blog form is valid')
            cd = form.cleaned_data
            title = cd['title']
            keyword = cd['keyword']
            content = cd['content']
            blog = Blog(title=title, keyword=keyword, content=content)
            blog.author = request.user
            blog.createDate = datetime.now()
            blog.save()
            return HttpResponseRedirect('/blog')
    else:
        form = BlogForm()

    return render(request, 'blog/add_blog.html', {'form': form})


def view_blog(request, pk):
    """
    1、filter得到的是数组; get得到的才是一个对象;
    2、When rendering a template RequestContext, the currently logged-in user,
    either a User instance or an AnonymousUser instance, is stored in the template variable {{ user }}
    3、所以说，在有用户的工程项目中请尽量使用render，而不是render_to_response
    """
    logger.error(__name__)
    logger.error('Something went wrong')
    print('pk: ', str(pk))
    logger.info('pk is ' + str(pk))
    blog = Blog.objects.get(pk=int(pk))
    print('blog: ', blog)
    logger.info('blog: ' + str(blog))
    comments = Comment.objects.order_by('createDate')
    return render(request, 'blog/blog_detail.html', {'blog': blog, 'form': CommentForm(), 'comments': comments})


@login_required()
def comment_blog(request, pk):
    blog = Blog.objects.get(pk=int(pk))
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            content = cd['content']
            comment = Comment(content=content)
            comment.author = request.user
            comment.blog = blog
            now = datetime.now()
            print('now: ', str(now))
            comment.createDate = now
            comment.save()
            return HttpResponseRedirect('/blog/detail/' + pk + '/')
    else:
        form = CommentForm()
    return render(request, 'blog/blog_detail.html', {'blog': blog, 'form': form})


def info(request):
    values = request.META.items()
    html = []
    for k, v in values:
        html.append('<tr><td>%s</td><td>%s</td></tr>' % (k, v))
    return HttpResponse('<table>%s</table>' % '\n'.join(html))


def info2(request):
    values = request.META.items()
    # html = ""
    # for k, v in values:
    #     html.append((str(k), str(v)))
    remote_addr = values['REMOTE_ADDR']
    os = values['OS']
    language = values['HTTP_ACCEPT_LANGUAGE']
    user_agent = values['HTTP_USER_AGENT']
    return render_to_response('blog/meta.html', {'metas': values})


def info3(request):
    remote_addr = request.META['REMOTE_ADDR']
    os = request.META['OS']
    language = request.META['HTTP_ACCEPT_LANGUAGE']
    user_agent = request.META['HTTP_USER_AGENT']
    meta = {'os': os, 'remote_addr': remote_addr, 'language': language, 'user_agent': user_agent}
    return render_to_response('blog/meta_tool.html', {'meta': meta})


def getip_chinaz(ip):
    URL = 'http://ip.chinaz.com/?IP=' + ip
    import urllib.request
    import re

    conn = urllib.request.urlopen(URL, timeout=300)
    result = conn.read().decode('utf-8')
    ip = re.findall('查询结果\[\d*\]:(.+)</strong>', result)
    if ip:
        ip = ip[0]
    ip = ip.split('==>>')
    tu = (ip[0].strip(), ip[1].strip(), ip[2].strip())
    return tu


def info_tool(request):
    """
    发送请求到http://ip.chinaz.com获取返回内容，解析其中的请求主机的信息
    """
    remote_addr = request.META['REMOTE_ADDR']
    os = request.META['OS']
    language = request.META['HTTP_ACCEPT_LANGUAGE']
    user_agent = request.META['HTTP_USER_AGENT']
    meta = {'os': os, 'remote_addr': getip_chinaz(remote_addr), 'language': language, 'user_agent': user_agent}

    return render_to_response('blog/meta_tool_chinaz.html', {'meta': meta})


def contact(request):
    """
    处理POST请求的时候，请确保：
    1、settings中包含django.middleware.csrf.CsrfViewMiddleware;
    2、页面表单中须包含{% csrf_token %};
    3、view方法中确保使用RequestContext，即render(request, '', {});
    """
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            print('contactForm is valid')
            cd = form.cleaned_data
            for k, v in cd.items():
                print('%s: %s' % (k, v))
            return HttpResponseRedirect(request.path)
    else:
        form = ContactForm()
    form['subject'].css_classes('ui-form-item')
    form['email'].css_classes('ui-form-item')
    form['message'].css_classes('ui-form-item')
    return render(request, "blog/contact.html", {'form': form})

