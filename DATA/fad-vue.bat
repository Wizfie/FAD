
echo  [%DATE% %TIME%] Starting Express project... >> "D:\Wisfie\Project FAD\DataFad\log.txt"
D:
cd "D:\Wisfie\Project FAD\FAD"
npm run dev 
start /B npm run dev >> "D:\Wisfie\Project FAD\DataFad\log.txt" 
echo [%DATE% %TIME%] Express run port 5000 >> "D:\Wisfie\Project FAD\DataFad\log.txt"
