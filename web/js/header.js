document.getElementById('menu1').onclick=function (){
    toogleActiveLink("menu1");
};
document.getElementById('menu2').onclick=function (){
    toogleActiveLink("menu2");
};
document.getElementById('menu3').onclick=function (){
    toogleActiveLink("menu3");
};
document.getElementById('menu4').onclick=function (){
    toogleActiveLink("menu4");
};
function toogleActiveLink(elementId){
    let activeElement = document.getElementById(elementId);
    let passiveElements = [
        document.getElementById('menu1'),
        document.getElementById('menu2'),
        document.getElementById('menu3'),
        document.getElementById('menu4')
        
    ];
    for(let i = 0;i < passiveElements.length; i++){
        if(activeElement === passiveElements[i]){
            passiveElements[i].classList.add("active");
        }else{
            if(passiveElements[i].classList.contains('active')){
                passiveElements[i].classList.remove('active');
            }
        }
    }
    
}

