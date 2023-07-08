// ==UserScript==
// @name         Your Script Name
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Your Script Description
// @author       You
// @match        http://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var exampleElement = document.querySelector('.example');
    if (!exampleElement) return;

    var button = document.createElement('button');
    button.innerHTML = 'Your SVG Here';
    button.style.cssText = 'Your CSS Here';
    exampleElement.parentNode.insertBefore(button, exampleElement);

    button.addEventListener('click', function() {
        // Create and show your modal here
        var modal = document.createElement('div');
        modal.style.cssText = 'Your Modal CSS Here';
        document.body.appendChild(modal);

        // Fetch your JSON data and populate the modal
        fetch('Your JSON URL Here')
            .then(response => response.json())
            .then(data => {
                // Populate your modal with data here
            });

        // Add event listeners for your add, sort, and delete buttons here
    });
})();
