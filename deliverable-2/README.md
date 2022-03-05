# Aeromap

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description 
 * Provide a high-level description of your application and it's value from an end-user's perspective
 * What is the problem you're trying to solve?
 * Is there any context required to understand **why** the application solves this problem?

Aeromap is a specialized flight planner that will help the UofT Aerospace Team in testing their custom competition drones. Currently, the UofT Aerospace team has to do a lot of searching and logging by hand to before flying their drones to ensure that they are following Canadian flight regulations. The goal of Aeromap is to make this process simpler and faster, so that the Aerospace Team can spend less time planning and more time actually flying their drones. Aeromap achieves this by providing an interactive map allowing for users to create flight locations and seemlessly view relevant details for each site such as class of airspace, nearby Aerodromes, emergency contacts, and weather at a specified time. Scheduled flights are saved locally so that users can access their flight plans when traveling to remote locations with no wifi.

## Key Features
 * Described the key features in the application that the user can access
 * Provide a breakdown or detail for each feature that is most appropriate for your application
 * This section will be used to assess the value of the features built

After creating an account and logging in, a user has 4 main pages. The first is a dashboard that shows a list of upcoming scheduled flights. Further information of each flight can be displayed by clicking on an entry. The next page allows the user to utilize an interactive map to create a polygon-shaped sites on which flights can be conducted. Information such as class of airspace, nearby Aerodromes, emergency contacts throughout the site creation process. The third page allows the user to schedule a flight on a saved site. The user can input the datetime, drone specifications, and pilot. The fourth page is a flight log of all past flights. There will also be a counter keeps track of the total number of flights that the Aerospace team has conducted.

## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully

For deliverable 2, the login page has not been implemented, so this will take the user straight to dashboard. 

Creating a site:

From here click the location pin icon to create a new site. From here, the user can drags pins onto the map (or enter their coordinates). Note: the order of the coordinates determines the how the polygon will be drawn. As soon as 1 coordinate is placed, Aeromap will start displaying the class of airspace. Then click next and enter a safety margin (the default is 5 meters). Then click next to enter a site name. Finally click save.

Creating a flight:

Now click the flight icon to create a new flight. From here enter a date and time, and then select the plot you've just created. This page will show relevant details of the plot. Finally enter drone information and pilot name and click save.

Viewing your flight:

Now from the dashboard, the flight is visible in the upcoming flights section. From here, you can click the flight to see more information.

Viewing Past Flights:

This time click the file icon to see a table of past flights.

 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).

For now we are only creating this application for windows OS, and there are no other requirements. Download the windows installer from the github repository and double click to install the application. This will create a shortcut on the desktop and start menu. The double click the shortcut to launch the app.
 
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Describe your overall deployment process from writing code to viewing a live applicatioon
 * What deployment tool(s) are you using and how
 * Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!

For the earlier stages of development we decided to use a very simple github workflow. We have one branch for the frontend team and one branch for the backend team. This allowed each team to experiment with the tech stack before we worked on combining the two pieces. Then we decided to make a new branch that will hold both the frontend and backend code for easier development. We called this branch dev and made two pull requests: from frontend to dev and from backend to dev. This allowed us to further develop our code to create a deployable version. We made a final pull request from dev to main for our ready to use prototype. 

Deploying our application is quite simple. We navigate to the frontend folder and run the following command: 'npm run electron:build'. This script does two things: first it builds the react application, and then it uses electron-builder to package everything into an installer and exe application.

 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?

At the moment the project is under no license and will be kept private for the UofT Aerospace Team, but this may change during the term.
