using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Serialization;
using TMPro;
using UnityEngine;


public class TableSample : MonoBehaviour
{
    [SerializeField]
    TMP_Text SampleNumber1, SampleNumber2, SampleNumber3, SampleNumber4;
    [SerializeField]
    TMP_Text MaterialNumber1, MaterialNumber2, MaterialNumber3, MaterialNumber4;
    [SerializeField]
    TMP_Text l11, l12, l13, l14;


    TMP_Text[] textObjects = new TMP_Text[4];
    TMP_Text[] matObjects = new TMP_Text[4];
    TMP_Text[] l1 = new TMP_Text[4];





    // Start is called before the first frame update
    void Start()
    {
        textObjects[0] = SampleNumber1;
        textObjects[1] = SampleNumber2;
        textObjects[2] = SampleNumber3;
        textObjects[3] = SampleNumber4;

        matObjects[0] = MaterialNumber1;
        matObjects[1] = MaterialNumber2;
        matObjects[2] = MaterialNumber3;
        matObjects[3] = MaterialNumber4;

        l1[0] = l11;
        l1[1] = l12;
        l1[2] = l13;
        l1[3] = l14;
    }

    public void OnpointerClick()
    {
        
        int sampleNum = Singleton.Instance.NumberSample;
        var ListSamples = Singleton.Instance.SamplesList;


        if (!ListSamples.Contains(sampleNum))
        {


            Singleton.Instance.RowToInsert++;
            if (ListSamples[0] == 0)
            {
                Singleton.Instance.RowToInsert = 0;
            }
            ListSamples[Singleton.Instance.RowToInsert] = sampleNum; 
        }

        if (Singleton.Instance.SampleSet)
        {
            int index = Singleton.Instance.RowToInsert;
            textObjects[index].text = sampleNum.ToString();

            switch (sampleNum)
            {
            case 1:
                matObjects[index].text = "Полителен высокого давления";
                    Singleton.Instance.Extremum = 148f;
                break;

            case 2:
                matObjects[index].text = "Фенопласт";
                    Singleton.Instance.Extremum = 467f;
                    break;

            case 3:
                matObjects[index].text = "Гетинакс";
                    Singleton.Instance.Extremum = 367f;
                    break;

            case 4:
                matObjects[index].text = "Береза сухая";
                    Singleton.Instance.Extremum = 218f;
                    break;


            default:
                break;
        }

            l1[index].text = Singleton.Instance.l1.ToString();
        }
       
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
