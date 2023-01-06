using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Unity.VisualScripting;
using UnityEngine;

public class Singleton : MonoBehaviour
{
    private static Singleton instance;

    public static Singleton Instance
    {
        get
        {
            if (instance == null)
            {
                instance = FindObjectOfType<Singleton>();

                if (instance == null)
                {
                    GameObject singleton = new GameObject("Singleton");
                    instance = singleton.AddComponent<Singleton>();
                }
            }

            return instance;
        }
    }

    public string CatSETNAME { get; set; }

    public bool SampleSet;
    public bool ZeroSet;
    public string SampleSETNAME { get; set; }
    public float QmetrRotate = 55f;
    public float Extremum = 594f;
    public float Multiplire = 5.4f; //1 к 1 это 2.7
    public float AddedC = 5;


    public int NumberSample = 0;
    public int RowToInsert = 0;
    public int RowCount = 2;
    public int l1 = 37;
    public int l2 = 30;
    public int[] SamplesList = new int[4];
}

