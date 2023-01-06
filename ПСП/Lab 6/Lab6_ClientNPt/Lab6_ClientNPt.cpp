#define _CRT_SECURE_NO_WARNINGS

#include <iostream>
#include <Windows.h>
using namespace std;

string SetPipeError(string Text, int code);
string GetPipeErrorText(int code);
//PIPE_TYPE_MESSAGE необходимый флаг
int main()
{
	HANDLE hPipe;
	Sleep(100);
	try
	{
		if ((hPipe = CreateFile(TEXT("\\\\.\\pipe\\NamedPipe"), GENERIC_READ | GENERIC_WRITE, FILE_SHARE_READ | FILE_SHARE_WRITE, NULL, OPEN_EXISTING, NULL, NULL)) == INVALID_HANDLE_VALUE)
			throw SetPipeError("createfile:", GetLastError());

		DWORD dwMode = PIPE_READMODE_MESSAGE;
		if (!SetNamedPipeHandleState(hPipe, &dwMode, NULL, NULL)) // меняем характеристики канала
			throw SetPipeError("set:", GetLastError());

		DWORD d;
		int max;
		char p[5];
		cout << "Enter amount of messages" << endl;
		cin >> max;
		_itoa(max, p, 10);
		if (!WriteFile(hPipe, p, strlen(p), &d, NULL))
			throw SetPipeError("write:", GetLastError());
		for (int i = 1; i <= max; i++) {
			char buf[50] = "Hello it's me";
			strcat(buf, _itoa(i, p, 10));
			if (!TransactNamedPipe(hPipe, buf, strlen(buf), buf, sizeof(buf), &d, NULL)) // писать и читать с данные канала
				throw SetPipeError("transact:", GetLastError()); // чтение и запись за одну операцию
			cout << buf << endl;
		}

		if (!CloseHandle(hPipe))
			throw SetPipeError("close:", GetLastError());

		cout << endl;
		system("pause");
	}
	catch (string ErrorPipeText)
	{
		cout << endl << ErrorPipeText;
		system("pause");
	}
}

string GetPipeErrorText(int code)
{
	string Text;
	switch (code)
	{
	case ERROR_PIPE_CONNECTED: Text = "ERROR_PIPE_CONNECTED"; break;
	case ERROR_BROKEN_PIPE: Text = "ERROR_BROKEN_PIPE"; break;
	case ERROR_PIPE_BUSY: Text = "ERROR_PIPE_BUSY"; break;
	case ERROR_PIPE_LISTENING: Text = "ERROR_PIPE_LISTENING"; break;
	case ERROR_CANNOT_IMPERSONATE: Text = "ERROR_CANNOT_IMPERSONATE"; break;
	case ERROR_PIPE_LOCAL: Text = "ERROR_PIPE_LOCAL"; break;
	case ERROR_BAD_PIPE: Text = "ERROR_BAD_PIPE"; break;
	case ERROR_NO_DATA: Text = "ERROR_NO_DATA"; break;
	case ERROR_PIPE_NOT_CONNECTED: Text = "ERROR_PIPE_NOT_CONNECTED"; break;
	default: Text = "***ERROR***"; break;
	};
	return Text;
};

string SetPipeError(string Text, int code)
{
	cout << code << endl;
	return Text + GetPipeErrorText(code);
}