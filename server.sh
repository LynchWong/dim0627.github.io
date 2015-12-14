#!/bin/bash

hugo server --watch -t $1 --buildDrafts=true --buildFuture=true
