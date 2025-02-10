@echo off
C:
cd C:\
mkdir bon
cd bon
mkdir Cache
cd cache
echo Download Java at this link: https://www.java.com/en/download/windows_offline.jsp
echo Downloading Python 3.11.9
curl https://www.python.org/ftp/python/3.11.9/python-3.11.9-amd64.exe --output python.exe
echo Downloading Node.js
curl https://nodejs.org/dist/v22.13.1/node-v22.13.1-x64.msi --output nodejs.msi
echo Downloading ENGRISH
curl -L https://github.com/bonaktan/Engrish/archive/refs/heads/main.zip --output engrish.zip
echo Install on C:\Program Files\Python\3.11
python.exe
nodejs.msi
echo Install Java Manually, then run setup2.cmd