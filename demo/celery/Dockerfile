FROM python:3.12-alpine
ENV BROKER_URL=""

RUN pip install celery redis \
    && mkdir app

WORKDIR app
COPY *.py /app
COPY run.sh /app

RUN ls -al

CMD ["sh", "run.sh"]
