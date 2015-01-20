from django.shortcuts import render_to_response
from django.http import HttpResponse, HttpResponseRedirect

from blog.forms import ContactForm

# Create your views here.


def index(request):
    return render_to_response("blog/index.html")


def info(request):
    values = request.META.items()
    html = []
    for k, v in values:
        html.append('<tr><td>%s</td><td>%s</td></tr>' % (k, v))
    return HttpResponse('<table>%s</table>' % '\n'.join(html))


def info2(request):
    values = request.META.items()
    # html = ""
    # for k, v in values:
    #     html.append((str(k), str(v)))
    return render_to_response('blog/meta.html', {'metas': values})


def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            print('contactForm is valid')
            cd = form.cleaned_data
            for k, v in cd.items():
                print('%s: %s' % (k, v))
            return HttpResponseRedirect(request.path)
    else:
        form = ContactForm()
    return render_to_response("blog/contact.html", {'form': form})