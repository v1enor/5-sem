#include <iostream>
#include <string>
#include "Winsock2.h"                // заголовок  WS2_32.dll
using namespace std;
#pragma comment(lib, "WS2_32.lib")   // экспорт  WS2_32.dll
#pragma warning (disable: 4996)

string  GetErrorMsgText(int code)    // cформировать текст ошибки 
{
    string msgText;
    switch (code)                      // проверка кода возврата  
    {
    case WSAEINTR:          msgText = "WSAEINTR";         break;
    case WSAEACCES:         msgText = "WSAEACCES";        break;
        //..........коды WSAGetLastError ..........................
    case WSASYSCALLFAILURE: msgText = "WSASYSCALLFAILURE"; break;
    default:                msgText = "***ERROR***";      break;
    };
    return msgText;
};
string  SetErrorMsgText(string msgText, int code)
{
    return  msgText + GetErrorMsgText(code);
};

int main()
{
    SOCKET  cC;
    WSADATA wsaData;
    try
    {
        if (WSAStartup(MAKEWORD(2, 0), &wsaData) != 0)
            throw  SetErrorMsgText("Startup:", WSAGetLastError());


        if ((cC = socket(AF_INET, SOCK_STREAM, NULL)) == INVALID_SOCKET)
            throw  SetErrorMsgText("socket:", WSAGetLastError());

        SOCKADDR_IN serv;                     // параметры  сокета sS
        serv.sin_family = AF_INET;           // используется IP-адресация  
        serv.sin_port = htons(2000);          // порт 2000
        serv.sin_addr.s_addr = inet_addr("127.0.0.1");  // адрес сервера

        if ((connect(cC, (sockaddr*)&serv, sizeof(serv))) == SOCKET_ERROR)
            throw  SetErrorMsgText("connect:", WSAGetLastError());


        char ibuf[50],                      //буфер ввода 
            obuf[50];                       //буфер вывода
        int  libuf = 0,                     //количество принятых байт
            lobuf = 0,                      //количество отправленных байт
            count = 0;                      //количество иттераций

        cout << "Enter a number of itterations: ", cin >> count;

        char num[10],
            in[50];
        int t = clock();
        do
        {
            char out[50] = "Hello from Client ";
            _itoa(count, num, 10);
            strcat(out, num);
            if ((lobuf = send(cC, out, strlen(out) + 1, NULL)) == SOCKET_ERROR)
                throw  SetErrorMsgText("send:", WSAGetLastError());

            if ((libuf = recv(cC, in, sizeof(in), NULL)) == SOCKET_ERROR)
                throw  SetErrorMsgText("recv:", WSAGetLastError());


        } while (--count);

        cout << "Ticks: " << clock() - t << endl;
        string t55;
        cin >>  t55;

        if ((lobuf = send(cC, "", 1, NULL)) == SOCKET_ERROR)
            throw  SetErrorMsgText("send:", WSAGetLastError());




        if (closesocket(cC) == SOCKET_ERROR)
            throw  SetErrorMsgText("closesocket:", WSAGetLastError());

        if (WSACleanup() == SOCKET_ERROR)
            throw  SetErrorMsgText("Cleanup:", WSAGetLastError());

    }
    catch (string errorMsgText)
    {
        cout << endl << errorMsgText;
    }
    return 0;

}