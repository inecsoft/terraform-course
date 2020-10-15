#!/bin/bash
info bash >bash.info 2>/dev/null
echo '----------head -3 bash.info----------'
head -3 bash.info
echo '----------head -3 bash.info | wc -l----------'
head -3 bash.info | wc -l
echo '----------tail -5 bash.info----------'
tail -5 bash.info


