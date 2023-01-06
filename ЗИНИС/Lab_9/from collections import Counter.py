# Huffman Coding in python

def decode_shannon_fano(code, encoded_message):
    decoded_message = ''
    while encoded_message:
        for symbol, symbol_code in code.items():
            if encoded_message.startswith(symbol_code):
                decoded_message += symbol
                encoded_message = encoded_message[len(symbol_code):]
                break
    return decoded_message


def get_percentage_difference(length1, length2):
    difference = abs(length1 - length2)
    max_length = max(length1, length2)
    percentage_difference = difference / max_length * 100
    return percentage_difference
# используем встроенную функцию Counter из модуля collections


string = 'парибок илья александрович'


# Creating tree nodes
class NodeTree(object):

    def __init__(self, left=None, right=None):
        self.left = left
        self.right = right

    def children(self):
        return (self.left, self.right)

    def nodes(self):
        return (self.left, self.right)

    def __str__(self):
        return '%s_%s' % (self.left, self.right)


# Main function implementing huffman coding
def huffman_code_tree(node, left=True, binString=''):
    if type(node) is str:
        return {node: binString}
    (l, r) = node.children()
    d = dict()
    d.update(huffman_code_tree(l, True, binString + '0'))
    d.update(huffman_code_tree(r, False, binString + '1'))
    return d

freq =  {" ": 228,"а":40487008,"б":8051767,"в":22930719,"г":8564640,"д":15052118,"е":42691213,"ё":184928,"ж":4746916,"з":8329904,"и":37153142,"й":6106262,"к":17653469,"л":22230174,"м":16203060,"н":33838881,"о":55414481,"п":14201572,"р":23916825,"с":27627040,"т":31620970,"у":13245712,"ф":1335747,"х":4904176,"ц":2438807,"ч":7300193,"ш":3678738,"щ":1822476,"ъ":185452,"ы":9595941,"ь":8784613,"э":1610107,"ю":3220715,"я":10139085}
freq = sorted(freq.items(), key=lambda x: x[1], reverse=True)

nodes = freq
# nodes =  [("а":40487008),("б":8051767),("в":22930719),("г":8564640),("д":15052118),("е":42691213),("ё":184928),("ж":4746916),("з":8329904),("и":37153142),("й":6106262),("к":17653469),("л":22230174),("м":16203060),("н":33838881),("о":55414481),("п":14201572),("р":23916825),("с":27627040),("т":31620970),("у":13245712),("ф":1335747),("х":4904176),("ц":2438807),("ч":7300193),("ш":3678738),("щ":1822476),("ъ":185452),("ы":9595941),("ь":8784613),("э":1610107),("ю":3220715),("я":10139085)]


while len(nodes) > 1:
    (key1, c1) = nodes[-1]
    (key2, c2) = nodes[-2]
    nodes = nodes[:-2]
    node = NodeTree(key1, key2)
    nodes.append((node, c1 + c2))

    nodes = sorted(nodes, key=lambda x: x[1], reverse=True)

huffmanCode = huffman_code_tree(nodes[0][0])

print(' Char | Huffman code ')
print('----------------------')
for (char, frequency) in freq:
    print(' %-4r |%12s' % (char, huffmanCode[char]))

coded_fio_cirylic = ""


for i in string:
    coded_fio_cirylic += huffmanCode[i]

print(coded_fio_cirylic)
decoded_fio_cyrilic = decode_shannon_fano(huffmanCode, coded_fio_cirylic)
print(decoded_fio_cyrilic)

# # Calculating frequency
freq = {}
for c in string:
    if c in freq:
        freq[c] += 1
    else:
        freq[c] = 1

freq = sorted(freq.items(), key=lambda x: x[1], reverse=True)
nodes = freq


while len(nodes) > 1:
    (key1, c1) = nodes[-1]
    (key2, c2) = nodes[-2]
    nodes = nodes[:-2]
    node = NodeTree(key1, key2)
    nodes.append((node, c1 + c2))

    nodes = sorted(nodes, key=lambda x: x[1], reverse=True)

huffmanCode = huffman_code_tree(nodes[0][0])

print(' Char | Huffman code ')
print('----------------------')
for (char, frequency) in freq:
    print(' %-4r |%12s' % (char, huffmanCode[char]))


coded_fio = ""


for i in string:
    coded_fio += huffmanCode[i]

print(coded_fio)
decoded_fio = decode_shannon_fano(huffmanCode, coded_fio)
print(decoded_fio)

print("Разница длин сообщений: " + str(get_percentage_difference(len(coded_fio_cirylic), len(coded_fio))) + " %")
print("Разница между Хаффмана и ASCII: " + str(get_percentage_difference(len(string)* 8, len(coded_fio))) + " %")
