 function showmenu(){
            var k=document.getElementById("i1");
           k.style.left="0%";
        }
        function hidemenu(){
            var k=document.getElementById("i1");
            k.style.left="-400px";
        }
        window.onscroll = function () {
    const btn = document.getElementById("scrollTopBtn");
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  };

  // Smooth scroll to top
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


document.addEventListener("DOMContentLoaded", function () {

  const pop=document.getElementById("pop");
  const op=document.getElementById("op");
function buyProduct() {
  pop.classList.add("popup-open");
  op.classList.add("popup-show");
}


const productImgs = document.getElementsByClassName("productImg");
const zoomBox = document.getElementById("zoomBox");
const zoomedImg = document.getElementById("zoomedImg");
const overlay = document.getElementById("overlay");

for (let i = 0; i < productImgs.length; i++) {
  productImgs[i].addEventListener("click", function () {
    zoomedImg.src = this.src;
    zoomBox.style.display = "block";
    overlay.style.display = "block";
  });
}

function closepopup(){
  pop.classList.remove("popup-open");
  op.classList.remove("popup-show");
}
function closeZoom() {
  zoomBox.style.display = "none";
  overlay.style.display = "none";
}

window.buyProduct = buyProduct;
  window.closepopup = closepopup;
  window.closeZoom = closeZoom;
});




 
