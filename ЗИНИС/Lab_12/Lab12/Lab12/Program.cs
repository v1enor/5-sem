int GCD(int a, int b)
{
    while (a != 0 && b != 0)
    {
        if (a > b)
            a %= b;
        else
            b %= a;
    }

    return a == 0 ? b : a;
}
int GCD_third(int a, int b, int c)
{
    return GCD(GCD(a, b), c);
}

List<int> FindPrimesInRange(int m, int n)
{
    List<int> primes = new List<int>();

    for (int i = m; i <= n; i++)
    {
        bool isPrime = true;

        for (int j = 2; j < i; j++)
        {
            if (i % j == 0)
            {
                isPrime = false;
                break;
            }
        }

        if (isPrime)
            primes.Add(i);
    }

    return primes;
}


void ComparePrimesInRange(int m, int n)
{
    List<int> primes = FindPrimesInRange(m, n);
    int numPrimes = primes.Count;
    double expectedNumPrimes = n / Math.Log(n);
    Console.WriteLine("Number of primes: " + numPrimes);
    Console.WriteLine("Expected number of primes: " + expectedNumPrimes);
}


void PrintPrimes(List<int> primes)
{
    Console.WriteLine("Primes: ");
    foreach (int prime in primes)
    {
        Console.Write(prime + " ");
    }
    Console.WriteLine();
}

var ints = FindPrimesInRange(2,531);
PrintPrimes(ints);
ComparePrimesInRange(2, 531);

var ints2 = FindPrimesInRange(499, 531);
PrintPrimes(ints2);
ComparePrimesInRange(499, 531);


int gcd = GCD(10, 15);
int gcd_third = GCD_third(10, 15, 23);

Console.WriteLine("НОД 2х чисел: " + gcd);
Console.WriteLine("НОД 3х чисел: " + gcd_third);





int  m = 499;
int n = 531;


// Создаем список простых чисел в интервале от 2 до максимального числа
List<int> primes = new List<int>();
for (int i = 2; i <= Math.Max(m, n); i++)
{
    bool isPrime = true;
    for (int j = 2; j < i; j++)
    {
        if (i % j == 0)
        {
            isPrime = false;
            break;
        }
    }
    if (isPrime)
        primes.Add(i);
}

// Записываем числа m и n в виде произведения простых множителей
List<int> mFactors = new List<int>();
List<int> nFactors = new List<int>();
foreach (int prime in primes)
{
    while (m % prime == 0)
    {
        mFactors.Add(prime);
        m /= prime;
    }
    while (n % prime == 0)
    {
        nFactors.Add(prime);
        n /= prime;
    }
}

// Выводим результаты
Console.WriteLine("m = " + string.Join(" * ", mFactors));
Console.WriteLine("n = " + string.Join(" * ", nFactors));

// Создаем строку, состоящую из конкатенации цифр m ǀǀ n
int nutest = 499531;

// Проверяем, является ли число простым
bool IsPrime(int n)
{
    if (n <= 1) return false;
    if (n <= 3) return true;

    if (n % 2 == 0 || n % 3 == 0) return false;

    for (int i = 5; i * i <= n; i = i + 6)
        if (n % i == 0 || n % (i + 2) == 0)
            return false;

    return true;
}


// Выводим результат
if (IsPrime(nutest))
    Console.WriteLine(nutest + " - простое число");
else
    Console.WriteLine(nutest + " - составное число");
