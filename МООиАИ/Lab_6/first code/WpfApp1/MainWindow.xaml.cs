using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;

namespace WpfApp1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public static List<StructZad1> listZad1 = new List<StructZad1>();
        public static List<StructZad1> listZad2 = new List<StructZad1>();
        public static List<StructZad1> listZad3 = new List<StructZad1>();
        public static List<StructZad1> listZad4 = new List<StructZad1>();
        public static List<StructZad1> listZad5 = new List<StructZad1>();
        public static List<StructZad1> listZad6 = new List<StructZad1>();
        public MainWindow()
        {
            InitializeComponent();
            
            FunctionZad2();
            FunctionZad3();
        }

        

        public void FunctionZad2()
        {
            double[] fullTechnicalCast = { 0.25,0.7, 0.35, 0.8 };
            double[] fullCastProduct1 = { 0.35, 0.2, 0.85, 0.1 };
            double[] fullCastProduct2 = { 0.4, 0.3, 0.2, 0.35 };
            double[] fullCastProduct3 = { 0.5, 0.3, 0.2,0 };

                listZad2.Add(new StructZad1()
                {
                    
                    B1 = 20.ToString(),
                    B2 = 22.ToString(),
                    B3 = 4.ToString(),
                    B4 = 2.ToString(),
                    B5 = 12.ToString(),
                    B6 = 10.ToString(),
                    B7 = 10.ToString(),
                    B8 = 10.ToString(),
                    B9 = 14.ToString(),
                    B10 = 4.ToString(),
                    B11 = 4.ToString(),
                    B12 = 6.ToString(),
                    B13 = 6.ToString(),
                    B14 = 14.ToString(),
                    B15 = 4.ToString(),
                    B16 = 16.ToString()
                }) ;

            listZad1.Add(new StructZad1()
            {
                Line = 26.ToString(),
                B1 = 4.ToString(),
                B2 = 22.ToString(),
                B3 = 4.ToString(),
                B4 = 2.ToString(),
                B5 = 2.ToString(),
                B6 = 0.ToString(),
                B7 = 10.ToString(),
                B8 = 0.ToString(),
                B9 = 14.ToString(),
                B10 = 0.ToString(),
                B11 = 2.ToString(),
                B12 = 4.ToString(),
                B13 = 0.ToString(),
                B14 = 6.ToString(),
                B15 = 4.ToString(),
                B16 = 16.ToString()
            });
            Zad2.ItemsSource = listZad2;
            Zad.ItemsSource = listZad1;

            listZad3.Add(new StructZad1()
            {

                B1 = 12.ToString(),
                B2 = 14.ToString(),
                B3 = 5.ToString(),
                B4 = 4.ToString(),
                B5 = 9.ToString(),
                B6 = 2.ToString(),
                B7 = 5.ToString(),
                B8 = 5.ToString(),
                B9 = 12.ToString()
            });

            listZad4.Add(new StructZad1()
            {
                Line = 385.ToString(),
                B1 = 14.ToString(),
                B2 = 6.ToString(),
                B3 = 0.ToString(),
                B4 = 4.ToString(),
                B5 = 10.ToString(),
                B6 = 1.ToString(),
                B7 = 5.ToString(),
                B8 = 0.ToString(),
                B9 = 0.ToString()
            });
            Zad3.ItemsSource = listZad4;
            Zad4.ItemsSource = listZad3;

            listZad5.Add(new StructZad1()
            {

                B1 = 24.ToString(),
                B2 = 20.ToString(),
                B3 = 14.ToString(),
                B4 = 12.ToString(),
                B5 = 30.ToString(),
                B6 = 10.ToString(),
                B7 = 12.ToString(),
                B8 = 6.ToString(),
                B9 = 7.ToString(),
                B10 = 8.ToString(),
                B11 = 12.ToString()
            });

            listZad6.Add(new StructZad1()
            {
                Line = 37.ToString(),
                B1 = 0.ToString(),
                B2 = 1.ToString(),
                B3 = 0.ToString(),
                B4 = 0.ToString(),
                B5 = 0.ToString(),
                B6 = 1.ToString(),
                B7 = 0.ToString(),
                B8 = 0.ToString(),
                B9 = 1.ToString(),
                B10 = 0.ToString(),
                B11 = 0.ToString()
            });
            Zad5.ItemsSource = listZad5;
            Zad6.ItemsSource = listZad6;
        }

        public void FunctionZad3()
        {
            float[,] zad3B = new float[,]{
                    {280,140,210,245 },
                    {420,560,140,280 },
                    {245,315,350,490 }
                };

            double[] zad3C = new double[]{
                    0.4, 0.6
                };

            float[,] zad3D = new float[,]{
                    {-6,5,-3,2 },
                    {-13,4,3,-6 },
                    {-3,7,5,-3 },
                    {-3,-1,-4,8},
                    {-6,1,-6,5 }
                };

            //туть добавление в первый лист
           
            //тут добавление в третий лист
           
        }

        public static float Max(float [] array)
        {
            float max = -1000;

            foreach (var item in array)
            {
                max=item > max ? item : max;
            }

            return max;
        }

        public static float Min(float[] array)
        {
            float min = 1000;

            foreach (var item in array)
            {
                min = item < min ? item : min;
            }

            return min;
        }

        public static int GetIndexMax(float[] array)
        {
            float max = -1000;
            int index=0;

            for (int i = 0; i < array.Length; i++)
            {
                if (max < array[i])
                {
                    max = array[i];
                    index = i;
                }
            }
            return index;
        }

        public static int GetIndexMin(float[] array)
        {
            float min = 1000;
            int index = 0;

            for (int i = 0; i < array.Length; i++)
            {
                if (min > array[i])
                {
                    min = array[i];
                    index = i;
                }
            }
            return index;
        }

        public static float CalculationD(float S,float p,float R1,float C1,float R2,float C2)
        {
            return S * (p * (R1 - C1) - (1 - p) * (R2 - C2));
        }

        public float[] GetColumn(float[,] matrix, int columnNumber)
        {
            return Enumerable.Range(0, matrix.GetLength(0))
                    .Select(x => matrix[x, columnNumber])
                    .ToArray();
        }

        public float[] GetRow(float[,] matrix, int rowNumber)
        {
            return Enumerable.Range(0, matrix.GetLength(1))
                    .Select(x => matrix[rowNumber, x])
                    .ToArray();
        }

        public struct StructZad1
        {
            public string Line { get; set; }
            public string B1 { get; set; }
            public string B2 { get; set; }
            public string B3 { get; set; }
            public string B4 { get; set; }
            public string B5 { get; set; }
            public string B6 { get; set; }
            public string B7 { get; set; }
            public string B8 { get; set; }
            public string B9 { get; set; }
            public string B10 { get; set; }
            public string B11 { get; set; }
            public string B12 { get; set; }
            public string B13 { get; set; }
            public string B14 { get; set; }
            public string B15 { get; set; }
            public string B16 { get; set; }
        }
    }
}
