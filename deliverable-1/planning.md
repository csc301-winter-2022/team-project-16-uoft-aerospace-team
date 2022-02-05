# YOUR PRODUCT/TEAM NAME
> _Note:_ This document is meant to evolve throughout the planning phase of your project.   That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). Most importantly, it is a reflection of all the planning you work you've done in the first iteration. 
 > **This document will serve as a master plan between your team, your partner and your TA.**

## Product Details
 
#### Q1: What are you planning to build?

In June 2019, Transport Canada introduced new aviation laws around drone flight, treating drones similar to conventional aircrafts and as a result outlines several different forms of documentation required to plan drone flights.
We are planning to build a Windows desktop application used by the UofT Aerospace Team to plan/schedule drone flights. The main functionality of the app is to provide the user a way to find sites that, according to the Canadian Aviation Regulations, allow drone flights. The user is provided a map feature that, given a pinned location, gathers information about related or sensitive surrounding areas (such as airports, hospitals), class of airspace, and weather conditions combined with the given drone specifications to check whether or not a drone flight can be operated at this given location. In case of “success”, a site survey can be exported in a PDF format for the drone pilot’s use. The user can store information about its drones and flight logs (pictures taken by the drone). The application only interacts with the drone pilot and not with the drone itself. Attached is an example site survey, with displayed info manually sought out by the Aerospace team. The app will provide a shortcut into gathering these resources and quickly produce an accurate site survey.

A site survey looks like that:


Features:
    * Drag across a visual map and drop a pin on specific locations to view the site survey information (airspace classes, nearby aerodromes, weather conditions)
    * Draw a boundary around flight area, and a safety margin around the boundary
    * Sidebar for drone specifications
    * Prompt to remind team to take pictures for logs and fill logs by hand
    * Save drone/flight information in the map on local files


#### Q2: Who are your target users?

  > The target users are members of the UofT Aerospace Team (mainly Mechanical Engineering students).

#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

Today, our users plan drone flights manually. Flight surveys are written with a text editor and the graphical representation of the site area is made with screenshots and image editors. The drone pilot has to scrupulously study the site’s surroundings to get information about nearby airports/aerodromes and then, for each of these, get contact information. This is a tedious (and time-consuming) procedure that pilots have to do before each flight. We aim to automate the process (given coordinates on the map and drone data) so that the user can save (a lot of) time (once the site location is known, the site survey is made instantaneously). Additionally, it avoids missing crucial information (a human eye can easily miss a nearby aerodrome) and ensures accurate data (contact information for a given airport is going to be accurate). This application is unique because it serves the purpose of the Uoft Aerospace Team only. Because of its tailor-made nature, the app will undoubtedly align with the partner’s expectations.


#### Q4: How will you build it?

    |               |     Frontend     |     Backend     |
    |---------------|------------------|-----------------|
    |   Language    |   JavaScript     |    JavaScript   |   
    |---------------|------------------|-----------------| 
    | Libraries,    |     React        |   Node.js (for  |
    | Frameworks    |                  |     database)   | 
    |---------------|------------------|-----------------|
    | External APis | Google Maps API  |                 |
    |               | ICAO API         |                 |
    |               | AVWX API         |                 |

    Google Maps API requires to embed a web browser in the application. ICAO API is used to retrieve airspace class, aerodrome information and weather condition. AVWX API is used for weather conditions only.



#### Q5: What are the user stories that make up the MVP?

 * At least 5 user stories concerning the main features of the application - note that this can broken down further
 * You must follow proper user story format (as taught in lecture) ```As a <user of the app>, I want to <do something in the app> in order to <accomplish some goal>```
 * User stories must contain acceptance criteria. Examples of user stories with different formats can be found here: https://www.justinmind.com/blog/user-story-examples/. **It is important that you provide a link to an artifact containing your user stories**.
 * If you have a partner, these must be reviewed and accepted by them

----
## Intellectual Property Confidentiality Agreement 
> Note this section is **not marked** but must be completed briefly if you have a partner. If you have any questions, please contact David and Adam.
>  
**By default, you own any work that you do as part of your coursework.** However, some partners may want you to keep the project confidential after the course is complete. As part of your first deliverable, you should discuss and agree upon an option with your partner. Examples include:
1. You can share the software and the code freely with anyone with or without a license, regardless of domain, for any use.
2. You can upload the code to GitHub or other similar publicly available domains.
3. You will only share the code under an open-source license with the partner but agree to not distribute it in any way to any other entity or individual. 
4. You will share the code under an open-source license and distribute it as you wish but only the partner can access the system deployed during the course.

**Briefly describe which option you have agreed to. Your partner cannot ask you to sign any legally binding agreements or documents pertaining to non-disclosure, confidentiality, IP ownership, etc.**

We are free to publish source code, design and software on Github.

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

Describe the different roles on the team and the responsibilities associated with each role. 
 * Roles should reflect the structure of your team and be appropriate for your project. Not necessarily one role to one team member.

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * 3 technical strengths and weaknesses each (e.g. languages, frameworks, libraries, development methodologies, etc.)

#### Q7: What operational events will you have as a team?

Describe meetings (and other events) you are planning to have. 
 * When and where? Recurring or ad hoc? In-person or online?
 * What's the purpose of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync meeting online, etc.
 * You must have at least 2 meetings with your project partner (if you have one) before D1 is due. Describe them here:
   * What did you discuss during the meetings?
   * What were the outcomes of each meeting?
   * You must provide meeting minutes.
   * You must have a regular meeting schedule established by the second meeting.  

We have 2 separate teams: one dedicated to backend and backend testing, the other one to frontend and frontend testing. We will make sure that at least one member of each team will participate to the bi-weekly scheduled meeting with the partner. There is a meeting set up weekly for the whole team during the tutorial (Tuesday, 9pm) so that we can discuss further objectives for both backend and frontend and communicate new APIs if necessary. This meeting will be online for now. Members of the same team will do at least one quick meeting to review/synchronize the parts they are developing concurrently. We plan to fully separate the coding tasks so that we can work independently. If we feel that we lack motivation, we will plan coding sessions. More generally, we use our discord channel to discuss our decisions, if necessary.
 
 
1st meeting description: 
The first meeting consisted of introducing ourselves to the UofT Aerospace Team member in charge of the project, Katrina, and another team member Henry. Katrina briefly explained to us how the Aerospace Team currently works before each drone flight (they have to make a whole site survey and check manually that everything is correct according to the Canadian Aviation Regulations) and presented her expectations for the software. In approximately half an hour, we could get an overview of the main functionalities for the windows desktop application: the user should be able to pin a location on a map and get relevant information about surrounding areas (nearby airports/aerodromes for example), store data about flights and drones. A flight survey should be automatically generated and accurate (this is the key point of the project – users don’t want to do the tedious administrative work). We talked a little bit about tech stack requirements, confidentiality of the data (their drone designs must be kept private for example), and availability for meetings. At the end of the meeting, the goal was for us to process the information we were given in order to produce an overview of what we understand, determine what we might or might not be able to do, and produce a draft of the MVP. 

2nd meeting description:
The second meeting consisted of our team giving Katrina and Ernest - another member of the Aerospace team - a rundown of the feature list that we came up with. The features matched with the required functionalities that they wanted - including producing a site survey according to a pinned location on a map, drawing flight boundaries around the pin, exporting the collected info in a PDF format, storing drone specifications and drone logs. We clarified about the APIs that we could potentially use and the information they wanted in the site survey. We also set a biweekly meeting time of Wednesday 7pm, and agreed on a confidentiality agreement: we are free to publish our source code, software and design on Github. After that, we went through some Figma planning to decide on the flow of the application, fonts, color scheme and other small details.

  
#### Q8: What artifacts will you use to self-organize?

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-Do lists, Task boards, schedule(s), meeting minutes, etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * **How do you prioritize tasks?**
   * How do tasks get assigned to team members?
   * How do you determine the status of work from inception to completion?

We keep track of what needs to be done with a to-do list (general, to see what classes are done/missing) and scheduled task boards (so that we see the code timeline). Tasks are prioritized depending on the necessity of the task. For example, we will divide each class in 2 parts: “main functionalities” and “details” and make sure the main functionalities of all classes are implemented (and tested) before moving to the details (optimisation of code, etc.). This is to ensure the validation of the MVP. 
Tasks are assigned to members depending such that the work is approximately equally spread among the team. We will also take into account workload of team members each week to be most efficient (this is to avoid unnecessary pressure on a team member and also waiting on this same team member to move forward). 
We use 5 states for ou work: 1. To be done, 2. In progress (API and structure done), 3. Main functionalities complete, 4. Main functionalities complete and tested, 5. Class complete and tested to help us track the status of our work. A class is considered done once state 4 is reached. 


#### Q9: What are the rules regarding how your team works?

Describe your team's working culture.

**Communications:**
 * What is the expected frequency? What methods/channels are appropriate? 
 * If you have a partner project, what is your process (in detail) for communicating with your partner?
 
**Meetings:**
 * How are people held accountable for attending meetings, completing action items? Is there a moderator or process?
 
**Conflict Resolution:**
 * List at least three team scenarios/conflicts you discussed in lecture and how you decided you will resolve them. Indecisions? Non-responsive team members? Any other scenarios you can think of?

The methods of communication within the team are a group voice channel and a group text channel, as well as an announcement channel for important information from the course staff/our partner. So far all the group members have been responsive, communicating on a daily basis.

We will communicate with the partner using email and biweekly in a Zoom meeting where progress and feedback will be discussed. 

The group members are motivated toward upholding integrity with our client, therefore we do not feel it is necessary to have a moderation system in place as of yet. Evidently, if a team member is not acting responsibly or there is a clear difference in effort, that will show in the reflections at the end of the project. Of course, everyone is expected to speak in the group chat and attend meetings regularly.

Indecisions will be resolved by a group discussion and in general a majority decision. We do not believe there will be any strong enough disagreements such that we will not be able to move forward after one meeting.
 
Non-responsive team members will be resolved through communication and if, as a base guideline, this lasts for up to 2 weeks, the rest of the group will contact course staff to help motivate them or reduce their contribution to the project.

We will prevent unmet deadlines by managing our time effectively and scheduling regular meetings to work on the project with a timeline in mind. We will try to progress with the project such that we can meet our deadlines a few days early, so that testing time is available and we are able to present a confident product to our partner.

----
## Highlights

Specify 3 - 5 key decisions and/or insights that came up during your meetings
and/or collaborative process.

 * Short (5 min' read max)
 * Decisions can be related to the product and/or the team process.
    * Mention which alternatives you were considering.
    * Present the arguments for each alternative.
    * Explain why the option you decided on makes the most sense for your team/product/users.
 * Essentially, we want to understand how (and why) you ended up with your current product and process plan.
 * This section is useful for important information regarding your decision making process that may not necessarily fit in other sections. 
