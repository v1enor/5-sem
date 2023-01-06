using System;
using System.Collections;
using System.Collections.Generic;
using System.Reflection;
using TMPro;
using UnityEngine;

public class SetC02 : MonoBehaviour
{
    [SerializeField]
    TMP_Text C021, C022, C023, C024;
    TMP_Text[] C02list = new TMP_Text[4];
    [SerializeField]
    GameObject marker;
    // Start is called before the first frame update
    void Start()
    {
        C02list[0] = C021;
        C02list[1] = C022;
        C02list[2] = C023;
        C02list[3] = C024;
    }

    public void OnpointerClick()
    {

        float C02Add = Singleton.Instance.AddedC;
        float C02 = (Math.Abs(marker.transform.localPosition.z - 450f) / 2.7f) + 30 + C02Add;
        

        if (C02 > 0)
        {
            for (int i = 0; i < C02list.Length; i++)
            {
                C02list[i].text = C02.ToString("0.00");

            }
        }

    }
    // Update is called once per frame
    void Update()
    {
        
    }
}
