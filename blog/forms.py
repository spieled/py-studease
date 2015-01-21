# -*- coding: utf-8 -*-
__author__ = '刘少平'
from django import forms


class ContactForm(forms.Form):
    error_css_class = 'ui-form-required'
    required_css_class = 'ui-form-required'

    subject = forms.CharField(label='主题', error_messages={
        'required': '主题不能为空',
    })
    email = forms.EmailField(required=False)
    message = forms.CharField(widget=forms.Textarea)


class BlogForm(forms.Form):
    error_css_class = 'ui-form-required'

    title = forms.CharField(label='标题', max_length=100,
                            error_messages={'required': '标题不能为空', 'max_length': '标题长度最多100个字符'})
    keyword = forms.CharField(label='关键字', max_length=40,
                              error_messages={'required': '关键字不能为空', 'max_length': '关键字长度最多40个字符'})
    content = forms.CharField(widget=forms.Textarea, label='内容', max_length=2000,
                              error_messages={'required': '内容不能为空', 'max_length': '内容长度最多40个字符'})