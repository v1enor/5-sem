using System;
using System.Text;

namespace lab_2
{
    class Program
{
    static void Main(string[] args)
    {
        //First task
        Console.WriteLine("Entropy of alphabets");
        Console.WriteLine("Cyrillic: " + Task.EntropyOfAlphabet(Task.Alphabets.Cyrillic));
        Console.WriteLine("Espan: " + Task.EntropyOfAlphabet(Task.Alphabets.Espan));


        //Second task
        Console.WriteLine("Binary: " + Task.EntropyOfAlphabet(Task.Alphabets.Binary));
        Console.WriteLine();


        //Third task
        string name = "Parybok Ilya Alexandrovich";
        var howManyBytes = name.Length * 8;

        Console.WriteLine("The amount of information in my full name (Espan): " +    (Task.EntropyOfAlphabet(Task.Alphabets.Espan) * name.Length));
        Console.WriteLine("The amount of information in my full name (Ciryllic): " + (Task.EntropyOfAlphabet(Task.Alphabets.Cyrillic) * name.Length));
        Console.WriteLine("The amount of information in my full name (ASCII): " +    (Task.EntropyOfAlphabet(Task.Alphabets.Binary) * howManyBytes));
        Console.WriteLine();

        //Fourth task
        Console.WriteLine("The amount of information in my full name by error 0.1(Espan): "    + (Task.EntropyOfAlphabet(Task.Alphabets.Espan) * name.Length) * Task.ent_error(0.1));
        Console.WriteLine("The amount of information in my full name by error 0.1(Ciryllic): " + (Task.EntropyOfAlphabet(Task.Alphabets.Cyrillic) * name.Length) * Task.ent_error(0.1));
        Console.WriteLine("The amount of information in my full name by error 0.1(Bin): "      + (Task.EntropyOfAlphabet(Task.Alphabets.Binary) * name.Length) * Task.ent_error(0.1));
        Console.WriteLine();

        Console.WriteLine("The amount of information in my full name by error 0.5(Espan): "    + (Task.EntropyOfAlphabet(Task.Alphabets.Espan) * name.Length) * Task.ent_error(0.5));
        Console.WriteLine("The amount of information in my full name by error 0.5(Ciryllic): " + (Task.EntropyOfAlphabet(Task.Alphabets.Cyrillic) * name.Length) * Task.ent_error(0.5));
        Console.WriteLine("The amount of information in my full name by error 0.5(Bin): "      + (Task.EntropyOfAlphabet(Task.Alphabets.Binary) * name.Length) * Task.ent_error(0.5));
        Console.WriteLine();

        Console.WriteLine("The amount of information in my full name by error 1 (Espan): "     + (Task.EntropyOfAlphabet(Task.Alphabets.Espan) * name.Length) * Task.ent_error(1));
        Console.WriteLine("The amount of information in my full name by error 1 (Ciryllic): "  + (Task.EntropyOfAlphabet(Task.Alphabets.Cyrillic) * name.Length) * Task.ent_error(1));
        Console.WriteLine("The amount of information in my full name by error 1 (Bin): "       + (Task.EntropyOfAlphabet(Task.Alphabets.Binary) * name.Length) * Task.ent_error(1));
        Console.WriteLine();
        }
    }
}
