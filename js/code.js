// local storage
let mainColor = localStorage.getItem("mainColor");
if (mainColor !== null) {
  // Set Main Color From Local Storage
  document.documentElement.style.setProperty("--main-color", mainColor);

  // Remove All Aactive Class From  All Li
  document.querySelectorAll(".colors li").forEach((element) => {
    element.classList.remove("active");

    // add active class on li with data-color == mainColor from local storage
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

// Start Settigs Box
let theIconBox = document.querySelector(".settigs-box .icon");
let theSettingsBox = document.querySelector(".settigs-box");
let theIconGear = document.querySelector(".settigs-box .icon i");

// Toggle Class Open on Settings Box And Class Fa-Spin On Icon
theIconBox.onclick = () => {
  theSettingsBox.classList.toggle("open");
  theIconGear.classList.toggle("fa-spin");
};

// Color Option
let theClorsOption = document.querySelectorAll(".box .colors li");

theClorsOption.forEach((color) => {
  color.addEventListener("click", (e) => {
    // set color on root
    // document.documentElement.style.setProperty('--your-variable', '#YOURCOLOR');  // example
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // set color in localStorage
    localStorage.setItem("mainColor", e.target.dataset.color);

    // remove all active class from li
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });

    // add class active on active color
    e.target.classList.add("active");
  });
});

//=====================================================================================================================

// Background image header
// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = [
  "header_01.jpg",
  "header_02.jpg",
  "header_03.jpg",
  "header_04.jpg",
  "header_05.jpg",
];

// random background option
let startStopButton = document.querySelectorAll(".box span");
let statusBackground = true;
let backgroundInterval;

// check local storage for background
let backgroundLocalItem = localStorage.getItem("background-option");

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundLocalItem = true;
  } else {
    backgroundLocalItem = false;
  }

  // remove active class from all span
  document.querySelectorAll(".box span").forEach((span) => {
    span.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".box .start").classList.add("active");
  } else {
    document.querySelector(".box .stop").classList.add("active");
  }
}

// function randomaize background imgs
function randomaizeBackground() {
  if (statusBackground === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 10000);
  }
}

// Random Back ground
startStopButton.forEach((span) => {
  // click on every span
  span.addEventListener("click", (e) => {
    // remove active class from all span
    e.target.parentElement.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    // add active class on active span
    e.target.classList.add("active");

    if (e.target.dataset.background === "start") {
      statusBackground = true;
      randomaizeBackground();
      localStorage.setItem("background-option", true);
    } else {
      statusBackground = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

//===================================================================================================

// Active Class on Nav Links
let allLinks = document.querySelectorAll(".links li a");

// lop on all anchor tag
allLinks.forEach((link) => {
  // Add event click on all links
  link.addEventListener("click", (x) => {
    x.preventDefault();

    // Remove all Active class from All Links
    x.target.parentElement.parentElement
      .querySelectorAll("li a")
      .forEach((a) => {
        a.classList.remove("active");
      });

    // Add Active class On Active Link
    x.target.className = "active";
  });
});

// progress bar
let ourSkills = document.querySelector(".skills");

window.onscroll = () => {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills Outer height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height
  let windowHeight = this.innerHeight;

  // window scroll Top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Start Our Gallery
let ourGallerimgs = document.querySelectorAll(".images-box img");

ourGallerimgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    //Get Img Src
    let sourceImge = img.src;

    // Create Overlay Element
    let overLay = document.createElement("div");

    // Add Class On Overlay
    overLay.className = "popup-overlay";

    // Creat popup box
    let popBox = document.createElement("div");

    // Set class On PopBox
    popBox.className = "popup-box";

    if (img.alt !== null) {
      // Craete titel H2 Overlay Box
      let heading = document.createElement("h2");

      // Creat text from alt
      let ImageText = document.createTextNode(img.alt);

      // append text to H2
      heading.appendChild(ImageText);

      // Append h2 To OverLay
      popBox.appendChild(heading);
    }

    // creat img Element
    let imgElement = document.createElement("img");

    // Set attribute src On Img
    imgElement.setAttribute("src", sourceImge);

    // Creat The Close Span
    let theCloseSpan = document.createElement("span");

    // creat Text to span
    let textSpan = document.createTextNode("X");

    // append text to span
    theCloseSpan.appendChild(textSpan);

    // Add Class to close span
    theCloseSpan.className = "close-button";

    // Append close span to popup box
    popBox.appendChild(theCloseSpan);

    // Append img To popup box
    popBox.appendChild(imgElement);

    // Append popBox to OverLay
    overLay.appendChild(popBox);

    // Append Overlay To Body
    document.body.appendChild(overLay);
  });
});

// Close Popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.parentNode.remove();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.keyCode == 27) {
    if (document.body.querySelector(".popup-overlay")) {
      // Remove The Current Popup
      document.querySelector(".popup-overlay").remove();
    }
  }
});

// Select all bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");

// function to scroll to sections
function scrollToSections(elements) {
  elements.forEach((element) => {
    element.addEventListener("click", (e) => {
      document.querySelector(element.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

// nav bullets
scrollToSections(allBullets);
// navbar links
scrollToSections(allLinks);

// show hide bullets
let bulletBox = document.querySelector(".nav-bullets");
let controlBtnBullet = document.querySelectorAll(".all-bullet p");
let bulletLocalStorage = localStorage.getItem("bullet-option");

if(bulletLocalStorage !== null) {

  controlBtnBullet.forEach(el => {
    el.classList.remove("active")
  });

  if(bulletLocalStorage === 'block') {

    bulletBox.style.display = 'block';
    document.querySelector(".all-bullet .show").classList.add("active")

  } else {

    bulletBox.style.display = 'none';
    document.querySelector(".all-bullet .hide").classList.add("active")
  }
  
}

controlBtnBullet.forEach(control => {

  control.addEventListener("click", e => {

    controlBtnBullet.forEach(el => {
      el.classList.remove("active")
    } )

    if(e.target.classList.contains('hide')) {
      e.target.classList.add("active")
    }

    if(e.target.classList.contains('show')) {
      e.target.classList.add("active")
    }

    if(e.target.dataset.display === 'block') {

      bulletBox.style.display = 'block';
      
      localStorage.setItem("bullet-option", "block");

    } else {

      bulletBox.style.display = 'none';

      localStorage.setItem("bullet-option", "none");

    }

  });
});

// reset all Option
document.querySelector(".box .reset-btn").onclick = function() {

  localStorage.clear(); // if no anther item in localstorage 

  // or 
  // localStorage.removeItem("bullet-option")
  // localStorage.removeItem("mainColor")
  // localStorage.removeItem("background-option")
  

  window.location.reload()

};

// toggle menu
let togleBtn = document.querySelector(".landing-page .header-area .links-container .toggle-menu");
let theLinks = document.querySelector(".links");

togleBtn.onclick = function(e) {

  // stop propagation
  e.stopPropagation();
  
  // toggle menu active class on botton 
  this.classList.toggle("menu-active");

  // toggle open class on ul links
  theLinks.classList.toggle("open");
};

// click Anywhere outside menu and toggle button
document.addEventListener('click', function(e) {

  if(e.target !== togleBtn && e.target !== theLinks) {

    // check if menu is open
    if(theLinks.classList.contains("open")) {

      // toggle menu active class on botton 
      togleBtn.classList.toggle("menu-active");

      // toggle open class on ul links
      theLinks.classList.toggle("open");

    }

  }

});

// ll stop propagation on menu 
theLinks.onclick = function(e) {
  e.stopPropagation();
}

