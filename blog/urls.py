from django.conf.urls import patterns, url
from django.contrib import admin

from blog import views

admin.autodiscover()

urlpatterns = patterns('',
                       # Examples:
                       # url(r'^$', 'pystudease.views.home', name='home'),
                       # url(r'^blog/', include('blog.urls')),

                       url(r'^$', views.index),
                       url(r'^info/$', views.info),
                       url(r'^info2/$', views.info2),
                       url(r'^info3/$', views.info3),
                       url(r'^infochinaz/$', views.info_tool),
                       url(r'^contact/$', views.contact),
                       url(r'^add/$', views.add_blog),
                       url(r'^detail/(.+)/$', views.view_blog),
                       url(r'^(.+)/comment/$', views.comment_blog),
)
