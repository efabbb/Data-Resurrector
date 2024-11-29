// read the data.txt file
fetch(chrome.runtime.getURL('data.txt'))
    .then((response) => response.text())
    .then((data) => {

        // save data to an array
        var files = data.split('\n');

        // Define the allowed file extensions
        const allowedFileTypes = [".json", ".jpg", ".png", ".mp4", ".mp3", ".gif"];

        // Function to check if a file is allowed
        function isAllowedFile(fileName) {
            return allowedFileTypes.some(ext => fileName.endsWith(ext));
        }

                // Function to convert the first letter of string values to lowercase
            function lowercaseFirstLetter(jsonData) {
            for (let key in jsonData) {
                if (typeof jsonData[key] === 'string' && jsonData[key].length > 0) {
                    jsonData[key] = jsonData[key].charAt(0).toLowerCase() + jsonData[key].slice(1);
                }
            }
                return jsonData;
        }

                // Function to wrap text in span tags for each character, except for spaces
                function wrapTextWithSpans(text) {
                    return text.split('').map(char => {
                        // Only wrap non-space characters
                        if (char === ' ') {
                            return ' '; // return the space as it is
                        }
                        return `<span class="hover-text">${char}</span>`; // wrap other characters in span
                    }).join('');
                }

                    // Function to generate a random color from a predefined set
                    function getRandomColor() {
                        const colors = ['#4285f4', '#ea4335', '#fbbc05', '#34a853'];
                        return colors[Math.floor(Math.random() * colors.length)];
                    }

        // Function to initialize the hover effect and wrap text
        function initializeHoverEffect() {
            const jsonTitleElement = document.querySelector('.Date-ColorShift');
            const originalText = jsonTitleElement.textContent; // Get the text content
            const wrappedText = wrapTextWithSpans(originalText); // Wrap each character in a <span>

            jsonTitleElement.innerHTML = wrappedText; // Replace the original content with wrapped text

            const hoverTextSpans = jsonTitleElement.querySelectorAll('.hover-text'); // Select all the wrapped letters

            // Add hover event listener to .JSON--Title
            jsonTitleElement.addEventListener('mouseenter', () => {
                hoverTextSpans.forEach(span => {
                    span.style.color = getRandomColor(); // Apply random color to each character
                });
            });

            // Reset colors when hover is removed
            jsonTitleElement.addEventListener('mouseleave', () => {
                hoverTextSpans.forEach(span => {
                    span.style.color = ''; // Reset the color to the original state
                });
            });
        }

        // Function to display a file or skip if not allowed
        function displayRandomFile(files) {
            // Weigh the random selection so JSON files have 90% chance, and others 10%
            var isJsonFileSelected = Math.random() < 0.9; // 90% chance for JSON files
            var randomFile;

            if (isJsonFileSelected) {
                // Select a JSON file
                randomFile = files.filter(file => file.endsWith('.json'))[Math.floor(Math.random() * files.filter(file => file.endsWith('.json')).length)];
            } else {
                // Select a non-JSON file (image, audio, video, etc.)
                randomFile = files.filter(file => !file.endsWith('.json'))[Math.floor(Math.random() * files.filter(file => !file.endsWith('.json')).length)];
            }

            // get file info
            var filePath = randomFile.trim();
            var fileUri = filePath.replace(' ', '%20');
            var fileUrl = chrome.runtime.getURL(fileUri);

            // Check if the file extension is allowed
            if (isAllowedFile(randomFile)) {

				// Find existing container by ID
				var container = document.getElementById('Container--Script');

				// Create new element for content
				var newElement = document.createElement('div');

                // Check file conditions
                if (fileUrl.endsWith('.mp4')) {

                    // if file ends with '.mp4'
                    newElement.innerHTML = `<video class="Media--Display" src="${fileUrl}" autoplay muted>`;

                } else if (fileUrl.endsWith('.json')) {
                    // if file ends with '.json'

                    // Function to make URLs in a string clickable
                    function makeUrlsClickable(text) {
                        const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/g; // Regex to match URLs starting with http(s):// or www.
                        return text.replace(urlPattern, function(url) {
                            // Add the protocol 'http://' to URLs starting with 'www.' to make them valid links
                            if (url.startsWith('www.')) {
                                url = 'http://' + url; // Adding 'http://' to make 'www.' a valid link
                            }
                            return `<a href="${url}" target="_blank" class="clickable-url">${url}</a>`;
                        });
                    }

                    fetch(fileUrl)
                        .then((response) => response.json())
                        .then((jsonData) => {
							
                            // Ensure data is an array and has at least one element
                            if (Array.isArray(jsonData) && jsonData.length > 0) {
                                var randomSearchIndex = Math.floor(Math.random() * jsonData.length);
                                var randomSearch = jsonData[randomSearchIndex];

                                // Modify the JSON data by making the first letter of every string value lowercase
                                randomSearch = lowercaseFirstLetter(randomSearch);

                                // Check if randomSearch has 'title' and 'time' properties
                                if (randomSearch && randomSearch.title && randomSearch.time) {

                                    // Format the time property
                                    var formattedTime = formatTime(randomSearch.time);
                                    var timeWithWords = `<span class="time-word">on</span> ${formattedTime}</br>`;

                                    
                                    // Display both title and time
                                    newElement.innerHTML = `
                                        <h1 class="JSON--Title"><span class="Date-ColorShift">${timeWithWords}</span></br> <span class="Border--Title"> you ${makeUrlsClickable(randomSearch.title)}</span>
                                    `;

                                    // Call the hover effect initialization after content is injected
                                    initializeHoverEffect(); // Initialize the hover effect for random colors

                                } else {
                                    // Skip invalid entry if it doesn't have 'title' or 'time'
                                    console.log('Skipping invalid JSON entry (missing title or time).');
                                    displayRandomFile(files); // Recursively try another file
                                }
                            } else {
                                // Skip invalid or empty JSON data
                                console.log('No valid JSON data or empty array.');
                                displayRandomFile(files); // Recursively try another file
                            }
                        })
                        .catch((error) => {
                            console.error('Error fetching JSON:', error);
                            displayRandomFile(files); // Recursively try another file
                        });

                } else if (fileUrl.endsWith('.html')) {
                    // if file ends with '.html'
                    newElement.innerHTML = `<iframe class="Media--Display" src="${fileUrl}">`;

                } else if (fileUrl.endsWith('.mp3')) {
                    // if file ends with '.mp3'
                    newElement.innerHTML = `<audio class="Media--Display" controls><source src="${fileUrl} ">`;

                } else if (fileUrl.endsWith('.png') || fileUrl.endsWith('.gif') || fileUrl.endsWith('.jpg')) {
                    // if file ends with image extensions
                    newElement.innerHTML = `<img class="Media--Display" src="${fileUrl}">`;

                } else {
                    // default behavior if file can't be handled, just display URL
                    newElement.innerHTML = `<a href="${fileUrl}">${filePath}</a>`;
                }

				container.appendChild(newElement);

            } else {
                // If the file extension is not allowed, skip to another file
                console.log(`Skipping file: ${randomFile}`);
                displayRandomFile(files); // Recursively call the function to select another file
            }
        }

        // Start the file display process
        displayRandomFile(files);

    })
    .catch((error) => {
        console.error(error);
    });

    // Function to format the time in a more readable way
function formatTime(timeString) {
    // Create a new Date object from the time string
    var date = new Date(timeString);

    // Check if the date is valid
    if (isNaN(date)) {
         console.error("Invalid date:", timeString);
         return timeString; // Return the raw time if invalid
    }

    // Use toLocaleString to format the date in a readable format
    return date.toLocaleString("en-US", {
        weekday: 'long', // "Monday"
        year: 'numeric', // "2024"
        month: 'long', // "November"
        day: 'numeric', // "24"
        hour: '2-digit', // "03"
        minute: '2-digit', // "30"
        hour12: true // Use 12-hour time format
    });

}


