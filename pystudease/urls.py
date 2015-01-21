import os

from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.views.generic import TemplateView

from pystudease import views, settings

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
admin.autodiscover()

urlpatterns = patterns('',
                       # Examples:
                       # url(r'^$', 'pystudease.views.home', name='home'),
                       # url(r'^blog/', include('blog.urls')),

                       url(r'^static/(?P<path>.*)$', 'django.views.static.serve',
                           {'document_root': settings.STATIC_ROOT}),
                       url(r'^media/(?P<path>.*)$', 'django.views.static.serve',
                           {'document_root': settings.MEDIA_ROOT}),
                       url(r'^about/$', TemplateView.as_view(template_name='about.html')),


                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^$', views.index),
                       url(r'^blog/', include('blog.urls')),
                       url(r'^note/$', views.index),
                       url(r'^practice/', include('practice.urls')),
                       url(r'^accounts/', include('user.urls')),


)

from django.conf import settings

if settings.DEBUG:
    import debug_toolbar

    urlpatterns += patterns('',
                            url(r'^__debug__/', include(debug_toolbar.urls)),
    )