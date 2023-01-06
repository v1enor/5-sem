using System;
using System.Collections.Generic;
using System.Windows;

namespace WpfApp1
{

    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
            Task1();
            Task2();
        }

        public void Task1()
        {
            int[,] dataMatrix = { { 10, 9, 10, 8, 11, 10, 9, 12, 9, 23, 23, 24},
                                  { 10, 9, 12, 11, 10, 11, 8, 10, 11, 21, 22, 22},
                                  { 8, 10, 9, 11, 11, 10, 11, 12, 10, 20, 23, 20},
                                  { 9, 10, 12, 8, 8, 12, 8, 11, 11, 23, 22, 24},
                                  { 11, 10, 8, 9, 12, 9, 11, 10, 11, 21, 22, 20},
                                  { 12, 11, 8, 9, 12, 8, 10, 11, 10, 24, 22, 21},
                                  { 8, 12, 10, 11, 10, 12, 12, 9, 10, 24, 22, 21},
                                  { 9, 11, 8, 10, 9, 9, 12, 11, 11, 20, 21, 20},
                                  { 11, 9, 10, 11, 8, 8, 10, 8, 8, 22, 24, 22},
                                  { 11, 10, 8, 11, 8, 9, 9, 11, 12, 24, 20, 23},
                                  { 10, 11, 11, 12, 8, 11, 9, 10, 9, 21, 23, 20},
                                  { 12, 11, 12, 12, 12, 12, 9, 8, 10, 21, 20, 20} };

            List<TableFirstTask> data = new List<TableFirstTask>();

            for (int i = 0; i < dataMatrix.GetLength(0); i++)
            {
                data.Add(new TableFirstTask()
                {
                    C1 = dataMatrix[i, 0].ToString(),
                    C2 = dataMatrix[i, 1].ToString(),
                    C3 = dataMatrix[i, 2].ToString(),
                    a11 = dataMatrix[i, 3].ToString(),
                    a12 = dataMatrix[i, 4].ToString(),
                    a21 = dataMatrix[i, 5].ToString(),
                    a22 = dataMatrix[i, 6].ToString(),
                    a31 = dataMatrix[i, 7].ToString(),
                    a33 = dataMatrix[i, 8].ToString(),
                    b1 = dataMatrix[i, 9].ToString(),
                    b2 = dataMatrix[i, 10].ToString(),
                    b3 = dataMatrix[i, 11].ToString(),
                });
            }

            TableZad1.ItemsSource = data;

            double max = 0;
            double savex1 = 0;
            double savex2 = 0;
            double savex3 = 0;
            int saveindex = 0;

            for (int i = 0; i < data.Count; i++)
            {
                int x1 = 0;
                int x2 = 0;
                int x3 = 0;

                for (; Convert.ToDouble(data[i].a11) * x1 + Convert.ToDouble(data[i].a12) * x2 < Convert.ToDouble(data[i].b1) &&
                    Convert.ToDouble(data[i].a21) * x1 + Convert.ToDouble(data[i].a22) * x2 < Convert.ToDouble(data[i].b2) &&
                    Convert.ToDouble(data[i].a31) * x1 + Convert.ToDouble(data[i].a33) * x3 < Convert.ToDouble(data[i].b3); x1 += 1)
                {
                    if (Convert.ToDouble(data[i].C2) > Convert.ToDouble(data[i].C3))
                    {
                        for (; Convert.ToDouble(data[i].a11) * x1 + Convert.ToDouble(data[i].a12) * x2 < Convert.ToDouble(data[i].b1) &&
                            Convert.ToDouble(data[i].a21) * x1 + Convert.ToDouble(data[i].a22) * x2 < Convert.ToDouble(data[i].b2) &&
                            Convert.ToDouble(data[i].a31) * x1 + Convert.ToDouble(data[i].a33) * x3 < Convert.ToDouble(data[i].b3); x2 += 1)
                        {

                        }
                        if (x2 > 0)
                            x2--;

                        for (; Convert.ToDouble(data[i].a31) * x1 + Convert.ToDouble(data[i].a33) * x3 < Convert.ToDouble(data[i].b3); x3 += 1)
                        {

                        }
                        if (x3 > 0)
                            x3--;
                    }
                    else
                    {
                        for (; (Convert.ToDouble(data[i].a11) * x1 + Convert.ToDouble(data[i].a12) * x2 < Convert.ToDouble(data[i].b1)) &&
                            (Convert.ToDouble(data[i].a21) * x1 + Convert.ToDouble(data[i].a22) * x2 < Convert.ToDouble(data[i].b2)) &&
                            (Convert.ToDouble(data[i].a31) * x1 + Convert.ToDouble(data[i].a33) * x3 < Convert.ToDouble(data[i].b3)); x3 += 1)
                        {

                        }
                        if (x3 > 0)
                            x3--;

                        for (; Convert.ToDouble(data[i].a11) * x1 + Convert.ToDouble(data[i].a12) * x2 < Convert.ToDouble(data[i].b1) &&
                            Convert.ToDouble(data[i].a21) * x1 + Convert.ToDouble(data[i].a22) * x2 < Convert.ToDouble(data[i].b2); x2 += 1)
                        {

                        }
                        if (x2 > 0)
                            x2--;
                    }

                    double mbmax = (Convert.ToDouble(data[i].C1) * x1 + Convert.ToDouble(data[i].C2) * x2 + Convert.ToDouble(data[i].C3) * x3);

                    if (mbmax > max)
                    {
                        max = mbmax;
                        saveindex = i;
                        savex1 = x1;
                        savex2 = x2;
                        savex3 = x3;
                    }
                    x2 = 0;
                    x3 = 0;
                }
            }
            TaskText1.Text += $"Для целевой функции, с учетом всех ограничений, наилучшим вариантом будет {saveindex + 1} месяц с максимальным значением F = {max}.\nx1 = {savex1}\nx2 = {savex2}\nx3 = {savex3}";
        }

        public void Task2()
        {
            double[,] dataMatrix = { { 12, 8, 11, 10, 12, 9, 11, 8, 12, 9, 12, 12, 24 ,23, 24},
                                  { 10, 10, 11, 10, 9, 12, 12, 11, 12, 11, 10, 8, 22, 23, 22},
                                  { 10, 11, 11, 11, 11, 8, 11, 9, 9, 10, 9, 11, 24, 23, 21},
                                  { 10, 11, 12, 9, 9, 8, 11, 10, 12, 9, 9, 8, 21, 20, 24},
                                  { 11, 12, 8, 10, 10, 8, 11, 9, 11, 11, 11, 12, 20, 21, 24},
                                  { 10, 8, 10, 10, 10, 10, 8, 8, 8, 11, 9, 11, 22, 20 ,24},
                                  { 11, 11, 11, 9, 12, 11, 9, 11, 11, 10, 11, 8, 21, 23 ,20},
                                  { 11, 10, 10, 8, 12, 11, 11, 10, 11, 11, 9, 12, 24, 22, 23},
                                  { 12, 12, 8, 11, 12, 8, 9, 12, 9, 12, 10, 9, 23, 22 ,24},
                                  { 10, 12, 12, 12, 9, 12, 9, 12, 11, 9, 11, 11, 22, 23, 23},
                                  { 11, 10, 9, 12, 12, 8, 9, 12, 11, 8, 12, 9, 23, 22, 24},
                                  { 12, 9, 12, 9, 9, 12, 8, 11, 12, 9, 9, 8, 24, 21, 22} };

            List<TableFirstTask> data = new List<TableFirstTask>();

            for (int i = 0; i < dataMatrix.GetLength(0); i++)
            {
                data.Add(new TableFirstTask()
                {
                    C1 = dataMatrix[i, 0].ToString(),
                    C2 = dataMatrix[i, 1].ToString(),
                    C3 = dataMatrix[i, 2].ToString(),
                    a11 = dataMatrix[i, 3].ToString(),
                    a12 = dataMatrix[i, 4].ToString(),
                    a13 = dataMatrix[i, 5].ToString(),
                    a21 = dataMatrix[i, 6].ToString(),
                    a22 = dataMatrix[i, 7].ToString(),
                    a23 = dataMatrix[i, 8].ToString(),
                    a31 = dataMatrix[i, 9].ToString(),
                    a32 = dataMatrix[i, 10].ToString(),
                    a33 = dataMatrix[i, 11].ToString(),
                    b1 = dataMatrix[i, 12].ToString(),
                    b2 = dataMatrix[i, 13].ToString(),
                    b3 = dataMatrix[i, 14].ToString()
                });
            }

            TableSecondTask mathData = new TableSecondTask()
            {
                C1 = 0,
                C2 = 0,
                C3 = 0,
                a11 = 0,
                a12 = 0,
                a13 = 0,
                a21 = 0,
                a22 = 0,
                a23 = 0,
                a31 = 0,
                a32 = 0,
                a33 = 0,
                b1 = 0,
                b2 = 0,
                b3 = 0
            };

            for (int i = 0; i < dataMatrix.GetLength(0); i++)
            {
                mathData.C1 += dataMatrix[i, 0] / dataMatrix.GetLength(0);
                mathData.C2 += dataMatrix[i, 1] / dataMatrix.GetLength(0);
                mathData.C3 += dataMatrix[i, 2] / dataMatrix.GetLength(0);
                mathData.a11 += dataMatrix[i, 3] / dataMatrix.GetLength(0);
                mathData.a12 += dataMatrix[i, 4] / dataMatrix.GetLength(0);
                mathData.a13 += dataMatrix[i, 5] / dataMatrix.GetLength(0);
                mathData.a21 += dataMatrix[i, 6] / dataMatrix.GetLength(0);
                mathData.a22 += dataMatrix[i, 7] / dataMatrix.GetLength(0);
                mathData.a23 += dataMatrix[i, 8] / dataMatrix.GetLength(0);
                mathData.a31 += dataMatrix[i, 9] / dataMatrix.GetLength(0);
                mathData.a32 += dataMatrix[i, 10] / dataMatrix.GetLength(0);
                mathData.a33 += dataMatrix[i, 11] / dataMatrix.GetLength(0);
                mathData.b1 += dataMatrix[i, 12] / dataMatrix.GetLength(0);
                mathData.b2 += dataMatrix[i, 13] / dataMatrix.GetLength(0);
                mathData.b3 += dataMatrix[i, 14] / dataMatrix.GetLength(0);
            }

            TableSecondTask mathData2 = new TableSecondTask()
            {
                C1 = 0,
                C2 = 0,
                C3 = 0,
                a11 = 0,
                a12 = 0,
                a13 = 0,
                a21 = 0,
                a22 = 0,
                a23 = 0,
                a31 = 0,
                a32 = 0,
                a33 = 0,
                b1 = 0,
                b2 = 0,
                b3 = 0
            };

            for (int i = 0; i < dataMatrix.GetLength(0); i++)
            {
                mathData2.C1 += dataMatrix[i, 0] * dataMatrix[i, 0] / dataMatrix.GetLength(0);
                mathData2.C2 += dataMatrix[i, 1] * dataMatrix[i, 1] / dataMatrix.GetLength(0);
                mathData2.C3 += dataMatrix[i, 2] * dataMatrix[i, 2] / dataMatrix.GetLength(0);
                mathData2.a11 += dataMatrix[i, 3] * dataMatrix[i, 3] / dataMatrix.GetLength(0);
                mathData2.a12 += dataMatrix[i, 4] * dataMatrix[i, 4] / dataMatrix.GetLength(0);
                mathData2.a13 += dataMatrix[i, 5] * dataMatrix[i, 5] / dataMatrix.GetLength(0);
                mathData2.a21 += dataMatrix[i, 6] * dataMatrix[i, 6] / dataMatrix.GetLength(0);
                mathData2.a22 += dataMatrix[i, 7] * dataMatrix[i, 7] / dataMatrix.GetLength(0);
                mathData2.a23 += dataMatrix[i, 8] * dataMatrix[i, 8] / dataMatrix.GetLength(0);
                mathData2.a31 += dataMatrix[i, 9] * dataMatrix[i, 9] / dataMatrix.GetLength(0);
                mathData2.a32 += dataMatrix[i, 10] * dataMatrix[i, 10] / dataMatrix.GetLength(0);
                mathData2.a33 += dataMatrix[i, 11] * dataMatrix[i, 11] / dataMatrix.GetLength(0);
                mathData2.b1 += dataMatrix[i, 12] * dataMatrix[i, 12] / dataMatrix.GetLength(0);
                mathData2.b2 += dataMatrix[i, 13] * dataMatrix[i, 13] / dataMatrix.GetLength(0);
                mathData2.b3 += dataMatrix[i, 14] * dataMatrix[i, 14] / dataMatrix.GetLength(0);
            }

            TaskText2.Text += $"M(C1) = {Math.Round(mathData.C1, 2)}; M(C2) = {Math.Round(mathData.C2, 2)}; M(C3) = {Math.Round(mathData.C3, 2)}; M(a11) = {Math.Round(mathData.a11, 2)};" +
                $"M(a12) = {Math.Round(mathData.a12, 2)}; M(a13) = {Math.Round(mathData.a13, 2)}; M(a21) = {Math.Round(mathData.a21, 2)}; M(a22) = {Math.Round(mathData.a22, 2)}; M(a23) = {Math.Round(mathData.a23, 2)}" +
                $"M(a31) = {Math.Round(mathData.a31, 2)}; M(a32) = {Math.Round(mathData.a32, 2)}; M(a33) = {Math.Round(mathData.a33, 2)}; M(b1) = {Math.Round(mathData.b1, 2)};" +
                $"M(b2) = {Math.Round(mathData.b2, 2)}; M(b3) = {Math.Round(mathData.b3, 2)}; {mathData2.a11 - mathData.a11 * mathData.a11}";

            TableZad2.ItemsSource = data;

            double[] vert = { 1.29, -1.03, -0.67, -0.39, -0.12, 0.12, 0.38, 0.67, 1.04, 1.28, 1.64, 1.88, 2.32, 3.09 };
            double max = 0;
            double savex1 = 0;
            double savex2 = 0;
            double savex3 = 0;
            int saveindex = 0;

            TableSecondTask desp = new TableSecondTask()
            {
                a11 = 1.24,
                a12 = 1.90,
                a13 = 3.11,
                a21 = 1.90,
                a22 = 2.20,
                a23 = 1.84,
                a31 = 1.45,
                a32 = 1.42,
                a33 = 2.99,
                b1 = 1.91,
                b2 = 1.36,
                b3 = 1.90,
            };

            for (int o = 0; o < vert.Length; o++)
            {
                for (int i = 0; i < data.Count; i++)
                {
                    max = 0;
                    double x1 = 0;
                    double x2 = 0;
                    double x3 = 0;

                    for (; mathData.a11 * x1 + mathData.a12 * x2 + mathData.a13 * x3 + vert[o] * Math.Sqrt(desp.a11 * x1 * x1 + desp.a12 * x2 * x2 +
                        desp.a13 * x3 * x3 + desp.b1) <= mathData.b1 &&
                        mathData.a21 * x1 + mathData.a22 * x2 + mathData.a23 * x3 + vert[o] * Math.Sqrt(desp.a21 * x1 * x1 + desp.a22 * x2 * x2 +
                        desp.a23 * x3 * x3 + desp.b2) <= mathData.b2 &&
                        mathData.a31 * x1 + mathData.a32 * x2 + mathData.a33 * x3 + vert[o] * Math.Sqrt(desp.a31 * x1 * x1 + desp.a32 * x2 * x2 +
                        desp.a33 * x3 * x3 + desp.b3) <= mathData.b3; x1 += 0.01)
                    {
                        if (mathData.C2 > mathData2.C3)
                        {
                            for (; mathData.a11 * x1 + mathData.a12 * x2 + mathData.a13 * x3 + vert[o] * Math.Sqrt(desp.a11 * x1 * x1 + desp.a12 * x2 * x2 +
                        desp.a13 * x3 * x3 + desp.b1) <= mathData.b1 &&
                        mathData.a21 * x1 + mathData.a22 * x2 + mathData.a23 * x3 + vert[o] * Math.Sqrt(desp.a21 * x1 * x1 + desp.a22 * x2 * x2 +
                        desp.a23 * x3 * x3 + desp.b2) <= mathData.b2 &&
                        mathData.a31 * x1 + mathData.a32 * x2 + mathData.a33 * x3 + vert[o] * Math.Sqrt(desp.a31 * x1 * x1 + desp.a32 * x2 * x2 +
                        desp.a33 * x3 * x3 + desp.b3) <= mathData.b3; x2 += 0.01)
                            {

                            }

                            for (; mathData.a11 * x1 + mathData.a12 * x2 + mathData.a13 * x3 + vert[o] * Math.Sqrt(desp.a11 * x1 * x1 + desp.a12 * x2 * x2 +
                        desp.a13 * x3 * x3 + desp.b1) <= mathData.b1 &&
                        mathData.a21 * x1 + mathData.a22 * x2 + mathData.a23 * x3 + vert[o] * Math.Sqrt(desp.a21 * x1 * x1 + desp.a22 * x2 * x2 +
                        desp.a23 * x3 * x3 + desp.b2) <= mathData.b2 &&
                        mathData.a31 * x1 + mathData.a32 * x2 + mathData.a33 * x3 + vert[o] * Math.Sqrt(desp.a31 * x1 * x1 + desp.a32 * x2 * x2 +
                        desp.a33 * x3 * x3 + desp.b3) <= mathData.b3; x3 += 0.01)
                            {

                            }
                        }
                        else
                        {
                            for (; mathData.a11 * x1 + mathData.a12 * x2 + mathData.a13 * x3 + vert[o] * Math.Sqrt(desp.a11 * x1 * x1 + desp.a12 * x2 * x2 +
                        desp.a13 * x3 * x3 + desp.b1) <= mathData.b1 &&
                        mathData.a21 * x1 + mathData.a22 * x2 + mathData.a23 * x3 + vert[o] * Math.Sqrt(desp.a21 * x1 * x1 + desp.a22 * x2 * x2 +
                        desp.a23 * x3 * x3 + desp.b2) <= mathData.b2 &&
                        mathData.a31 * x1 + mathData.a32 * x2 + mathData.a33 * x3 + vert[o] * Math.Sqrt(desp.a31 * x1 * x1 + desp.a32 * x2 * x2 +
                        desp.a33 * x3 * x3 + desp.b3) <= mathData.b3; x3 += 0.01)
                            {

                            }

                            for (; mathData.a11 * x1 + mathData.a12 * x2 + mathData.a13 * x3 + vert[o] * Math.Sqrt(desp.a11 * x1 * x1 + desp.a12 * x2 * x2 +
                        desp.a13 * x3 * x3 + desp.b1) <= mathData.b1 &&
                        mathData.a21 * x1 + mathData.a22 * x2 + mathData.a23 * x3 + vert[o] * Math.Sqrt(desp.a21 * x1 * x1 + desp.a22 * x2 * x2 +
                        desp.a23 * x3 * x3 + desp.b2) <= mathData.b2 &&
                        mathData.a31 * x1 + mathData.a32 * x2 + mathData.a33 * x3 + vert[o] * Math.Sqrt(desp.a31 * x1 * x1 + desp.a32 * x2 * x2 +
                        desp.a33 * x3 * x3 + desp.b3) <= mathData.b3; x2 += 0.01)
                            {

                            }
                        }

                        double mbmax = mathData.C1 * x1 + mathData.C2 * x2 + mathData.C3 * x3;

                        if (mbmax > max)
                        {
                            max = mbmax;
                            saveindex = i;
                            savex1 = x1;
                            savex2 = x3;
                            savex3 = x2;
                        }
                        x2 = 0;
                        x3 = 0;
                    }
                }
                if (o == 0)
                    TaskText2.Text += $"\nДля целевой функции, с учетом всех ограничений, наилучшим вариантом будет {saveindex + 1} месяц с максимальным значением F = {max}.\nx1 = {savex1}\nx2 = {savex2}\nx3 = {savex3}";
                else
                    TaskText2.Text += $"\n{o}: F = {max}";
            }

            //Ласт таблица
            double[] vert2 = { -0.84, -0.253347103, -0.253347103, 0.841621234, 1.281551566, 1.644853627, 2.326347874 };
            double[] vert3 = { -0.84, -0.253347103, -0.253347103, 0.841621234, 1.281551566, 1.644853627, 2.326347874 };
            List<TableB> result = new List<TableB>();

            for (int v3 = 0; v3 < vert2.Length; v3++)
            {
                double[] savev = new double[vert2.Length];
                for (int v2 = 0; v2 < vert3.Length; v2++)
                {
                    max = 0;
                    for (int i = 0; i < data.Count; i++)
                    {
                        max = 0;
                        double x1 = 0;
                        double x2 = 0;
                        double x3 = 0;

                        for (; mathData.a11 * x1 + mathData.a12 * x2 + mathData.a13 * x3 + vert[0] * Math.Sqrt(desp.a11 * x1 * x1 + desp.a12 * x2 * x2 +
                            desp.a13 * x3 * x3 + desp.b1) <= mathData.b1 &&
                            mathData.a21 * x1 + mathData.a22 * x2 + mathData.a23 * x3 + vert2[v2] * Math.Sqrt(desp.a21 * x1 * x1 + desp.a22 * x2 * x2 +
                            desp.a23 * x3 * x3 + desp.b2) <= mathData.b2 &&
                            mathData.a31 * x1 + mathData.a32 * x2 + mathData.a33 * x3 + vert3[v3] * Math.Sqrt(desp.a31 * x1 * x1 + desp.a32 * x2 * x2 +
                            desp.a33 * x3 * x3 + desp.b3) <= mathData.b3; x1 += 0.01)
                        {
                            if (mathData.C2 > mathData2.C3)
                            {
                                for (; mathData.a11 * x1 + mathData.a12 * x2 + mathData.a13 * x3 + vert[0] * Math.Sqrt(desp.a11 * x1 * x1 + desp.a12 * x2 * x2 +
                            desp.a13 * x3 * x3 + desp.b1) <= mathData.b1 &&
                            mathData.a21 * x1 + mathData.a22 * x2 + mathData.a23 * x3 + vert2[v2] * Math.Sqrt(desp.a21 * x1 * x1 + desp.a22 * x2 * x2 +
                            desp.a23 * x3 * x3 + desp.b2) <= mathData.b2 &&
                            mathData.a31 * x1 + mathData.a32 * x2 + mathData.a33 * x3 + vert3[v3] * Math.Sqrt(desp.a31 * x1 * x1 + desp.a32 * x2 * x2 +
                            desp.a33 * x3 * x3 + desp.b3) <= mathData.b3; x2 += 0.01)
                                {

                                }

                                for (; mathData.a11 * x1 + mathData.a12 * x2 + mathData.a13 * x3 + vert[0] * Math.Sqrt(desp.a11 * x1 * x1 + desp.a12 * x2 * x2 +
                            desp.a13 * x3 * x3 + desp.b1) <= mathData.b1 &&
                            mathData.a21 * x1 + mathData.a22 * x2 + mathData.a23 * x3 + vert2[v2] * Math.Sqrt(desp.a21 * x1 * x1 + desp.a22 * x2 * x2 +
                            desp.a23 * x3 * x3 + desp.b2) <= mathData.b2 &&
                            mathData.a31 * x1 + mathData.a32 * x2 + mathData.a33 * x3 + vert3[v3] * Math.Sqrt(desp.a31 * x1 * x1 + desp.a32 * x2 * x2 +
                            desp.a33 * x3 * x3 + desp.b3) <= mathData.b3; x3 += 0.01)
                                {

                                }
                            }
                            else
                            {
                                for (; mathData.a11 * x1 + mathData.a12 * x2 + mathData.a13 * x3 + vert[0] * Math.Sqrt(desp.a11 * x1 * x1 + desp.a12 * x2 * x2 +
                            desp.a13 * x3 * x3 + desp.b1) <= mathData.b1 &&
                            mathData.a21 * x1 + mathData.a22 * x2 + mathData.a23 * x3 + vert2[v2] * Math.Sqrt(desp.a21 * x1 * x1 + desp.a22 * x2 * x2 +
                            desp.a23 * x3 * x3 + desp.b2) <= mathData.b2 &&
                            mathData.a31 * x1 + mathData.a32 * x2 + mathData.a33 * x3 + vert3[v3] * Math.Sqrt(desp.a31 * x1 * x1 + desp.a32 * x2 * x2 +
                            desp.a33 * x3 * x3 + desp.b3) <= mathData.b3; x3 += 0.01)
                                {

                                }

                                for (; mathData.a11 * x1 + mathData.a12 * x2 + mathData.a13 * x3 + vert[0] * Math.Sqrt(desp.a11 * x1 * x1 + desp.a12 * x2 * x2 +
                            desp.a13 * x3 * x3 + desp.b1) <= mathData.b1 &&
                            mathData.a21 * x1 + mathData.a22 * x2 + mathData.a23 * x3 + vert2[v2] * Math.Sqrt(desp.a21 * x1 * x1 + desp.a22 * x2 * x2 +
                            desp.a23 * x3 * x3 + desp.b2) <= mathData.b2 &&
                            mathData.a31 * x1 + mathData.a32 * x2 + mathData.a33 * x3 + vert3[v3] * Math.Sqrt(desp.a31 * x1 * x1 + desp.a32 * x2 * x2 +
                            desp.a33 * x3 * x3 + desp.b3) <= mathData.b3; x2 += 0.01)
                                {

                                }
                            }

                            double mbmax = mathData.C1 * x1 + mathData.C2 * x2 + mathData.C3 * x3;

                            if (mbmax > max)
                            {
                                max = mbmax;
                                saveindex = i;
                                savex1 = x1;
                                savex2 = x3;
                                savex3 = x2;
                            }
                            x2 = 0;
                            x3 = 0;
                        }
                    }
                    savev[v2] = max;
                }
                result.Add(new TableB()
                {
                    b1=savev[0],
                    b2=savev[1],
                    b3=savev[2],
                    b4=savev[3],
                    b5=savev[4],
                    b6=savev[5],
                    b7=savev[6]
                });
            }
            double[,] res1 = new double[7,7];

            for (int i = 0; i < res1.GetLength(0); i++)
            {
                for (int j = 0; j < res1.GetLength(1); j++)
                {
                    res1[i, j] += 19.7 + 0.37123 * i + 0.4 * j;
                }
            }
            List<TableB> finishTable = new List<TableB>();
            for (int i = 0; i < res1.GetLength(0); i++)
            {
                finishTable.Add(new TableB()
                {
                    b1 = res1[i,0],
                    b2 = res1[i,1],
                    b3 = res1[i,2],
                    b4 = res1[i,3],
                    b5 = res1[i,4],
                    b6 = res1[i,5],
                    b7 = res1[i,6]
                });
            }

            TableZad21.ItemsSource = finishTable;
        }
    }

    class TableFirstTask
    {
        public string C1 { get; set; }
        public string C2 { get; set; }
        public string C3 { get; set; }
        public string a11 { get; set; }
        public string a12 { get; set; }
        public string a13 { get; set; }
        public string a21 { get; set; }
        public string a22 { get; set; }
        public string a23 { get; set; }
        public string a31 { get; set; }
        public string a32 { get; set; }
        public string a33 { get; set; }
        public string b1 { get; set; }
        public string b2 { get; set; }
        public string b3 { get; set; }
    }

    class TableSecondTask
    {
        public double C1 { get; set; }
        public double C2 { get; set; }
        public double C3 { get; set; }
        public double a11 { get; set; }
        public double a12 { get; set; }
        public double a13 { get; set; }
        public double a21 { get; set; }
        public double a22 { get; set; }
        public double a23 { get; set; }
        public double a31 { get; set; }
        public double a32 { get; set; }
        public double a33 { get; set; }
        public double b1 { get; set; }
        public double b2 { get; set; }
        public double b3 { get; set; }
    }

    class TableB
    {
        public double b1 { get; set; }
        public double b2 { get; set; }
        public double b3 { get; set; }
        public double b4 { get; set; }
        public double b5 { get; set; }
        public double b6 { get; set; }
        public double b7 { get; set; }
    }
}
