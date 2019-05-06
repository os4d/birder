#!/usr/bin/env python
import ast
import os
import re

from setuptools import find_packages, setup

ROOT = os.path.realpath(os.path.join(os.path.dirname(__file__)))
init = os.path.join(ROOT, 'src', 'birder', '__init__.py')

_version_re = re.compile(r'__version__\s+=\s+(.*)')
_name_re = re.compile(r'NAME\s+=\s+(.*)')

with open(init, 'rb') as f:
    content = f.read().decode('utf-8')
    VERSION = str(ast.literal_eval(_version_re.search(content).group(1)))
    NAME = str(ast.literal_eval(_name_re.search(content).group(1)))

setup(
    name=NAME,
    version=VERSION,
    url='https://github.com/os4d/birder',
    author='OS4D team',
    author_email='info@os4d.org',
    package_dir={'': 'src'},
    packages=find_packages('src'),
    include_package_data=True,
    description='',
    long_description=open('README.md').read(),
    license='MIT License',
    entry_points={
        'console_scripts': ['birder=birder.monitor.cli:main'],
    },
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Operating System :: OS Independent',
        'Topic :: Software Development :: Libraries :: Application Frameworks',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ],
    # platforms=['any']
)
