#!/bin/bash

echo 'socatを起動しているため、ターミナルを閉じてください'
socat TCP-LISTEN:5554,reuseaddr,fork TCP:172.17.176.1:5554
