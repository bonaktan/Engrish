@echo off
C:
cd C:/bon/Cache
powershell -command "Expand-Archive -Force 'C:\bon\Cache\engrish.zip' 'C:\bon\Engrish'"
cd ../Engrish/Engrish-main
npm install
cd components
"C:\Program Files\Python\3.11\python.exe" -m venv .venv
source .venv/Scripts/Activate
pip install -r requirements.txt
python components.py
echo If this exited without any error, you're ready to go