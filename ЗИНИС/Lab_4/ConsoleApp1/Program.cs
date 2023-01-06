using System;
using System.Collections;
using System.Text;
using MathNet.Numerics.LinearAlgebra;
using MathNet.Numerics.LinearAlgebra.Double;

namespace Lab3
{
    class Program
    {
        static bool IsPowerOfTwo(ulong x)
        {
            return (x & (x - 1)) == 0;
        }

        public static byte[] BitArrayToByteArray(BitArray bits)
        {
            byte[] ret = new byte[(bits.Length - 1) / 8 + 1];
            bits.CopyTo(ret, 0);
            return ret;
        }
        static void Main(string[] args)
        {
            Matrix<double> Xn, Xr, Xk, Yn, H;
            int position_1, position_2;
            Random rnd = new Random();


            Console.Write("Введите строку: ");
            string str = Console.ReadLine();
            

            var bytes = Encoding.ASCII.GetBytes(str);
         
            int k = bytes.Length * 8;
            int r = (int)Math.Ceiling(Math.Log(k, 2) + 1);

            double[,] g = new double[r, k];
            double[,] i = new double[r, r];

            for (int ii = 0; ii < r; ii++)
            {
                i[ii, ii] = 1;
            }

            int f = 1;
            for (int j = 0; j < k; j++)
            {
                while (IsPowerOfTwo((ulong)f)) f++;
                int d = f;

                int ff = 0;
                while (d > 0)
                {
                    g[ff, j] = d % 2;
                    d /= 2;
                    ff++;
                }
                f++;
            }

            H = DenseMatrix.OfArray(g).Append(DenseMatrix.OfArray(i));
            Console.WriteLine(H);

            var bar = new BitArray(bytes);
            var xr = new double[r];
            for (int ii = 0; ii < r; ii++)
            {
                for (int j = 0; j < k; j++)
                {
                    xr[ii] += (bar[j] ? 1 : 0) * H[ii, j];
                }
                xr[ii] %= 2;
            }

            Xr = Matrix<double>.Build.Dense(1, r, (ii, jj) => (double)xr[jj]);
            Xk = Matrix<double>.Build.Dense(1, bar.Length, (ii, jj) => bar[jj] ? 1 : 0);
            Xn = DenseMatrix.OfMatrix(Xk).Append(Xr);

          
            Console.WriteLine($"Xr: {Xr}");
            Console.WriteLine($"Xn: {Xn}");

            Yn = DenseMatrix.OfMatrix(Xn);
            Console.Write("Введите количество ошибок: ");
            int errCount = Convert.ToInt32(Console.ReadLine());
            if (errCount == 1)
            {
                position_1 = rnd.Next(0, Yn.ColumnCount - 1);
                Yn[0, position_1] = (Yn[0, position_1] + 1) % 2;
                Console.WriteLine($"Позиция с ошибкой: {position_1}");
            }
            if (errCount == 2)
            {
                position_1 = rnd.Next(0, Yn.ColumnCount - 1);
                Yn[0, position_1] = (Yn[0, position_1] + 1) % 2;
                position_2 = rnd.Next(0, Yn.ColumnCount - 1);
                while (position_1 == position_2) position_2 = rnd.Next(0, Yn.ColumnCount - 1);
                Yn[0, position_2] = (Yn[0, position_2] + 1) % 2;
                Console.WriteLine($"Позиции с ошибками: {position_1}, {position_2}");
            }

            if (errCount > 2)
            {
                Console.WriteLine("Много ошибок");
                return;
                Console.ReadKey();
            }

            Console.WriteLine($"Yn: {Yn}");

            var S = H * Yn.Transpose();
            bool flag = false;
            for (int o = 0; o < S.RowCount; o++)
            {
                S[o, 0] %= 2;
                flag = flag || S[o, 0] != 0;
            }


            Console.WriteLine($"Синдром: {S.Transpose().ToString()}");

            var En = Matrix<double>.Build.Dense(1, H.ColumnCount, 0);

            if (flag)
            {
                for (int o = 0; o < H.ColumnCount; o++)
                {
                    if (H.Column(o).Equals(S.Column(0)))
                    {
                        En[0, o] = 1;
                    }
                }
            }
            Console.WriteLine($"En: {En}");
            var Y_n = DenseMatrix.OfMatrix(Yn) + En;
            for (int o = 0; o < Y_n.ColumnCount; o++)
            {
                Y_n[0, o] %= 2;
            }
            Console.WriteLine($"Y'n: {Y_n}");
            var bitArray = new BitArray(k);
            for (int o = 0; o < k; o++)
            {
                bitArray[o] = Y_n[0, o] == 1;
            }
            Console.WriteLine($"Декодированое сообщение: {Encoding.ASCII.GetString(BitArrayToByteArray(bitArray))}");
            Console.ReadKey();
        }
    }
}
