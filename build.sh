#!/bin/bash
echo "Build frontend";
cd long-form && npm run build && cd ..;
cd lp-2018 && npm run build && cd ..;
cd photo-picker && npm run build && cd ..;
echo -en "\033[0;32m ✔ \033[0mOk Build frontend\n";
