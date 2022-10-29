"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// declaration part
// ######################################################
// ######################################################
// ######################################################
// ######################################################
// ######################################################
var btn = document.querySelector("button");
var input = document.querySelector("input");
var errorMessage = document.querySelector(".error_message");
var info_section = document.querySelector(".country_Informations");
var options = {
  method: "Get"
}; // ######################################################
// ######################################################
// ######################################################
// ######################################################
// ######################################################
// get the content from the local storage

if (localStorage.getItem("country")) {
  info_section.innerHTML = localStorage.getItem("country");
} // create a class which contains a method that get the data


var getData =
/*#__PURE__*/
function () {
  function getData() {
    _classCallCheck(this, getData);
  }

  _createClass(getData, [{
    key: "getCountry",
    value: function getCountry(country) {
      var finalUrl, _data;

      return regeneratorRuntime.async(function getCountry$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              finalUrl = "https://restcountries.com/v2/name/".concat(country, "?fullText=true");
              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(fetch(finalUrl, options));

            case 4:
              _data = _context.sent;
              return _context.abrupt("return", _data.json());

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", "error");

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 8]]);
    }
  }]);

  return getData;
}(); // create an instance for the get Data class


var data = new getData();
btn.addEventListener("click", function (event) {
  event.preventDefault();
  data.getCountry(input.value.trim()).then(function (data) {
    // if the data are failed
    if (data.status == 404) {
      input.classList.add("error");
      errorMessage.classList.add("shown");
      info_section.innerHTML = ""; // save the current country in the local storage

      localStorage.setItem("country", info_section.innerHTML); // if we get the data
    } else {
      // add the information ro the dom element
      info_section.innerHTML = "\n                    <div class=\"main\">\n\n\t\t\t\t\t\t<div class=\"flag\">\n\t\t\t\t\t\t\t<img src=".concat(data[0].flags.png, " alt=\"\" />\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"name\">").concat(data[0].name, "</i></div>\n\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"other\">\n\n\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t<div class=\"info_title\">Capital :</div>\n\t\t\t\t\t\t\t<div class=\"info_content\">").concat(data[0].capital, "</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t<div class=\"info_title\">Continent :</div>\n\t\t\t\t\t\t\t<div class=\"info_content\">").concat(data[0].region, "</div>\n\t\t\t\t\t\t</div>\n\n\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t<div class=\"info_title\">Population :</div>\n\t\t\t\t\t\t\t<div class=\"info_content\">").concat(data[0].population, "</div>\n\t\t\t\t\t\t</div>\n                        \n\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t<div class=\"info_title\">Currency :</div>\n\t\t\t\t\t\t\t<div class=\"info_content\">").concat(data[0].currencies[0].name, "</div>\n\t\t\t\t\t\t</div>\n                        \n\t\t\t\t\t\t<div class=\"info\">\n\t\t\t\t\t\t\t<div class=\"info_title\">Cummon Language :</div>\n\t\t\t\t\t\t\t<div class=\"info_content\">").concat(data[0].languages[0].name, "</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>"); // remove the error in case they are added

      input.classList.remove("error");
      errorMessage.classList.remove("shown"); // save the current country in the local storage

      localStorage.setItem("country", info_section.innerHTML);
    }
  });
});