from .ftp import FtpCheck
from .http import HttpCheck
from .json import JsonCheck
from .mysql import MySQLCheck
from .pg import PostgresCheck
from .redis import RedisCheck
from .registry import registry
from .ssh import SSHCheck

registry.register(HttpCheck)
registry.register(RedisCheck)
registry.register(MySQLCheck)
registry.register(PostgresCheck)
registry.register(FtpCheck)
registry.register(JsonCheck)
registry.register(SSHCheck)
