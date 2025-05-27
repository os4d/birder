echo "Starting Celery on $BROKER_URL"
export PYTHONPATH=/app

celery -A app:app -b $BROKER_URL worker
