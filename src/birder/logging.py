import logging
from logging import config

config.dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {
        'wsgi': {
            'class': 'logging.StreamHandler',
            'stream': 'ext://flask.logging.wsgi_errors_stream',
            'formatter': 'default'
        },
    },

    'root': {
        'level': 'INFO',
        'handlers': ['wsgi']
    },
    'loggers': {
        'werkzeug': {
            'class': 'logging.StreamHandler',
            'level': logging.ERROR
        },
        'requests': {
            'class': 'logging.StreamHandler',
            'level': logging.ERROR
        },
    }
})

logger = logging.getLogger('birder')
