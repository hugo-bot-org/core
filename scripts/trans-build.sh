# build the out-tsc
npm run tsc

# prepare a dist folder, remove it if its exists first
&& rm -rf dist
&& mkdir dist

# copy all the contents from the out-tsc to the dist
&& cp -r ./out-tsc dist

# and copy the configs too
&& cp -r ./src/configs dist

# Remove the previous zip if any
&& rm -rf core.zip 

# Create a fresh zip, skipping node_modules folder and .git folder
&& zip -r core.zip ./ -x ./node_modules/**\\* ./.git/**\\* 

# Copy the zip via SSH to the raspi
&& scp core.zip maxine@192.168.1.10:/home/maxine 

# Login via SSH on the raspi and launch the following commands:
# - Go to the home folder
# - Unzip the previously received zip file into a folder called core
# - Cd into core
# - NPM I
# - When all done, echo a message and close connection
&& ssh maxine@192.168.1.10 'cd /home/maxine/; unzip -o core.zip -d core; cd core; npm i; echo \"ALL DONE\"; exit;'