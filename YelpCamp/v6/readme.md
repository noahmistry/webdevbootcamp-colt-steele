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

