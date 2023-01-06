#define _CRT_SECURE_NO_WARNINGS

#include <iostream>
#include <Windows.h>
using namespace std;

string SetPipeError(string Text, int code);
string GetPipeErrorText(int code);

int main()
{
	HANDLE hPipe;
	Sleep(1000);
	try
	{
		DWORD d;
		char buf[50] = "Hello it's me";
		if (!CallNamedPipe(TEXT("\\\\.\\pipe\\NamedPipe"), buf, strlen(buf), buf, sizeof(buf), &d, NULL))
			throw SetPipeError("call:", GetLastError()); // выполнить транзакцию
		cout << buf << endl;
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