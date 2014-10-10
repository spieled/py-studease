
import os
os.environ.setdefault("DJANGO_SETTING_MODULE", "pystudease.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
