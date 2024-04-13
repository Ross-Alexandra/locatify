#! /bin/bash
# Verify that we're running from the project root
if [ ! -f bin/deploy.sh ]; then
    echo "Please run this script from the project root."
    exit 1
fi

# Verify that the `locatify` ssh Host has been set
if ssh -q locatify-v3 exit; then
    echo "Deploying to locatify..."
else
    echo "Please add the following to your ~/.ssh/config file:"
    echo "Host locatify"
    echo "    HostName <deployment-server-ip>"
    echo "    User <deployment-user>"
    echo "    IdentityFile <path-to-private-key>"
    exit 1
fi

# Verify that the deployment server has rsync installed
if ssh locatify 'command -v rsync' > /dev/null; then
    echo "rsync found on deployment server."
else
    echo "Please install rsync on the deployment server."
    exit 1
fi

# Verify that a local .env file exists
if [ ! -f .env ]; then
    echo "No .env file found. Please create one."
    exit 1
fi

# Build assets
npm run build:js
npm run build:css


# Copy the production files to the deployment server
ssh locatify-v3 'mkdir -p ~/locatify-v3'; 
rsync -av -e ssh $(pwd)/templates locatify-v3:locatify-v3;
rsync -av -e ssh $(pwd)/dist locatify-v3:locatify-v3;
rsync -av -e ssh $(pwd)/public locatify-v3:locatify-v3;
rsync -av -e ssh $(pwd)/cmd locatify-v3:locatify-v3;
rsync -av -e ssh $(pwd)/pkg locatify-v3:locatify-v3;
scp .env locatify-v3:locatify-v3
scp go.mod locatify-v3:locatify-v3
scp go.sum locatify-v3:locatify-v3
 
# Build the Go executables on the server
echo 'Building Go files. If this is your first time deploying to this server, this may take a while...';
ssh locatify-v3 'cd ~/locatify-v3; go build -o server cmd/main.go; go build pkg/fetch-database/fetch-database.go;';

# Setup the cron jobs needed for this server:
#  - download the latest MaxMind DB file every day with the app:download-mmdb-file command
ssh locatify-v3 'cd ~/locatify-v3; crontab -r ; crontab -l | { cat; echo "0 0 * * * ./fetch-database"; } | crontab -';

# Manually download the MaxMind DB file
echo 'Manually fetching the mmdb database.';
ssh locatify 'cd ~/locatify-v3; ./fetch-database;';

# Stop the old server
ssh locatify-v3 'fuser -k 14010/tcp';

# Run the production server
echo 'WARNING: Becasue the universe hates me, this command will *run* but not terminate. You will need to manuall ^C. Sorry about that.';
ssh locatify-v3 "cd ~/locatify-v3; setsid ./server > /dev/null;";
