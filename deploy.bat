cd Proxy
cd functions
call npm install
call tsc
cd ..
call firebase deploy

cd ..
cd Angular
call npm install
call ng build --prod
call firebase deploy

cd ..

pause