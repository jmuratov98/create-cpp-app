@ECHO OFF

PUSHD cannon
ECHO "============ Building test ============"
CALL build.bat
POPD

PUSHD sandbox
ECHO "============ Building sandbox ============"
CALL build.bat
POPD