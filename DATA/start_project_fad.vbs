Set WshShell = CreateObject("WScript.Shell")
WshShell.Run """D:\Project\2024\FAD\start_vue.bat""", 0
WshShell.Run """D:\Project\2024\FAD\start_api.bat""", 0
Set WshShell = Nothing
