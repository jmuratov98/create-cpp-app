@ECHO OFF
SETLOCAL ENABLEDELAYEDEXPANSION
SET FILES=
FOR /R %%f in (*cpp) DO (
    SET files=!files! %%f
)

SET ASSEMBLY=sandbox
SET COMPILER=-g -Wvarargs -Wall -Werror
SET INCLUDE=-Iinclude -I../cpp-proj/include
SET LINKER=-luser32 -lcpp-proj -L../bin/
SET DEFINES=-DCPP-PROJ_DEBUG -D_CRT_SECURE_NO_WARNINGS

g++ %FILES% %COMPILER% -o ../bin/%ASSEMBLY%.exe %DEFINES% %INCLUDE% %LINKER%