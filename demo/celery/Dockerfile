FROM python:3-alpine
ENV BROKER_URL=""

RUN pip install celery
COPY *.py .
COPY run.sh .
RUN ls -al

CMD ["/bin/bash", "run.sh"]
