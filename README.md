# Public Repo For Full Stack Competition

## Overview

Welcome. This repo sets up a web app and a server. The web app makes calls to the server and the server responds. It is very nice. 

## To Run 

I am including three sets of instructions below. The first used command line (teminal) instructions to run the application locally. The second instructions show how to set the app up using Docker and the third option shows how to run using VSCode dev container. 

### Command Line / Terminal 
Open two windows of a command line interface of your choosing. 

#### In Terminal 1
Navigate into the frontend folder (TAYLOR-FRIESEN-IS24-full-stack-competition-req97073/site_frontend)
Run the following command: 

```npm install```

Wait for it to finish. 

Run the following command:

```npm run start```

This will automatically open a web browser with the web app running. Please do not start tests until you have started the server (see next line "In Terminal 2")

### In Terminal 2
Navigate into the backend folder (TAYLOR-FRIESEN-IS24-full-stack-competition-req97073/site_backend)
Run the following command: 

```npm install```

Wait for it to finish. 
Run the following command:

```npm run start```

Once both the frontend and backend are running please start your tests! 


### With Docker
#### PLEASE NOTE 
For this solution to work with Docker on Apple Silicon chip devices the development feature Use Rosetta for x86/amd64 emulation on Apple Silicon must be turned on. 
To do this:
1. Open Docker
2. Go into Settings
3. Open the Features in Development tab
4. Check the Use Rosetta for x86/amd64 emulation on Apple Silicon option. 
- if you do not see this option you may need to update Docker (as of July 6th 2023 Docker v4.20 uses this)

Please have Docker installed and the desktop app running. If you are a person who does not use the desktop app some of the following steps may not work for you. 
Then in the command line interface of your choosing navigate to the main git folder (TAYLOR-FRIESEN-IS24-full-stack-competition-req97073).
In your command line paste the following command: 

```docker build . -t web_app```

Wait for it to finish. It may take awhile. There is a lot for it to do. 

Then in your terminal paste this command:

```docker run -p 3000:3000 -p 8000:8000 -d -t web_app```

Wait for it to finish. 

Once it is done open your desktop Docker app and navigate to containers. 
On the row with the image name matching "web_app" select "Show all ports." 
Then select both the 3000:3000 (frontend) and 8000:8000 (backend) option. 
In the browser windows that open localhost:3000 will display the web app with all the products listed. In localhost:8000 you will see a standard message. 

Now the web app has started and you can test its features.

### With VSCode Container
#### PLEASE NOTE 
For this solution to work with Docker on Apple Silicon chip devices the development feature Use Rosetta for x86/amd64 emulation on Apple Silicon must be turned on. 
To do this:
1. Open Docker
2. Go into Settings
3. Open the Features in Development tab
4. Check the Use Rosetta for x86/amd64 emulation on Apple Silicon option. 
- if you do not see this option you may need to update Docker (as of July 6th 2023 Docker v4.20 uses this)

Please have Docker installed and the desktop app running.

Open VSCode and open the folder with this solution. 
If you have the extension Dev Containers by Microsoft there will be a notification on the bottom right of the screen that pops up and offers to rebuild and open the container. Fi you select that you can skip the following steps. 

If you do not have the extension Dev Containers by Microsoft follow these steps:
1. Install the extension Dev Containers by Microsoft
2. Open the command palette
3. Select or type in "Rebuild and open in Container"

Wait for the process to load. Then you will be able to open localhost:3000 in a browser to see the applicaiton. 

## Fun Facts

### Frontend
I started the front end build with Create React App. For this documentation please see ./site_frontend/README.md. They did a lot of work but I will say I also did a lot of work. 

### Python rangen File
There is a python script that runs in run_server.sh to generate a new product list. IF you would like to turn this feature off please comment out line 3 of ./run_server.sh.
This script is only called when running in Docker. I have provided a sample of what it can do in the repo (TAYLOR-FRIESEN-IS24-full-stack-competition-req97073/site_backend/product-content.json) and running without Docker will use that. 

### Actual Fun Note
I have a cat named Ringo Starr and he has also helped a lot in the building of this app. 
