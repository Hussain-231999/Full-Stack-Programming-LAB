let images = [
    {
        src: "https://picsum.photos/id/1015/600/400",
        caption: "Mountain View"
    },
    {
        src: "https://picsum.photos/id/1025/600/400",
        caption: "Beautiful Dog"
    },
    {
        src: "https://picsum.photos/id/1035/600/400",
        caption: "Calm Lake"
    }
];

let current_index = 0;

let gallery_image = document.getElementById("gallery_image");
let caption = document.getElementById("caption");
let next_btn = document.getElementById("next_btn");
let prev_btn = document.getElementById("prev_btn");

function show_image(index) {

    gallery_image.classList.add("fade_out");

    setTimeout(function () {

        gallery_image.src = images[index].src;
        caption.textContent = images[index].caption;

        gallery_image.classList.remove("fade_out");

    }, 500);
}

show_image(current_index);

next_btn.addEventListener("click", function () {
    current_index++;
    if (current_index >= images.length) {
        current_index = 0;
    }
    show_image(current_index);
});

prev_btn.addEventListener("click", function () {
    current_index--;
    if (current_index < 0) {
        current_index = images.length - 1;
    }
    show_image(current_index);
});