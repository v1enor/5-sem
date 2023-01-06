using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class SetSample : MonoBehaviour, IPointerClickHandler
{
    private bool set = false;
    // Start is called before the first frame update
    private Animator mAnimator;
    // Start is called before the first frame update
    void Start()
    {

    }

    public void OnPointerClick(PointerEventData eventData)
    {

        mAnimator = GetComponent<Animator>();



        if (Singleton.Instance.SampleSETNAME == mAnimator.name || Singleton.Instance.SampleSETNAME == null)
        {
            set = !set;
            Singleton.Instance.SampleSet = set;
            var numbsamp = GetComponent<Animator>().name;

            Singleton.Instance.NumberSample = int.Parse(numbsamp[numbsamp.Length - 1].ToString());
            GetComponent<Animator>().SetBool("Set", set);
            GetComponent<Animator>().SetBool("Remove", !set);
            Singleton.Instance.SampleSETNAME = mAnimator.name;
            if (!set)
            { Singleton.Instance.SampleSETNAME = null; }

        }
    }
        // Update is called once per frame
    void Update()
    {
        
    }
}
