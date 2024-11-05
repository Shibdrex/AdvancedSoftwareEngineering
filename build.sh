#!/bin/bash

# Get the directory of the script
script_dir="$(dirname "$0")"

# Define the specific subdirectory to search in, relative to the script's location
target_dir="$script_dir/Assistant-Core/target"  # Replace with the desired subdirectory name

# Check if the target directory exists before searching
if [ -d "$target_dir" ]; then
    # Search for .jar files only within the target subdirectory
    if find "$target_dir" -type f -name "*.jar" | grep -q .; then
        docker compose up --build --detach
    else
        cd $script_dir/Assistant-Core && mvn package
        cd .. && docker compose up --build --detach
    fi
else
    echo "The specified directory $target_dir does not exist."
    cd $script_dir/Assistant-Core && mvn package
    cd .. && docker compose up --build --detach
fi