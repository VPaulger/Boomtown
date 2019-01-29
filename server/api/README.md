Objective
- Objective of this assignment was to create a database with Postgress while using GraphQL to communicate with our database. The database was to contain multiple tables for users, items and item tags. With GraphQL we were supposed to access data from these tables and update data as well. After this was complete we would then build the front-end in Part 2 to create a sharing community for household items.   

Obstacles
- Found it very difficult to grasp the query and resolver portion of our javascript files. 
- Overall the files given in the starter package were quite foreign having never written this syntax and only a short amount of time to learn before the project was due.
- Debugging was also difficult and required you to find clues in the editor, the terminal and the GraphQL playground.
- Understanding the schema and the query language was a little tricky at first but became familliar quickly.
- One of my peers made me aware of the unique constraints in our database that needed to be updated. Some of them required an "on delete cascade" to be added to the constraints in order to delete all related data when an item or tag was deleted.

Outcome
- Was able to complete the project succesfully with only one minor error which I was not able to diagnose. Upon adding a new item to my database I receive an error saying "TypeError: Cannot read property '0' of undefined." After console loging the results of my new item entry I can see that the items are being added but am no able to return that data in the playground.
- Beside the one minor error mentioned I am happy with what has been accomblished and the knowledge gained. It was not easy to begin with but by the end am now confident in making GraphQL queries and desiging a database.
- Am very excited to deepen my knowledge of these powerful tools and work towards the title of a Full-Stack Developer. 