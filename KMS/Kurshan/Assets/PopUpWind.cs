
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
        Close(); //  ������� ����������� ���� ��� ������� ���������  
        panel.SetActive(false);
    }

    public void Open(bool FAQEnable)
    {
        gameObject.SetActive(true); //   ������������ ������, ����� ������� ����.
        FAQ.enabled = FAQEnable;
        PracticText.enabled = !FAQEnable;
    }

    public void Close()
    {
        gameObject.SetActive(false); // �������������� ������, ����� ������� ����.  

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
