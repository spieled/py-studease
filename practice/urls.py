from django.conf.urls import patterns, include, url
from practice import views
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pystudease.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^$', views.latest_questions),
    url(r'^practice/(\d)+/$', views.practice),
    url(r'^verify/(\d)+/(\d)+/$', views.verify),
    url(r'^multi-verify/(\d)+/(.+)/$', views.multi_verify),
)
