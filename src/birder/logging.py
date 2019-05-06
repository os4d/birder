import logging

logger = logging.getLogger('birder')
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')


ch = logging.StreamHandler()
ch.setLevel(logging.ERROR)
ch.setFormatter(formatter)

logger.setLevel(logging.ERROR)
logger.addHandler(ch)



