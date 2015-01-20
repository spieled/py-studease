# -*- coding: utf-8 -*-
__author__ = '刘少平'
from django import forms


class ContactForm(forms.Form):
    subject = forms.CharField()
    email = forms.EmailField()
    message = forms.CharField(widget=forms.Textarea)