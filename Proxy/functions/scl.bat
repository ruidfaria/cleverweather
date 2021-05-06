rmdir /Q /S "node_modules"
rmdir /Q /S "dist"
rmdir /Q /S "build"
rmdir /Q /S "electronBuilder"
del package-lock.json
call npm-upgrade

pause