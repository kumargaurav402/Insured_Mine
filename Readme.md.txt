//To install package
-
npm install


// Run the project
-
node server.js


//API to upload the attached CSV data into Mongodb
-CSV have to be put inside the upload folder.
http://localhost:3000/services/user/uploadCSV



//API to find policy info with the help of username.
-http://localhost:3000/services/user/getPolicy/:username
example :
-http://localhost:3000/services/user/getPolicy/Lura Lucca


//API to provide aggregated policy by each user.
-http://localhost:3000/services/user/aggregatedPolicy/:username
example:
-http://localhost:3000/services/user/aggregatedPolicy/Lura Lucca

DATABASE IS AVAILABLE IN MLAB CLOUD.
LINK= https://mlab.com/
