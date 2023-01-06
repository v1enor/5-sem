using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class SetWithoutSample : MonoBehaviour
{
    [SerializeField]
    TMP_Text L20, L22, L23, L24;
    [SerializeField]
    TMP_Text D1, D2, D3, D4;

    TMP_Text[] L2 = new TMP_Text[4];
    TMP_Text[] Dlist = new TMP_Text[4];
  

    // Start is called before the first frame update
    void Start()
    {

        L2[0] = L20;
        L2[1] = L22;
        L2[2] = L23;
        L2[3] = L24;

        Dlist[0] = D1;
        Dlist[1] = D2;
        Dlist[2] = D3;
        Dlist[3] = D4;
    }


    public void PointerClick()
    {

        int index = Singleton.Instance.RowToInsert;
        


        if (Singleton.Instance.ZeroSet)
        {

            L2[index].text = Singleton.Instance.l2.ToString();
            Dlist[index].text = (Singleton.Instance.l1 - Singleton.Instance.l2).ToString();
            Singleton.Instance.Extremum = 30;
        }

    }
    // Update is called once per frame
    void Update()
    {
        
    }
}
