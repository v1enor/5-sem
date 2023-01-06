using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class CatodScript : MonoBehaviour, IPointerClickHandler
{
    [SerializeField]
    public GameObject Catod, Scale;

    private Animator mAnimator, ScaleAnimator;
    
    private bool zero = false;
    private bool sample = false;
    // Start is called before the first frame update
    void Start()
    {
        
    }

    public void OnPointerClick(PointerEventData eventData)
    {
        mAnimator = Catod.GetComponent<Animator>();
        ScaleAnimator = Scale.GetComponent<Animator>();
        zero= !zero;
        if (!Singleton.Instance.SampleSet) 
        {
            Singleton.Instance.ZeroSet = true;
            mAnimator.SetBool("ToZero", zero);
            mAnimator.SetBool("Default", !zero);
            ScaleAnimator.SetBool("ScaleToZero", zero);
            ScaleAnimator.SetBool("ScaleToDefaulte", !zero);
        }
        else if (Singleton.Instance.SampleSet) 
        {
            mAnimator.SetBool("ToSample", zero);
            mAnimator.SetBool("ToDefaultSample", !zero);
            ScaleAnimator.SetBool("ScaleToSample", zero);
            ScaleAnimator.SetBool("ScaleToDefaulteSample", !zero);
        }

    }


    // Update is called once per frame
    void Update()
    {
        
    }
}
