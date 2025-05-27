from django.db import models

class Publisher(models.Model):
    name = models.CharField(max_length=100)
    founded_year = models.IntegerField()

    def __str__(self):
        return self.name

class Platform(models.Model):
    name = models.CharField(max_length=100)
    manufacturer = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Game(models.Model):
    title = models.CharField(max_length=200)
    release_date = models.DateField()
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)
    platforms = models.ManyToManyField(Platform)

    def __str__(self):
        return self.title
