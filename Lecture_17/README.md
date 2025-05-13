1. Created directory Lecture_17, in docker-compose.yml described 3 containers with shared network and 2 volumes to prevent data loss if containers will be removed or recreated
![alt text](<Знімок екрана 2025-05-11 184139.png>)

2. Need to bind mount to a local directory for web container
  - ./web:/usr/share/nginx/html
![alt text](<Знімок екрана 2025-05-11 184201.png>)
![alt text](<Знімок екрана 2025-05-11 184450.png>)
3.Working with docker containers
![alt text](<Знімок екрана 2025-05-11 185037.png>)

4.Scaling 
There were some issues with scaling web servers, error with port conflicts. I added solution with different host ports 
  - "8080-8082:80"

![alt text](<Знімок екрана 2025-05-11 185533.png>)
![alt text](<Знімок екрана 2025-05-11 190029.png>)

