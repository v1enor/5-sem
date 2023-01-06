#include <iostream>
#include <Windows.h>
using namespace std;

string SetPipeError(string Text, int code);
string GetPipeErrorText(int code);

int main()
{
	HANDLE hPipe;
	while (1)
	{
		try
		{
			if ((hPipe = CreateNamedPipe(TEXT("\\\\.\\pipe\\NamedPipe"), PIPE_ACCESS_DUPLEX, PIPE_TYPE_MESSAGE | PIPE_WAIT | PIPE_READMODE_MESSAGE, 1, NULL, NULL, INFINITE, NULL)) == INVALID_HANDLE_VALUE)
				throw SetPipeError("create:", GetLastError()); // создаем именованый канал

			if (!ConnectNamedPipe(hPipe, NULL)) // соединить сервер с каналом
				throw SetPipeError("connect:", GetLastError());

			DWORD d;
			char buf[50] = "";
			int max;
			if (!ReadFile(hPipe, buf, sizeof(buf), &d, NULL)) // читать данные из канала
				throw SetPipeError("read:", GetLastError());
			max = atoi(buf);
			if (max == 0) {
				cout << buf << endl;
				if (!WriteFile(hPipe, buf, strlen(buf), &d, NULL)) // пишем данные в канал
					throw SetPipeError("write:", GetLastError());
			}
			for (int i = 0; i < max; i++) {
				if (!ReadFile(hPipe, buf, sizeof(buf), &d, NULL))
					throw SetPipeError("read:", GetLastError());
				cout << buf << endl;
				if (!WriteFile(hPipe, buf, strlen(buf), &d, NULL))
					throw SetPipeError("write:", GetLastError());
			}

			if (!DisconnectNamedPipe(hPipe)) // закончить обмен данными
				throw SetPipeError("disconnect:", GetLastError());

			if (!CloseHandle(hPipe))
				throw SetPipeError("close:", GetLastError());

		}
		catch (string ErrorPipeText)
		{
			cout << endl << ErrorPipeText;
		}
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
	cout << code;
	return Text + GetPipeErrorText(code);
}