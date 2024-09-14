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
let slideIndex = 0;
let projCoord = window.innerWidth > 768 ? 600 : 720;
let contCoord = window.innerWidth > 768 ? 1700 : 2000;

// Nav logic
function nav(page){
    switch (page){
        case 'home':
            window.scrollTo(0,0)
            home.classList.add("selected")
            projectsDiv.classList.remove('selected')
            skills.classList.remove('selected')
            contact.classList.remove('selected')
            break;
        case 'projects':
            window.scrollTo(0,projCoord)
            projectsDiv.classList.add('selected')
            home.classList.remove('selected')
            skills.classList.remove('selected')
            contact.classList.remove('selected')
            break;
        case 'skills':
            window.scrollTo(0,1300)
            skills.classList.add('selected')
            home.classList.remove('selected')
            projectsDiv.classList.remove('selected')
            contact.classList.remove('selected')
            break;
        case 'contact':
            window.scrollTo(0,contCoord)
            contact.classList.add('selected')
            home.classList.remove('selected')
            projectsDiv.classList.remove('selected')
            skills.classList.remove('selected')
            break;
    }
}

// Projects logic
function initializeSlider(){
    if(projects.length > 0){
        projectTitle.textContent = projectsInfo[slideIndex].Title
        projectDesc.textContent = projectsInfo[slideIndex].Description
        projects[slideIndex].classList.add("displayProject")
        projects[slideIndex].setAttribute("src", projectsInfo[slideIndex].imgUrl)
        clientFeedback.textContent = testimonialInfo[slideIndex].feedback
        clientPic.setAttribute("src", testimonialInfo[slideIndex].img)
        infoTypeBtn.textContent = "Testimonial"
    }
}

function showSlide(index){
    projects.forEach(project =>{
        project.classList.remove("displayProject")
    });
    projectTitle.textContent = projectsInfo[index].Title
    projectDesc.textContent = projectsInfo[index].Description
    projects[index].classList.add("displayProject")
    projects[index].setAttribute("src", projectsInfo[index].imgUrl)
    clientFeedback.textContent = testimonialInfo[index].feedback
        clientPic.setAttribute("src", testimonialInfo[index].img)
    console.log(index)
}

function prevSlide(){
    if(slideIndex >= 0){
        slideIndex = 0
        showSlide(slideIndex)
    }else{
        slideIndex--
        showSlide(slideIndex)
    }
}

function nextSlide(){
    if(slideIndex >= projects.length-1){
        slideIndex = 0
        showSlide(slideIndex)
    }else{
        slideIndex++
        showSlide(slideIndex)
    }
}

function initializeSliderView(){
    client.classList.add("selectedType");
    if(container){
        container.style.width = "45%"
    }
}

function createPersonalProjects(){

    persContainer = document.createElement("div");
    persContainer.classList.add("persContainer");

    p1 = document.createElement("p");
    p1.classList.add("pers");


    p2 = document.createElement("p");
    p2.classList.add("pers");

    p3 = document.createElement("p");
    p3.classList.add("pers");

    projectContainer.appendChild(persContainer);
    persContainer.appendChild(p1);
    persContainer.appendChild(p2);
    persContainer.appendChild(p3);
}

client.addEventListener("click", ()=>{
    client.classList.add("selectedType");
    personal.classList.remove("selectedType");

    container.removeAttribute("id")
    nextSlidebtn.removeAttribute("id")
    prevSlidebtn.removeAttribute("id")
    infoTypeBtn.removeAttribute("id")

    persContainer.setAttribute("id", "hide")

    initializeSlider()
});

personal.addEventListener("click", ()=>{
    personal.classList.add("selectedType");
    client.classList.remove("selectedType");

    container.setAttribute("id","hide")
    nextSlidebtn.setAttribute("id","hide")
    prevSlidebtn.setAttribute("id","hide")
    infoTypeBtn.setAttribute("id","hide")

    testimonialInfoEl.setAttribute("id","hide")
    pInfo.removeAttribute("id")

    persContainer.removeAttribute("id")
    projectTitle.textContent = "Personal projects"
    projectDesc.textContent = "A few projects I made in my spare time "
})

infoTypeBtn.addEventListener("click", ()=>{

    if(pInfo.id != "hide"){
        pInfo.setAttribute("id","hide")
        testimonialInfoEl.removeAttribute("id")
        infoTypeBtn.textContent = "Project info"
    }else{
        testimonialInfoEl.setAttribute("id","hide")
        pInfo.removeAttribute("id")
        infoTypeBtn.textContent = "Testimonial"
    }
})

const projectsInfo = [
    {
        "id": 0,
        "Title":"GreenLine.com",
        "Description":"greenline.com was completed in September 2024 for Greenline Financial Solutions. A loan business focused on micro-loans",
        "imgUrl": "src/assets/projectPics/greenline.jpg",
        "gitLink": "Go"
    },
    {
        "id": 1,
        "Title":"Next Project.com",
        "Description":"A website for Next client",
        "imgUrl": "none",
        "gitLink": "Go"
    }
];

const testimonialInfo = [{
    "img": "imgUrl",
    "feedback": "Thank you for this beautiful website."
},
{
    "img": "imgUrl",
    "feedback": "next client feedback"
}]

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