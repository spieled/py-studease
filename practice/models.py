from django.db import models

# Create your models here.


class Question(models.Model):
    content = models.CharField(max_length=500)
    author = models.CharField(max_length=25)
    create_date = models.DateTimeField()

    def __str__(self):
        return self.content
