# Public Repo For Full Stack Competition

## Overview

Welcome. This repo sets up a web app and a server. The web app makes calls to the server and the server responds. It is very nice. 

## To Run

Please have Docker installed and the desktop app running. 
Then in the command line interface of your choosing navigate to the main git folder (TAYLOR-FRIESEN-IS24-full-stack-competition-req97073).
In your command line paste the following command: 
docker build . -t web_app

Wait for it to finish. It may take awhile. There is a lot for it to do. 

Then in your terminal paste this command:
docker run -p 3000:3000 -p 8000:8000 -d -t web_app

Wait for it to finish. 

Once it is done open your desktop Docker app and navigate to containers. 
On the row with the image name matching "web_app" select "Show all ports." 
Then select both the 3000:3000 (frontend) and 8000:8000 (backend) option. 
In the browser windows that open localhost:3000 will display the web app with all the products listed. In localhost:8000 you will see a standard message. 

Now the web app has started and you can test its features. 


## Fun Facts

### Frontend
I started the front end build with Create React App. For thisdocumentation please see ./site_frontend/README.md. They did a lot of work but I will say I also did a lot of work. 

### Python rangen File
There is a python script that runs in run_server.sh to generate a new product list. IF you would like to turn this feature off please comment out line 3 of ./run_server.sh.

### Actual Fun Note
I have a cat named Ringo Starr and he has also helped a lot in the building of this app. 