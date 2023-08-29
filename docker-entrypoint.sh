#!/bin/bash
npm install -g npm@9.8.1
npm install
exec apache2-foreground
