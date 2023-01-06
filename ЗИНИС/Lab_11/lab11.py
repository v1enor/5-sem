from decimal import Decimal

class ENCODER:

    def __init__(self, frequency_table):
        self.probability_table = self.get_probability_table(frequency_table)

    def get_probability_table(self, frequency_table):
        total_frequency = sum(list(frequency_table.values()))

        probability_table = {}
        for key, value in frequency_table.items():
            probability_table[key] = value/total_frequency

        return probability_table

    def get_encoded_value(self, encoder):

        last_stage = list(encoder[-1].values())
        last_stage_values = []
        for sublist in last_stage:
            for element in sublist:
                last_stage_values.append(element)

        last_stage_min = min(last_stage_values)
        last_stage_max = max(last_stage_values)

        return (last_stage_min + last_stage_max)/2

    def process_stage(self, probability_table, stage_min, stage_max):

        stage_probs = {}
        stage_domain = stage_max - stage_min
        for term_idx in range(len(probability_table.items())):
            term = list(probability_table.keys())[term_idx]
            term_prob = Decimal(probability_table[term])
            cum_prob = term_prob * stage_domain + stage_min
            stage_probs[term] = [stage_min, cum_prob]
            stage_min = cum_prob
        return stage_probs

    def encode(self, msg, probability_table):
        encoder = []

        stage_min = Decimal(0.0)
        stage_max = Decimal(1.0)

        for msg_term_idx in range(len(msg)):
            stage_probs = self.process_stage(probability_table, stage_min, stage_max)

            msg_term = msg[msg_term_idx]
            stage_min = stage_probs[msg_term][0]
            stage_max = stage_probs[msg_term][1]
            print(msg_term,stage_min,stage_max)
            encoder.append(stage_probs)

        stage_probs = self.process_stage(probability_table, stage_min, stage_max)
        encoder.append(stage_probs)

        encoded_msg = self.get_encoded_value(encoder)

        return encoder, encoded_msg

    def decode(self, encoded_msg, msg_length, probability_table):

        decoder = []
        decoded_msg = ""

        stage_min = Decimal(0.0)
        stage_max = Decimal(1.0)

        for idx in range(msg_length):
            stage_probs = self.process_stage(probability_table, stage_min, stage_max)

            for msg_term, value in stage_probs.items():
                if encoded_msg >= value[0] and encoded_msg <= value[1]:
                    break

            decoded_msg = decoded_msg + msg_term
            stage_min = stage_probs[msg_term][0]
            stage_max = stage_probs[msg_term][1]
            print(decoded_msg,stage_min,stage_max)
            decoder.append(stage_probs)

        stage_probs = self.process_stage(probability_table, stage_min, stage_max)
        decoder.append(stage_probs)

        return decoder, decoded_msg

def get_char_frequency(s):
    # создаем словарь, где каждому символу ставим в соответствие его частоту
    char_frequency = {}
    for c in s:
        if c in char_frequency:
            char_frequency[c] += 1
        else:
            char_frequency[c] = 1

    return char_frequency





def results(msg):
    original_msg = msg
    AE = ENCODER(get_char_frequency(original_msg))

    print("Сообщение: {msg}".format(msg=original_msg))

    encoder, encoded_msg = AE.encode(msg=original_msg,
                                    probability_table=AE.probability_table)
    print("Закодированое сообщение: {msg}".format(msg=encoded_msg))

    decoder, decoded_msg = AE.decode(encoded_msg=encoded_msg,
                                    msg_length=len(original_msg),
                                    probability_table=AE.probability_table)
    print("Декодированное сообщение: {msg}".format(msg=decoded_msg))


results("шалаш")
results("песнетворчествосеменохранилище")