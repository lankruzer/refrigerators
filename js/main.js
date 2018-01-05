/* widgets */
var widget_tabs_node = document.querySelectorAll(".widgets-tabs a");
var widget_tabs = [widget_tabs_node.length];

var widgets_node = document.querySelectorAll(".widgets .widget");
var widgets = [widget_tabs_node.length];

for(var i = 0; i < widget_tabs_node.length; i++) {
  widget_tabs[i] = widget_tabs_node.item(i);
  widgets[i] = widgets_node.item(i);
}

widget_tabs[0].classList.add("active");
widgets[0].classList.add("active");

widget_tabs.forEach(function(widget_tab, i, widget_tabs_arr) {
  widget_tabs_arr[i].addEventListener("click", function(evt) {
    evt.preventDefault();
    console.log(i);
    if(!(widget_tabs_arr[i].classList.contains("active"))){
      for(var y = 0; y < widget_tabs_arr.length; y++) {
        widget_tabs_arr[y].classList.remove("active");
        widgets[y].classList.remove("active");
      }
      widget_tabs_arr[i].classList.add("active");  
      widgets[i].classList.add("active");
    }
  })
});

/* service breakings */
var open_breaking_node = document.querySelectorAll(".open-breaking");
var open_breaking_arr = [open_breaking_node.length];

if(open_breaking_node.length > 0) {
  for(var i = 0; i < open_breaking_node.length; i++) {
    open_breaking_arr[i] = open_breaking_node.item(i);
  };

  open_breaking_arr.forEach(function(open_breaking, i, open_breaking_arr) {
    open_breaking.addEventListener("click", function(evt) {
      evt.preventDefault();
      if(!(evt.target.parentElement.parentElement.classList.contains("active"))) {
        evt.target.parentElement.parentElement.classList.remove("hide");
        evt.target.parentElement.parentElement.classList.add("active");
      } else {
        setTimeout(function() {
          evt.target.parentElement.parentElement.classList.remove("active");
        }, 800);
        evt.target.parentElement.parentElement.classList.add("hide"); 
      }
    })
  });
}

/* forms */
var application_node = document.querySelectorAll(".call-form-application-js");
var application_arr = [application_node.length];
var popup_bg = document.querySelector(".popup-bg");
var btn_close_form_node = document.querySelectorAll(".btn-close-form");
var btn_close_form_arr = [btn_close_form_node.length];
var form_application = popup_bg.querySelector(".popup-form");

for(var i = 0; i < application_node.length; i++) {
  application_arr[i] = application_node.item(i);
};

for(var i = 0; i < btn_close_form_node.length; i++) {
  btn_close_form_arr[i] = btn_close_form_node.item(i);
};

application_arr.forEach(function(btn_application, i, application_arr) {
  btn_application.addEventListener("click", function(evt) {
    evt.preventDefault();
    popup_bg.classList.add("show");
    form_application.classList.add("show");
    if(popup_bg.classList.contains("show")){
      popup_bg.addEventListener("click", function(popup_evt) {
        if(popup_evt.target.classList.contains("show")) {
          popup_bg.classList.remove("show");
          form_application.classList.remove("show");
        }
      })  
    }
  })
});

btn_close_form_arr.forEach(function(btn_close_form, i , btn_close_form_arr) {
  btn_close_form.addEventListener("click", function(evt) {
    evt.preventDefault();
    if(popup_bg.classList.contains("show")){
      evt.target.parentElement.classList.remove("show");
      popup_bg.classList.remove("show");          
    }
  })
});

/* mask for input type=tel */
(function() {
  $("input[type='tel']").mask("+7 (999) 999-99-99");
})();


/* плавающее меню */
var btn_open_menu = document.querySelector(".btn-open-menu");
var aside = document.querySelector("aside");
var column = document.querySelector(".column-1-3");
var nav = document.querySelector("nav");
var scrolled;
var nav_height;


/* переменные для мобильного меню */
var mobile_menu_open = document.querySelector(".mobile-menu-btn");
var mobile_menu_close = document.querySelector(".mobile-menu-close");
var mobile_menu = document.querySelector(".column-1-3");

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    bottom: box.bottom + pageYOffset,
    height: box.height
  };
}

if(!column.classList.contains("mobile-menu-btn")) {
  /*nav_height = getCoords(nav).height;
  console.log(1);
  window.onscroll = function() {
    scrolled = window.pageYOffset || document.documentElement.scrollTop;
    if((scrolled > getCoords(aside).bottom)) {
      console.log(2);
      btn_open_menu.classList.add("show");
    } else { 
      console.log(3);
      if(btn_open_menu.classList.contains("show")) {
        btn_open_menu.classList.remove("show");
        console.log(4);
      }

      if(nav.classList.contains("fixed")) {
        console.log(5);
        nav.classList.remove("fixed");
        $("nav").css("overflow-y", "auto");
        $("nav").css("height", "auto");  
        btn_open_menu.innerHTML = "открыть меню";
        btn_open_menu.classList.remove("active");
      }   
    }

    if(nav.classList.contains("fixed")) {
      console.log(6);
      nav_height = document.documentElement.clientHeight - 75;
      if(getCoords(nav).height > document.documentElement.clientHeight) {
        console.log(7);
        $("nav").css("overflow-y", "scroll");
        $("nav").css("height", nav_height);
      }
    }

    if((scrolled + nav_height >= getCoords(column).bottom) && (scrolled + 360 <= getCoords(column).bottom)) { 
      console.log(8);
      btn_open_menu.classList.add("absolute");
      $(".btn-open-menu").css("top", scrolled + 25);
      nav.classList.add("absolute");
      $("nav").css("top", scrolled + 75);
      nav_height = $(".callback").position().top - $(".btn-open-menu").position().top - 50; 
      $("nav").css("height", nav_height);
    } else if ((scrolled + nav_height >= getCoords(column).bottom) && (scrolled + 360 >= getCoords(column).bottom)){
      console.log(9);
      if(!btn_open_menu.classList.contains("absolute")){
        console.log(10);
        btn_open_menu.classList.add("absolute");
        $(".btn-open-menu").css("top", scrolled + 25);
        //$(".btn-open-menu").css("top", getCoords(column).bottom - 500);
        nav.classList.add("absolute");
        $("nav").css("top", scrolled + 75);
        nav_height = $(".callback").position().top - $(".btn-open-menu").position().top - 50; 
        $("nav").css("height", nav_height);  
      }
      
    } else {
      console.log(12);
      if(btn_open_menu.classList.contains("absolute")) {
        console.log(13);
        btn_open_menu.classList.remove("absolute");
        $(".btn-open-menu").css("top", 25);
        nav.classList.remove("absolute");
        $("nav").css("top", 75);  
        $("nav").css("height", "auto");
      }
    };

    if((scrolled + 360 >= getCoords(column).bottom)) {
      console.log(14);
      if(!btn_open_menu.classList.contains("absolute")) {
        console.log(15);
        btn_open_menu.classList.add("absolute");
        $(".btn-open-menu").css("top", scrolled + 25);
        //$(".btn-open-menu").css("top", getCoords(column).bottom - 360);
        nav.classList.add("absolute");
        $("nav").css("top", nav_height);
      }
    }
  }

  btn_open_menu.addEventListener("click", function(evt) {
    evt.preventDefault();
    if(btn_open_menu.innerHTML == "закрыть меню") {
      nav.classList.remove("fixed");
      btn_open_menu.innerHTML = "открыть меню";
      btn_open_menu.classList.remove("active");
    } else {
      nav.classList.add("fixed");
      btn_open_menu.innerHTML = "закрыть меню";
      btn_open_menu.classList.add("active");
    }

    if(nav.classList.contains("fixed")) {
      if((getCoords(nav).height >= (document.documentElement.clientHeight - 200))) {
        $("nav").css("overflow-y", "scroll");
        $("nav").css("height", document.documentElement.clientHeight - 150);
      } else {
        $("nav").css("overflow-y", "auto");
        $("nav").css("height", "auto");  
      }  
    } else {
      $("nav").css("overflow-y", "auto");
      $("nav").css("height", "auto");   
    }

    if(nav.classList.contains("fixed")) {
      nav_height = document.documentElement.clientHeight - 75;
      if(getCoords(nav).height + nav_height + 500 >= document.documentElement.clientHeight - 500) {
        $("nav").css("overflow-y", "scroll");
        $("nav").css("height", nav_height);
      } else {
        $("nav").css("overflow-y", "auto");
        $("nav").css("height", "auto");  
      }  
    }

    if(nav.classList.contains("fixed")) {
      nav_height = document.documentElement.clientHeight - 75;
      if(getCoords(nav).height >= document.documentElement.clientHeight) {
        $("nav").css("overflow-y", "scroll");
        $("nav").css("height", nav_height);
      }
    }

    if((scrolled + nav_height >= getCoords(column).bottom) && (scrolled + 360 <= getCoords(column).bottom)) {  
      btn_open_menu.classList.add("absolute");
      $(".btn-open-menu").css("top", scrolled + 25);
      nav.classList.add("absolute");
      $("nav").css("top", scrolled + 75);
      nav_height = $(".callback").position().top - $(".btn-open-menu").position().top - 50; 
      $("nav").css("height", nav_height);
    } else if ((scrolled + nav_height >= getCoords(column).bottom) && (scrolled + 360 >= getCoords(column).bottom)){
      if(!btn_open_menu.classList.contains("absolute")){
        btn_open_menu.classList.add("absolute");
        $(".btn-open-menu").css("top", scrolled + 25);
        nav.classList.add("absolute");
        $("nav").css("top", scrolled + 75);
        nav_height = $(".callback").position().top - $(".btn-open-menu").position().top - 50; 
        $("nav").css("height", nav_height);  
      }
    } else {
      if(btn_open_menu.classList.contains("absolute")) {
        btn_open_menu.classList.remove("absolute");
        $(".btn-open-menu").css("top", 25);
        nav.classList.remove("absolute");
        $("nav").css("top", 75);  
        $("nav").css("height", "auto");
      }
    };

    if(scrolled + 360 >= getCoords(column).bottom) {
      if(!btn_open_menu.classList.contains("absolute")) {
        btn_open_menu.classList.add("absolute");
        $(".btn-open-menu").css("top", scrolled + 25);
        nav.classList.add("absolute");
        $("nav").css("top", nav_height);
      }
    }
  });
}*/
  
  
  
  
  
  
  /* menu new */
  var nav_height = getCoords(nav).height;
  var nav_height_old = nav_height;
  function Auto_height() {
    if(nav.classList.contains("fixed")) {
      nav_height = getCoords(nav).height;
      nav_height_old = nav_height;
      
      if(nav_height > (document.documentElement.clientHeight - 100)) {
        if(!nav.classList.contains("auto-height")) {
          nav.classList.add("auto-height");      
          nav_height = document.documentElement.clientHeight - 100;
          if(nav_height != nav_height_old) {
            $("nav").css("height", nav_height);
            nav_height_old = nav_height;
          }
        }
      }
      nav_height = getCoords(nav).height;
      if((scrolled + nav_height) > getCoords(column).bottom) {
        nav_height = getCoords(column).height - scrolled + 75 - 180;
        if(nav_height != nav_height_old) {
          $("nav").css("height", nav_height);
          nav_height = getCoords(nav).height;  
          nav_height_old = nav_height;
        }
        
      } else {
        nav_height = getCoords(nav).height;
        if(getCoords(nav).height > (document.documentElement.clientHeight - 100)) {
          nav.classList.add("auto-height");  
          nav_height = document.documentElement.clientHeight - 100;
          $("nav").css("height", nav_height);
        } else {
          nav_height = getCoords(column).height - scrolled + 75 - 180;
          $("nav").css("height", nav_height);
        }
      }
    } else {
      if(nav.classList.contains("auto-height")) {
        nav.classList.remove("auto-height");
      } 
      $("nav").css("height", "auto");
    }
  }
  
  function Range_ckeck(scrolled) {
    if(((getCoords(column).bottom - 200) > scrolled) && (scrolled > (getCoords(aside).bottom + 200))) {
      btn_open_menu.classList.add("show");
    } else {
      if(btn_open_menu.classList.contains("show")) {
        if(btn_open_menu.classList.contains("active")) {
          btn_open_menu.classList.remove("active");
          btn_open_menu.innerHTML = "открыть меню";  
        }
        
        btn_open_menu.classList.remove("show");    
        nav.classList.remove("fixed");    
        nav.classList.remove("auto-height");    
      }
    }
    Auto_height();
  }
  
  btn_open_menu.addEventListener("click", function(evt) {
    evt.preventDefault();
    Auto_height();
    if(btn_open_menu.classList.contains("active")) {
      btn_open_menu.classList.remove("active");
      btn_open_menu.innerHTML = "открыть меню";
      /* close menu*/
      if(nav.classList.contains("fixed")) {
        nav.classList.remove("fixed");
        nav.classList.remove("auto-height");
      }
    } else {
      btn_open_menu.classList.add("active");
      btn_open_menu.innerHTML = "закрыть меню";
      /* open menu*/
      if(!nav.classList.contains("fixed")) {
              Auto_height();

        nav.classList.add("fixed");
      }
      Auto_height();
    }
    Auto_height();
  });
  
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  if(((getCoords(column).bottom - 200) > scrolled) && (scrolled > (getCoords(aside).bottom + 200))) {
    btn_open_menu.classList.add("show");
    window.addEventListener("scroll", function(){
      scrolled = window.pageYOffset || document.documentElement.scrollTop;
      Range_ckeck(scrolled);
      Auto_height();
    });
    Auto_height();
  } else {
    if(btn_open_menu.classList.contains("show")) {
      btn_open_menu.classList.remove("show");    
    }   
    window.addEventListener("scroll", function(){
      scrolled = window.pageYOffset || document.documentElement.scrollTop;
      Range_ckeck(scrolled);     
      Auto_height();
    });
    Auto_height();
  }
}






/* мобильное меню */
var open_review = document.querySelector(".open-random-review"),
    open_discount = document.querySelector(".open-discount"),
    open_widget = document.querySelector(".open-widget"),
    popup_form = document.querySelector(".popup-form");


if(mobile_menu_open) {
  mobile_menu_open.addEventListener("click", function(evt) {
    evt.preventDefault(evt);
    if(nav.classList.contains("absolute")) {
      nav.classList.remove("absolute");
    }
    mobile_menu.classList.add("mobile-show");
    popup_bg.classList.add("show");
    $("body").css("overflow", "hidden");
    $("nav").css("top", "auto");
    
  })
  
  mobile_menu_close.addEventListener("click", function(evt) {
    evt.preventDefault(evt);
    if(nav.classList.contains("absolute")) {
      nav.classList.remove("absolute");
    }
    mobile_menu.classList.remove("mobile-show");
    popup_bg.classList.remove("show");
    $("body").css("overflow", "auto");
    $("nav").css("top", "auto");
  })
  
  popup_bg.addEventListener("click", function(evt) {
    evt.preventDefault();
    if(nav.classList.contains("absolute")) {
      nav.classList.remove("absolute");
    }
    mobile_menu.classList.remove("mobile-show");
    if(!popup_form.classList.contains("show")) {
      popup_bg.classList.remove("show");
    }
    $("body").css("overflow", "auto");
    $("nav").css("top", "auto");
  })
  
  open_review.addEventListener("click", function(evt) {
    evt.preventDefault();
    open_review.classList.toggle("active");
  })
  
  open_discount.addEventListener("click", function(evt) {
    evt.preventDefault();
    open_discount.classList.toggle("active");
  })
  
  open_widget.addEventListener("click", function(evt) {
    evt.preventDefault();
    open_widget.classList.toggle("active");
  })
}







/* Слайдер */
var certificate_node = document.querySelectorAll(".slide");
var certificate_arr = [certificate_node.length];
var current_certificate = null;
var certificates_prev = document.querySelector(".prev-slide");
var certificates_next = document.querySelector(".next-slide");
var overlay = document.querySelector(".overlay");


function Slider(width) {  
  var items;
  if(width >= 1201) {
    items = 2;
  } else if(width < 1201 && width >= 993) {
    items = 2;
  } else if(width < 993 && width >= 769) {
    items = 2;
  } else if(width < 769) {
    items = 1;
  };
  
  if(certificate_node.length > 0) {
    for (var i = 0; i < certificate_node.length; i++) {
      certificate_arr[i] = certificate_node.item(i);
    }
    
    for(var i = 0; i < certificate_arr.length; i++) {
      certificate_arr[i].classList.remove("show");
    };

    for(var i = 0; i < certificate_arr.length; i++) {
      if(i < items) {
        certificate_arr[i].classList.add("show");
      }
    };
    
    certificates_next.addEventListener("click", function(event) {  
      for(var i = 0; i < certificate_arr.length; i++) {
        if(certificate_arr[i].classList.contains("show")) {
          break;
        }
      }
      if((i+items) >= certificate_arr.length) {
      } else {
        certificate_arr[i].classList.remove("show");
        certificate_arr[i+items].classList.add("show");
      } 
    });

    certificates_prev.addEventListener("click", function(event) {
      var last;
      for(var i = 0; i < certificate_arr.length; i++) {
        if(certificate_arr[i].classList.contains("show")) {
        last = i;
        }
      }
      i = last;
      if((i-items) < 0) {
      } else {
        certificate_arr[i].classList.remove("show")
        certificate_arr[i-items].classList.add("show")
      }
    });  
  }
}

width = window.outerWidth;
Slider(width);

window.onresize = function(){
  width = window.outerWidth;
  Slider(width);
};


/* Яндекс карта */
if(document.querySelector(".map")) {
  ymaps.ready(init);
  function init () {
    var myMap = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 10
    }),
    myGeoObject = new ymaps.GeoObject();

    myPlacemark2 = new ymaps.Placemark([55.76, 37.56], {
      hintContent: "Ремонт холодильников и бытовой техники"
    }, {
      iconImageHref: "img/contacts-map-marker.png",
      iconImageSize: [74, 60],
      iconImageOffset: [-74, -60]
    });

    myMap.geoObjects
      .add(myPlacemark2)
      .add(myGeoObject);
  };
}


/* 
    repair-item.html
    откртыие всех блоков неисправностей  
*/
var btn_show_blocks = document.querySelector(".show-malfunctions-js");

if(btn_show_blocks) {
  var block_malfunctions_node = document.querySelectorAll(".block-malfunctions-item"),
      block_malfunctions = [block_malfunctions_node.length];
  
  for(var i = 0; i < block_malfunctions_node.length; i++) {
    block_malfunctions[i] = block_malfunctions_node.item(i);
  }
  
  for(var i = 0; i < block_malfunctions.length; i++) {
    if(i < 3) {
      block_malfunctions[i].classList.add("show");
    }
  }
  
  btn_show_blocks.addEventListener("click", function(evt) {
    evt.preventDefault();
    if(btn_show_blocks.classList.contains("hide")) {
      for(var i = block_malfunctions.length-1; i > 2; i--) {
        $(block_malfunctions[i]).slideUp();
      }
      btn_show_blocks.classList.remove("hide");
      btn_show_blocks.innerHTML = "Показать все неисправности" 
    } else {
      for(var i = 0; i < block_malfunctions.length; i++) {
        $(block_malfunctions[i]).slideDown();
      }
      btn_show_blocks.classList.add("hide");
      btn_show_blocks.innerHTML = "Скрыть неисправности" 
    }
  });    
};

/*
  repair-item.html
  открытие полного прайса
*/

var btn_show_blocks1 = document.querySelector(".show-price-js");

if(btn_show_blocks1) {
  var block_malfunctions_node1 = document.querySelectorAll(".price tbody"),
      block_malfunctions1 = [block_malfunctions_node1.length];
  
  for(var i = 0; i < block_malfunctions_node1.length; i++) {
    block_malfunctions1[i] = block_malfunctions_node1.item(i);
  }
  
  for(var i = 0; i < block_malfunctions1.length; i++) {
    if(i < 2) {
      block_malfunctions1[i].classList.add("show");
    }
  }
  
  btn_show_blocks1.addEventListener("click", function(evt) {
    evt.preventDefault();
    if(btn_show_blocks1.classList.contains("hide")) {
      for(var i = block_malfunctions1.length - 1; i > 1; i--) {
        $(block_malfunctions1[i]).slideUp(0);
      }
      btn_show_blocks1.classList.remove("hide");
      btn_show_blocks1.innerHTML = "Показать все неисправности" 
    } else {
      for(var i = 0; i < block_malfunctions1.length; i++) {
        $(block_malfunctions1[i]).slideDown(0);
      }
      btn_show_blocks1.classList.add("hide");
      btn_show_blocks1.innerHTML = "Скрыть неисправности";
    }
  });    
};

/*
  repait-item.html
  faq
*/
$(".faq-item").click(function() {
  $(this).children(".question").toggleClass("open");
  $(this).children(".answer").slideToggle();
});
