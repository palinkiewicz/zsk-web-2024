lines = list(map(lambda x: x.replace('\n', ''), open('sygnaly.txt').readlines()))
z41 = ''

for i in range(39, len(lines), 40):
    z41 += lines[i][9]

z42 = [0]
z43 = lines.copy()

for i in range(0, len(lines) - 1):
    cnt = 0
    words = []

    for j in range(0, len(lines[i])):
        if lines[i][j] not in words:
            cnt += 1
            words.append(lines[i][j])

        for k in range(j + 1, len(lines[i])):
            if abs(ord(lines[i][j]) - ord(lines[i][k])) > 10 and lines[i] in z43:
                z43.remove(lines[i])
    
    if cnt > z42[0]:
        z42 = [cnt, lines[i]]

output = open('wyniki4.txt', 'w')

output.write('4.1:')
output.write(z41)
output.write('\n4.2:')
output.write(z42[1] + ' ' + str(z42[0]))
output.write('\n4.3:')
for word in z43:
    output.write(word + '\n')
