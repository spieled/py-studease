from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage

from blog.forms import ContactForm, BlogForm
from blog.models import *
from datetime import datetime


# Create your views here.


def index(request):
    blogs = Blog.objects.order_by('createDate')
    paginator = Paginator(blogs, 2)
    page = request.GET.get('page')
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
    filter得到的是数组; get得到的才是一个对象
    """
    print('pk: ', str(pk))
    blog = Blog.objects.get(pk=int(pk))
    print('blog: ', blog)
    return render_to_response('blog/blog_detail.html', {'blog': blog})


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
    return render_to_response('blog/meta.html', {'metas': values})


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