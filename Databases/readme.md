# Databases

## Intro to Databases

* What is a database?
	* A collection of information/database
	* Has an interface
* SQL (relational) vs NoSQL (non-relational)

========================
# Relational Databases
========================

## USERS TABLE
id | name | age | city
------------------------
1  | Tim  | 57  | NYC
2  | Ira  | 25  | Los Angeles
3  | Kira | 40  | Miami

## COMMENTS TABLE
id | text
------------------------
1  | "Manhattan"
2  | "California"
3  | "Florida"

## USER/COMMENTS JOIN TABLE
userId | commentsId
------------------------
	1  		3	
	2		2
	2		4
	3		1
	
===========================	
# NON-RELATIONAL DATABASE
===========================
* Javascript Object/Value Pairs
{
	name:"Ira",
	age: 24,
	city: Missoula,
	comments: [
		{text: "Come see Montana!"},
		{text: "Don't miss the chance to see real beauty!"}
	]
}