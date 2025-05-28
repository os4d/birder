from .. import env

SALT_KEY = env.list("CRYPT_SALT_KEYS")
SECRET_KEY_FALLBACKS = env.list("CRYPT_KEYS")
