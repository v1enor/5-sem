using System.Collections;
using System.Collections.Generic;
using Unity.VisualScripting;
using UnityEngine;
using UnityEngine.EventSystems;

public class Power : MonoBehaviour, IPointerClickHandler
{
    private bool open = false;
    [SerializeField]
    GameObject Light;
    // Start is called before the first frame update
    void Start()
    {
        
    }
    public void OnPointerClick(PointerEventData eventData)
    {
        open = !open;
        GetComponent<Animator>().SetBool("PowerON", open);
        GetComponent<Animator>().SetBool("PowerOFF", !open);
        Light.GetComponent<Animator>().SetBool("LigthON", open);
        Light.GetComponent<Animator>().SetBool("LigthOFF", !open);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
