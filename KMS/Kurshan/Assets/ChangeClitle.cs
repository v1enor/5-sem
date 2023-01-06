using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class ChangeClitle : MonoBehaviour
{
    [SerializeField]
    public GameObject ScaleRotate;

    public float speed = 19.6f;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame

    private bool isRightMouseButtonHeld = false, isLeftMouseButtonHeld = false;
    public void DownButton()
    {
        if (Input.GetMouseButton(1))
        {
            isRightMouseButtonHeld = true;
        }

        if (Input.GetMouseButton(0))
        {
            isLeftMouseButtonHeld = true;
        }


    }


    public void UpMouse()
    {
        if (isRightMouseButtonHeld)
        {
            isRightMouseButtonHeld = false;
        }

        if (isLeftMouseButtonHeld)
        {
            isLeftMouseButtonHeld = false;
        }

    }

    void Update()
    {
        float zRotation = ScaleRotate.transform.rotation.eulerAngles.z - 90f;
        if (zRotation < 60f & zRotation > -60f)
        {

            Singleton.Instance.AddedC = (zRotation / -20f) + 5;
            if (isRightMouseButtonHeld & zRotation < 58f)
            {
                ScaleRotate.transform.Rotate(0,0, speed * Time.deltaTime);
            }
            else if (isLeftMouseButtonHeld & zRotation > -58f)
            {
                ScaleRotate.transform.Rotate(0, 0, -speed * Time.deltaTime);
            }
        }

    }
}
