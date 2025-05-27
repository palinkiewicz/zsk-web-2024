from django.contrib import admin
from .models import Game, Publisher, Platform

admin.site.register(Game)
admin.site.register(Publisher)
admin.site.register(Platform)
