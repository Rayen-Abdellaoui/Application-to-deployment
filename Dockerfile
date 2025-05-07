FROM mongo:latest

# Copy the dump folder and restore script into the container
COPY ./dump /dump
COPY restore.sh /restore.sh

# Make sure the restore script is executable
RUN chmod +x /restore.sh

# Run the restore script when the container starts
CMD ["/bin/bash", "/restore.sh"]
