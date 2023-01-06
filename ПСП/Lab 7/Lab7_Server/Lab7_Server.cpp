#include <iostream>
#include <Windows.h>
using namespace std;

string GetMailslotErrorText(int code);
string SetMailslotError(string Text, int code);

int main()
{
	HANDLE hM;
	try
	{
		if ((hM = CreateMailslot(TEXT("\\\\.\\mailslot\\mymailslot"), 300, 180000, NULL)) == INVALID_HANDLE_VALUE)
			throw SetMailslotError("Create", GetLastError());

		char rbuf[50];
		DWORD rb;
		while (1)
		{
			if (!ReadFile(hM, rbuf, sizeof(rbuf), &rb, NULL))
				throw SetMailslotError("Read", GetLastError());
			cout << rbuf << endl;
		}

		if (!CloseHandle(hM))
			throw SetMailslotError("Close handle", GetLastError());
	}
	catch (string ex)
	{
		cout << ex << endl;
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