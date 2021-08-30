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

  const on_page_change = () => {
    console.log("ran");
    let nav_buttons = document.querySelector('nav[class="subnav mb-0"]');
    if (window.location.href.includes("developers")) {
      const follow_all_devs = () => {
        let follow_buttons = document.querySelectorAll('input[value="Follow"]');
        console.log(follow_buttons);
        [...follow_buttons].forEach((button) => {
          button.click();
        });
      };

      let follow_all_button = document.createElement("a");
      follow_all_button.onclick = follow_all_devs;
      follow_all_button.textContent = "Follow all";
      follow_all_button.setAttribute("class", "subnav-item");
      follow_all_button.setAttribute("href", "#");
      nav_buttons.parentNode.insertBefore(
        follow_all_button,
        nav_buttons.nextSibling
      );
    } else {
      const star_all_repos = () => {
        let repo_star_buttons = document.querySelectorAll(
          'div[class~="starring-container"]:not(.on) > form[class~="unstarred"] > button'
        );
        console.log(repo_star_buttons);
        [...repo_star_buttons].forEach((button) => {
          button.click();
        });
      };

      let star_all_button = document.createElement("a");
      star_all_button.onclick = star_all_repos;
      star_all_button.textContent = "Star all";
      star_all_button.setAttribute("class", "subnav-item");
      star_all_button.setAttribute("href", "#");
      nav_buttons.parentNode.insertBefore(
        star_all_button,
        nav_buttons.nextSibling
      );
    }
  };

  const observer = new MutationObserver(on_page_change);
  observer.observe(document.querySelector("head>title"), {
    characterData: false,
    attributes: false,
    childList: true,
    subtree: false,
  });
  window.onload = on_page_change;
  console.log(window.location.href);
})();
