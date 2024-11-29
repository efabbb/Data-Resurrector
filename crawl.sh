#!/bin/bash

# clear the data file
truncate -s 0 data.txt

# traverse the "data" directory and save file paths to data.txt
find data -type f >> data.txt