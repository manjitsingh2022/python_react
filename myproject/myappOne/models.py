from django.contrib.auth.models import AbstractBaseUser,UserManager
from django.db import models
from baseapp.models import BaseModel



class User(AbstractBaseUser,BaseModel,UserManager):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
   
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    def get_by_natural_key(self, email):
        return self.get(email=email)



class Email(models.Model):
    subject = models.CharField(max_length=200)
    sender = models.EmailField()
    message = models.TextField()
    mail=models.EmailField(null=True)
    attachment = models.FileField(upload_to='attachments/', blank=True, null=True)
    is_sent=models.BooleanField(default=False,db_index=True)

    def __str__(self):
        return self.mail

