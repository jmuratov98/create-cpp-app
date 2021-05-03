@ECHO OFF

PUSHD cpp-proj
ECHO "============ Building cpp-proj ============"
CALL build.bat
POPD

PUSHD sandbox
ECHO "============ Building sandbox ============"
CALL build.bat
POPD