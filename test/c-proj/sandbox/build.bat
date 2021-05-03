@ECHO OFF
SETLOCAL ENABLEDELAYEDEXPANSION
SET FILES=
FOR /R %%f in (*cpp) DO (
    SET files=!files! %%f
)

SET ASSEMBLY=sandbox
SET COMPILER=-g -Wvarargs -Wall -Werror
SET INCLUDE=-Iinclude -I../c-proj/include
SET LINKER=-luser32 -lc-proj -L../bin/
SET DEFINES=-DC-PROJ_DEBUG -D_CRT_SECURE_NO_WARNINGS

gcc %FILES% %COMPILER% -o ../bin/%ASSEMBLY%.exe %DEFINES% %INCLUDE% %LINKER%