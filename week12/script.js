/*
Getting Started:
- https://www.sitepoint.com/get-started-anime-js/
- https://www.geeksforgeeks.org/introduction-to-anime-js/ 

Documentation:
- https://animejs.com/documentation/

Categories:
Targets - includes a reference to the element(s) we want to animate 
Properties - properties and attributes that can be animated when dealing with CSS, JavaScript objects, DOM, SVG 
Property Parameters - includes property-related parameters 
Animation Parameters - includes animation-related parameters 
*/

/*
let animation = anime({
  // describe the animation details 
  targets: 'div',
  // Properties 
  translateX: 100,
  borderRadius: 50,
  // Property Parameters
  duration: 2000,
  easing: 'linear',
  // Animation Parameters
  direction: 'alternate'
});  
*/

// https://codepen.io/juliangarnier/pen/BzQoXg
var myAnimation = anime({
  targets: ['.blue', '.green', '.pink', '.orange'],
  translateX: '20rem',
  rotate: 180,
  borderRadius: '8px',
  duration: 4000,
  loop: true
});
