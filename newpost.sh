#!/bin/bash

title=`echo ${2} | tr "A-Z" "a-z"`
title=`echo $title | tr " " "-"`
title=`echo $title | sed "s/\.//g"`
hugo new "${1}/`date +%Y-%m-%d`-$title.markdown"
