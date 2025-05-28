# Security

!!! warning

    In any healthcheck system - especially one that interacts with protected resources such as databases or APIs —
    it’s a best practice to use a dedicated service account with minimal, read-only privileges.

    This approach limits potential damage in the event of a security breach, ensures auditability of healthcheck access patterns,
    and avoids accidental interference with critical application data.
    By granting only the necessary permissions required to perform system checks (such as checking database connectivity or
    querying a lightweight status endpoint), you reduce the attack surface and align with the principle of least privilege,
    which is fundamental to maintaining secure and maintainable infrastructure.


## Overview
All the configurations are stored crypted in the database and password cannot be read once saved.

This guide explains how to securely configure encryption keys. :

## Key Concepts

- **`SECRET_KEY`**
  Primary cryptographic key. Also used by default to encrypt fields.

- **`CRYPT_KEYS`**
  A list of previous secret keys that are still used to decrypt existing data encrypted with older keys. Enables key rotation.

- **`CRYPT_SALT_KEYS`**
  An additional salt value (or list of values) used to derive encryption keys. Supports key rotation for encryption.

---

## ⚙️ Setup with Environment Variables

### 1. Set Environment Variables

Define the following variables in your deployment system

```sh

SECRET_KEY=your-new-secret-key
CRYPT_KEYS=your-old-secret-key1,your-old-secret-key2
CRYPT_SALT_KEYS=your-new-salt-key,your-old-salt-key

```
