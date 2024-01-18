
// Spotlight Animation code begins here

//  // Select the container box and the  
// // mouse placeholder 
// let main = document.querySelector('.main_box'); 
// let mouse = document.querySelector('.mouse'); 

// // Add an event listener for detecting 
// // the movement of the mouse 
// main.addEventListener('mousemove', 
//     (e) => { 

//         // Use a circle with a clipPath 
//         // and the offsetX and offsetY property 
//         mouse.style.clipPath = 
// `circle(10em at ${e.offsetX}px ${e.offsetY}px)`; 
//     });


// Typing Animation Code begins here 

// const carouselText = [
//     {text: "Unimelb's Cybersecurity Society ", color: "grey"},
//     {text: "White Hat Hackers", color: "white"},
//     {text: "Membership is FREE", color: "#26cc00"}
//   ]
  
//   $( document ).ready(async function() {
//     carousel(carouselText, "#feature-text")
//   });
  
//   async function typeSentence(sentence, eleRef, delay = 100) {
//     const letters = sentence.split("");
//     let i = 0;
//     while(i < letters.length) {
//       await waitForMs(delay);
//       $(eleRef).append(letters[i]);
//       i++
//     }
//     return;
//   }
  
//   async function deleteSentence(eleRef) {
//     const sentence = $(eleRef).html();
//     const letters = sentence.split("");
//     let i = 0;
//     while(letters.length > 0) {
//       await waitForMs(100);
//       letters.pop();
//       $(eleRef).html(letters.join(""));
//     }
//   }
  
//   async function carousel(carouselList, eleRef) {
//       var i = 0;
//       while(true) {
//         updateFontColor(eleRef, carouselList[i].color)
//         await typeSentence(carouselList[i].text, eleRef);
//         await waitForMs(1000);
//         await deleteSentence(eleRef);
//         await waitForMs(500);
//         i++
//         if(i >= carouselList.length) {i = 0;}
//       }
//   }
  
//   function updateFontColor(eleRef, color) {
//     $(eleRef).css('color', color);
//   }
  
//   function waitForMs(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms))
//   }

// Scroll Animation Code begins here

// Get the element to animate
const element = document.querySelector('.my-element');

// Define the options for the Intersection Observer
const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5
};

// Create a new Intersection Observer
const observer = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    // If element is in viewport, add the 'show' class to trigger the animation
    if (entry.isIntersecting) {
      element.classList.add('show');
    }
    else {
      element.classList.remove('show');
    }
  });
}, options);

// Start observing the element
observer.observe(element);