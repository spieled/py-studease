from django.conf.urls import patterns, include, url

from django.contrib import admin
from practice import urls as practiceurls
from user import urls as userurls
from pystudease import views
admin.autodiscover()



urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'pystudease.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': 'settings.STATIC_ROOT'}),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', views.index),
    url(r'^blog/$', views.index),
    url(r'^note/$', views.index),
    url(r'^practice/', include(practiceurls)),
    url(r'^user/', include(userurls))
)


from django.conf import settings
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += patterns('',
        url(r'^__debug__/', include(debug_toolbar.urls)),
    )