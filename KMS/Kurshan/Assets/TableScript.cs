using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class TableScript : MonoBehaviour
{
    [SerializeField]
    GameObject table;
    // Start is called before the first frame update
    void Start()
    {
        table.SetActive(false);
    }

    public void PointerClick()
    {

        table.SetActive(!table.activeSelf);

    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
