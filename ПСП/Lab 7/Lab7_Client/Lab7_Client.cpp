#define _CRT_SECURE_NO_WARNINGS

#include <iostream>
#include <string>
#include <Windows.h>
#include <ctime> 
using namespace std;

string GetMailslotErrorText(int code);
string SetMailslotError(string Text, int code);

int main()
{
	HANDLE hM;
	Sleep(100);
	try
	{
		if ((hM = CreateFile(TEXT("\\\\.\\mailslot\\mymailslot"), GENERIC_WRITE, FILE_SHARE_READ, NULL, OPEN_EXISTING, NULL, NULL)) == INVALID_HANDLE_VALUE)
			throw SetMailslotError("Create", GetLastError());

		srand(static_cast<unsigned int>(time(0)));
		int r;
		//r = rand();

		cin >>  r;
		char b[33] = "";
		char wbuf[50] = "Hello, It's me ";

		DWORD wb;
		//strcat(wbuf, _itoa(r, b, 10));

		for (int i = 0; i < r; i++)

			if (!WriteFile(hM, wbuf, sizeof(wbuf), &wb, NULL))
				throw SetMailslotError("Write", GetLastError());

		if (!CloseHandle(hM))
			throw SetMailslotError("Close handle", GetLastError());

		system("pause");
	}
	catch (string ex)
	{
		cout << ex << endl;
		system("pause");
	}
}

string GetMailslotErrorText(int code)
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

string SetMailslotError(string Text, int code)
{
	cout << code;
	return Text + GetMailslotErrorText(code);
}
