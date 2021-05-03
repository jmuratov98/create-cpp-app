@ECHO OFF

PUSHD test
ECHO "============ Building test ============"
CALL build.bat
POPD

PUSHD sandbox
ECHO "============ Building sandbox ============"
CALL build.bat
POPD