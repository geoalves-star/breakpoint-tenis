#!/bin/bash
# uso: sims/run200.sh PREFIXO ARQUIVO.html [paralelo]
cd /home/claude
P=$1; F=$2; J=${3:-2}; mkdir -p sims/$P; rm -f sims/$P/done
while IFS='|' read -r id cfg; do
  [ -s sims/$P/$id.txt ] && grep -q '^{"name"' sims/$P/$id.txt && continue
  ( FILE=$F CFG="$cfg" timeout 300 node sim5.js > sims/$P/$id.txt 2>&1 ) &
  while [ $(jobs -rp | wc -l) -ge $J ]; do wait -n; done
done < sims/cfg200.txt
wait; echo ALLDONE > sims/$P/done
