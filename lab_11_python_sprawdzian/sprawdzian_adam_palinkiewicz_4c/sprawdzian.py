__copyright__ = 'Zespół Szkół Komunikacji'
__author__ = 'Adam Palinkiewicz 4C'

import os
import json
from datetime import datetime
from models.Teacher import Teacher
from models.Subject import Subject
from models.Student import Student
from models.Grades import Grades
from year_grade import year_grade

def import_teachers(teachers: list[Teacher], filename: str) -> None:
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file.readlines():
            values = line.split()
            teachers.append(Teacher(int(values[0]), values[1], values[2]))

def import_subjects(subjects: list[Subject], filename: str, teachers: list[Teacher]) -> None:
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file.readlines():
            values = line.split()
            teacher = next((x for x in teachers if x._id == int(values[2])), None)
            if teacher:
                subjects.append(Subject(int(values[0]), values[1], teacher))

def import_students(students: list[Student], filename: str) -> None:
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file.readlines():
            values = line.split()
            birthdate = datetime.strptime(values[3], '%Y-%m-%d').date()
            students.append(Student(int(values[0]), values[1], values[2], birthdate))

def import_grades(grades: list[Grades], filename: str, students: list[Student], subjects: list[Subject]) -> None:
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file.readlines():
            values = line.split()
            student = next((x for x in students if x._id == int(values[0])), None)
            subject = next((x for x in subjects if x._id == int(values[1])), None)
            if student and subject:
                grades.append(Grades(student, subject))
                for grade in values[2].split(','):
                    grades[-1].add_grade(int(grade))

def save_as_json(json_object: dict[str, any], filename: str) -> None:
    with open(filename, "w", encoding="utf-8") as json_file:
        json.dump(json_object, json_file, ensure_ascii=False, indent=4)

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

returned_json: dict[str, dict[str, dict[str, int | float | str]]] = {}

for student in students:
    returned_json[str(student)]: dict = {}
    print(f'\t{student}:')
    for grades_obj in grades:
        if grades_obj.student == student:
            returned_json[str(student)][grades_obj.subject.name]: dict = {
                'Oceny': ', '.join(map(str, grades_obj.get_grades())),
                'Średnia': round(grades_obj.get_average(), 2),
                'Ocena końcowa': year_grade(grades_obj.get_average())
            }
            print(f'\t\t{grades_obj.subject.name}:')
            for key, value in returned_json[str(student)][grades_obj.subject.name].items():
                print(f'\t\t\t{key}: {value}')
    print()

save_as_json(returned_json, os.path.join(current_dir, 'students.json'))
print(''.join('=' for _ in range(50)))

returned_json: dict[str, dict[str, str | float | list[int]]] = {}
for subject in subjects:
    subject_grades: list[int] = [grade for x in grades if x.subject == subject for grade in x.get_grades()]
    returned_json[subject.name]: dict = {
        'Nauczyciel': f'{subject.teacher.name} {subject.teacher.surname}',
        'Oceny': subject_grades,
        'Średnia': round(sum(subject_grades) / len(subject_grades), 2)
    }
    print(f'{subject.name}:')
    for key, value in returned_json[subject.name].items():
        print(f'\t{key}: {', '.join(map(str, value)) if key == 'Oceny' else value}')
    print()

save_as_json(returned_json, os.path.join(current_dir, 'subjects.json'))
