# Aeromap

## Description 

Aeromap is a specialized flight planner that will help the UofT Aerospace Team in testing their custom competition drones. Currently, the UofT Aerospace team has to do a lot of searching and logging by hand to before flying their drones to ensure that they are following Canadian flight regulations. The goal of Aeromap is to make this process simpler and faster, so that the Aerospace Team can spend less time planning and more time actually flying their drones. Aeromap achieves this by providing an interactive map allowing for users to create flight locations and seemlessly view relevant details for each site such as class of airspace, nearby Aerodromes, emergency contacts, and weather at a specified time. Scheduled flights are saved locally so that users can access their flight plans when traveling to remote locations with no wifi.

## Key Features

After creating an account and logging in, a user has 4 main pages. The first is a dashboard that shows a list of upcoming scheduled flights. Further information of each flight can be displayed by clicking on an entry. This information includes predicted weather and emergency contacts. The next page allows the user to utilize an interactive map to create a polygon-shaped sites on which flights can be conducted. Information such as class of airspace and nearby Aerodromes are shown throughout the site creation process. The third page allows the user to schedule a flight on a saved site at a specified date and time. The user can also input drone specifications and the name of the pilot. The fourth page is a flight log of all past flights. There will also be a counter keeps track of the total number of flights that the Aerospace team has conducted.

## Instructions

For deliverable 2, the login page has not been implemented, but in future it will allow a user to signup/login with a username and password. For now the application bypasses the login and jumps straight to the user dashboard.

First, make note of the four icons stacked vertically on the left. This is the navigation for the app.

Creating a site:

Click the location pin icon to create a new site. From here, the user can drags pins onto the map (or enter specific coordinates in latitude and longitude). Note: the order of the pins determines the how the polygon will be drawn, so it is best to place the pins in clockwise or anti-clockwise order. As soon as the first pin is placed, Aeromap will start displaying the class of airspace. Once at least 3 pins have been placed, click next to view the geofence and enter a safety margin (the default is 5 meters). Then click next to enter a site name. Finally click save and the app will return to dashboard.

Creating a flight:

Now click the flight icon to create a new flight. From here enter a date and time, and then select the site you've just created. This page will show relevant information related to the choice of site. If the information matches your needs, enter drone information and the pilot's name. Finally, click save and the app will return to dashboard.

Viewing your flight:

Now from the dashboard, the new flight will be visible in the upcoming flights section. From here, you can click the flight to see more information.

Viewing Past Flights:

This time click the file icon to see a table of past flights.

 ## Development requirements

To run our application in development mode, we navigate to the aeromap folder (cd aeromap) and run the command "npm install". Then run "npm run electron:serve". This script does two things: it first runs the react application locally on port 3000 and then concurrently runs the electron application to view the react app. 
For now, we are only creating this application for windows OS.
 
 ## Deployment and Github Workflow

For the earlier stages of development we decided to use a very simple github workflow. We have one branch for the frontend team and one branch for the backend team. This allowed each team to experiment with the tech stack before we worked on combining the two pieces. Once we had a solid understand of the application structure, we added the pushed the backend code into the frontend folder branch and renamed the frontend branch to "development". This allowed us to further develop and test our entire application so far. We then made a pull request from development to main for our deliverable 2 prototype. The reason we chose this type of workflow is that it allowed us to stay organized and avoid over populating our repo while learning the tech stack.

To deploy our application is equally simple. We navigate to the aeromap folder and run the following command: "npm run electron:build". This script does two things: first it builds the react application, and then it uses electron-builder to package everything into an installer and exe application which is located in the dist folder. 

Accessing the release can be done through github. Currently, there is only a release for windows. Simply download "windows-release.zip" from the repository releases page (under assets). Then extract the folder and run the exe file within.

 ## Licenses 

At the moment the project is under no license and will be kept private for the UofT Aerospace Team, but this may change during the term.
