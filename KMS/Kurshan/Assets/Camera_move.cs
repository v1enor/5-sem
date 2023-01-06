
using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;
using static UnityEngine.GraphicsBuffer;

public class Camera_move : MonoBehaviour
{

    [SerializeField]
    float scrollSpeed = 80f;
    [SerializeField]
    int sensivity = 1, cameraSpeed = 2;
    [SerializeField]
    Transform DefaultCamera, targetPos, QmetrArrow;
    [SerializeField]
    GameObject img;
    Transform CameraToMove;


    bool move = false;

    float speed = 1f;
    float offset = 0;


    int maxdistance = 210;
    int mindistance = 50;

    int maxdistanceY = 100;
    int mindistanceY = 0;


    bool ControlDistance(float distance)
    {
        //return true;
        if (distance > mindistance && distance < maxdistance) return true;
        return false;
    }

    bool ControlDistanceVertical(float distance)
    {
        if (distance > mindistanceY && distance < maxdistanceY) return true;
        return false;
    }


    public void ToTargertMove(Transform CameraPosition)
    {
            offset = 0;
            CameraToMove = CameraPosition;
            move = true;   
    }


    void Start()
    {
        transform.position = DefaultCamera.position;
        img.SetActive(false);



    }

    private void FixedUpdate()
    {
        if (move)
        {
            offset += speed * Time.deltaTime;
            transform.position = Vector3.Lerp(transform.position, CameraToMove.position, offset);
            transform.rotation = Quaternion.Slerp(transform.rotation, CameraToMove.rotation, offset);
            if (offset >= 1)
            {
                offset = 0;
                move = false;
            }
        }

        float x = Input.GetAxis("Horizontal"); // кнопки A D
        float y = Input.GetAxis("Vertical"); // кнопки W S

        if (x != 0 || y != 0)
        {
            Vector3 newpos = transform.position + (transform.TransformDirection(new Vector3(x, 0, 0)) + Vector3.up * y) / sensivity;
            if (ControlDistance(Vector3.Distance(newpos, targetPos.position))) transform.position = newpos;
        }

        if (Input.GetAxis("Mouse ScrollWheel") != 0)
        {
            Vector3 newpos = transform.position + transform.TransformDirection(Vector3.forward * Input.GetAxis("Mouse ScrollWheel") * scrollSpeed);
            if (ControlDistance(Vector3.Distance(newpos, targetPos.position)))
                transform.position = newpos;
        }

        if (Input.GetMouseButton(1))
        {
            transform.RotateAround(targetPos.position, Vector3.up, Input.GetAxis("Mouse X") * sensivity);
            // transform.Rotate(Vector3.left*Input.GetAxis("Mouse Y")*sensivity);            
        }

    }

    


    // Update is called once per frame
    void Update()
    {
        float zRotation = Singleton.Instance.QmetrRotate;

        if (zRotation > -60f & zRotation < 60f)
        {
            QmetrArrow.transform.localEulerAngles = new Vector3(zRotation, 0, 0);
        }
        //float x = Input.GetAxis("Horizontal"); // кнопки A D
        //float y = Input.GetAxis("Vertical"); // кнопки W S

        //if ((x != 0 || y != 0) & !move)
        //{
        //    Vector3 newpos = transform.position + (transform.TransformDirection(new Vector3(x, 0, 0)) + Vector3.up * y) / sensivity;
        //    //if (ControlDistanceVertical(Vector3.Distance(newpos, targetPos.position))) 
        //    transform.position = newpos;
        //}

        //if (Input.GetAxis("Mouse ScrollWheel") != 0 & !move)
        //{
        //    Vector3 newpos = transform.position + transform.TransformDirection(Vector3.forward * Input.GetAxis("Mouse ScrollWheel") * scrollSpeed);
        //    //if (ControlDistance(Vector3.Distance(newpos, targetPos.position)))
        //        transform.position = newpos;
        //}

        //if (Input.GetMouseButton(1) & !move)
        //{
        //    transform.RotateAround(targetPos.position, Vector3.up, Input.GetAxis("Mouse X") * sensivity);
        //    transform.Rotate(Vector3.left * Input.GetAxis("Mouse Y") * sensivity);
        //}
    }
}
