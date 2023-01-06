using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace lab_2
{

        public static class Task
        {
            public enum Alphabets
            { 
                Cyrillic,
                Binary,
                Espan
            }
            public static double EntropyOfAlphabet(Alphabets Alphabet, float errorProbability = 0)
            {
                string alphabet = "";
                string path = "";

                if (Alphabet == Alphabets.Cyrillic)
                {
                    alphabet = "йцукенгґшзхфывапролджэячсмитьбю";//цыганский 
                    path = "cyrillic.txt";
                }
                else if (Alphabet == Alphabets.Binary)
                {
                    alphabet = "01";
                    path = "binary.bin";
                }
                else if (Alphabet == Alphabets.Espan)
                {
                    alphabet = "abcdefghijklmnñopqrstuvwxyz";
                    path = "esp.txt";
                }

                Dictionary<char, int> numberOfOccurrences = new Dictionary<char, int>();
                foreach (var ch in alphabet)
                    numberOfOccurrences.Add(ch, 0);

                using (StreamReader sr = new StreamReader(path))
                {
                    string text = sr.ReadToEnd();
                    text = text.ToLower();
                    foreach (var ch in text.Select((value, i) => new { i, value }))
                    {
                        if (alphabet.Contains(ch.value))
                            numberOfOccurrences[ch.value]++;
                        else
                            text.Remove(ch.i);
                    }

                    double answer = 0;
                    foreach (var ch in alphabet)
                    {
                        if (numberOfOccurrences[ch] != 0)
                        {
                            double P = (double)numberOfOccurrences[ch] / (double)text.Length * (1 - errorProbability);
                            answer += P * Math.Log2(P);
                        }
                    }

                    return -answer;
                }

            }

            public static double ent_error(double p)
            {
                double q = 1 - p;
                double entrop = -p * Math.Log2(p) - q * Math.Log2(q);

                if (p == 0 || q == 0)
                {
                    entrop = 0;
                }
                return 1 - entrop;
            }


            
        }
}

