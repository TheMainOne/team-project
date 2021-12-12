export { scrollFunction, backToTop };
let mybutton = document.querySelector(".btn-back-to-top");

function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    mybutton.style.display = "flex";
    mybutton.style.justifyContent = "center";
    mybutton.style.alignItems = "center";
  } else {
    mybutton.style.display = "none";
  }
}

function backToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
});
}
