echo off
CLS
echo Close this window to shut the site down

cd .next
if exist BUILD_ID (
  cd ..
  start EXHELP.bat
  npm start
) else (
  cd ..
  npm run build
  CLS
  echo Close this window to shut the site down
  start EXHELP.bat
  npm start
)