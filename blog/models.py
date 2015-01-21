# Create your models here.
from django.db import models
from django.contrib.auth.models import User


class Blog(models.Model):
    author = models.ForeignKey(to=User)
    title = models.CharField(max_length=100)
    keyword = models.CharField(max_length=40)
    gallery = models.ImageField(null=True)
    content = models.CharField(max_length=2000)
    createDate = models.DateTimeField()
    updateDate = models.DateTimeField(null=True)

    def __str__(self):
        return self.title