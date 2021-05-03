@ECHO OFF

PUSHD <%- prjname %>
ECHO "============ Building <%- prjname %> ============"
CALL build.bat
POPD

PUSHD sandbox
ECHO "============ Building sandbox ============"
CALL build.bat
POPD