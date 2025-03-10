from typing import List, Optional

class Course:
    def __init__(self, name: str):
        self.name: str = name

class Student:
    def __init__(self, line: str):
        id, name, surname, age = line.strip().split(',')
        self.id: int = int(id)
        self.name: str = name
        self.surname: str = surname
        self.age: int = int(age)
        self.courses: List[Course] = []
    
    def add_course(self, course: Course):
        self.courses.append(course)
    
    def save_to_file(self):
        file = open('output/' + self.name + '_' + self.surname + '.txt', 'w')
        file.write('Kursy:')
        for course in self.courses:
            file.write('\n - ' + course.name)
    
    def __repr__(self) -> str:
        return f"{self.name} {self.surname} ({self.age} lat): {', '.join([c.name for c in self.courses])}"

def find_student(students: List[Student], id: int) -> Optional[Student]:
    for s in students:
        if s.id == id:
            return s
    return None

def load_students(filename: str) -> List[Student]:
    return list(map(Student, list(filter(lambda x: x != '', open(filename, 'r', encoding='utf-8').readlines()))))

def load_courses(filename: str, students: List[Student]) -> None:
    with open(filename, 'r', encoding='utf-8') as file:
        for line in list(filter(lambda x: x != '', file.readlines())):
            id, name = line.strip().split(',')
            find_student(students, int(id)).add_course(Course(name))

def main():
    students = load_students("data/students.txt")
    print(students)
    load_courses("data/courses.txt", students)

    for student in students:
        print(student)
        student.save_to_file()

if __name__ == "__main__":
    main()
