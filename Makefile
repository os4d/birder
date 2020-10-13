#MONITORa_${MONITOR_A_NAME}=${MONITOR_A_CONN_STRING}
#MONITORb_${MONITOR_B_NAME}=${MONITOR_B_CONN_STRING}
#ADMINS=${BIRDER_ADMIN}:${BIRDER_PASSWORD}


.PHONY: help runlocal
.DEFAULT_GOAL := help

define BROWSER_PYSCRIPT
import os, webbrowser, sys

from urllib.request import pathname2url

webbrowser.open("file://" + pathname2url(os.path.abspath(sys.argv[1])))
endef
export BROWSER_PYSCRIPT

define PRINT_HELP_PYSCRIPT
import re, sys

for line in sys.stdin:
	match = re.match(r'^([a-zA-Z_-]+):.*?## (.*)$$', line)
	if match:
		target, help = match.groups()
		print("%-20s %s" % (target, help))
endef
export PRINT_HELP_PYSCRIPT

BROWSER := python -c "$$BROWSER_PYSCRIPT"

help:
	@python -c "$$PRINT_HELP_PYSCRIPT" < $(MAKEFILE_LIST)

clean: ## clean development tree
	rm -fr ${BUILDDIR} build pip-wheel-metadata dist src/*.egg-info .coverage coverage.xml .eggs .pytest_cache *.egg-info
	find src -name __pycache__ -o -name "*.py?" -o -name "*.orig" -prune | xargs rm -rf
	find tests -name __pycache__ -o -name "*.py?" -o -name "*.orig" -prune | xargs rm -rf
	find src/bitcaster/locale -name django.mo | xargs rm -f

run2:  ## run gunicorn locally
	gunicorn \
		birder.web.wsgi:app \
		-b 0.0.0.0:5000 \
		--access-logfile - \
		--error-logfile - \
		--log-level debug
run:
	birder registry update-from-env
	uwsgi --http 0.0.0.0:8000 \
    --static-map "/static=${WWW_STATIC_ROOT}" \
    --static-map "/media=${WWW_MEDIA_ROOT}" \
    --static-expires-type video/mp4=86400 \
    --static-expires-type image/jpeg=86400 \
    --static-expires-type image/png=86400 \
    --static-expires-type image/gif=86400 \
    --static-expires-type image/svg+xml=86400 \
    --static-expires-type text/css=86400 \
    --static-expires-type font/woff=86400 \
    --static-expires-type application/javascript=86400 \
    --honour-range \
    --master \
    --module birder.web.wsgi:app \
    --processes 4

static:  ## build static assets
	node_modules/.bin/webpack --mode production
