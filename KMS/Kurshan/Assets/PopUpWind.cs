
using TMPro;

using UnityEngine;

public class PopUpWind : MonoBehaviour
{
    [SerializeField]
    TMP_Text FAQ,PracticText;
    [SerializeField]
    GameObject panel;
    // Start is called before the first frame update
    void Start()
    {
        Close(); //  гюйпшрэ бяокшбючыее нймн опх гюосяйе опнцпюллш  
        panel.SetActive(false);
    }

    public void Open(bool FAQEnable)
    {
        gameObject.SetActive(true); //   юйрхбхпнбюрэ назейр, врнаш нрйпшрэ нймн.
        FAQ.enabled = FAQEnable;
        PracticText.enabled = !FAQEnable;
    }

    public void Close()
    {
        gameObject.SetActive(false); // деюйрхбхпнбюрэ назейр, врнаш гюйпшрэ нймн.  

    }

    public void OnEnter()
    {
        panel.SetActive(true);
    }

    public void OnExitPlane() 
    { 
        panel.SetActive(false);
    }
}
