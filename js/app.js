window.onload = function(){
    var contenedor=document.getElementById('contenedor_carga');
    contenedor.style.visibility='hidden';
    contenedor.style.opacity=0;
}


$(document).ready(function($){

    // posicionamiento del contenido
    var alturaMenu=$('.navbar-personal').height();
    $('.contenido').css('top',alturaMenu);

    // ajuste de altura de portada
    var alturaInicio=($(window).height())-alturaMenu+60;
    $('#inicio').css('max-height',alturaInicio);
    $('.filtro-portada').height(($('#inicio').height()));
    
    // posicion del logo
    var mitadLogo=($('.logo-portada').height()/2);
    var mitadPortada=(($('.filtro-portada').height())/2)-(alturaMenu);
    $('.position-logo').css('top',mitadPortada); 
    $('.position-logo').css('margin-top',-mitadLogo);

    //filtro template
    var anchoTemplate=$('.contenedor-template').width();
    var alturaTemplate=$('.contenedor-template').height();
    $('.filtro-template').width(anchoTemplate);
    $('.filtro-template').height(alturaTemplate);
    var alturaBTN = $('.btn-template').height();
    var posicionBTN= (alturaTemplate*0.5)-(alturaBTN*0.5)-30;
    $('.btn-template').css('margin-top',posicionBTN);

});

// Filtro de menu scroll
$(window).scroll(function(){
    var alt = $(this).scrollTop();
    if (alt>20){
      $(".navbar-personal").addClass('filtro-menu');
    }else{
      $(".navbar-personal").removeClass('filtro-menu');
    }
  });
  
// funcion de srcoll smooth
$(document).ready(function() {

    var scrollLink = $('.scroll');

    // Smooth scrolling
    scrollLink.click(function(e) {
        e.preventDefault();
        $('body,html').animate({
        scrollTop: $(this.hash).offset().top
        }, 1000 );
    });

    // Active link switching
    $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();
        
        scrollLink.each(function() {
        
        var sectionOffset = $(this.hash).offset().top - 20;
        
        if ( sectionOffset <= scrollbarLocation ) {
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
        }
        })
        
    })

});  

function mostrarTemplate(t) {
    var linkTemplate = 'img/portafolio/template-' + t + '.jpg';
    $('#imagen-template').attr("src", linkTemplate);
}



// Envio de Formulario de contacto

var formularioNew = document.getElementById('form-contacto');
formularioNew.addEventListener('submit',function(e){
    e.preventDefault();
    console.log('enviaste datos');
    var datos=new FormData(formularioNew);
    console.log(datos);
    console.log(datos.get('cont-name'));
    document.getElementById('resp-contact').innerHTML = '<div class="alert alert-info alert-dismissible fade show" role="alert" id="mensaje-alerta"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
    fetch('contact.php',{method:'POST',body:datos})
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        document.getElementById('mensaje-alerta').innerHTML += '<strong>'+data+'</strong>'
        document.getElementById('mensaje-alerta').style.display='block'
    })
})

// boton close alerta formulario contacto
var btnAlerta = document.getElementById('btn-close-alert')
btnAlerta.addEventListener("click",function ocultar(){
    document.getElementById('resp-contact').style.display='none'
});