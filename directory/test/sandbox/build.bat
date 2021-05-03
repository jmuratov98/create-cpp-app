@ECHO OFF
SETLOCAL ENABLEDELAYEDEXPANSION
SET FILES=
FOR /R %%f in (*cpp) DO (
    SET files=!files! %%f
)

SET ASSEMBLY=sandbox
SET COMPILER=-g -Wvarargs -Wall -Werror
SET INCLUDE=-Iinclude -I../test/include
SET LINKER=-luser32 -ltest -L../bin/
SET DEFINES=-DTEST_DEBUG -D_CRT_SECURE_NO_WARNINGS

gcc %FILES% %COMPILER% -o ../bin/%ASSEMBLY%.exe %DEFINES% %INCLUDE% %LINKER%