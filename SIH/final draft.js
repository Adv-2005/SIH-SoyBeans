<script>
let prevScrollPos = window.pageYOffset;
const titleBar = document.querySelector(".title-bar");
let scrollDirection = "down"; // Initialize scroll direction

window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset;

    // Check the scroll direction
    if (currentScrollPos > prevScrollPos) {
        scrollDirection = "down";
    } else {
        scrollDirection = "up";
    }

    // If scrolling up at least 3 lines, show the title bar
    if (scrollDirection === "up" && prevScrollPos - currentScrollPos >= 3) {
        titleBar.style.top = "0";
    } else {
        titleBar.style.top = "-80px"; // Adjust this value as needed
    }

    prevScrollPos = currentScrollPos;
});
</script>