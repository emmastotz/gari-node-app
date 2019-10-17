## **GARI-node-app**
### Meet GARI, the Gibberish Analysis and Recognition Interface.

##### THE PROBLEM & SOLUTION
GARI's purpose in life is to solve all your movie and song needs. Looking for a movie or song? GARI can find it. Want to see your favorite artist(s) in concert? GARI can do that too.

##### GARI was coded into 2 main sections with various subsections:
* A. The Intialization Section 
  * In this section, you will find where I set up the various requirements and keys needed for the functionality of the app. Required NPMs are: Spotify, Inquirer, Axios, Moment, FS, and dotenv.
* B. The Function Section
  * This section holds the bulk of the code, wherein you will find several functions to run the code. This section starts with an initial inquirer prompt which asks the user to input what they want to do. From there, a switch/case statement moves into 1 of 4 functions:
    * 1. Concert This Function 
      * This function uses inquirer to ask the user what artist they would like to see in concert. Axios then searches through the Bandsintown API to find the selected artists upcoming concerts, and uses moment to format the dates.
    * 2. Spotify This Song Function 
      * This function uses the inquirer to ask the user which song they would like to search. Node-Spotify-API passes back details about any songs with the title they searched. 
    * 3. Movie This Function 
      * This function uses inquirer to prompt the user for a movie. Axios then searches through the OMDB API to find the selected movie with additional details.
    * 4. Do What It Says Function 
      * This function uses the file system (fs) to read the random.txt file and do what it says. It reads the file using a switch/case statement that then performs one of the above functions as previously described.

##### Instructions to Run the App
*See my demo here: https://drive.google.com/file/d/1zMnTQ8Jc8QjTQSh7tJa2t8g1OFTy63rX/view*
* 1. Clone the file from github. (https://github.com/emmastotz/gari-node-app).
* 2. Install all dependencies needed to run the program ("npm install") and acquire needed API keys.
* 3. Run the program using node in the command line ("node gari.js").
* 4. Follow the inquirer prompts to successfully search/navigate with GARI. 

##### Technologies Used
* Javascript
* Node
* NPMs: Spotify, Inquirer, Axios, Moment, FS and dotenv

This app was created entirely by Emma Stotz