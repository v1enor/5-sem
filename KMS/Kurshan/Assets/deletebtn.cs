using System.Collections;
using System.Collections.Generic;
using TMPro;
using UnityEngine;

public class deletebtn : MonoBehaviour
{
    
    // Start is called before the first frame update
    void Start()
    {
        


    }

    public void OnPointerClick()
    {
        GameObject[] textObjects = GameObject.FindGameObjectsWithTag("textes");
        foreach (GameObject textObject in textObjects)
        {
            TMP_Text textComponent = textObject.GetComponent<TMP_Text>();
            textComponent.text = "";
            // Теперь вы можете работать с компонентом TMP_Text
        }
    }
    // Update is called once per frame
    void Update()
    {
        
    }
}
