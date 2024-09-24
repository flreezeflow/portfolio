// Nav
const home = document.getElementById('home');
const projectsDiv = document.getElementById('projects');
const skills = document.getElementById('skills');
const contact = document.getElementById('contact');
const projectTitle = document.getElementById('projectTitle');
const projectDesc = document.getElementById('projectDesc');
const client = document.getElementById("client");
const personal = document.getElementById("personal");
const projectContainer = document.querySelector(".projectsContainer");
const techIcons = document.querySelectorAll("#techIcon");
const skillTitle = document.querySelector(".skillTitle");
const skillDesc = document.querySelector(".skillDesc");
const expMeter = document.querySelector(".expMeter");
const expPercent =  document.querySelector(".expPercent")
let nextSlidebtn = document.querySelector(".next");
let prevSlidebtn = document.querySelector(".prev");
let container = document.querySelector(".container");
let projects = document.querySelectorAll("#project");
let persContainer = document.querySelector(".persContainer");
let infoTypeBtn = document.getElementById("infoTypeBtn")
let testimonialInfoEl = document.querySelector(".testimonialInfo");
let pInfo = document.querySelector(".pInfo")
let clientFeedback = document.querySelector(".clientFeedback")
let clientPic = document.querySelector(".clientPic")
let Msg = document.querySelector(".Msg")
let contactForm = document.querySelector(".contactForm")
let successMsg = document.querySelector(".successMsg")
let failMsg = document.querySelector(".failMsg")
let loader = document.querySelector('.loader')
let indicator;
let slideIndex = 0;

// Nav logic
// Nav logic
const sections = {
    home: document.querySelector('.hero'),
    projects: document.querySelector('.projects'),
    skills: document.querySelector('.skills'),
    contact: document.querySelector('.footer')
};

const navSections = {
    home: document.getElementById('home'),
    projects: document.getElementById('projects'),
    skills: document.getElementById('skills'),
    contact: document.getElementById('contact')
};

let sectionPositions = {}; // Global variable to store section positions

document.addEventListener("DOMContentLoaded", () => {
    sectionPositions = calculateSectionPositions(); // Initialize section positions after DOM is fully loaded
});

function setSelectedSection(selectedElement) {
    Object.values(navSections).forEach((section) => {
        if (section === selectedElement) {
            section.classList.add("selected");
        } else {
            section.classList.remove("selected");
        }
    });
}

const calculateSectionPositions = () => {
    return {
        home: sections.home.getBoundingClientRect().top + window.scrollY,
        projects: sections.projects.getBoundingClientRect().top + window.scrollY,
        skills: sections.skills.getBoundingClientRect().top + window.scrollY - 100,
        contact: sections.contact.getBoundingClientRect().top + window.scrollY
    };
};

window.onresize = function () {
    sectionPositions = calculateSectionPositions(); // Recalculate positions on resize
};

function nav(page) {
    const sectionPositions = calculateSectionPositions();
    if (sectionPositions[page] !== undefined) {
        window.scrollTo({
            top: sectionPositions[page],
            behavior: 'smooth'
        });
        setSelectedSection(navSections[page]); // Highlight the correct navigation section
    } else {
        console.warn('Unknown page:', page);
    }
}

function getCurrentSection() {
    const scrollY = window.scrollY + window.innerHeight / 2; // Offset by half the viewport height

    if (scrollY >= sectionPositions.home && scrollY < sectionPositions.projects) {
        return 'home';
    } else if (scrollY >= sectionPositions.projects && scrollY < sectionPositions.skills) {
        return 'projects';
    } else if (scrollY >= sectionPositions.skills && scrollY < sectionPositions.contact) {
        return 'skills';
    } else if (scrollY >= sectionPositions.contact) {
        return 'contact';
    }
}

window.onscroll = function () {
    const currentSection = getCurrentSection();
    setSelectedSection(navSections[currentSection]); // Highlight the correct navigation section on scroll
};

// Projects logic
const projectsInfo = [
    {
        "id": 0,
        "Title": "GreenLine.com",
        "Description": "greenline.com was completed in September 2024 for Greenline Financial Solutions. A loan business focused on micro-loans",
        "imgUrl": "src/assets/projectPics/greenline.jpg",
        "gitLink": "Go"
    },
];

const testimonialInfo = [
    {
        "img": "src/assets/projectPics/default.jpg",
        "feedback": "Thank you for this beautiful website"
    },
];

function updateSlide(index) {
    const project = projectsInfo[index];
    const testimonial = testimonialInfo[index];

    projectTitle.textContent = project.Title;
    projectDesc.textContent = project.Description;
    projects.forEach((projectEl, i) => {
        projectEl.classList.toggle("displayProject", i === index);
        projectEl.setAttribute("src", i === index ? project.imgUrl : '');
    });
    clientFeedback.textContent = testimonial.feedback;
    clientPic.setAttribute("src", testimonial.img);
}

function initializeSlider() {
    if (projects.length > 0) {
        updateSlide(slideIndex);
    }
}

function changeSlide(direction) {
    slideIndex = (slideIndex + direction + projects.length) % projects.length;
    updateSlide(slideIndex);
}

function initializeSliderView() {
    client.classList.add("selectedType");
    if (container) {
        container.style.width = "45%";
    }
}

function createPersonalProjects() {
    persContainer = document.createElement("div");
    persContainer.classList.add("persContainer");

    ['p1', 'p2', 'p3'].forEach((_, index) => {
        const p = document.createElement("p");
        p.classList.add("pers");
        persContainer.appendChild(p);
    });

    projectContainer.appendChild(persContainer);
}

function toggleView(type) {
    const isClient = type === 'client';
    client.classList.toggle("selectedType", isClient);
    personal.classList.toggle("selectedType", !isClient);

    container.setAttribute("id", isClient ? "" : "hide");
    nextSlidebtn.setAttribute("id", isClient ? "" : "hide");
    prevSlidebtn.setAttribute("id", isClient ? "" : "hide");
    infoTypeBtn.setAttribute("id", isClient ? "" : "hide");

    if (isClient) {
        initializeSlider();
        persContainer.setAttribute("id", "hide");
    } else {
        projectTitle.textContent = "Personal projects";
        projectDesc.textContent = "A few projects I made in my spare time ";
        persContainer.removeAttribute("id");
        // testimonialInfoEl.setAttribute("id", "hide");
    }

    switchInfType(type);
}

function switchInfType(type){
// Bug 1. When swithcing between client and personal the info type also switches
    switch (type) {
        case 'client':
            pInfo.setAttribute("id","");
            testimonialInfoEl.setAttribute("id","hide");
            infoTypeBtn.textContent = "Client rating";
            break;
        case 'personal':
            pInfo.setAttribute("id","");
            testimonialInfoEl.setAttribute("id","hide");
            break;
        case 'rating':
            const isInfoHidden = pInfo.id === "hide";
            pInfo.setAttribute("id", isInfoHidden ? "" : "hide");
            testimonialInfoEl.setAttribute("id", isInfoHidden ? "hide" : "");
            infoTypeBtn.textContent = isInfoHidden ? "Client rating" : "Project info";
            break;
        default:
            pInfo.setAttribute("id","");
            testimonialInfoEl.setAttribute("id","hide");
            break;
    }
}

client.addEventListener("click", () => toggleView('client'));
personal.addEventListener("click", () => toggleView('personal'));
infoTypeBtn.addEventListener("click", () => {
    const type = 'rating'
    switchInfType(type)
});

function prevSlide() {
    changeSlide(-1);
}

function nextSlide() {
    changeSlide(1);
}

// Skills logic
const techInfo = [{
    "Title":"HTML (Hypertext Markup Language)",
    "Description":"HTML is the standard language used to create and structure content on the web. It consists of a series of elements or tags that define the different parts of a webpage, such as headings, paragraphs, links, images, and other multimedia content.",
    "Iconcolor":"#EF6634"
},
{
    "Title":"CSS (Cascading Style Sheets)",
    "Description":"CSS allows you to apply styles such as colors, fonts, layouts, and spacing to HTML elements, enabling you to create visually appealing and consistent web pages.",
    "Iconcolor":"#006FB8"
},
{
    "Title":"Javascript",
    "Description":"A versatile, high-level programming language primarily used to create dynamic and interactive content on websites. It is an essential part of web development, along with HTML and CSS, allowing developers to add functionality, control multimedia, animate elements, and more.",
    "Iconcolor":"#F8D531"
},
{
    "Title":"Vue.js",
    "Description":"Vue.js is a popular, open-source JavaScript framework for building user interfaces and single-page applications (SPAs). It is known for its simplicity, flexibility, and ease of integration.",
    "Iconcolor":"#4EB887"
},
{
    "Title":"PHP (Hypertext Preprocessor)",
    "Description":"PHP  is a popular, open-source server-side scripting language widely used for web development. It is particularly well-suited for creating dynamic web pages and applications, as it can easily interact with databases, manage sessions, and handle server-side logic. ",
    "Iconcolor":"#8992BD"
},
{
    "Title":"SQL (Structured Query Language)",
    "Description":"SQL is a standard programming language used to manage and manipulate relational databases.",
    "Iconcolor":"#3E82A7"
},
{
    "Title":"Tailwind CSS",
    "Description":"A utility-first CSS framework designed to give developers complete control over the styling of their HTML.",
    "Iconcolor":"#41A6B0"
}];

function initializeTechIcon(){
    techIcons[0].classList.add("selected")
    skillTitle.textContent = techInfo[0].Title
    skillDesc.textContent = techInfo[0].Description
    expMeter.style.borderColor = techInfo[0].Iconcolor
    expMeter.style.width = "89%"
    expPercent.textContent = "89%"
}

function changeTechStyle(tech){
    switch(tech){
        case "html":
            for (let index = 0; index < techIcons.length; index++) {
                techIcons[index].classList.remove("selected");
            }
            techIcons[0].classList.add("selected")
            skillTitle.textContent = techInfo[0].Title
            skillDesc.textContent = techInfo[0].Description
            expMeter.style.borderColor = techInfo[0].Iconcolor
            expMeter.style.width = "89%"
            expPercent.textContent = "89%"
            break;
        case "css":
            for (let index = 0; index < techIcons.length; index++) {
                techIcons[index].classList.remove("selected");
            }
            techIcons[1].classList.add("selected")
            skillTitle.textContent = techInfo[1].Title
            skillDesc.textContent = techInfo[1].Description
            expMeter.style.borderColor = techInfo[1].Iconcolor
            expMeter.style.width = "87%"
            expPercent.textContent = "87%"
            break;
        case "js":
            for (let index = 0; index < techIcons.length; index++) {
                techIcons[index].classList.remove("selected");
            }
            techIcons[2].classList.add("selected")
            skillTitle.textContent = techInfo[2].Title
            skillDesc.textContent = techInfo[2].Description
            expMeter.style.borderColor = techInfo[2].Iconcolor
            expMeter.style.width = "60%"
            expPercent.textContent = "60%"
            break;
        case "vue":
            for (let index = 0; index < techIcons.length; index++) {
                techIcons[index].classList.remove("selected");
            }
            techIcons[3].classList.add("selected")
            skillTitle.textContent = techInfo[3].Title
            skillDesc.textContent = techInfo[3].Description
            expMeter.style.borderColor = techInfo[3].Iconcolor
            expMeter.style.width = "57%"
            expPercent.textContent = "57%"
            break;
        case "php":
            for (let index = 0; index < techIcons.length; index++) {
                techIcons[index].classList.remove("selected");
            }
            techIcons[4].classList.add("selected")
            skillTitle.textContent = techInfo[4].Title
            skillDesc.textContent = techInfo[4].Description
            expMeter.style.borderColor = techInfo[4].Iconcolor
            expMeter.style.width = "76%"
            expPercent.textContent = "76%"
            break;
        case "sql":
            for (let index = 0; index < techIcons.length; index++) {
                techIcons[index].classList.remove("selected");
            }
            techIcons[5].classList.add("selected")
            skillTitle.textContent = techInfo[5].Title
            skillDesc.textContent = techInfo[5].Description
            expMeter.style.borderColor = techInfo[5].Iconcolor
            expMeter.style.width = "68%"
            expPercent.textContent = "68%"
            break;
        case "tlw":
            for (let index = 0; index < techIcons.length; index++) {
                techIcons[index].classList.remove("selected");
            }
            techIcons[6].classList.add("selected")
            skillTitle.textContent = techInfo[6].Title
            skillDesc.textContent = techInfo[6].Description
            expMeter.style.borderColor = techInfo[6].Iconcolor
            expMeter.style.width = "85%"
            expPercent.textContent = "85%"
            break;
    }
}

// Contact logic
function sendEmail() {
    // Prevent the form from submitting
    let errorCount = 0;
    
    // Get form values
    let name = document.getElementById('name').value.trim();
    let email = document.getElementById('email').value.trim();
    let body = document.getElementById('body').value.trim();
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Basic validation
    if (name === '') {
        errorCount++
        document.getElementById('name').classList.add("contactError")
    }else{
        document.getElementById('name').classList.remove("contactError")
    }

    if (email === '') {
        errorCount++
        document.getElementById('email').classList.add("contactError")
    }else if (!emailPattern.test(email)) {
        errorCount++
        document.getElementById('emailError').style.display = "block"
        document.getElementById('email').classList.add("contactError")
    }else{
        document.getElementById('emailError').style.display = "none"
        document.getElementById('email').classList.remove("contactError")
    }
    
    if (body === '') {
        errorCount++
        document.getElementById('body').classList.add("contactError")
    }else{
        document.getElementById('body').classList.remove("contactError")
    }

    if(errorCount === 0){
        contactForm.setAttribute('id', 'hide')
        loader.setAttribute('id', 'show')
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("body", body);

        fetch('http://localhost:8000', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
                loader.setAttribute('id', 'hide')
                Msg.removeAttribute('id')
            if(data.status === 'success'){
                successMsg.removeAttribute('id')
            }else{
                failMsg.removeAttribute('id')
                document.querySelector('.failEmoji').removeAttribute('id')
            }
            
            console.log(data.status)
        })
        .catch(error => {
            Msg.removeAttribute('id')
            loader.setAttribute('id', 'hide')
            failMsg.setAttribute('id', 'show')
            document.querySelector('.failEmoji').setAttribute('id', 'show')
            console.error('Error:'. error);
        })
    }

    // If all checks pass, submit the form
    // this.submit();
}

function retryEmail(){
    Msg.setAttribute('id', 'hide')
    successMsg.setAttribute('id', 'hide')
    failMsg.setAttribute('id', 'hide')
    contactForm.removeAttribute('id')
}

document.addEventListener("DOMContentLoaded", initializeSlider())
document.addEventListener("DOMContentLoaded", initializeSliderView())
document.addEventListener("DOMContentLoaded", initializeTechIcon())
