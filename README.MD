# NodeJS File System

## **The task is to create an API endpoint to create a folder with a file and content. Also, to retrieve the file from the folder**

1. The file name will be the current date-time.txt and the content of the file will be the current timestamp.
 
2. The following steps will help you do this:
 
   1. Add the route http://localhost:3000/create_folder_file to create a folder with a file and content. We can acheive this by using post method.

    2. Use this JSON format to provide the folder name.

          {

         "folderName": "Nodejs"

          }

3. In the task, I have given a folder name as Nodejs and the file name will be the current date-time.txt and the content will be the current timestamp.

4. Next task is about to retrive the file from the folder. we can acheive this by using get method.

    1. Use this http://localhost:3000/folder/:folderName server to retrieve the file from the folder. For instance, my folder name is Nodejs, so I will add the route as /folder/Nodejs.

5. Run the server using npm run dev.
6. Endpoint for creating folder with file and content: http://localhost:3000/create_folder_file - Use post method.
7. Endpoint for retrieving the file from the folder: http://localhost:3000/folder/:folderName - use get method.



    

