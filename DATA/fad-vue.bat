@echo off
echo [%DATE% %TIME%] Starting Vue project... >> "C:\Users\wizfi\OneDrive\Desktop\log.txt"
D:
cd "D:\Project\2024\FAD"
start /B npm run dev 
echo [%DATE% %TIME%] Vue Run in port 3000. >> "C:\Users\wizfi\OneDrive\Desktop\log.txt"


