let tab_buttons = document.querySelectorAll(".tab_btn");
let sections = document.querySelectorAll(".content_section");

tab_buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        tab_buttons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        let target_id = button.getAttribute("data_target");
        let target_section = document.getElementById(target_id);

        sections.forEach(function(section) {
            section.classList.remove("show");
        });

        target_section.classList.add("show");

        target_section.scrollIntoView({
            behavior: "smooth"
        });

    });

});

document.getElementById("section1").classList.add("show");
tab_buttons[0].classList.add("active");