# Building modular Single Page Web Applications without Frameworks

With the current churn of ever more JavaScript frameworks and libraries this talk explores the art of 
using modern JavaScript programming practices to build highly modular single page applications using 
dedicated libraries rather than one size fits all frameworks like AngularJS.

I will explore the feasibility of structuring the application into single cohesive modules, using a 
dedicated library for routing, rendering the Dom, testing and show the minimum amount of code needed 
to integrate the various libraries. 

This should give us a highly modular application who’s design and architecture can evolve with a 
project’s requirements.

See [2015: The End of the Monolithic JavaScript Framework](https://andywalpole.me/#!/blog/142134/2015-the-end-the-monolithic-javascript-framework)

See [The State of JavaScript in 2015](http://www.breck-mckye.com/blog/2014/12/the-state-of-javascript-in-2015/)

## Libraries Used

* Crossroads.js - routing library inspired by URL Route/Dispatch utilities
* Hasher - Hasher is a set of JavaScript functions to control browser history for rich-media websites and applications.
* RSVP.js - A lightweight library that provides tools for organizing asynchronous code
* jQuery - The real jQuery
* Parsley - The ultimate JavaScript form validation library
* lodash - A JavaScript utility library
* Ractive.js - Ractive.js is a template-driven UI library
* A custom HTTP client inspired by Angular's $http