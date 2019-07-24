#!/bin/bash
echo "Build frontend";
npm run build;
echo -en "\033[0;32m ✔ \033[0mOk Build frontend\n";
echo "Build docker container";
docker build -t hw-task1 .;
echo -en "\033[0;32m ✔ \033[0mOk Build docker container\n";
echo "Push docker container"
docker tag hw-task1 artemlabz/hw-task1;
docker push artemlabz/hw-task1;
echo -en "\033[0;32m ✔ \033[0mOk Push docker container\n";
echo "Reload docker on server";
ssh -i ./deploy/id_rsa ubuntu@68.183.41.94 "docker --version; docker pull artemlabz/hw-task1; docker stop web || echo Already is stopped; docker run -d --name=web -p 80:80 --rm artemlabz/hw-task1;"
echo -en "\033[0;32m ✔ \033[0mOk Reload docker on server\n";
