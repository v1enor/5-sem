using UnityEngine;
using UnityEngine.EventSystems;

public class SetCat : MonoBehaviour, IPointerClickHandler
{
    private bool open = false;
    // Start is called before the first frame update
    private Animator mAnimator;
    void Start()
    {
       
    }

    public void OnPointerClick(PointerEventData eventData)
    {


        mAnimator= GetComponent<Animator>();



        if (Singleton.Instance.CatSETNAME == mAnimator.name || Singleton.Instance.CatSETNAME == null)
        {
           
            
            open = !open;
            GetComponent<Animator>().SetBool("CatSET", open);
            GetComponent<Animator>().SetBool("CatUNSET", !open);
            Singleton.Instance.CatSETNAME = mAnimator.name;
            if(!open)
            { Singleton.Instance.CatSETNAME = null; }
          

        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
