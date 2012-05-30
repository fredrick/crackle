#!/bin/sh
CRACKLE=$(cat <<EOF
/**
 * Crackle
 * JavaScript predicate, comparator, equality, and utility functions
 * https://github.com/wayoutmind/crackle
 */
EOF
)
IN=./crackle.js
OUT=./crackle.min.js
echo "$CRACKLE" > $OUT
echo >> $OUT
curl -X POST \
    --data-urlencode "js_code@${IN}" \
    http://marijnhaverbeke.nl/uglifyjs \
    >> $OUT
echo >> $OUT
