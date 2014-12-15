from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(to=User)
    nick_name = models.CharField(max_length=20, default="")
    true_name = models.CharField(max_length=50, default="")
    # True表示男，False表示女
    gender = models.BooleanField(default=True)
    address = models.CharField(max_length=200, default="")
    phone = models.CharField(max_length=200, default="")

