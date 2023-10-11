
const linkTexts = [

    "Generate a html+css page that looks like the wikipedia page on turtles please! (css inline, replace all images by emojis)",
    "Generate a html+css page that looks like the wikipedia page on rabbits please! (css inline, replace all images by emojis)",
    "Generate a html+css page that looks like the a reddit post on r/AmItheAsshole please! (css inline, replace all images by emojis). Write a detailed and compelling story.",
    "Generate a html+css page that looks like the a reddit post on r/AskReddit please! (css inline, replace all images by emojis). Write a detailed and compelling story.",
    "Generate a html+css page that looks like the a reddit post on r/AskScience please! (css inline, replace all images by emojis). Write a detailed and compelling story.",
    "Generate a html+css page that looks like the a reddit post on r/AskScience please! (css inline, replace all images by emojis). Write a detailed and compelling story.",
    "Generate a html+css page that looks like the a reddit post on r/AskScience please! (css inline, replace all images by emojis). Write a detailed and compelling story.",
    
    
    "Generate a html+css tribute page dedicated to 80s pop culture (css inline). Replace any potential images with 80s themed emojis and ASCII art. Ensure a vibrant color palette reminiscent of the era.",
    "Generate a html+css page that mimics the visual style of an old-school video game instruction manual (css inline). Utilize pixel art emojis and characters to illustrate the guide, and implement a retro 8-bit font if possible.",
    "Generate a html+css digital scrapbook page that represents a traveler’s journey through Italy (css inline). Utilize food, transport, and landmark emojis instead of images, with handwritten-styled fonts and a warm color scheme.",
    "Generate a html+css page that serves as an online menu for a whimsical, magical themed cafe (css inline). Utilize mystical emojis and symbols in place of images, with a pastel and glittery color theme.",
    "Generate a html+css page that takes inspiration from classic fairy tales (css inline). Use emojis for main characters and elements, incorporating vintage-style fonts and a soft, dreamy color palette.",
    "Generate a html+css Mission to Mars themed webpage (css inline), where emojis represent planets, stars, and astronauts. Employ a dark, starry color scheme and futuristic fonts.",
    "Generate a html+css page representing a digital farmers market (css inline). Include emojis for various fruits, vegetables, and artisanal products, and utilize earthy colors and rustic fonts.",
    "Generate a html+css page for a virtual aquarium tour (css inline), where different sections are represented by various sea creature emojis. Utilize deep blue and green color schemes, and sleek, modern fonts.",
    "Generate a html+css page that mimics a medieval scroll (css inline). Use emojis for heraldic symbols, beasts, and royal items, and choose parchment colors and calligraphic fonts.",
    "Generate a html+css page for a spooky, yet playful, haunted house tour (css inline). Replace typical horror images with ghost and monster emojis, using a dark yet vibrant color palette, and whimsical fonts.",
];

document.addEventListener("DOMContentLoaded", function () {
    const linkList = document.getElementById("linkList");
    linkTexts.forEach(text => {
        let listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.innerHTML = `<a href="#" onclick="generatePage('${text}')">${text}</a>`;
        linkList.appendChild(listItem);
    });
    startLoadingTextRotation();
});

async function generatePage(linkText) {
    document.getElementById('loader').style.display = 'block';
    const response = await fetch(`/generate?link_text=${linkText}`);
    const pageContent = await response.text();
    document.open();
    document.write(pageContent);
    document.close();
}

function startLoadingTextRotation() {
    const loadingTextElement = document.getElementById('loadingText');
    const loadingTexts = [
        "Calibrating the coconut's aerodynamics...",
        "Performing unsupervised learning on a parrot...",
        "Reverse engineering the air-speed velocity of unladen swallows...",
        "Adjusting the spam filters to allow more lumberjack messages...",
        "Extracting humor features from a dead parrot...",
        "Quantifying the silliness of a walk...",
        "Deploying a herd of wild rabbits into latent space...",
        "Performing anomaly detection on fish-slapping activities...",
        "Conducting a multi-armed bandit test on knights who say ‘Ni’...",
        "Propagating gradients through the Spanish Inquisition (nobody expects it)...",
        "Implementing a Python (obviously) to slither through your data...",
        "Tuning the hyperparameters of your killer rabbit...",
        "Determining the eigenvalue of a coconut...",
        "Uploading spam, eggs, sausage, and spam into the cloud...",
        "Calibrating catapults for optimal cow trajectory...",
        "Engaging ludicrous speed! Wait, wrong reference...",
        "Teaching neural networks the art of not being seen...",
        "Employing vicious chickens for robust error handling...",
        "Bootstrapping the Ministry of Silly Walks...",
        "Establishing a peer-to-peer network with the Knights of the Round Table...",
        "Initializing a Monte Carlo simulation of holy hand grenades...",
        "Calculating the probability of a successful flesh wound...",
        "Plotting the most efficient path to the Castle Aaargh...",
        "Extrapolating the economic impact of wafer-thin mints...",
        "Conducting sentiment analysis on the meaning of life...",
        "Bootstrapping a Byzantine fault-tolerant shrubbery...",
        "Evaluating the fitness function of an ex-parrot...",
        "Debugging a duck to verify if it weighs the same as a witch..."
    ];

    let currentIndex = 0;
    
    function updateLoadingText() {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * loadingTexts.length);
        } while (randomIndex === currentIndex);

        loadingTextElement.innerText = loadingTexts[randomIndex];
        currentIndex = randomIndex;
    }


    setInterval(updateLoadingText, 4000); // Update text every 5 seconds
    updateLoadingText(); // Initialize the first text
}