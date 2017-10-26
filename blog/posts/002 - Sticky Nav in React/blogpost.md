# Sticky Nav in React

One of my main motivations for building this site is to familiarize myself with web technology, both new and old.  It gives me a chance to practice techniques for organizing my code and to be able to think about it both globally and locally.

For this reason, I build a lot of things in multiple environments and with multiple frameworks.  As a production model, it's quite inefficient, but for practice it's invaluable.  I try to learn most things in vanilla JavaScript (or CSS or SVG) so I get the fundamentals down pat.  Plus, everything that is possible with a library is possible with a vanilla version.  Libraries are there to make things smoother for the build process, but in the end the browser has to interpret JS.

## Wax On, Wax Off

I am a firm believer in the power of Vanilla and try not to lean on libraries and frameworks.  Manipulating the DOM is one of the basic functions of JavaScript, and while libraries like jQuery remain popular, they are often [not needed](http://youmightnotneedjquery.com/) to achieve simple DOM tasks.  

I recently followed one of Wes Bos's free (how on Earth does he do them for free?) courses: [JavaScript30](https://javascript30.com).  Through a series of 30 video lessons, you learn a lot of excellent techniques for efficient DOM manipulation.  

One of which is setting a so-called "sticky" navigation bar. If you haven't heard the term, an element is sticky if it remains in view while scrolling.  Navigation bars are an exceptionally good candidate to sticky-ness as they provide the user site context and at-hand functionality even on long pages.

I won't outline the details of building the sticky nav here.  You should really take the course yourself. The basic idea goes something like this:

1. Grab your `nav` element and set a `const` on the `offsetTop`
2. Add a scroll event listener to the `window`
3. Define the scroll event handler such that when `window.scrollY` is greater than `nav.offsetTop`, we add a class of `fixed-nav`.  We should also remove the class `window.scrollY` is less than or equal to `nav.offsetTop`
4. Define the `fixed-nav` class as `position: fixed` in our CSS


<p data-height="265" data-theme-id="0" data-slug-hash="BwXGML" data-default-tab="js,result" data-user="mattgaskey" data-embed-version="2" data-pen-title="Sticky Nav Vanilla" class="codepen">See the Pen <a href="https://codepen.io/mattgaskey/pen/BwXGML/">Sticky Nav Vanilla</a> by Matt Gaskey (<a href="https://codepen.io/mattgaskey">@mattgaskey</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Aside from allowing for supplemntary padding if elements exist above the navbar, that's pretty much it.

## Paint the Fence

This is a pretty cool thing to have in your toolbelt.  Even cooler is to have it as a reusable component, one of the main reasons React is such a popular framework.  Building this site in React means only having to build each part once, then combining the components according to the needs of the page.

But, since React is a framework, and frameworks are by definition opinionated, there are a few things we need to solve before we can just import the above code into a React component.

Let's take a look at what it takes to get the basic component built and rendering in our React app:

<p data-height="265" data-theme-id="0" data-slug-hash="pWMqOQ" data-default-tab="js,result" data-user="mattgaskey" data-embed-version="2" data-pen-title="Sticky Nav React First Step" class="codepen">See the Pen <a href="https://codepen.io/mattgaskey/pen/pWMqOQ/">Sticky Nav React First Step</a> by Matt Gaskey (<a href="https://codepen.io/mattgaskey">@mattgaskey</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Simple enough; we've defined a React Component that returns the HTML elements that will be rendered to the DOM inside the `div id="app"`.  So far so good. (I've add the content to the main HTML for simplicity's sake.  Normally, this would be its own standalone component as well.)

If we were going to stop there, it would probably be best just to write our Nav component as a [Stateless Functional Component](https://reactjs.org/docs/components-and-props.html) rather than a Class Component.  However, we're going to see that we have a few hurdles to overcome to integrate our sticky functionality.

## Sand the Floor

One of the specificities of React is that components are encapsulated.  This provides security in that altering a component should not alter other components or the app as a whole.  But this also means that components do not have access to the DOM.  

We saw in our Vanilla example that the trigger for attaching our `fixed-nav` class to our `nav` is a scroll event listener, which needs to live on the `window`.  We also need to target our `nav` element in the DOM to add our class `onScroll`.

One of the cool things about the React `render()` method is that we can write Vanilla JavaScript right inside.  We are `return`ing the HTML, so why not add our JS before the `return`?

Well, drop the first line from our Vanilla example into our component and `console.log` it.  The result is `null`.  We can't access the DOM from the `render()` method.

We can attach the event listener to the `window` inside the `render()` method, set a variable to hold our class name and try to have the `nav` element's `className` set dynamically.  Unfortunately, while we can do all these things, they don't achieve the result we are looking for.  The scroll event is tracked and we can run a function that updates the class name, but our `nav` isn't receiving anything new.

<p data-height="265" data-theme-id="0" data-slug-hash="ZXgwpE" data-default-tab="js,result" data-user="mattgaskey" data-embed-version="2" data-pen-title="Sticky Nav React Second Step" class="codepen">See the Pen <a href="https://codepen.io/mattgaskey/pen/ZXgwpE/">Sticky Nav React Second Step</a> by Matt Gaskey (<a href="https://codepen.io/mattgaskey">@mattgaskey</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

The problem is that React components got through a number of stages in their lifecycle.  To access components in the DOM and re-render them based on changes in their environment, React makes use of [State and Lifecycle Hooks](https://reactjs.org/docs/state-and-lifecycle.html).

State allows us to hold a data store for the App, or locally for Components. (Deciding where state should "live" is one of the nuances of building with React and is beyond the scope of this post.) Lifecycle hooks allow us to access components before, during or after rendering or re-rendering (in a nutshell).

## Sweep the leg

We are going to make use of both local state and lifecycle hooks to set up our sticky nav component.  This is why we need our Nav component as a class instead of a plain function.  React classes allow us to assign local state and to access the lifecycle hooks.

I'm going to initiate `this.state` as an empty object.  We'll be updating this once we know for sure that the Nav component has been rendered to the DOM.  How do we know this?

That's where the lifecycle hook `componentDidMount()` comes in.  For simplicity's sake, it's here that I'm going to do most of the heavy lifting from our Vanilla JS example.  I'll target the `nav` element in the DOM, attach the scroll event listener to the `window` and store the `offsetTop` and `offsetHeight` of the navbar in the `state` object.

I've also written `handleScroll` as function that stores the `scrollY` poisition in the `state` object when called.  Here, we'll also handle our offset body padding to account for any content that might come before our navigation.__*__ (Notice the odd-looking call to `.bind()` inside the `constructor()` method.  This will allow us to preserve the meaning of `this` when we call our handler function in other parts of our component.)

We are pretty much there with our sticky nav.  The only thing left to do is somehow toggle the class name `fixed-nav` on and off.  In Vanilla JS, our handler function could do that.  However, in React, there's not really a way to handle toggles without leveraging state.  Luckily, since we are essentially writing our HTML elements with JavaScript, we can put our class name logic directly into our HTML element.

Though it might seem counterintuitive, this is really excercising one of the more powerful aspects of React.  Even though we are using JavaScript to write HTML, we are preserving a separation of concerns.  The state is kept out of the DOM, and DOM elements can be rendered and re-rendered (including their attributes) based on changes to that state, which are handled with pure functions.  It really is quite elegant.

Coming back to the toggle, we can use a ternary operator to check the `window` scroll position against the top of our `nav` element, and apply the class name accordingly. This logic could also be placed in the event handler itself to either return the class name we need (in which case we assign the function call to the `className` property) or to set the class name to the state object (in which case we assign `this.state.classname` to the `className` property). 


__*__ *We can also place this functionality into another lifecycle hook, `componentDidUpdate()`.  Since the state is constantly updating on scroll, this hook will allow us check the location of the `nav` while scrolling and update the padding as needed.* 

<p data-height="265" data-theme-id="0" data-slug-hash="gGVEzb" data-default-tab="js,result" data-user="mattgaskey" data-embed-version="2" data-pen-title="Sticky Nav React Final Step" class="codepen">See the Pen <a href="https://codepen.io/mattgaskey/pen/gGVEzb/">Sticky Nav React Final Step</a> by Matt Gaskey (<a href="https://codepen.io/mattgaskey">@mattgaskey</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

## Takedown

React components can be a bit daunting when coming from a Vanilla JavaScript world, but they have a solid foundation in modular component structure.  They help us preserve a separation of concerns while allowing for flexiblity and discouraging redundancy in building web apps.

While it may take a bit more wrangling to get basic functionality like DOM manipulation to work properly inside of the React sphere, it shouldn't be seen as a hindrance. And of course, it should go without saying that not all projects are right for React or require the level of complexity React brings to the table.

Whether or not frameworks like React or Angular will take over the Web remains to be seen.  But if they do, I'll be ready to apply my Vanilla knowledge upwards!