from django.conf.urls import patterns, include, url
from user import views
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pystudease.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    # url(r'^login/', views.login),
    # url(r'^logout/', views.logout),
    # url(r'^register/', views.register),
    url(r'^login/$', 'django.contrib.auth.views.login'),
    url(r'^profile/$', views.profile),


)
