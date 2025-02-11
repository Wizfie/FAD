
echo  [%DATE% %TIME%] Starting Express project... >> "C:\Users\wizfi\OneDrive\Desktop\log.txt"
D:
cd "D:\Project\2024\FAD\server"
npm run dev 
start /B npm run dev >> "C:\Users\wizfi\OneDrive\Desktop\log.txt" 
echo [%DATE% %TIME%] Express run port 5000 >> "C:\Users\wizfi\OneDrive\Desktop\log.txt"
