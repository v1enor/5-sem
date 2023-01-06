using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LW7
{
    class Program
    {
        static double sum = 0;
        static double[] sumMass = { 225, 230, 235, 240, 245 };
        static int countSum1 = 0,
            countSum2 = 0,
            countSum3 = 0,
            countSum4 = 0,
            countSum5 = 0;
        static int totalcount = 0;
        static int indexM1 = 0,
            indexM2 = 0,
            indexM3 = 0,
            indexM4 = 0,
            indexM5 = 0,
            indexM6 = 0,
            indexM7 = 0,
            indexM8 = 0;
        static void Main(string[] args)
        {

            do
            {
                sum = CalculateSum(IndexM1, IndexM2, IndexM3, IndexM4, IndexM5, IndexM6, IndexM7, IndexM8++);
                if (sum > sumMass[4])
                {
                }

                else if (sum > sumMass[3])
                { countSum5++; }
                else if (sum > sumMass[2])
                { countSum4++; countSum5++; }
                else if (sum > sumMass[1])
                { countSum3++; countSum4++; countSum5++; }
                else if (sum > sumMass[0])
                { countSum2++; countSum3++; countSum4++; countSum5++; }
                else if (sum > 0)
                { countSum1++; countSum2++; countSum3++; countSum4++; countSum5++; }



                totalcount++;

            } while (indexM1 != 4);

            Console.WriteLine("countSum1: " + countSum1);
            Console.WriteLine("countSum2: " + countSum2);
            Console.WriteLine("countSum3: " + countSum3);
            Console.WriteLine("countSum4: " + countSum4);
            Console.WriteLine("countSum5: " + countSum5);
            Console.WriteLine("totalcount: " + totalcount);
            Console.ReadLine();
        }

        static int[] Mass1 = { 22,
                                20,
                                18,
                                19
                                };
        static int[] Mass2 = {18,
                                19,
                                24,
                                19 };
        static int[] Mass3 = {18,
                                18,
                                22,
                                19 };
        static int[] Mass4 = {19,
                                18,
                                24,
                                20 };
        static int[] Mass5 = {24,
                            22,
                            21,
                            19 };
        static int[] Mass6 = {22,
                                19,
                                24,
                                18 };
        static int[] Mass7 = {18,
                                23,
                                23,
                                18 };
        static int[] Mass8 = {22,
                                19,
                                20,
                                22 };

        public static int IndexM1 { get => indexM1; set => indexM1 =  value; }
        public static int IndexM2 { get => indexM2; set { indexM2 = (value == 4) ? 0 : value; if (value == 4) IndexM1++; } }
        public static int IndexM3 { get => indexM3; set { indexM3 = (value == 4) ? 0 : value; if (value == 4) IndexM2++; } }
        public static int IndexM4 { get => indexM4; set { indexM4 = (value == 4) ? 0 : value; if (value == 4) IndexM3++; } }
        public static int IndexM5 { get => indexM5; set { indexM5 = (value == 4) ? 0 : value; if (value == 4) IndexM4++; } }
        public static int IndexM6 { get => indexM6; set { indexM6 = (value == 4) ? 0 : value; if (value == 4) IndexM5++; } }
        public static int IndexM7 { get => indexM7; set { indexM7 = (value == 4) ? 0 : value; if (value == 4) IndexM6++; } }
        public static int IndexM8 { get => indexM8; set { indexM8 = (value == 4) ? 0 : value; if (value == 4) IndexM7++; } }



        static public double CalculateSum(int index1,
            int index2,
            int index3,
            int index4,
            int index5,
            int index6,
            int index7,
            int index8
            ) => (double)Mass1[index1] +
                (double)Mass2[index2] +
                (double)Mass2[index2] +


                (double)Mass3[index3] +
                (double)Mass5[index4] +



                (double)Mass7[index5] +
                (double)Mass1[index5] +
                (double)Mass3[index5] +
                (double)Mass3[index5] +
                (double)Mass3[index5] +
                (double)Mass4[index5] +
                (double)Mass6[index5];

    }
}
