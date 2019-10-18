import csv, json

filePath = input("Path to file: ")
sourceText = open(filePath, "r")


with open(filePath, "r") as sourceText:

    batch = {}
    batch['startDate'] = sourceText.readline().split('\t')[1][0:-1]
    batch['endDate'] = sourceText.readline().split('\t')[1][0:-1]
    batch['origin'] = sourceText.readline().split('\t')[1][0:-1]
    batch['currency'] = sourceText.readline().split('\t')[1][0:-1]
    batch['trackList'] = []
    next(sourceText)
    reader = csv.reader(sourceText, delimiter='\t')
    for line in reader:
        trackData = {}
        trackData['quantity'] = line[3]
        trackData['royalty'] = line[4]
        trackData['royaltyTotal'] = line[5]
        trackData['isrc'] = line[6]
        trackData['item_title']=line[7]
        trackData['item_artist']=line[8]
        batch['trackList'].append(trackData)


print('yeahboi')

outFile = open("Apple_Streams_S1_80032046_1117_AU_for 201710_example.json", "w+")
outFile.write(json.dumps(batch))
outFile.close()