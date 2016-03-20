__author__ = 'qixuanwang'

import json

file = open("data/movieSims.dat")
file2 = open("data/movieSims.json", 'w')

for line in file:
    line = line.replace("\n", '')
    if len(line)>0:
        tokens = line.split(':')
        data = {}
        data['movieId1'] = int(tokens[0])
        data['movieId2'] = int(tokens[1])
        data['similarity'] = float(tokens[2])
        json_str = json.dumps(data)
        print(json_str)
        file2.write(json_str+'\n')

file.close()
file2.close()
