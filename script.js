
const sections =document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".header-lists a");

window.addEventListener("scroll",()=>{
    sections.forEach((section)=>{

        const top = section.offsetTop -300;
        const height = section.clientHeight;
        const id = section.getAttribute("id");

        if(scrollY >= top && scrollY < top + height){
            navLinks.forEach(navlink =>{
                navlink.classList.remove("active");
            });
            document.querySelector(`.header-lists a[href="#${id}"]`).classList.add("active");
        }

    });
});

const workBtn = document.querySelector(".work-btn");
const projectId = document.getElementById("projects");
workBtn.addEventListener("click", ()=>{
    projectId.scrollIntoView({behavior:"smooth"});
});

const contactBtn = document.querySelector(".contact-btn");
const contactId = document.getElementById("contact");
contactBtn.addEventListener("click", ()=>{
    contactId.scrollIntoView({behavior:"smooth"});
});
