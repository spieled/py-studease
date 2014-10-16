from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pystudease.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': 'settings.STATIC_ROOT'}),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'practice.views.latest_questions'),
    url(r'^practice/practice/(\d)+/$', 'practice.views.practice'),
    url(r'^practice/verify/(\d)+/(\d)+/$', 'practice.views.verify'),
    url(r'^practice/multi-verify/(\d)+/(.+)/$', 'practice.views.multi_verify'),
)
