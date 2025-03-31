from typing import List

def read_graph(filename: str) -> List[List[int]]:
    file = open(filename)
    neighbors_list = [None for _ in range(int(file.readline()))]

    for i in range(len(neighbors_list)):
        record = list(map(int, file.readline().split(' ')))
        neighbors_list[record[0]] = record[1::]
    return neighbors_list

def write_neighbors_list(neighbors_list: List[List[int]]) -> None:
    for i in range(0, len(neighbors_list)):
        print(f'Sąsiadami wierzchołka {i} są: {', '.join(map(str, neighbors_list[i]))}')

def list_to_matrix(neighbors_list: List[List[int]]) -> List[List[int]]:
    matrix = []
    for i in range(0, len(neighbors_list)):
        matrix.append([])
        for j in range(0, len(neighbors_list)):
            matrix[i].append(1 if j in neighbors_list[i] else 0)
    return matrix

def write_matrix(matrix: List[List[int]]) -> None:
    print('\n'.join(map(lambda x: ' '.join(map(str, x)), matrix)))

def main():
    neighbors_list = read_graph('./graph.txt')
    write_neighbors_list(neighbors_list)
    matrix = list_to_matrix(neighbors_list)
    write_matrix(matrix)

main()
