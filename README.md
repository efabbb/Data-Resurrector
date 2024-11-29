# Data-Resurrector
This extension is built to run in Chrome's developer mode. You can use it to browse and parse through your Google Takeout data (which you need to download separately)

Here are instructions on how to use it.

<ol>#### Step 1: Download Google Takeout Data
  <li>Visit https://takeout.google.com/</li>
  <li>Sign in to the Google Account you'd like to download your data from</li>
  <li>There will be an interface that prompts you to create a new export by selecting the data you'd like to include</li><br>
  <img width="800" alt="Screenshot 2024-11-29 at 12 34 04 PM" src="https://github.com/user-attachments/assets/9475b0ed-3c62-47c2-8cc9-af7103815d94">
  <br><br>
  <li>Check the box that says "Deselect All"</li>
  <li>Now scroll down and select "Drive," "My Photos," "My Activity," and "Youtube and Youtube Music."</li><br>
     
  <img width="500" alt="Screenshot 2024-11-29 at 12 40 39 PM" src="https://github.com/user-attachments/assets/37eaa8d0-8427-4b07-a1e4-e368afad4f33">
  <img width="500" alt="Screenshot 2024-11-29 at 12 40 25 PM" src="https://github.com/user-attachments/assets/e89fd990-19c0-47d6-a8f4-aaf7e45a1078">
  <img width="500" alt="Screenshot 2024-11-29 at 12 40 08 PM" src="https://github.com/user-attachments/assets/5de505e4-8792-4045-8018-33f289a9e395">
  <img width="500" alt="Screenshot 2024-11-29 at 12 39 53 PM" src="https://github.com/user-attachments/assets/b61ae4af-523d-4990-a6de-5f7481c6aef2">
  <br><br>

  <li>When selecting "My Activity" and "Youtube and Youtube Music" please click on the button for each that says "Multiple Formats" and change the "HTML" selector option to "JSON" and press OK.</li>
  <br><br>
  <img width="500" alt="Screenshot 2024-11-29 at 12 46 44 PM" src="https://github.com/user-attachments/assets/421cdc39-9ded-4ec9-b631-d5431744eb05">
  <img width="500" alt="Screenshot 2024-11-29 at 12 46 56 PM" src="https://github.com/user-attachments/assets/3f93042d-3cb5-4b6d-b04a-e17d85b64f69">
  <br><br>

  <li>Scroll down and select "Next Step"</li>
  <li>You can keep all of the settings under "Choose file type, frequency, & destination" as is, except change the "File size" to 50GB</li>
  <li>Select "Create Export"</li>
  <li>Now you need to wait to recieve your data. This can take anywhere from an hour or two, to a day or so depending on how much data Google has stored about you.</li>
  <li>Once your data is ready, you will receive an email to the Google Account you used. In the email, select "Download Files"</li>
  <li>Wait for your data to download and you should be good to go!</li>
  </ol>

#### Step 2: Download the extension
  1. Go to the GitHub https://github.com/efabbb/Data-Resurrector
  2. Select the green drop down button that says "Code" and select "Download ZIP"
  3. Unzip the file

#### Step 3: Add your Google data to the extension
  1. Move (Drag or Copy & Paste) the contents of your Google Takeout folder into the "data" folder of the unzipped extension folder
  2. Open terminal (Command + Space + type "terminal")
  3. Type cd + space + drag the extension folder ("Data-Resurrector-Main") into the window and press "enter"
  4. Then type "bash + space + "crawl.sh" and press "enter"
  5. You are ready to load it into chrome

#### Step 4: Launch Chrome in developer mode
  1. Open Chrome
  2. Click on the 3 vertical dots in the upper right hand corner of the browser
  3. Go down to "Extensions" and select "Manage Extensions"
  4. In the right corner of the new window, toggle the switch that says "Developer mode"
  5. In the upper left of the Chrome window, click on "Load Unpacked"
  6. Select the extension folder ("Data-Resurrector-Main")

#### Step 5: Use the extension
  1. Your data should now be summoned at random. Reload the page as much as you want to see what your past self was up to online. 
     
     
