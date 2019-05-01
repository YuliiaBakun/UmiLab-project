"use strict";

var header = document.querySelector('.header');
var headerHeight = header.offsetHeight;
var stickyHeader = document.querySelector('.sticky-header');
jQuery(function ($) {
  // Маска для номера телефона
  $('#tel').inputmask("+7 (999) 999-99-99"); // Валидация формы

  $.validator.addMethod("pattern", function (value, element, param) {
    return this.optional(element) || /^([a-z0-9_\.-]{1,30})@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test(value);
  }, "Введите валидный адрес");
  $.validator.addMethod("phone", function (value, element, param) {
    return this.optional(element) || /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value);
  }, "Введите валидный номер");
  $("#form").validate({
    rules: {
      email: {
        required: true,
        email: true,
        pattern: true
      },
      name: {
        required: true
      },
      tel: {
        required: true,
        phone: true
      },
      textarea: {
        required: true
      }
    },
    messages: {
      email: {
        required: "Это поле обязательно для заполнения",
        email: "Введите валидный адрес"
      },
      tel: {
        required: "Это поле обязательно для заполнения"
      },
      name: {
        required: "Это поле обязательно для заполнения"
      },
      textarea: {
        required: "Это поле обязательно для заполнения"
      }
    }
  }); // Smooth scrolling

  var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 800
  });
}); // Sticky header - использовала js без плагинов и jquery для демонстрации знайний нативного js

function onScroll(e) {
  var pos = window.pageYOffset;

  if (pos > headerHeight + 20) {
    stickyHeader.style.top = '0';
  }

  if (pos < headerHeight + 20) {
    stickyHeader.style.top = '-115px';
  }
}

window.addEventListener('scroll', onScroll);