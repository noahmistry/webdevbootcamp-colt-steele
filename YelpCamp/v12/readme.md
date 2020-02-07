# YELPCAMP

* Add Landing Page
* Add Campgrounds Page that lists all campgrounds

Each Campground has:
* Name
* Image
* Each campground will have an array,
[
	{name:"Cache Creek",image:http://www.image.com"}
]

# Layout and Basic Styling
* Create our header and footer partials
* Add in bootstrap

# Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

# Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes!

# Show Page
* Review the RESTful routes we've seen so far
* Add description to your campground model
* Show db.collection.drop()
* Add a show route/template

# RESTful ROUTES #
*	https://codepen.io/emz123/pen/MqJzyP

# Refactor Mongoose Code
*	Create a models directory
*	Use module.exports
*	Require everything correctly!

# Add Seeds File
*	Add a seeds.js file
*	Run the seeds file every time the server starts

# Add the Comment model!
*	Make our errors disappear!
*	Display comments on campground show page

# Comment New/Create
* 	Discuss nested routes
*	Add the comment new and create routes
	- New: - campground/:id/comments/new - GET
	- CREATE: - campground/:id/comments - POST
*	Add the new comment form

#	Style Show Page
*	Add sidebar to show page
*	Display comments nicely

# Auth Pt.1 - Add user Model
*	Install all packages needed for auth
*	Define User Model

# Auth Pt.2 - Add user Model
*	Configure Passport
*	Add register routes
*	Add register template

# Auth Pt.3 - Login
*	Add login routes
*	Add login template

# Auth Pt.4 - Logout/Navbar
*	Add logout route
*	Prevent user from adding a comment if not signed inside
* Add links to navbar
* Show/Hide auth links correctly

# Auth Pt. 5 - Show/Hide Links on User State
*	Show/hide auth links in navbar correctly

# Users and Comments
*	Associate users and comments
*	Save author's name to a comment automatically

# Users + Campgrounds
*	Prevent an unauthenticated user from creating a campground
*	Save username+id to newly created campground

# Editing Campgrounds - CRUD
*	Add Method-Override
*	Add Edit Route for Campgrounds
*	Add Link to Edit Page
*	Add Update Route
*	Fix $set problem

# Deleting Campgrounds
*	Add Destroy Button
*	Add Delete Button

# Autorization -Permissions after Authentication
*	User can only edit his/her campgrounds
*	User can only delete his/her campgrounds
*	Hide and Show edit and delete after user authorization

# Authorization Part 2: Comments
*	Unlike our campground edit and delete. Our comments route are nested -> /campground/:id/comments/:id/edit. 
*	So we need to rename our second id code -> /campgrounds/:id/comments/comment_id/edit or delete.
*	User can only edit his/her comments
*	User can only delete his/her comments
*	Hide/show edit and delete buttons
*	Refactor Middleware

#	Editing Comments
*	Add Edit button to new comments/edit.ejs
*	Add Edit Route

Campground Edit Route: <!-- /campgrounds/:id/edit -->
Comment Edit Route: <!-- /campground/:id/comments/:comment_id/edit -->

# Deleting Comments
*	Add Destroy route
*	Add Delete button

Campground Delete Route: <!-- /campgrounds/:id/ -->
Comment Delete Route: <!-- /campground/:id/comments/:comment_id/ -->

#	Adding in Flash Comments
*	Demo working version
*	Install and configure connect-flash
*	Add bootstrap alerts to header