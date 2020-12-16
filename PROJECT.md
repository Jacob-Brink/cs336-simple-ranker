# CS 336 Final Project Proposal

## Vision Statement

Debating whether one thing is better than another is an age long tradition. “Star Wars is better than Star Trek!”, “No! My Minecraft house looks much better than yours!”, “CS 336 is definitely much more fun than all the other CS courses”, and the examples can go on and on. Discussing all of these hot topics is an intense, fun and dramatic ordeal. But in the end, people leave these discussions with barely anything constructive and possibly holding grudges. 
This is why we decided to build Easy Ranker - a place where ranking items can be much more straightforward and simplified, and all the grudges you hold can be resolved digitally with civil discussions instead of physical violence. Easy Ranker allows users to create their own lists with the items they want to rank, which can also be shared with others to gain their opinions about how the ranking should be. The ranking process itself is dead simple with each iteration showing only two items from which the user will pick the better option. 
Doing so helps build a simple, intuitive ranking process where n items all get ranked in just n*lg(n) user inputs. These inputs then finally help build a final ranking of the items which will be displayed to the user to browse through and also be able to share to their friends to then come to a consensus or start more fights.

## Team Members

- Jacob Bennett
- Jacob Brink
- Advait Scaria

## Member contributions

- Jacob Bennett
    - Quiz page
        - Figuring out quiz logic and displaying ranked items
    - Quiz Item Card
- Advait Scaria
    - Setup initial page routing (expanded and finished by Jacob Brink)
    - Started work on Main Page (finished by Jacob Brink)
    - Final Page
    - Item Card component
    - Button component
    - General Styling
- Jacob Brink
    - Backend (Firestore setup and management)
    - Collection Creator Page
    - Collection Creator Card component
    - Page Component
    - 
    - Finished up whatever the rest of us got stuck on
    

## Preliminary Design Report

### A preliminary design for your web site / mobile app -- for each page or view, if needed. This design should include describing how the user interacts with the site -- e.g., "clicking on this button causes this to happen and that to happen." 

Please click [here](https://www.figma.com/file/E92m3RtZeQqNP3lHO6SRUn/Easy-Ranker?node-id=0%3A1) to see our preliminary design.

### The structure of your NoSQL database, if you'll be using one.

- Collections
    - Randomly Generated Unique IDs  (be used for the link)
    - Collection Title
    - Item List
        - Unique ID
        - Picture
        - Title
        - Description (optional)
    - Rankings
        - Randomly Generated Unique ID (be used for the link)
        - ID of collection being ranked
        - List of Collection Items’ IDs in order

### A plan for implementation -- what components you will be creating in which order.	

- Page
- Collection Creator Card
- Item Card
- Final Ranking Slider
- Main Page
- Collection Page
- Quiz Page
- Final Page

### A plan for the responsibilities of each team member.

We might end up mixing & matching responsibilities as needed throughout the development process, but here is the tentative plan for who’s in charge of implementing what:

- Jacob Bennett
    - Quiz page
    - Item Card (question pick one cards)
- Advait Scaria
    - Main Page
    - Collection Page
- Jacob Brink
    - Collection Creator Card
    - Final Ranking Slider
    - Final Page
    - Page

