# -*- coding: utf-8 -*-
__author__ = '刘少平'
from django import forms


class BaseForm(forms.Form):
    def as_div(self):
        "Returns this form rendered as HTML <li>s -- excluding the <ul></ul>."
        return self._html_output(
            normal_row='<div%(html_class_attr)s>%(errors)s%(label)s %(field)s%(help_text)s</div>',
            error_row='<div>%s</div>',
            row_ender='</div>',
            help_text_html=' <span class="helptext">%s</span>',
            errors_on_separate_row=False)


class ContactForm(BaseForm):
    error_css_class = 'ui-form-required'
    required_css_class = 'ui-form-required'

    subject = forms.CharField(label='主题', error_messages={
        'required': '主题不能为空',
    })
    email = forms.EmailField(required=False)
    message = forms.CharField(widget=forms.Textarea)