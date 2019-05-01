"use strict";

var a = 15;
var b = 10;
var c = 25;
jQuery(function ($) {
  // Маска для номера телефона
  $('#tel').inputmask("+7 (999) 999-99-99"); // Валидация формы

  $.validator.addMethod("pattern", function (value, element, param) {
    return this.optional(element) || /^([a-z0-9_\.-]{1,30})@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/.test(value);
  }, "Введите валидный адрес");
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
        required: true
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
  });
});