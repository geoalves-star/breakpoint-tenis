#!/bin/bash
# monta o jogo: build.sh SAIDA.html
cd /home/claude && cp tenis46.html "$1" && OUT="/home/claude/$1" python3 p31/patch50.py
