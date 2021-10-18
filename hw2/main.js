const filteritem = document.querySelector(".list");
const filterimg = document.querySelectorAll(".pic");

window.onload = ()=>{
    filteritem.onclick = (selecteditem)=>{
        if (selecteditem.target.classList.contains("place")){
            filteritem.querySelector(".active").classList.remove("active");
            selecteditem.target.classList.add("active");
            let filtername = selecteditem.target.getAttribute("data-name");
            filterimg.forEach((image)=>{
                let filterimages = image.getAttribute("data-name");
                if (filterimages == filtername || filtername == "all"){
                    image.classList.add("show");
                }
                else{
                    image.classList.add("hide");
                    image.classList.remove("show");
                }
            })
        }
    }
}

const bigimg = document.querySelector("thumb").children;
function change(event){
    document.querySelector(".big_pic").src = event.children[0].src;
    for (let i = 0; i < bigimg.length; i++){
        bigimg[i].classList.remove("act");
    }
    event.addClass("act");
}