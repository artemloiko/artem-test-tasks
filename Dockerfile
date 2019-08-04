FROM nginx:alpine
# COPY ./deploy/default.conf /etc/nginx/conf.d/default.conf
COPY ./index.html /usr/share/nginx/html/index.html
COPY ./hw-task1/build /usr/share/nginx/html/task1
COPY ./hw-task2/public /usr/share/nginx/html/task2
COPY ./hw-task3/build /usr/share/nginx/html/task3
