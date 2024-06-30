# NodeJS File System

## **The task is to create an API endpoint to create a file in a particular folder. Also, to retrieve the files from the folder**

1. First create a folder by using URL http://localhost:3000/folder Used post method here.
 
   1. Use this JSON format to create the folder:

           ```
          {

         "folderName": "Nodejs"

          }
          ```
        

2. Create a new file by using URL http://localhost:3000/file We can achieve this by using the post method, but you should give the folder name in the request, as mentioned below:

         ```
          {

         "folderName": "Nodejs"

          }
          ```

3. In the task, I have given a folder name as Nodejs and the file name will be the current date-time.txt and the content will be the current timestamp.

4. Next to retrieve the file from the folder. We can acheive this by using get method.

    1. Use URL http://localhost:3000/get/:folderName to retrieve the file from the folder.

          http://localhost:3000/get/Nodejs  

           ```
          {

         "folderName": "Nodejs"

          }

         ```
    2. For getting the data also created folder name is mandatory.

5. Run the server using npm run dev.