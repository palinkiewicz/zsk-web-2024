__copyright__ = 'Zespół Szkół Komunikacji'
__author__ = 'Adam Palinkiewicz 4C'

from .Teacher import Teacher

class Subject:
    def __init__(self, id: int, name: str, teacher: Teacher) -> None:
        self._id: int = id
        self.name: str = name
        self.teacher: Teacher = teacher

    def __str__(self) -> str:
        return f'{self.name} {self.teacher}'
