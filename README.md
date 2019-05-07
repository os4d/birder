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


Configuration
-------------

   - SITE_TITLE = 'Birder'
   - GRANULARITIES = "60m,24h,7d,30d"
   - REFRESH_INTERVAL = 60
   - POLLING_INTERVAL = 58
   - DISPLAY_URLS = True
   - ADMINS = ""
   - COOKIE_POLICY_MESSAGE = False
   
   - BOOTSTRAP_USE_MINIFIED = True
   - BOOTSTRAP_SERVE_LOCAL = True
   - BOOTSTRAP_QUERYSTRING_REVVING = True
   

   - SESSION_COOKIE_HTTPONLY = True
   - SESSION_COOKIE_SECURE = False
   - SESSION_COOKIE_NAME = "session"
   - SESSION_COOKIE_DOMAIN = 
   - SESSION_COOKIE_PATH = /
   
   - APPLICATION_ROOT = 
   - URL_PREFIX = 

   - MONITOR_<name> = _connection_string_

#### Connection strings examples:

 - postgres://user:pass@10.10.10.1
 - redis://10.10.10.1
 - celery://10.10.10.1/1?broker=redis
 - http://os4d.org
 


Usage
-----

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
   

    
