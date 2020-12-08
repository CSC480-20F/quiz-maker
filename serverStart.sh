#!/bin/sh
cd /home/mljuljic/Csc480/quiz-maker/Frontend/
nohup mvn process-resources liberty:run &  
cd ../Users-microservice/
nohup mvn liberty:run & 
cd ../Courses-microservice
nohup mvn liberty:run &
cd ../Quizzes-microservice
nohup mvn liberty:run & 
cd ../mongo
nohup mongod --bind_ip_all -f mongod.conf & 
nohup mongod --bind_ip_all -f coursesMongod.conf & 
nohup mongod --bind_ip_all -f quizesMongod.conf & 
