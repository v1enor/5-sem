using System.Collections;
using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using TMPro;
using Unity.VisualScripting;
using UnityEditor;

using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.UI;
using UnityEngine.UIElements;
using Button = UnityEngine.UI.Button;

public class PointEnterInfo : MonoBehaviour
{

    [SerializeField]
    TMP_Text info_message;
    [SerializeField]
    GameObject plane;
    [SerializeField]
    GameObject InfoPlane;
    public Material[] materials;
    public Color hoverColor;
    private Color[] defaultColors;
    public GameObject[] gameobjects;
    public string tag;
    private string PreviousButton = "";
    public bool ShangeColorEnd;
    private bool open = false;
    [SerializeField]
    GameObject Light, PowerSet;




    public void POWERCLIKSET()
    {
        open = !open;
        PowerSet.GetComponent<Animator>().SetBool("PowerON", open);
        PowerSet.GetComponent<Animator>().SetBool("PowerOFF", !open);
        Light.GetComponent<Animator>().SetBool("LigthON", open);
        Light.GetComponent<Animator>().SetBool("LigthOFF", !open);
    }



    // Start is called before the first frame update
    void Start()
    {
        InfoPlane.SetActive(false);
        plane.SetActive(false);
    }

    void SaveMaterials(string tag)
    {

        gameobjects = GameObject.FindGameObjectsWithTag(tag);

        defaultColors = new Color[gameobjects.Length];

        for (int i = 0; i < gameobjects.Length; i++)
        {
            defaultColors[i] = gameobjects[i].GetComponent<Renderer>().material.color;
        }
    }
    


    public void PointerEnter(Button button)
    {
        //Получение название кнопки
        var text  = button.GetComponentInChildren<TMP_Text>().text;

        plane.SetActive(true);

        //На основе текста кнопки выо
        switch (text)
        {
           
            case "Измеритель добротности":
                info_message.text = "Измеритель добротнисти Е4-7 измеритель добротности предназначен для измерения эффективной добротности объектов " +
                                    "индуктивного характера, а также резонансной емкости этих объектов и резонансной частоты контуров.";
                tag = "Cum";
                break;
                
            case "Образцы катушек":
                info_message.text = "Набор катушек индуктивности с возможными частотными диапозонами от 50 кГц до 12 МГц"; 
                tag = "Catushca_samples";
                break; 

            case "Гнездо куметра":
                info_message.text = "Место посадки катушки индуктивности"; 
                tag = "Seat_cum";
                break;

            case "Образцы материалов":
                info_message.text = "Образцы, выполненые из различных материалов с различной емкостью," +
                                    "их необходимо посадить между электродами";
                tag = "Samples";
                break;

            case "Микрометрический винт":
                info_message.text = " Винт, который имеет точную резьбу с малым шагом, необходим для измерения толщины образцов"; 
                tag = "Swit_mic";
                break;

            case "Верхний и нижний электроды":
                info_message.text = "Место посадки образцов из различных материалов"; 
                tag = "Electrodes";
                break;

            default:
                info_message.text = "";
                tag = "";
                break;
        }

        
            SaveMaterials(tag);
            ChangCol();
        
        
    }

    public void PointerClick(Button button)
    {
        var ButtonText = button.GetComponentInChildren<TMP_Text>().text;

        if (PreviousButton == ButtonText)
        {
            plane.SetActive(false);
            PreviousButton = "";
            return;
        }

        else 
        {
            plane.SetActive(true);

            switch (ButtonText)
            {
                case "Задание 1":
                    info_message.text = "Подготовьте таблицу для внесения результатов измерений.";
                    break;

                case "Задание 2":
                    info_message.text = "По инструкции в приложении к установке ознакомьтесь с назначением элементов управления на передней панели куметра, порядком его включения и проведения измерений.";
                    break;

                case "Задание 3":
                    info_message.text = "Вставте катушку номер 2, перейдя в вид образцы катушек и выбрав её ";
                    break;

                case "Задание 4":
                    info_message.text = "Включите установку, нажав кнопку 'ЗАПУСК'";
                    break;

                case "Задание 5":
                    info_message.text = "Осторожно вращая головку микрометрического винта в указанном направлении, опустите верхний подвижный электрод (обкладку конденсатора) до его соприкосновения с нижним электродом. Занесите в таблицу показание l1 микрометра.";
                    break;

                case "Задание 6":
                    info_message.text = "Вращая головку винта, поднимите верхний электрод и поместите между электродами образец, осторожно зажмите его до проворачивания трещотки и отметьте l2 . Определите толщину образца (d = l1 − l2).";
                    break;

                case "Задание 7":
                    info_message.text = "По инструкции куметра настройте его колебательный контур в резонанс по максимальному отклонению стрелки Q-вольтметра и занесите отсчет емкости С02 в таблицу.";
                    break;

                case "Задание 8":
                    info_message.text = "Удалите образец из ячейки и установите зазор между электродами, равный толщине образца d. Опять настройте контур в резонанс и определите отсчет С01.";
                    break;

                case "Задание 9":
                    info_message.text = "Повторите измерения по п. 6−8 для двух других образцов.";
                    break;

                case "Задание 10":
                    info_message.text = "По формуле (31.11) для каждого образца рассчитайте E(Эпсилон) и сравните их со справочными значениями.";
                    break;

                case "Задание 11":
                    info_message.text = "Подготовьте выводы по выполненной лабораторной работе.";
                    break;


                default:
                    info_message.text = "Неизвестное задание";
                    break;

            }

            PreviousButton = ButtonText;
        }   
        
    }
    public void PointerExit()
    {
        //ShangeColorEnd = true;
        ResetCol();
        plane.SetActive(false);
    }

    public void ChangCol()
    {
        GameObject[] magnetParts = GameObject.FindGameObjectsWithTag(tag);
       
        foreach (GameObject part in magnetParts) part.GetComponent<Renderer>().material.color = new Color(1, 0, 0);
        
    }

    public void ResetCol()
    {
        if (!string.IsNullOrEmpty(tag))
        {
            GameObject[] magnetParts = GameObject.FindGameObjectsWithTag(tag);
            for (int i = 0; i < magnetParts.Length; i++)
            {
                magnetParts[i].GetComponent<Renderer>().material.color = defaultColors[i];
            }
            tag = "";
        }
        
    }

    public void OnPointerEnterStart()
    {
        InfoPlane.SetActive(true);
    }

    public void OnPointerExitStart()
    {

        InfoPlane.SetActive(false);
        ResetCol();


    }


    // Update is called once per frame
    void Update()
    {
    }
}
