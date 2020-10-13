#  :copyright: Copyright (c) 2018-2020. OS4D Ltd - All Rights Reserved
#  :license: Commercial
#  Unauthorized copying of this file, via any medium is strictly prohibited
#  Written by Stefano Apostolico <s.apostolico@gmail.com>, October 2020
from birder.core.redis import client

channel = client.pubsub()
channel.subscribe('system')

send = lambda data: client.publish('system', data)
read = channel.get_message
