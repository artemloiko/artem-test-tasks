#!/bin/bash
echo "Build docker container";
docker build -t homework .;
echo -en "\033[0;32m ✔ \033[0mOk Build docker container\n";
echo "Push docker container"
docker tag homework artuom130/test-tasks;
docker push artuom130/test-tasks;
echo -en "\033[0;32m ✔ \033[0mOk Push docker container\n";
echo "Reload docker on server";
ssh -i ./deploy/id_rsa ubuntu@68.183.41.94 "docker --version; docker pull artuom130/test-tasks; docker stop web || echo Already is stopped; docker run -d --name=web -p 80:80 --rm artuom130/test-tasks;"
echo -en "\033[0;32m ✔ \033[0mOk Reload docker on server\n";
