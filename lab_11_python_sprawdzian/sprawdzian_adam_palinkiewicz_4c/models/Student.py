from datetime import date, datetime

class Student:
    def __init__(self, id: int, first_name: str, last_name: str, birth_date: date) -> None:
        self._id: int = id
        self.first_name: str = first_name
        self.last_name: str = last_name
        self.birth_date: date = birth_date
    
    def age(self) -> int:
        return datetime.now().year - self.birth_date.year

    def __str__(self) -> str:
        return f'${self.first_name} ${self.last_name} ${self.age()}'
