import time


def bwt(Input, start_time):
    assert "$" not in Input                     # Input string cannot contain $
    Input = Input + "$"                         # Add "$" to the end of the string

    table = [Input[i:] + Input[:i] for i in range(len(Input))]  # Table of rotations of string
    print('table = ', table)

    table = sorted(table)
    print('sorted table = ', table)

    last_column = [row[-1:] for row in table]             # Last characters of each row
    bwt = ''.join(last_column)
    print("--- bwt %s seconds ---" % (time.time() - start_time))
    start_time = time.time()
    ibwt(bwt,start_time)

def ibwt(bwt, start_time):

    table = [""] * len(bwt)  # Make empty table

    for i in range(len(bwt)):
        table = [bwt[i] + table[i] for i in range(len(bwt))]  # Add a column of r
        print('unsorted = ', table)
        table = sorted(table)
        print('sorted    =', table)
        
    inverse_bwt = [row for row in table if row.endswith("$")][0]  # Find the correct row (ending in $)

    inverse_bwt = inverse_bwt.rstrip("$")  # Get rid of start and end markers
    print(inverse_bwt)
    print("--- ibwt %s seconds ---" % (time.time() - start_time))




variant_message = 'песнетворчество'[0:3]
ascii_codes = ''

for ch in  variant_message:
    ascii_codes +=  bin(ord(ch)).lstrip("0b")


list_messages = ['илья', 'парибок','песнетворчество', ascii_codes]
for mes in list_messages:
    start_time = time.time()
    bwt(mes,start_time)


    