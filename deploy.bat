cd Proxy
rem tsc
rem call firebase deploy

cd ..
cd Angular
call ng build --prod
call firebase deploy

cd ..

pause