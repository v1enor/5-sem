using System;
using System.Linq;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            Random random = new Random();

            double[,] integralProbability = { { 0, 0 }, { 0.7, 1 }, { 0.82, 2 }, { 0.98, 3 } };

            int countRack = 2;
            int countLenght = 2021;
            double[] randomNumber = new double[countLenght];
            int[] countClient = new int[countLenght];
            int[] countClientInQueue = new int[countLenght];
            int[] countClientServed = new int[countLenght];
            int[] countClientWaiting = new int[countLenght];

            for (int i = 0; i < countLenght; i++)
            {
                randomNumber[i] = random.NextDouble();
            }

            countClientInQueue[0] = 0;
            countClientServed[0] = 0;
            countClientWaiting[0] = 0;

            for (int i = 0; i < countLenght; i++)
            {
                for (int j = 0; j < integralProbability.GetLength(0); j++)
                {
                    if (randomNumber[i] > integralProbability[j, 0])
                    {
                        countClient[i] = (int)integralProbability[j, 1];
                    }
                }
            }

            countClientInQueue[0] = 0;
            for (int i = 1; i < countLenght; i++)
            {
                countClientInQueue[i] = countClient[i] + countClientWaiting[i - 1];

                countClientServed[i] = countRack < countClientInQueue[i] ? countRack : countClientInQueue[i];

                countClientWaiting[i] = countClientInQueue[i] - countClientServed[i];
            }

            Console.Write("Инт\t");
            Console.Write("Случайное число\t");
            Console.Write("Кол прибыв\t");
            Console.Write("Кол в очереди\t\t");
            Console.Write("Обслуж клиентов\t\t");
            Console.Write("Ожид клиентов\t\t");
            Console.WriteLine();

            int sum1 = 0;
            int sum2 = 0;
            int sum3 = 0;
            int sum4 = 0;
            int max1 = 0;
            int max2 = 0;
            int max3 = 0;
            int max4 = 0;

            for (int i = 0; i < countLenght; i++)
            {
                sum1 += countClient[i];
                sum2 += countClientInQueue[i];
                sum3 += countClientServed[i];
                sum4 += countClientWaiting[i];
                max1 = countClient[i] > max1 ? countClient[i] : max1;
                max2 = countClientInQueue[i] > max2 ? countClientInQueue[i] : max2;
                max3 = countClientServed[i] > max3 ? countClientServed[i] : max3;
                max4 = countClientWaiting[i] > max4 ? countClientWaiting[i] : max4;

                Console.Write(i + "\t");
                Console.Write(Math.Round(randomNumber[i],7).ToString().PadLeft(10,' ') + "\t");
                Console.Write(countClient[i] + "\t\t");
                Console.Write(countClientInQueue[i] + "\t\t\t");
                Console.Write(countClientServed[i] + "\t\t\t");
                Console.Write(countClientWaiting[i] + "\t\t\t");
                Console.WriteLine();
            }

            Console.WriteLine($"\tMax\t\t{max1}\t\t{max2}\t\t\t{max3}\t\t\t{max4}");
            Console.WriteLine($"\tSum\t\t{sum1}\t\t{sum2}\t\t\t{sum3}\t\t\t{sum4}");
            Console.WriteLine($"\tAvg\t\t{Math.Round((double)sum1/(countLenght-1),7)}\t{Math.Round((double)sum2 /(countLenght-1),7)}\t\t" +
                $"{Math.Round((double)sum3 /(countLenght-1),7)}\t\t{Math.Round((double)sum4 /(countLenght-1),7)}");

        }
    }
}
