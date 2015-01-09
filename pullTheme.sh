#!/bin/bash

echo -e "\033[0;32mPulling theme from GitHub...\033[0m"

git subtree pull --prefix=themes/aglaus aglaus master --squash
