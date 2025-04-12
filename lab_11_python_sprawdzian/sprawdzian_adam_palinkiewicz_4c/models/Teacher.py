__copyright__ = 'Zespół Szkół Komunikacji'
__author__ = 'Adam Palinkiewicz 4C'

class Teacher:
    def __init__(self, id: int, name: str, surname: str) -> None:
        self._id: int = id
        self.name: str = name
        self.surname: str = surname

    def __str__(self) -> str:
        return f'{self.name} {self.surname}'
