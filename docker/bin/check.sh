#!/bin/bash

echo ""
birder --version
python --version
echo "Django" $(django-admin --version)
echo "uwsgi " $(uwsgi --version)
echo ""

birder check --deploy
