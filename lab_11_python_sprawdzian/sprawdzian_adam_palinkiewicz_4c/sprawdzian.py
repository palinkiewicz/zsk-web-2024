import os
from datetime import datetime
from models.Teacher import Teacher
from models.Subject import Subject
from models.Student import Student
from models.Grades import Grades
from year_grade import year_grade

def import_teachers(teachers: list[Teacher], filename: str):
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file.readlines():
            values = line.split()
            teachers.append(Teacher(int(values[0]), values[1], values[2]))

def import_subjects(subjects: list[Subject], filename: str, teachers: list[Teacher]):
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file.readlines():
            values = line.split()
            teacher = next((x for x in teachers if x._id == int(values[2])), None)
            if teacher:
                subjects.append(Subject(int(values[0]), values[1], teacher))

def import_students(students: list[Student], filename: str):
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file.readlines():
            values = line.split()
            birthdate = datetime.strptime(values[3], '%Y-%m-%d').date()
            students.append(Student(int(values[0]), values[1], values[2], birthdate))

def import_grades(grades: list[Grades], filename: str, students: list[Student], subjects: list[Subject]):
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file.readlines():
            values = line.split()
            student = next((x for x in students if x._id == int(values[0])), None)
            subject = next((x for x in subjects if x._id == int(values[1])), None)
            if student and subject:
                grades.append(Grades(student, subject))
                for grade in values[2].split(','):
                    grades[-1].add_grade(int(grade))

current_dir = os.path.dirname(os.path.abspath(__file__))

teachers: list[Teacher] = []
subjects: list[Subject] = []
students: list[Student] = []
grades: list[Grades] = []

import_teachers(teachers, os.path.join(current_dir, 'teachers.txt'))
import_subjects(subjects, os.path.join(current_dir, 'subjects.txt'), teachers)
import_students(students, os.path.join(current_dir, 'students.txt'))
import_grades(grades, os.path.join(current_dir, 'grades.txt'), students, subjects)

print('Oceny i średnie poszczególnych uczniów')

for student in students:
    print(f'\t{student}:')
    for grades_obj in grades:
        if grades_obj.student == student:
            print(f'\t\t{grades_obj.subject.name}:')
            print(f'\t\t\tOceny: {', '.join(map(str, grades_obj.get_grades()))}')
            print(f'\t\t\tŚrednia: {round(grades_obj.get_average(), 2)}')
            print(f'\t\t\tOcena końcowa: {year_grade(grades_obj.get_average())}')
    print()
