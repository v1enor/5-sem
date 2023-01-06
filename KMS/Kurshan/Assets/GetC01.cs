using System;
using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class GetC01 : MonoBehaviour
{
    [SerializeField]
    TMP_Text C011, C012, C013, C014;
    TMP_Text[] C01list = new TMP_Text[4];
    [SerializeField]
    GameObject marker;

    // Start is called before the first frame update
    void Start()
    {
        C01list[0] = C011;
        C01list[1] = C012;
        C01list[2] = C013;
        C01list[3] = C014;

    }

    public void OnpointerClick()
    {
       
        float c01Add = Singleton.Instance.AddedC;
        float c01 = (Math.Abs(marker.transform.localPosition.z - 450f) / 2.7f) + 30 + c01Add;
        int index = Singleton.Instance.RowToInsert;
        if (c01>0)
        {
            C01list[index].text = c01.ToString("0.00");
        }

    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
