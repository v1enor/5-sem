using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace _5
{
    class Program : Methods
    {
       
        static void Main()
        {
            Console.OutputEncoding = Encoding.UTF8;
            //Создание слово
            Console.WriteLine("Информационное слово Xk");
            int k = 40;
            byte[] baseWord = new byte[k];
            for (int i = 0; i < k; i++)
            {
                baseWord[i] = (byte)(rand.Next(0, 2));
            }
            ShowWord(baseWord);


            //Создание двумерной матрицы
            Console.WriteLine("Двумерная матрица");
            int k1 = 5;
            int k2 = 8;
            byte[,] baseMatrix = CreateMatrix(k1, k2);


            byte[] fullWord = ActionsForTwoDimensialMatrix(baseWord, baseMatrix);


            //Задание ошибок
            Console.WriteLine();
            Console.WriteLine("Задание ошибок");
            int countMistakes = 2;
            byte[] fullWordWithMistakes = CreateMistake(fullWord, k, countMistakes);
            ShowWord(fullWordWithMistakes);
            Console.WriteLine();

            //Повторение операции для слова с ошибкой
            Console.WriteLine("Повторение операции для слова с ошибкой");
            byte[] wordWithMistakes = new byte[k];
            Array.Copy(fullWordWithMistakes, wordWithMistakes, k);
            byte[] newfullWord = ActionsForTwoDimensialMatrix(wordWithMistakes, baseMatrix);


            //Поиск ошибок для 2 паритета
            Console.WriteLine();
            Console.WriteLine("Поиск ошибок для 2 паритета");
            byte[] twoParitiesWithMistakes = new byte[k1 + k2];
            Array.Copy(fullWordWithMistakes, k, twoParitiesWithMistakes, 0, k1 + k2);
            byte[] newTwoParities = new byte[k1 + k2];
            Array.Copy(newfullWord, k, newTwoParities, 0, k1 + k2);

            FindMistakesWithTwoParities(k1, k2, twoParitiesWithMistakes, newTwoParities);


            //Поиск ошибок 3 паритета
            Console.WriteLine();
            Console.WriteLine("Поиск ошибок для 3 паритета");
            byte[] threeParitiesWithMistakes = new byte[k1 + k2 + k1];
            Array.Copy(fullWordWithMistakes, k, threeParitiesWithMistakes, 0, k1 + k2 + k1);
            byte[] newThreeParities = new byte[k1 + k2 + k1];
            Array.Copy(newfullWord, k, newThreeParities, 0, k1 + k2 + k1);

            FindMistakesWithThreeParities(k1, k2, k1, threeParitiesWithMistakes, newThreeParities);


            Console.ReadLine();

            Console.WriteLine("3хмерная матрица");


            //создаём матрицу 3-мерную
            Console.WriteLine("Создание матрицы");
            k1 = 2;
            k2 = 10;
            int z = 2;
            byte[,,] baseMatrixTriple = CreateMatrix(k1, k2, z);


            fullWord = ActionsForThreeDimensialMatrix(baseWord, baseMatrixTriple);


            //задаём ошибки
            Console.WriteLine();
            Console.WriteLine("Задание ошибки");
            countMistakes = 4;
            byte[] fullWordWithMistakesThree = CreateMistake(fullWord, k, countMistakes);
            ShowWord(fullWordWithMistakesThree);
            Console.WriteLine();

            //повторяем операции для слова с ошибкой
            Console.WriteLine("Повторение операции для слова с ошибкой");
            byte[] wordWithMistakesThree = new byte[k];
            Array.Copy(fullWordWithMistakesThree, wordWithMistakesThree, k);
            byte[] newfullWordThree = ActionsForThreeDimensialMatrix(wordWithMistakesThree, baseMatrixTriple);


            ////ищем ошибки 2 паритета
            //Console.WriteLine();
            //Console.WriteLine("Поиск ошибки 2 паритета");
            //byte[] twoParitiesWithMistakesThree = new byte[
            //    (k1 * k2) + (k2 * z)];
            //Array.Copy(fullWordWithMistakesThree, k, twoParitiesWithMistakesThree, 0,
            //    twoParitiesWithMistakesThree.Length);
            //newTwoParities = new byte[
            //    (k1 * k2) + (k2 * z)];
            //Array.Copy(newfullWordThree, k, newTwoParities, 0,
            //    newTwoParities.Length);

            //FindMistakesWithTwoParitiesThree(k1, k2, z, twoParitiesWithMistakesThree, newTwoParities);


            ////ищем ошибки 3 паритета
            //Console.WriteLine();
            //Console.WriteLine("Поиск ошибки для 3 паритета");
            //byte[] threeParitiesWithMistakesThree = new byte[
            //    (k1 * k2) + (k2 * z) + (k1 * z)];
            //Array.Copy(fullWordWithMistakesThree, k, threeParitiesWithMistakesThree, 0,
            //    threeParitiesWithMistakesThree.Length);
            //newThreeParities = new byte[
            //    (k1 * k2) + (k2 * z) + (k1 * z)];
            //Array.Copy(newfullWordThree, k, newThreeParities, 0,
            //    newThreeParities.Length);

            //FindMistakesWithThreeParitiesThree(k1, k2, z, threeParitiesWithMistakesThree, newThreeParities);


            //ищем ошибки 4 паритета
            Console.WriteLine();
            Console.WriteLine("Поиск ошибки для 4 паритета");
            byte[] fourParitiesWithMistakes = new byte[
                (k1 * k2) + (k2 * z) + (k1 * z) + (k1 * z)];
            Array.Copy(fullWordWithMistakesThree, k, fourParitiesWithMistakes, 0,
                fourParitiesWithMistakes.Length);
            byte[] newFourParities = new byte[
                (k1 * k2) + (k2 * z) + (k1 * z) + (k1 * z)];
            Array.Copy(newfullWordThree, k, newFourParities, 0,
                newFourParities.Length);

            FindMistakesWithFourParitiesThree(k1, k2, z, fourParitiesWithMistakes, newFourParities);


            //ищем ошибки 5 паритета
            //Console.WriteLine();
            //Console.WriteLine("Поиск ошибки для 5 паритета");
            //byte[] fiveParitiesWithMistakes = new byte[
            //    (k1 * k2) + (k2 * z) + (k1 * z) + (k1 * z) + (k1 * z)];
            //Array.Copy(fullWordWithMistakesThree, k, fiveParitiesWithMistakes, 0,
            //    fiveParitiesWithMistakes.Length);
            //byte[] newFiveParities = new byte[
            //    (k1 * k2) + (k2 * z) + (k1 * z) + (k1 * z) + (k1 * z)];
            //Array.Copy(newfullWordThree, k, newFiveParities, 0,
            //    newFiveParities.Length);

            //FindMistakesWithFiveParitiesThree(k1, k2, z, fiveParitiesWithMistakes, newFiveParities);

            Console.ReadLine();
        }
    }
}
