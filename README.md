# Public Repo For Full Stack Competition

## Overview

Welcome. This repo sets up a web app and a server. The web app makes calls to the server and the server responds. It is very nice. 

## To Run

### With Docker
Please have Docker installed and the desktop app running. 
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

### Without Docker
I hit some speed bumps with Docker so I am going to give the steps for running this on any computer without Docker. 
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


## Fun Facts

### Frontend
I started the front end build with Create React App. For this documentation please see ./site_frontend/README.md. They did a lot of work but I will say I also did a lot of work. 

### Python rangen File
There is a python script that runs in run_server.sh to generate a new product list. IF you would like to turn this feature off please comment out line 3 of ./run_server.sh.
This script is only called when running in Docker. I have provided a sample of what it can do in the repo (TAYLOR-FRIESEN-IS24-full-stack-competition-req97073/site_backend/product-content.json) and running without Docker will use that. 

### Actual Fun Note
I have a cat named Ringo Starr and he has also helped a lot in the building of this app. 
