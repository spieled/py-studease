# Register your models here.

from django.contrib import admin
from blog import models


admin.site.register(models.Blog)
admin.site.register(models.Comment)
