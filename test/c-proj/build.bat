@ECHO OFF

PUSHD c-proj
ECHO "============ Building c-proj ============"
CALL build.bat
POPD

PUSHD sandbox
ECHO "============ Building sandbox ============"
CALL build.bat
POPD