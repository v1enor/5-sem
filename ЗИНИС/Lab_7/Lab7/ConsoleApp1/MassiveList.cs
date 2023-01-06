using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApp1
{
    internal class MassiveList
    {
        public int Id;
        public int[] masXn;
        public int[] checkMatrix;
        public MassiveList(int ID, int[] masXn, int[] checkMatrix) 
        {
            this.Id = ID;   
            this.masXn = masXn;
            this.checkMatrix = checkMatrix;
        }

       
    }
}
