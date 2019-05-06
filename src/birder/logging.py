import logging

logging.basicConfig(level=logging.DEBUG)

root = logging.getLogger('')

logger = logging.getLogger('birder')
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')


ch = logging.StreamHandler()
ch.setLevel(logging.ERROR)
ch.setFormatter(formatter)

root.setLevel(logging.ERROR)
logger.setLevel(logging.INFO)
logger.addHandler(ch)



