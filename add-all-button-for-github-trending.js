// ==UserScript==
// @name         add all button for github trending
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Adds a button to the trending pages on github to add all users and repos
// @author       You
// @match        https://github.com/trending*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const make_click_all_button = (selector, button_text) => {
    let nav_buttons = document.querySelector('nav[class="subnav mb-0"]');
    const click_all = () => {
      let clickables = document.querySelectorAll(selector);
      [...clickables].forEach((button) => {
        button.click();
      });
    };
    let add_all_button = document.createElement("a");
    add_all_button.onclick = click_all;
    add_all_button.textContent = button_text;
    add_all_button.setAttribute("class", "subnav-item");
    add_all_button.setAttribute("href", "#");
    nav_buttons.parentNode.insertBefore(
      add_all_button,
      nav_buttons.nextSibling
    );
  };

  const on_page_change = () => {
    if (window.location.href.includes("developers")) {
      make_click_all_button('input[value="Follow"]', "Follow all");
    } else {
      make_click_all_button(
        'div[class~="starring-container"]:not(.on) > form[class~="unstarred"] > button',
        "Star all"
      );
    }
  };

  const observer = new MutationObserver(on_page_change);
  observer.observe(document.querySelector("head>title"), { childList: true });
})();
