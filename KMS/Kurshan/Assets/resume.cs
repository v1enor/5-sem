using JetBrains.Annotations;
using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class resume : MonoBehaviour
{
    [SerializeField]
    TMP_Text C011, C012, C013, C014;
    [SerializeField]
    TMP_Text C021, C022, C023, C024;
    [SerializeField]
    TMP_Text E1, E2, E3, E4;
    TMP_Text[] C01list = new TMP_Text[4];
    TMP_Text[] Elist = new TMP_Text[4];
    TMP_Text[] C02list = new TMP_Text[4];
    // Start is called before the first frame update
    void Start()
    {
        C01list[0] = C011;
        C01list[1] = C012;
        C01list[2] = C013;
        C01list[3] = C014;

        C02list[0] = C021;
        C02list[1] = C022;
        C02list[2] = C023;
        C02list[3] = C024;

        Elist[0] = E1;
        Elist[1] = E2;
        Elist[2] = E3;
        Elist[3] = E4;
    }
    public void OnpointerClick()
    {
        var rowcount = Singleton.Instance.RowCount;
        for (int i = 0; i < rowcount; i++)
        {
            if (C01list[i].text != "" & C02list[i].text != "")
            {

            float Eresult = 
                (float)Convert.ToDouble(
                    (Convert.ToDouble(C01list[i].text) - Convert.ToDouble(C02list[i].text)) * 7f / (8.5f * 20f));
            Elist[i].text = Eresult.ToString();
            }
        }
    }
        // Update is called once per frame
    void Update()
    {
        
    }
}
