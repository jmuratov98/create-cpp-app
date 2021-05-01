@ECHO OFF

PUSHD cannon
ECHO "============ Building <%- prjname %> ============"
CALL build.bat
POPD

PUSHD sandbox
ECHO "============ Building sandbox ============"
CALL build.bat
POPD