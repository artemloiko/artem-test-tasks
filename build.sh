#!/bin/bash
echo "Build frontend";
cd hw-task1 && npm run build && cd ..;
cd hw-task2 && npm run build && cd ..;
echo -en "\033[0;32m ✔ \033[0mOk Build frontend\n";
