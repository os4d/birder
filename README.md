Birder
======

Birder is an Open source service monitor.

Why birder?
-----------

We wanted to create a simple status monitor with no dependencies that was able to monitor 24/7/365 service
availability where the only configuration needed could be passed via environment variables. 


Supported protocols/servers
---------------------------

 - http/https
 - Postgres/Postgis 
 - Redis
 - Celery


Installation
------------

The following is an example command for running the docker image monitoring a couple of 

```
docker run \
    --rm \
    --name=${CONTAINER_NAME} \
    -p 5000:5000 \
    -e MONITORa_${MONITOR_A_NAME}=${MONITOR_A_CONN_STRING} \
    -e MONITORb_${MONITOR_B_NAME}=${MONITOR_B_CONN_STRING} \
    -e ADMINS=${BIRDER_ADMIN}:${BIRDER_PASSWORD}\
    -v /tmp/~birder:/var/db \
    ${RUN_OPTIONS} \
    birder
```

Where:
 - MONITOR_A_NAME : is the identifier of the first monitored target
 - MONITOR_A_URL : is the url of the first monitored target (eg. postgres://host:port/dbname)
 - MONITOR_B_NAME : is the identifier of the second monitored target
 - ... and so on ...

Todo
----
 - MySql
 - ftp
 - RabbitMQ
 - amqp
 - clarify behaviour:
   - how to clean/reset data for a monitored target  
   

    
