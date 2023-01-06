// ServerT.cpp : Этот файл содержит функцию "main". Здесь начинается и заканчивается выполнение программы.
//

#include <iostream>
#include <string>
#include "Winsock2.h"                // заголовок  WS2_32.dll
using namespace std;
#pragma comment(lib, "WS2_32.lib")   // экспорт  WS2_32.dll
#pragma warning(disable:4996)

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
    SOCKET  sS;
    WSADATA wsaData;
    try
    {
        if (WSAStartup(MAKEWORD(2, 0), &wsaData) != 0)
            throw  SetErrorMsgText("Startup:", WSAGetLastError());


        if ((sS = socket(AF_INET, SOCK_STREAM, NULL)) == INVALID_SOCKET)
            throw  SetErrorMsgText("socket:", WSAGetLastError());


		int i = 0;
		WSADATA ws;
		SOCKET s;
		SOCKET c;
		char ibuf[50];
		char obuf[50] = "Hello from Client";
		int t;

		if (FAILED(WSAStartup(MAKEWORD(1, 1), &ws)))
			cout << "socket:" << WSAGetLastError() << endl;
		if (INVALID_SOCKET == (s = socket(AF_INET, SOCK_STREAM, 0)))
			cout << "socket:" << WSAGetLastError() << endl;

		sockaddr_in c_adr;
		sockaddr_in s_adr;
		{
			s_adr.sin_port = htons(2000);
			s_adr.sin_addr.S_un.S_addr = inet_addr("192.168.0.4");
			s_adr.sin_family = AF_INET;
		}

		if (SOCKET_ERROR == (bind(s, (LPSOCKADDR)&s_adr, sizeof(s_adr))))
			cout << "bind:" << WSAGetLastError() << endl;

		if (SOCKET_ERROR == listen(s, 2))
			cout << "listen:" << WSAGetLastError << endl;


		while (true)
		{
			int lcInt = sizeof(c_adr);
			if (INVALID_SOCKET == (c = accept(s, (sockaddr*)&c_adr, &lcInt)))
				cout << "accept:" << WSAGetLastError() << endl;

			cout << "Client connected." << endl;
			cout << "Client IP:    " << inet_ntoa(c_adr.sin_addr) << endl;
			cout << "Client port:  " << htons(c_adr.sin_port) << "\n\n";

			int time = clock();
			while (true)
			{
				if (SOCKET_ERROR == recv(c, ibuf, sizeof(ibuf), NULL))
					break;

				cout << ibuf << " " << i << "\n";
				i++;

				if (!strcmp(ibuf, "CLOSE")) { break; }

				if (SOCKET_ERROR == send(c, obuf, strlen(obuf) + 1, NULL))
					break;
			}
			i = 0;
			cout << "Client Disconected.\n";
			cout << "Program was running for " << time << " ticks or " << ((float)time) / CLOCKS_PER_SEC << " seconds.\n\n";
		}
	}
    catch (string errorMsgText)
    {
        cout << endl  << errorMsgText;
    }
    return 0;

}


// Запуск программы: CTRL+F5 или меню "Отладка" > "Запуск без отладки"
// Отладка программы: F5 или меню "Отладка" > "Запустить отладку"

// Советы по началу работы 
//   1. В окне обозревателя решений можно добавлять файлы и управлять ими.
//   2. В окне Team Explorer можно подключиться к системе управления версиями.
//   3. В окне "Выходные данные" можно просматривать выходные данные сборки и другие сообщения.
//   4. В окне "Список ошибок" можно просматривать ошибки.
//   5. Последовательно выберите пункты меню "Проект" > "Добавить новый элемент", чтобы создать файлы кода, или "Проект" > "Добавить существующий элемент", чтобы добавить в проект существующие файлы кода.
//   6. Чтобы снова открыть этот проект позже, выберите пункты меню "Файл" > "Открыть" > "Проект" и выберите SLN-файл.
