#define _WINSOCK_DEPRECATED_NO_WARNINGS
#include <iostream>
#include <ctime>
#include "ErrorHandling.h"
#include "Winsock2.h"  
#pragma comment(lib, "WS2_32.lib")   // экспорт  WS2_32.dll

using namespace std;

bool GetRequestFromClient(char*, short, struct sockaddr*, int*);
bool PutAnswerToClient(char*, short, struct sockaddr*, int*);
void SearchServer(char*);
int main()
{
    WSADATA wsaData;
    SOCKET sS;
    SOCKET allS;
    SOCKADDR_IN serv;
    SOCKADDR_IN from;

    char name[50] = "Hello";
    serv.sin_family = AF_INET;           // используется IP-адресация  
    serv.sin_port = htons(2001);          // порт 2000
    serv.sin_addr.s_addr = INADDR_ANY;   // любой собственный IP-адрес 
    int servs = 0;
    memset(&from, 0, sizeof(from));   // обнулить память
    int lfrom = sizeof(from);


    try
    {
        if (WSAStartup(MAKEWORD(2, 0), &wsaData) != 0)
            throw  SetErrorMsgText("Startup:", WSAGetLastError());


        if ((allS = socket(AF_INET, SOCK_DGRAM, NULL)) == INVALID_SOCKET)
            throw  SetErrorMsgText("Socket:", WSAGetLastError());

        cout << "[INFO] Looking for servers\n";
        SearchServer(name);

        if (closesocket(allS) == SOCKET_ERROR)
            throw  SetErrorMsgText("closesocket:", WSAGetLastError());

        if ((sS = socket(AF_INET, SOCK_DGRAM, NULL)) == INVALID_SOCKET)
            throw  SetErrorMsgText("socket:", WSAGetLastError());
        if (bind(sS, (LPSOCKADDR)&serv, sizeof(serv)) == SOCKET_ERROR)
            throw  SetErrorMsgText("bind:", WSAGetLastError());
        do
        {
            if (GetRequestFromClient(name, sS, (sockaddr*)&from, &lfrom))
            {
                cout << endl;
                cout << "[INFO] Client Socket:" << endl;
                cout << "[INFO] IP: " << inet_ntoa(from.sin_addr) << endl;
                cout << "[INFO] Port: " << htons(from.sin_port) << endl;
                cout << endl;
                if (PutAnswerToClient(name, sS, (sockaddr*)&from, &lfrom))
                {
                    cout << "[OK] Sent message to client" << endl;
                }
            }
            else
                cout << "[ERROR] Incorrect callname" << endl;
        } while (true);

        if (closesocket(sS) == SOCKET_ERROR)
            throw  SetErrorMsgText("CloseSocket:", WSAGetLastError());
        if (WSACleanup() == SOCKET_ERROR)
            throw  SetErrorMsgText("Cleanup:", WSAGetLastError());
    }
    catch (string errorMsgText)
    {
        cout << "\n" << errorMsgText << endl;
    }
}

bool GetRequestFromClient(char* name, short port, struct sockaddr* from, int* flen)
{
    int lbuf;
    char ibuf[50] = "";
    cout << "[INFO] Waiting for callname trade" << endl;
    while (true)
    {
        if (lbuf = recvfrom(port, ibuf, sizeof(ibuf), NULL, from, flen) == SOCKET_ERROR)
        {
            if (WSAGetLastError() == WSAETIMEDOUT)
                return false;
            else
                throw SetErrorMsgText("recvfrom: ", WSAGetLastError());
        }
        if (strcmp(ibuf, name) == 0)
            return true;
        else
            return false;
    }
}

bool PutAnswerToClient(char* name, short port, struct sockaddr* to, int* lto)
{
    int lbuf;
    if (lbuf = sendto(port, name, strlen(name) + 1, NULL, to, *lto) == SOCKET_ERROR)
        throw SetErrorMsgText("sendto: ", WSAGetLastError());
    return true;
}
void SearchServer(char* name)
{
    SOCKADDR_IN from;
    memset(&from, 0, sizeof(from));
    int lfrom = sizeof(from);
    SOCKET sock;
    int lbuf;
    int optval = 3000;
    if ((sock = socket(AF_INET, SOCK_DGRAM, NULL)) == INVALID_SOCKET)
    {
        throw SetErrorMsgText("socket: ", WSAGetLastError());
    }
    if (setsockopt(sock, SOL_SOCKET, SO_BROADCAST, (char*)&optval, sizeof(optval)) == SOCKET_ERROR)
        throw SetErrorMsgText("opt: ", WSAGetLastError());
    SOCKADDR_IN all;
    all.sin_family = AF_INET;
    all.sin_port = htons(2001);
    all.sin_addr.s_addr = INADDR_BROADCAST;
    char ibuf[50];
    if (lbuf = sendto(sock, name, strlen(name) + 1, NULL, (sockaddr*)&all, sizeof(all)) == SOCKET_ERROR)
    {
        throw SetErrorMsgText("sendto: ", WSAGetLastError());
    }
    if (setsockopt(sock, SOL_SOCKET, SO_RCVTIMEO, (char*)&optval, sizeof(optval)) == SOCKET_ERROR)
        throw SetErrorMsgText("opt: ", WSAGetLastError());
    if (lbuf = recvfrom(sock, ibuf, sizeof(ibuf), NULL, (sockaddr*)&from, &lfrom) == SOCKET_ERROR)
    {
        if (WSAGetLastError() != WSAETIMEDOUT)
            throw SetErrorMsgText("recvfrom: ", WSAGetLastError());
    }
    if (lbuf == 0)
    {
        cout << "[INFO] Server socket: " << endl;
        cout << "[INFO] IP: " << inet_ntoa(from.sin_addr) << endl;
        cout << "[INFO] Port: " << htons(from.sin_port) << endl;
    }
    if (closesocket(sock) == SOCKET_ERROR)
    {
        throw SetErrorMsgText("closesocket: ", WSAGetLastError());
    }
}