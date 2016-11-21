# FOODME-BACKEND
Server side of foodme  
Using express and mySQL as database

##TODO
  * ~~Save ingredient in user's fridge~~
  * User saved recipes

##DOCUMENTATION

###/get-fridge/:clientId
Find the user's fridge and return the fridgeId  
If no user's fridge: create it and return the fridgeId as JSON

###/display-fridge/:fridgeId
Display all the content of the user's fridge as JSON  
As an array of object

###/insert-into-fridge
Takes an object with:  
object.fridgeId = the user's fridge ID  
object.ingredientId = the ingredient inputed ID  
object.name = the ingredient inputed name  