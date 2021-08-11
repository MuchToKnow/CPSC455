## Project Description (1)
Full stack web application that gives users the ability to reserve parking spots conveniently at spaces owned by other users. Users can also list their own properties as parking spots for others to use for a passive income. This helps to solve the problem of parking shortage and utilizes space more efficiently by bringing more parking spaces to the public market without sacrificing more space for parking.

## Goals/Goal Completion (2)

○ Initial minimal goals
    
    ○ User account creation✅
    ○ User login and logout✅
    ○ Parking spot listing creation✅
    ○ Parking spot rental bookings✅
    ○ Browsing page for listings (like Airbnb)✅

○ Initial standard requirements
    
    ○ User profile page ✅
    ○ User profile editing ✅
    ○ Contact us page ✅
    ○ Address and neighbourhood based search for parking spots ✅
    ○ Support for calendar-based date selection ✅
    ○ Reviews for parking spots ✅
    ○ Reviews for users ✅

○ 2-3 stretch requirements (plan to complete at least 1!)

    ○ Integration with a map API ✅
    ○ Identity and ownership authentication API (Persona)
    ○ Integration with credit / debit card API
    ○ Referral program for friends/family to join as lister/renter
    ○ Subscription program to park at any listings

## Tech from Course (3)

### Unit 1 Materials – HTML,CSS, JS
- Used CSS styling where applicable, and organized our CSS into classes while using Material UI’s theme hook system for more robust project-wide CSS standards.
- Implemented Javascript functions for interactivity, functionality and to interface with our backend API using the Axios library.
- HTML was used throughout our front end code, including inside our React components.
### Unit 2 Materials – React
- Our project was built using React for our front end code. We utilized functional React components (with the useEffect and useState hooks) and broke down our project into hierarchical structure (Atomic Design); Atomic React file structure isolates the environments of each feature component, thus allowing for code to become navigable and modular.
- Utilized context-providers as well as high level components for commonly used state such as user-login state.
- We used libraries (Material-UI, Axios, React-router, Mapbox) that interact with React to build a dynamic and engaging website.
### Unit 3 Materials – Node & Express
- Used Node and Express to create the server that connects the front end endpoints and MongoDB database. Implemented routing to correctly path links to the appropriate pages on the web page as well as path and query params to support a more dynamic web app experience.
- Additionally used a Firebase integration with our node backend to register, login, and authenticate user requests.
### Unit 4 Materials – NoSQL with MongoDB
- We used MongoDB as our NoSQL backend database to store all of our data.
- Stored listings, bookings, and reviews in their own collections as json objects.
- Queried our collections via the backend, often filtering based on generated UUIDs as well as the user(s) associated with the object.

### Unit 5 Materials – Release Engineering-
- Our web app is deployed using Github Actions to Heroku, and each push to master is built and deployed automatically.
- Our NodeJs backend is also automatically deployed to firebase functions utilizing a separate Github Action.

## Above and beyond (4)
### Map 
Integrated Mapbox API with react to show a map next to all the listings of the parking spots. Added markers for each listing to show exactly where the listing is on the map. We used not only HTML, CSS, JavaScript, and React to complete this feature, but also the Mapbox API, which is outside the scope of this course.
### Firebase
We learned Firebase in order to integrate it for storing user profile data as well as user authentication.  Our frontend and backend both integrate with firebase to provide security for user info.
### Authentication
Created custom Express.js middleware that could be inserted into our routes easily to protect them against unauthorized use as well as provide firebase user context to the request.

## Next Steps (5)
- To further improve the application integration with credit/debit card API can be used, this way secure payments can be made within the web application. Currently, users must pay on a peer-to-peer basis.
- Fraud detection (user identity with Persona or Stripe, parking spot ownership, payment options)
- Implement a referral program for friends and families to join as listers/renters and include features such as discount codes for both parties to use.
    
## List of Contributions (6)
### Justin
- Built out our listings and bookings system for frontend and backend including listing search using a fuzzy find library.
- Built the authentication middleware and overall system for securing our API requests utilizing firebase authentication tokens with our custom backend.
- Built the My Listings page with full in-page edit/delete functionality per listing. Also built reusable front-end components such as the user menu, listing menu component.
### Darvey
- Worked on the landing page on the applications, moved login and register functionality to the login page.
- Spent time and made changes on UI and UX design by importing designed logo and colour changes to the web application 
- Created Contact Us page along with page and functionality to edit user info, along with bug-fixing UI/UX issues.
### Yuta
- Worked on designing and building the front end of the user registration form.
- Built the listing page front end that retrieves/shows data from the back end using HTTP calls. 
- Implemented the review system where users can rate individual listings and view all their past reviews from a "My Reviews" page with a delete option for each review.
### David
- Built the page for users to create their parking spot listing 
- Integrated the Mapbox API with our listings to display a map beside our listings with markers inside the map pinpointing each listing’s location
- Sketched our product’s prototype / key features, and wrote some of our initial front end code for the main/home page and the login page

# Initial Planning

○ Who is it for?
    
    ○ Individuals who want to buy or sell parking spot spaces in a peer to peer environment. Anyone looking to purchase
    parking spots for a cheaper price, or rent their private parking spots for a passive side income.

○ What will it do? (What "human activity" will it support?)
    
    ○ The app will facilitate listing of parking spots to rent
    ○ The app will facilitate renting of parking spots
    ○ The app will maintain user accounts to track which parking spots they have rented, prices, availability, etc.

○ What type of data will it store?
    
    ○ User profile information. (Name, Address, Location)
    ○ pictures
    ○ Parking spots and its coordinates / address
    ○ Information and instructions to access the parking lots

○ What will users be able to do with this data?
    
    ○ Users can edit their own user data as well as edit their parking spot listing attributed (address, pictures, description, etc.)

○ What is some additional functionality you can add/remove based on time constraints?
    
    ○ Facilitating the listing and renting of storage spaces
    ○ Ability to facilitate listing and renting of commercial parking spaces

Project task requirements:

○ 3-5 minimal requirements (will definitely complete)
    
    ○ User account creation
    ○ User login and logout
    ○ Parking spot listing creation
    ○ Parking spot rental purchases
    ○ Browsing page for listings (like Airbnb)

○ 3-7 "standard" requirements (will most likely complete)
    
    ○ User profile page
    ○ User profile editing
    ○ Customer support page
    ○ Address and neighbourhood based search for parking spots
    ○ Support for calendar-based date selection
    ○ Reviews for parking spots
    ○ Reviews for users

○ 2-3 stretch requirements (plan to complete at least 1!)

    ○ Integration with a map API
    ○ Identity and ownership authentication API (Persona)
    ○ Integration with credit / debit card API
    ○ Referral program for friends/family to join as lister/renter
    ○ Subscription program to park at any listings

Pick 2 of your minimal requirements and break each of them down into ~2-5 smaller
tasks!
    
    ○ User account creation
        ○ Create mongo db on GCP (look into mongodb atlas?)
        ○ Collect name, email, password, phone number
        ○ Simple web form that creates a user in the db
    ○ User login and logout
        ○ login authentication done with firebase
        ○ Simple login form that allows users to authenticate with our website
        ○ When logged in, logout button is visible to allow users to logout

Finally, draw 2-3 rough sketch prototypes of some key tasks of your app. Sketch these
physically on paper and then scan and add to your repo.

    ○ Login and Log out page:
   ![190389830_303919561412998_464236573803234768_n](https://user-images.githubusercontent.com/38776947/120020997-738ee680-c025-11eb-81ad-a04ef76d7600.jpg)

    ○ searching for parking:
   ![image](https://user-images.githubusercontent.com/28374404/120059326-b214a900-c005-11eb-92df-3f1d75e55a89.png)
   
    ○ Browsing available parking:
   ![image](https://user-images.githubusercontent.com/28374404/120059541-1e43dc80-c007-11eb-9b45-92bd4081aca6.png)

