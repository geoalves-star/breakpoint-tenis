#!/bin/bash
# amostra rápida: sims/quick.sh PREFIXO ARQ.html 'CALJSON' N
cd /home/claude; P=$1; F=$2; C=$3; N=${4:-20}; rm -rf sims/$P; mkdir -p sims/$P
( grep -E '^0(0[1-9]|[1-9][0-9])\|' sims/cfg200.txt | head -$N; grep -E '^1[0-9][0-9]\|' sims/cfg200.txt | head -$N ) > /tmp/q_$P.txt
while IFS='|' read -r id cfg; do ( FILE=$F CAL="$C" CFG="$cfg" timeout 300 node sim5.js > sims/$P/$id.txt 2>&1 ) & while [ $(jobs -rp | wc -l) -ge 2 ]; do wait -n; done; done < /tmp/q_$P.txt; wait
