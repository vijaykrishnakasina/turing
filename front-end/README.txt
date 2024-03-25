Front end app - messaging-ui

created using npx command

FR :


NFR : 
Handle multiple users : added a field user to identify what messages are posted by which user
Handle security: implemented in-memory user authentication and allowed cors from only backend endpoint

improvements:

More cleaner UI
Unit tests 
logout button 
scroll bar for MessageList
Show firstletter of the user and time of the message
graceful error handling - show error messagages for invalid login, item not found etc 


Back end app - messaging-resource-server

Flask or Django : Choosen flask because It's suitable for small to medium applications.
data store : as suggested using SQLite as embedded DB
security: jwt tokens




cloud :

migrate apps to docker and deploy to gcp

