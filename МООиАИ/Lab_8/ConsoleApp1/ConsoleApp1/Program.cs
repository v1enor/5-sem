using System;
using System.Collections.Generic;
using System.Linq;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("-------------------------Task 1-------------------------");
            Zad1();
            List<(int, int, string)> saveTask1 = result;
            int saveMaxPath = maxPath;
            Zad11();
            Console.WriteLine();
            Console.WriteLine(maxPath-saveMaxPath);
            Console.WriteLine();
            Console.WriteLine("-------------------------Task 2-------------------------");
            result = new List<(int, int, string)>();
            maxPath = 0;
            Zad2();
            Console.WriteLine();
            Console.WriteLine("Task1: "+saveMaxPath+ " Task2: "+maxPath);
            Console.WriteLine("-------------------------Task 3-------------------------");
            for (int i = 0; i < 1000; i++)
            {
                result = new List<(int, int, string)>();
                maxPath = 0;
                Zad3(saveTask1);
            }

            List<(int,string)> resultBarGraph = new List<(int,string)>();
            List<int> saveBarGraph = new List<int>();

            foreach (var item in barGraph)
            {
                if (saveBarGraph.FindAll(x => x == item).Count == 0)
                {
                    string star = "";
                    for (int j = 0; j < barGraph.FindAll(x => x == item).Count; j++)
                    {
                        star += "*";
                    }
                    saveBarGraph.Add(item);
                    resultBarGraph.Add((item,star));
                }
            }

            foreach (var item in resultBarGraph.OrderBy(x=>x.Item1))
            {
                Console.WriteLine(item.Item1+" : "+item.Item2 );
            }

            Console.WriteLine("Вероятность того что < 225 = "+(float)barGraph.FindAll(x=>x<225).Count()/10.0f);
            Console.WriteLine("Вероятность того что < 230 = "+(float)barGraph.FindAll(x=>x<230).Count()/10.0f);
            Console.WriteLine("Вероятность того что < 235 = "+(float)barGraph.FindAll(x=>x<235).Count()/10.0f);
            Console.WriteLine("Вероятность того что < 240 = "+(float)barGraph.FindAll(x=>x<240).Count()/10.0f);
            Console.WriteLine("Вероятность того что < 245 = "+(float)barGraph.FindAll(x=>x<245).Count()/10.0f);
        }


        static int maxPath = 0;
        static List<(int, int, string)> result = new List<(int, int, string)>();

        static List<int> barGraph = new List<int>();

        static int?[,] data1 = { { 0,20,0,20,0,14,0,11,0,17,0,11,0,20,0},
                            { 18,null,11,null,8,null,8,null,16,null,16,null,11,null,9},
                            { 0,12,0,20,0,11,0,12,0,19,0,12,0,8,0},
                            { 14,null,8,null,10,null,9,null,9,null,17,null,10,null,14},
                            { 0,17,0,18,0,10,0,13,0,9,0,14,0,8,0},
                            { 11,null,11,null,8,null,20,null,15,null,13,null,10,null,9},
                            { 0,18,0,15,0,16,0,8,0,17,0,10,0,11,0},
                            { 18,null,8,null,20,null,12,null,17,null,13,null,17,null,10},
                            { 0,14,0,20,0,8,0,12,0,10,0,10,0,11,0},
                            { 14,null,11,null,18,null,14,null,20,null,13,null,14,null,9},
                            { 0,16,0,13,0,17,0,14,0,17,0,12,0,19,0}};

        static int?[,] data2 = { { 0,22,0,15,0,24,0,24,0,16,0,19,0,19,0},
                            { 19,null,15,null,20,null,22,null,21,null,21,null,23,null,22},
                            { 0,22,0,22,0,21,0,24,0,21,0,23,0,17,0},
                            { 23,null,20,null,18,null,20,null,23,null,22,null,19,null,16},
                            { 0,18,0,20,0,17,0,20,0,16,0,18,0,16,0},
                            { 23,null,15,null,18,null,19,null,16,null,18,null,21,null,19},
                            { 0,21,0,23,0,15,0,15,0,18,0,16,0,23,0},
                            { 23,null,19,null,19,null,24,null,16,null,20,null,24,null,23},
                            { 0,15,0,16,0,15,0,21,0,20,0,20,0,18,0},
                            { 23,null,17,null,23,null,15,null,15,null,24,null,15,null,22},
                            { 0,19,0,15,0,23,0,22,0,16,0,16,0,23,0}};

        static int?[,] data3 = { { 0,20,0,20,0,14,0,11,0,17,0,11,0,20,0},
                            { 18,null,11,null,8,null,8,null,16,null,16,null,11,null,9},
                            { 0,12,0,20,0,11,0,12,0,19,0,12,0,8,0},
                            { 14,null,8,null,10,null,9,null,9,null,17,null,10,null,14},
                            { 0,17,0,18,0,10,0,13,0,9,0,14,0,8,0},
                            { 11,null,11,null,8,null,20,null,15,null,13,null,10,null,9},
                            { 0,18,0,15,0,16,0,8,0,17,0,10,0,11,0},
                            { 18,null,8,null,20,null,12,null,17,null,13,null,17,null,10},
                            { 0,14,0,20,0,8,0,12,0,10,0,10,0,11,0},
                            { 14,null,11,null,18,null,14,null,20,null,13,null,14,null,9},
                            { 0,16,0,13,0,17,0,14,0,17,0,12,0,19,0}};

        static int[,] output = { { 41,42,43,44,45,46,47,48},
                                 { 33,34,35,36,37,38,39,40},
                                 { 25,26,27,28,29,30,31,32},
                                 { 17,18,19,20,21,22,23,24},
                                 { 9,10,11,12,13,14,15,16},
                                 { 1,2,3,4,5,6,7,8}};

        static void Zad1()
        {
            for (int i = 0; i < data1.GetLength(0); i++)
            {
                for (int j = 0; j < data1.GetLength(1); j++)
                {
                    Console.Write(data1[i, j] + "\t");
                }
                Console.WriteLine();
            }
            List<(int, int, string)> startList = new List<(int, int, string)>();
            var t = Recursion1(data1.GetLength(0) - 1, 0, startList);
            Console.WriteLine(maxPath);
            foreach (var item in result)
            {
                Console.Write("["+item.Item1+","+item.Item2+"] ->");
            }
            Console.WriteLine();
            foreach (var item in result)
            {
                Console.Write(output[item.Item1/2,item.Item2/2] + "->");
            }
            Console.WriteLine();
        }

        static void Zad11()
        {
            for (int i = 0; i < data1.GetLength(0); i++)
            {
                for (int j = 0; j < data1.GetLength(1); j++)
                {
                    Console.Write(data1[i, j] + "\t");
                }
                Console.WriteLine();
            }
            List<(int, int, string)> startList = new List<(int, int, string)>();
            var t = Recursion11(data1.GetLength(0) - 1, 0, startList);
            Console.WriteLine(maxPath);
            foreach (var item in result)
            {
                Console.Write("[" + item.Item1 + "," + item.Item2 + "] ->");
            }
            Console.WriteLine();
            foreach (var item in result)
            {
                Console.Write(output[item.Item1 / 2, item.Item2 / 2] + "->");
            }
            Console.WriteLine();
        }

        static void Zad2()
        {
            for (int i = 0; i < data2.GetLength(0); i++)
            {
                for (int j = 0; j < data2.GetLength(1); j++)
                {
                    Console.Write(data2[i, j] + "\t");
                }
                Console.WriteLine();
            }
            List<(int, int, string)> startList = new List<(int, int, string)>();
            var t = Recursion2(data2.GetLength(0) - 1, 0, startList);
            Console.WriteLine(maxPath);
            foreach (var item in result)
            {
                Console.Write("[" + item.Item1 + "," + item.Item2 + "] ->");
            }
            Console.WriteLine();
            foreach (var item in result)
            {
                Console.Write(output[item.Item1 / 2, item.Item2 / 2] + "->");
            }
        }

        static void Zad3(List<(int, int, string)> plan)
        {
            Random random = new Random();
            for (int i = 0; i < data3.GetLength(0); i+=1)
            {
                for (int j = i%2==0?1:0; j < data3.GetLength(1); j+=2)
                {
                    data3[i, j] = random.Next(18, 24);
                }
            }

            int sum = 0;

            for (int i = 0; i < plan.Count; i++)
            {
                if (plan[i].Item3 == "u")
                {
                    sum += (int)data3[plan[i].Item1 - 1, plan[i].Item2];
                }
                if (plan[i].Item3 == "r")
                {
                    sum += (int)data3[plan[i].Item1, plan[i].Item2 + 1];
                }
            }

            //foreach (var item in plan)
            //{
            //    if (item.Item3 == "u")
            //        Console.Write(data3[item.Item1 - 1, item.Item2] + "->");
            //    else if (item.Item3 == "r")
            //        Console.Write(data3[item.Item1, item.Item2+1] + "->");
            //}
            barGraph.Add(sum);
        }

        static (int, List<(int, int, string)>) Recursion1(int i, int j, List<(int, int, string)> parentPath)
        {
            if (i != 0)
            {
                List<(int, int,string)> currentPath = new List<(int, int,string)>();
                foreach (var item in parentPath)
                {
                    currentPath.Add(item);
                }
                currentPath.Add((i, j,"u"));
                (int, List<(int, int, string)>) t = Recursion1(i-2,j,currentPath);
            }

            if (j != data1.GetLength(1) - 1)
            {
                List<(int, int, string)> currentPath = new List<(int, int, string)>();
                foreach (var item in parentPath)
                {
                    currentPath.Add(item);
                }
                currentPath.Add((i, j, "r"));;
                (int, List<(int, int, string)>) t = Recursion1(i, j+2, currentPath);
            }

            if (i==0 && j==data1.GetLength(1)-1)
            {
                int calc = Calculate1(parentPath);
                parentPath.Add((0, data1.GetLength(1) - 1,""));
                if (maxPath==0)
                {
                    maxPath = calc;
                    result = parentPath;
                }
                else if(calc<maxPath)
                {
                    maxPath = calc;
                    result = parentPath;
                }
            }

            return (maxPath, parentPath);
        }

        static (int, List<(int, int, string)>) Recursion11(int i, int j, List<(int, int, string)> parentPath)
        {
            if (i != 0)
            {
                List<(int, int, string)> currentPath = new List<(int, int, string)>();
                foreach (var item in parentPath)
                {
                    currentPath.Add(item);
                }
                currentPath.Add((i, j, "u"));
                (int, List<(int, int, string)>) t = Recursion11(i - 2, j, currentPath);
            }

            if (j != data1.GetLength(1) - 1)
            {
                List<(int, int, string)> currentPath = new List<(int, int, string)>();
                foreach (var item in parentPath)
                {
                    currentPath.Add(item);
                }
                currentPath.Add((i, j, "r")); ;
                (int, List<(int, int, string)>) t = Recursion11(i, j + 2, currentPath);
            }

            if (i == 0 && j == data1.GetLength(1) - 1)
            {
                int calc = Calculate1(parentPath);
                parentPath.Add((0, data1.GetLength(1) - 1, ""));
                if (maxPath == 0)
                {
                    maxPath = calc;
                    result = parentPath;
                }
                else if (calc > maxPath)
                {
                    maxPath = calc;
                    result = parentPath;
                }
            }

            return (maxPath, parentPath);
        }

        static int Calculate1(List<(int, int, string)> path)
        {
            int result = 0;

            for (int i = 0; i < path.Count; i++)
            {
                if(path[i].Item3=="u")
                {
                    result += (int)data1[path[i].Item1-1, path[i].Item2];
                }
                if (path[i].Item3 == "r")
                {
                    result += (int)data1[path[i].Item1, path[i].Item2+1];
                }
            }

            return result;
        }


        static (int, List<(int, int, string)>) Recursion2(int i, int j, List<(int, int, string)> parentPath)
        {
            if (i != 0)
            {
                List<(int, int, string)> currentPath = new List<(int, int, string)>();
                foreach (var item in parentPath)
                {
                    currentPath.Add(item);
                }
                currentPath.Add((i, j, "u"));
                (int, List<(int, int, string)>) t = Recursion2(i - 2, j, currentPath);
            }

            if (j != data1.GetLength(1) - 1)
            {
                List<(int, int, string)> currentPath = new List<(int, int, string)>();
                foreach (var item in parentPath)
                {
                    currentPath.Add(item);
                }
                currentPath.Add((i, j, "r")); ;
                (int, List<(int, int, string)>) t = Recursion2(i, j + 2, currentPath);
            }

            if (i == 0 && j == data1.GetLength(1) - 1)
            {
                int calc = Calculate2(parentPath);
                parentPath.Add((0, data1.GetLength(1) - 1, ""));
                if (maxPath == 0)
                {
                    maxPath = calc;
                    result = parentPath;
                }
                else if (calc < maxPath)
                {
                    maxPath = calc;
                    result = parentPath;
                }
            }

            return (maxPath, parentPath);
        }

        static int Calculate2(List<(int, int, string)> path)
        {
            int result = 0;

            for (int i = 0; i < path.Count; i++)
            {
                if (path[i].Item3 == "u")
                {
                    result += (int)data2[path[i].Item1 - 1, path[i].Item2];
                }
                if (path[i].Item3 == "r")
                {
                    result += (int)data2[path[i].Item1, path[i].Item2 + 1];
                }
            }

            return result;
        }
    }
}
