def build_shannon_fano_tree(symbols, frequencies):
    if len(symbols) == 1:
        return (symbols[0], '')
    else:
        frequencies = list(frequencies)
        total_frequency = sum(frequencies)
        half_frequency = total_frequency / 2
        cumulative_frequency = 0
        left_side = []
        left_frequencies = []
        right_side = []
        right_frequencies = []
        for i in range(len(symbols)):
            symbol = symbols[i]
            frequency = frequencies[i]
            if cumulative_frequency + frequency <= half_frequency:
                left_side.append(symbol)
                left_frequencies.append(frequency)
                cumulative_frequency += frequency
            else:
                right_side.append(symbol)
                right_frequencies.append(frequency)
        left_branch = build_shannon_fano_tree(left_side, left_frequencies)
        right_branch = build_shannon_fano_tree(right_side, right_frequencies)
        return (left_branch, right_branch)


def build_shannon_fano_code(tree, prefix=''):
    if isinstance(tree, tuple):
        left_branch, right_branch = tree
        left_code = build_shannon_fano_code(left_branch, prefix + '0')
        right_code = build_shannon_fano_code(right_branch, prefix + '1')
        return {**left_code, **right_code}
    else:
        return {tree: prefix}


def shannon_fano(symbols, frequencies):
    tree = build_shannon_fano_tree(symbols, frequencies)
    code = build_shannon_fano_code(tree)
    return code


def get_char_frequency(s):
    # создаем словарь, где каждому символу ставим в соответствие его частоту
    char_frequency = {}
    for c in s:
        if c in char_frequency:
            char_frequency[c] += 1
        else:
            char_frequency[c] = 1

    return char_frequency


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


FIO = "парибок илья александрович"
sorted_fio = dict(sorted(get_char_frequency(FIO).items(),
                  key=lambda x: x[1], reverse=True))
print(sorted_fio)

symbols = list(sorted_fio.keys())
frequencies = list(sorted_fio.values())
code = shannon_fano(symbols, frequencies)

print(code)
coded_fio = ""


for i in FIO:
    coded_fio += code[i]

print(coded_fio)

decoded_fio = decode_shannon_fano(code, coded_fio)
print(decoded_fio)


cirylic = {" ": 228, "а": 40487008, "б": 8051767, "в": 22930719, "г": 8564640, "д": 15052118, "е": 42691213, "ё": 184928, "ж": 4746916, "з": 8329904, "и": 37153142, "й": 6106262, "к": 17653469, "л": 22230174, "м": 16203060, "н": 33838881, "о": 55414481,
           "п": 14201572, "р": 23916825, "с": 27627040, "т": 31620970, "у": 13245712, "ф": 1335747, "х": 4904176, "ц": 2438807, "ч": 7300193, "ш": 3678738, "щ": 1822476, "ъ": 185452, "ы": 9595941, "ь": 8784613, "э": 1610107, "ю": 3220715, "я": 10139085}

symbols_cirylic = list(cirylic.keys())
frequencies_cirylic = list(cirylic.values())
code_cirylic = shannon_fano(symbols_cirylic, frequencies_cirylic)

print(code)
coded_fio_cirylic = ""


for i in FIO.lower():
    coded_fio_cirylic += code_cirylic[i]

print(coded_fio_cirylic)

decoded_fio_irylic = decode_shannon_fano(code_cirylic, coded_fio_cirylic)
print(decoded_fio_irylic)

print("Разница между динамическим и статическим русским алфавитом: " +
      str(get_percentage_difference(len(coded_fio_cirylic), len(coded_fio))) + " %")
print("Разница между Шеннона и ASCII: " +
      str(get_percentage_difference(len(FIO) * 8, len(coded_fio))) + " %")
