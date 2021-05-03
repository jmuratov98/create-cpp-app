@ECHO OFF
SETLOCAL ENABLEDELAYEDEXPANSION
SET FILES=
FOR /R %%f in (*cpp) DO (
    SET files=!files! %%f
)

SET ASSEMBLY=<%- prjname %>
SET COMPILER=-g -shared -Wvarargs -Wall -Werror
SET INCLUDE=-Iinclude
SET LINKER=-luser32
SET DEFINES=-D<%- prjname.toUpperCase() %>_DEBUG -D<%- prjname.toUpperCase() %>_EXPORT -D_CRT_SECURE_NO_WARNINGS

g++ %FILES% %COMPILER% -o ../bin/%ASSEMBLY%.dll %DEFINES% %INCLUDE% %LINKER%