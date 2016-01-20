#!/bin/bash

git fetch --prune; git pull origin source
cd public
git fetch --prune; git pull origin master
cd ../themes/aglaus
git fetch --prune; git pull origin master

