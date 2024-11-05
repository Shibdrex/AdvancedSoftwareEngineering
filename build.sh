#!/bin/bash

# Get the directory where this script is located (root of your project)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Define paths
SEARCH_DIR="$SCRIPT_DIR/Assistant-Core/target"        # Directory to search within the project
FILE_TYPE="*.jar"                                     # File type to search for in the project directory
PARENT_DIR="$SCRIPT_DIR/../Env-Files"           # Directory one level above the project root
REQUIRED_FILES=("alarmclock_module.env" 
"assistant_core.env" "assistantstt_module.env" "assistanttts_module.env" "database.env" 
"frontend_module.env" "news_module.env" "openai_module.env" "raplaschedule_module.env" "weather_module.env")  # List of files to check in the parent directory

# Define actions for each condition
not_found_action() {
    echo "Directory $SEARCH_DIR does not exist or no $FILE_TYPE files found."
    cd "$SCRIPT_DIR/Assistant-Core" && mvn package
    cd "$SCRIPT_DIR" && docker compose up --build --detach
}

file_found_action() {
    echo "Directory $SEARCH_DIR exists, and files of type $FILE_TYPE are found."
    docker compose up --build --detach
}

parent_dir_check() {
    echo "Checking for required files in $PARENT_DIR..."
    for file in "${REQUIRED_FILES[@]}"; do
        if [[ ! -f "$PARENT_DIR/$file" ]]; then
            echo "Missing required file: $file in $PARENT_DIR"
            return 1  # Exit function with an error if any file is missing
        fi
    done
    echo "All required files are present in $PARENT_DIR."
}

# Check if the parent directory exists
if [[ ! -d "$PARENT_DIR" ]]; then
    echo "Parent directory $PARENT_DIR does not exist."
    exit 1
else
    # Check if all required files are present in the parent directory
    if ! parent_dir_check; then
        echo "Required files are missing in $PARENT_DIR."
        exit 1
    fi
fi

# Check if the SEARCH_DIR exists within the project
if [[ ! -d "$SEARCH_DIR" ]]; then
    # Directory does not exist
    not_found_action
else
    # Directory exists, now check for files of the specified type
    if ls "$SEARCH_DIR"/$FILE_TYPE 1> /dev/null 2>&1; then
        # Files of the specified type exist
        file_found_action
    else
        # No files of the specified type found
        not_found_action
    fi
fi
