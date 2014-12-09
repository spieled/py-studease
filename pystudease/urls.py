from django.conf.urls import patterns, include, url

from django.contrib import admin
from practice import urls as practiceurls
from pystudease import views
admin.autodiscover()



urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pystudease.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': 'settings.STATIC_ROOT'}),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index),
    url(r'^practice/', include(practiceurls)),
)


from django.conf import settings
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += patterns('',
        url(r'^__debug__/', include(debug_toolbar.urls)),
    )