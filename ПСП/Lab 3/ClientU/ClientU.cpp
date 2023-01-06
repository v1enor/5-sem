#include <iostream>
#include <clocale>
#include <ctime>
#include "Winsock2.h"
#pragma comment (lib, "WS2_32.lib")
#pragma warning(disable:4996)
using namespace std;





string  GetErrorMsgText(int code)  
{
	string msgText;
	switch (code)                  
	{
	case WSAEINTR:          msgText = "WSAEINTR";         break;
	case WSAEACCES:         msgText = "WSAEACCES";        break;
	case WSASYSCALLFAILURE: msgText = "WSASYSCALLFAILURE"; break;
	default:                msgText = "***ERROR***";      break;
	};
	return msgText;
};



string SetErrorMsgText(string msgText, int code)
{
	return msgText + GetErrorMsgText(code);
}





int main()
{
	SOCKET  cC;
	WSADATA wsaData;
	try
	{

		int count;
		cout << "Enter number of messages:\n";
		cin >> count;



		// 1.
		if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
			throw  SetErrorMsgText("Startup:", WSAGetLastError());


		// 2.
		if ((cC = socket(AF_INET, SOCK_DGRAM, NULL)) == INVALID_SOCKET)
			throw  SetErrorMsgText("socket:", WSAGetLastError());


		// 3.
		SOCKADDR_IN serv;
		serv.sin_family = AF_INET;
		serv.sin_port = htons(2000); 
		//								127.0.0.1
		//								192.168.0.4
		serv.sin_addr.s_addr = inet_addr("192.168.88.108");
		char obuf[50] = "Hello from ClientU";
		int  lobuf = 0;
		int lc = sizeof(serv);




		// =======================  TASK 7  =======================

		int time = clock();
		for (int i = 0; i < count; i++)
		{
			if ((lobuf = sendto(cC, obuf, strlen(obuf) + 1, NULL, (sockaddr*)&serv, sizeof(serv))) == SOCKET_ERROR)
				throw  SetErrorMsgText("sendto:", WSAGetLastError());
			if (lobuf = recvfrom(cC, obuf, sizeof(obuf), NULL, (sockaddr*)&serv, &lc) == SOCKET_ERROR)
				throw  SetErrorMsgText("recv:", WSAGetLastError());
			cout << obuf << " " << i << endl;
		}
		cout << "\nProgram was running for " << time << " ticks or " << ((float)time) / CLOCKS_PER_SEC << " seconds.\n";





		// 5.
		if (closesocket(cC) == SOCKET_ERROR)
			throw  SetErrorMsgText("closesocket:", WSAGetLastError());
		if (WSACleanup() == SOCKET_ERROR)
			throw SetErrorMsgText("Cleanup:", WSAGetLastError());
	}
	catch (string errorMsgText)
	{
		cout << endl << "WSAGetLastError: " << errorMsgText;
	}
}
