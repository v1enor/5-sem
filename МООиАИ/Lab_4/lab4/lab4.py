def columnMax(payMatrix):
    secondMaxs = []
    column = []

    k = 0
    i = 0
    rowLen = payMatrix[0].__len__()
    while True:
        column.clear()
        for i in range(payMatrix.__len__()):
            column.append(payMatrix[i][k])
        secondMaxs.append(max(column))
        k += 1
        if(k >= rowLen):
            break
    
    return secondMaxs

def rowMins(payMatrix):
    mins = []
    row = []

    for i in range(payMatrix.__len__()):
        row.clear()
        for j in range(payMatrix[i].__len__()):
            row.append(payMatrix[i][j])
        mins.append(min(row))
        
    return mins


def rowMaxs(payMatrix):
    maxs = []
    row = []

    for i in range(payMatrix.__len__()):
        row.clear()
        for j in range(payMatrix[i].__len__()):
            row.append(payMatrix[i][j])
        maxs.append(max(row))

    return maxs

def GurvicCritetia(payMatrix, GurvicCoeff):
    temp = []
    mins = rowMins(payMatrix)
    maxs = rowMaxs(payMatrix)
    for i in range(payMatrix.__len__()):
        temp.append(GurvicCoeff * mins[i] + (1 - GurvicCoeff) * maxs[i])
    
    return temp

def SavageCriteria(payMatrix):
    riskMatrix = []
    riskRow = []
    columnsmax = columnMax(payMatrix)

    for i in range(payMatrix.__len__()):
        riskRow.clear()
        for k in range(payMatrix[i].__len__()):
            riskRow.append(columnsmax[k] - payMatrix[i][k])
        riskMatrix.append(riskRow)
    return rowMaxs(riskMatrix)

    

#Task1
payMatrix = [[0.25, 0.35, 0.4],
             [0.7, 0.2, 0.3],
             [0.35, 0.85, 0.2],
             [0.8, 0.1, 0.35]]
            
q = [0.5, 0.3, 0.2]

expectedWin = []
for i in range(payMatrix.__len__()):
    temp = 0
    for k in range(payMatrix[i].__len__()):
        temp += payMatrix[i][k] * q[k]
    expectedWin.append(temp)

optimizationCriteria = max(expectedWin)
print('Optimal strategy is ' + str(expectedWin.index(optimizationCriteria)) + ' with optimization critetia =  ' + str(optimizationCriteria))

#Task 2
print("-------------------")

payMatrix = [[280, 140, 210, 245],
             [420, 560, 140, 280],
             [245, 315, 350, 490]]

GurvicLambda = 0.4 
mins = rowMins(payMatrix)
ValdCritetia = max(mins)

print('Optimal stategy by Vald Criteria (' + str(ValdCritetia)  + ') is ' + str(mins.index(ValdCritetia) + 1))

gurvic = GurvicCritetia(payMatrix, GurvicLambda)
GurvicCrit = max(gurvic)

print('Optimal stategy by Gurvic Criteria (' + str(GurvicCrit)  + ') is ' + str(gurvic.index(GurvicCrit) + 1))

savage = SavageCriteria(payMatrix)
SavageCrit = min(savage)

print('Optimal stategy by Savage Criteria (' + str(SavageCrit)  + ') is ' + str(savage.index(SavageCrit) + 1))

#Task3
print("--------------------------")

c = 1.1

q = [0.25, 0.15, 0.2, 0.4]

payMatrix = [[4,1,2,5],
             [3,2,0,4],
             [0,3,2,5]]

averageWin = 0
temp = []
for i in range(payMatrix.__len__()):
    summ = 0
    for k in range(payMatrix[i].__len__()):
        summ += payMatrix[i][k] * q[k]
    temp.append(summ)

averageWin = max(temp)
print("Average player win = " + str(averageWin))

bs = columnMax(payMatrix)
b = 0
for i in range(bs.__len__()):
    b += bs[i] * q[i]

if c < (round(b - averageWin, 2)):
    print("The experiment is efficient (" + str(c) + ' < ' + str(round(b - averageWin, 2)) + ')')
else:
    print("The experiment isn't efficient (" + str(c) + ' > ' + str(round(b - averageWin, 2)) + ')')