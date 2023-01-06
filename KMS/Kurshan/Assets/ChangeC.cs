using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.Common;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UIElements;

public class ChangeC : MonoBehaviour
{
    [SerializeField]
    public GameObject MarkerMove;

    public float speed =2.7f;
    // Start is called before the first frame update
    void Start()
    {

    }



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

    void FixedUpdate()
    {
        float zPosition = Math.Abs(MarkerMove.transform.localPosition.z - 450f);
        
        Debug.Log(zPosition);
        if(zPosition < 1135f & zPosition > 1f)
        {
            Singleton.Instance.QmetrRotate = 
                Math.Abs((Singleton.Instance.Extremum + Singleton.Instance.AddedC - zPosition) / Singleton.Instance.Multiplire * 1.83f) - 55f;

            if (isRightMouseButtonHeld & zPosition < 1130f)
            {

                MarkerMove.transform.Translate(0f, 0f,- (speed * Time.deltaTime));

            }
            else if (isLeftMouseButtonHeld & zPosition > 5f)
            {
           
                MarkerMove.transform.Translate(0f, 0f, speed * Time.deltaTime);
            }

        }

    }

    
}