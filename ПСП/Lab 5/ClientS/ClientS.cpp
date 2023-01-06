#include <iostream>
#include "Winsock2.h"
#pragma comment (lib, "WS2_32.lib")
#pragma warning(disable:4996)
using namespace std;




string GetErrorMsgText(int code)
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









const int PORT = 2000;
SOCKET cC;



bool GetServerByName(
	char* name,					// [in] имя компьютера в сети
	char* call,					// [in] позывной сервера  
	struct sockaddr* from,		// [out] указатель на SOCKADDR_IN
	int* flen					// [out] указатель на размер from 
)
{
	memset(from, 0, sizeof(flen));
	int optval = 1, lb = 0, lobuf = 0;
	char clientCall[50];
	hostent* host = gethostbyname(name);		// получить инфу о сервере в hostent по его имени
	in_addr* addr_list = (in_addr*)*(host->h_addr_list);	// список адресов


	try
	{
		if ((cC = socket(AF_INET, SOCK_DGRAM, NULL)) == INVALID_SOCKET)
			throw SetErrorMsgText("socket:", WSAGetLastError());

		if (setsockopt(cC, SOL_SOCKET, SO_BROADCAST, (char*)&optval, sizeof(int)) == SOCKET_ERROR)
			throw SetErrorMsgText("opt:", WSAGetLastError());

		SOCKADDR_IN all;                        // параметры сокета
		all.sin_family = AF_INET;               // используется IP-адресация  
		all.sin_port = htons(PORT);				// порт 2000
		all.sin_addr = *addr_list;				// адрес по имени


		
		if ((lb = sendto(cC, call, strlen(call) + 1, NULL, (sockaddr*)&all, sizeof(all))) == SOCKET_ERROR)
			throw SetErrorMsgText("sendto:", WSAGetLastError());
		cout << "[OK] Sent message: " << call << "\n";


		if ((recvfrom(cC, clientCall, sizeof(clientCall), NULL, from, flen)) == SOCKET_ERROR)
		{
			if (WSAGetLastError() == WSAETIMEDOUT)
				return false;
			else
				throw SetErrorMsgText("recv:", WSAGetLastError());
		}
		cout << "[OK] Received message: " << clientCall << "\n";



		if (!strcmp(clientCall, call))
			cout << "[OK] Found server with callname: " << call << "\n\n";
		else
		{
			cout << "[ERROR] Did not found server with callname: " << call << "\n\n";
			return false;
		}

		

		SOCKADDR_IN* server = (SOCKADDR_IN*)&from;
		cout << "[INFO] Server name:  " << host->h_name << "\n";
		cout << "[INFO] Server IP:    " << inet_ntoa(server->sin_addr) << "\n";
		cout << "[INFO] Server port:  " << server->sin_port << "\n\n";

		return true;

	}
	catch (string errorMsgText)
	{
		cout << "\n[FATAL] WSAGetLastError: " << errorMsgText << "\n\n";
	}
}









int main()
{
	// 0.
	setlocale(LOCALE_ALL, "ru");
	WSADATA wsaData;
	SOCKADDR_IN clnt;
	int lc = sizeof(clnt);
	char name[] = "pcina";
	char call[] = "Hello";


	// 1.
	if (WSAStartup(MAKEWORD(2, 2), &wsaData) != 0)
		throw  SetErrorMsgText("Startup:", WSAGetLastError());


	// send broadcast to all servers, found by their name
	GetServerByName(name, call, (sockaddr*)&clnt, &lc);



	// 5.
	if (closesocket(cC) == SOCKET_ERROR)
		throw  SetErrorMsgText("closesocket:", WSAGetLastError());
	if (WSACleanup() == SOCKET_ERROR)
		throw SetErrorMsgText("Cleanup:", WSAGetLastError());
}