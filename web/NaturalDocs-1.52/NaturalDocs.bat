@echo off

set NaturalDocsParams=-i ..\demo\js\controls -i ..\demo\js\templete1 -o HTML ..\Doc -p ..\apidoc_config -s 1 -s 2 -s 3 -s 4 -s 5
::Roman
::Small

::FramedHTML            
            
rem Shift and loop so we can get more than nine parameters.
rem This is especially important if we have spaces in file names.

:MORE
if "%1"=="" goto NOMORE
set NaturalDocsParams=%NaturalDocsParams% %1
shift
goto MORE
:NOMORE

D:\pro\strawberry\perl\bin\perl.exe NaturalDocs %NaturalDocsParams%

set NaturalDocsParams=-i ..\demo\js\controls -i ..\demo\js\templete1 -o HTML ..\Doc -p ..\apidoc_config -s 1 -s 2 -s 3 -s 4 -s 5

pause