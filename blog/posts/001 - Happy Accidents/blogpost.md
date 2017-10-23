# Happy Accidents

## The Back-Story

I've been re-watching a lot of episodes of the classic Bob Ross painting series
[*The Joy of Painting*](https://www.youtube.com/user/BobRossInc
) lately.  Maybe it's the stress and pressure of wanting
to dive into web development at this stage in my life that makes me reach out
for something calming at the end of the work day.  Maybe I'm just really into 
happy little trees and clouds.

Or perhaps Bob is the one true source of knowledge and wisdom.  

I am inclinded to doubt the latter, but one of his many mantras has stuck with 
me over the past few weeks.  To quote the guru:

>In our world, there are no mistakes, only happy accidents.

Of course, Bob (and I feel comfortable continuing on a first-name basis with
him) is referring to the ease with which errant strokes can be reincorporated into
other elements with his wet-on-wet oil painting technique.  However, we all know
that Bob was really trying to tell us not to be afraid to take chances, to 
make mistakes, and maybe more importantly, to own those mistakes.  We should 
see mistakes as accidents, and accidents as points of inspiration.

Jumping into the world of web development has provided many opprtunities to make
mistakes.  This is not a field where memorizing theory will get you very far.
You have to dig in and get your fingers dirty and code, code, code.  Luckily, the
web is chock full of consequence-free environments where beginners can practice
the fundamentals without fear of taking down an entire client website.

## The Set Up

[HackerRank.com](https://hackerrank.com) has a set of challenges that will
let you have all the happy little JavaScript accidents you like.  I went through
them in a day's time (90% of them are quite fundamental) and one particular
challenge caused a real-life face palm.  (For the younger generation out there, 
people used to actually slap themselves in the forehead when they made stupid
mistakes instead of tweeting out gifs.)

Here's the gist of the task:

>We want to create nine buttons enclosed in a div, laid out so they form a 3x3 grid. Each button has a distinct
>label from 1 to 9, and the labels on the outer buttons must rotate in the clockwise direction each time we click
>the middle button. 
>
>Each element in the document must have an id, [whose]  initial innerHTML labels must have the following button ids:
>
>| innerHTML | id  |
>| --------- | --- |
>| 1	        | btn1 |
>| 2	        | btn2 |
>| 3	        | btn3 |
>| 4	        | btn4 |
>| 5	        | btn5 |
>| 6	        | btn6 |
>| 7	        | btn7 |
>| 8	        | btn8 |
>| 9	        | btn9 |

Sounds simple enough, right?  You essentially have a phone pad layout and when you 
click the '5', the other button texts rotate clockwise.  I immediately jumped in and
set my html according to the spec:

```
<div id='btns' class='btns'>
  <button class='btn' id='btn1'><span>1</span></button>
  <button class='btn' id='btn2'><span>2</span></button>
  <button class='btn' id='btn3'><span>3</span></button>
  <button class='btn' id='btn4'><span>4</span></button>
  <button class='btn' id='btn5'><span>5</span></button>
  <button class='btn' id='btn6'><span>6</span></button>
  <button class='btn' id='btn7'><span>7</span></button>
  <button class='btn' id='btn8'><span>8</span></button>
  <button class='btn' id='btn9'><span>9</span></button>
</div>
```

I've got my buttons, numbered 1 through 9 with corresponding ids.  Now I just need to 
attach a simple click listener to btn5 that will update the `.btn` class with a 
`transform: rotate(90deg)` on all the other buttons.  That way, I can handle the 
rotation with pure CSS and my solution will be nice and JS-light:

CSS:
```
.btns {
    width: 75%;
}

.btn {
    width: 30%;
    height: 48px;
    font-size: 24px;
}

.btn > span {
  display: inline-block;
}
```

JS:
```
const btn5 = document.querySelector('#btn5');
const btns = document.querySelectorAll('button');
let rotation = 0;

function rotateThem() {
  rotation += 90;
  btns.forEach(btn => {
    if (btn.id !== 'btn5') {
      btn.children[0].style = `transform: rotate(${rotation}deg)`;
    }
  });
}

btn5.addEventListener('click', rotateThem);
```
(CodePen inserted here)

There!  That works beautifully!  Click the '5' and all the other numbers
rotate clockwise.  I was really proud of myself for jumping right in and
coding the thing from start to finish and getting a result with minimal
Google-ing.  So I fire the code off for testing and...

You probably guessed it long before this point in the story, FAIL!

(*I did pass the CSS requirement, but that's small comfort when JS is the
goal*)

## The Punch Line

How on Earth could I have failed?  There must have been something wrong with the
testing module.  I mean, I did exactly what the task instructed me.  Click
the '5', rotate all the others.  It does seem a bit inane of a task.  What's 
the use in seeing a bunch of numbers spinning around in their little boxes
anyway?

I go back to the task, take a good look at what I should expect to see, and
the part of my brain responsible for involuntary reactions catches up with my
visual interpeter and lands my palm squarely against my forehead.

One big 'happy accident'.  Always read the instructions fully before beginning any
task.  Lesson number one from every grade starting in elementary school on
through university.  Common sense.

I'm supposed to shift the number grid clockwise around the '5' when it's clicked.
That's a much more daunting task.  How the hell am I supposed to do that? I guess,
it's back to the proverbial drawing board.

At this point, my immature self would have given up.  I did a task that required not-so-elementary knowledge, used NodeLists, applied listeners, wrote functions, updated 
style with JavaScript; I even did it with ES6.  I think of Bob.  Bob says, "Don't be 
immature. Remember, there are NO mistakes."

You're right Bob.  Let's figure this thing out.  

I've already gotten a long way.  I succeeded in targeting a change in all the buttons
other than the one that is clicked.  I can use that.  The structure is there, I just
need to redefine what change the function is affecting.

First things first, I can get rid of those nested spans.  They were only there to act
as containers to spin the text (you cannot rotate inline elements, hence the 
`display: inline-block`).  I should also consider what needs to happen onClick.  The innerHTML
of the surrounding elements needs to change, leaving the ids in tact.  That means I can't
update the `button` elements themselves.  

The best way to approach this is going to be by dynamically inserting the innerHTML of each 
element and updating the data source when `btn5` is clicked.  That calls for an array.
It's probably also best to set a class on each changeable `button` element as well.  That
gives us a new HTML markup:

```
<div id='btns' class='btns'>
  <button class='btn rotating' id='btn1'></button>
  <button class='btn rotating' id='btn2'></button>
  <button class='btn rotating' id='btn3'></button>
  <button class='btn rotating' id='btn4'></button>
  <button class='btn' id='btn5'>5</button>
  <button class='btn rotating' id='btn6'></button>
  <button class='btn rotating' id='btn7'></button>
  <button class='btn rotating' id='btn8'></button>
  <button class='btn rotating' id='btn9'></button>
</div>
```

Our CSS is unchanged.  We're still working with simple buttons.

The JS has to be the star of the show now.  Our buttons no longer have any text.  We've
got to write a function to loop over the HTML elements and set their `textContent` to the
initial values.  Plus we need an array of numbers to work from.

```
// use 'let' to initialize the variable, we're going
// to be updating it as we rotate;
// don't select btn5, it's value is
// hard-coded in the HTML and won't change;
// notice there is no '5' in the array either

const numbers = [1, 2, 3, 4, 6, 7, 8, 9];
const buttons = document.querySelectorAll('.rotating');

function fillButtonContent(btn, i) {
  btn.textContent = numbers[i];
}

buttons.forEach((btn, i) => fillButtonContent(btn, i));
```

Our function is abstract, since we'll need to call it multiple times.  Initially
though, calling `fillButtonContent` will loop over our `button` nodes and set
a number from the array at each index `i` to the innerHTML.  This will give us
the phone dial pad setup we're looking for.

Next, we need to add our event listener and define our event handler, both of
which we accomplished in our happy little accident before. This time, we'll need
to look closer at what our handler is doing:

```
const btn5 = document.querySelector('#btn5');

function rotateThem() {
  // Do something to the numbers array
  buttons.forEach((btn, i) => fillButtonContent(btn, i)); 
}

btn5.addEventListener('click', rotateThem);
```

The mechanism is in place; we just need to figure out how to properly manipulate
our array so that the numbers move around the '5' in a clockwise fashion.  My first 
thought was to simply pop the last value off the end of the array and move it to the
front.  This does achieve a **cyclic** pattern, but since our HTML elements are arranged
left-to-right, top-to-bottom, we cannot achieve a **circular** pattern with a **linear**
change.

In layman's terms, the first time we click, the '3' should move where the '6' is, but 
it moves where the '4' is.  I have an interesting mind, but not a beautiful one, so 
the proper algorithm doesn't jump right out at me.  I need to model the effect in order to 
understand the pattern.

So, what do we expect to see after clicking?  Here's the lowdown:

```
Initial State:
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 | 8 | 9 |

After First Click:
| 4 | 1 | 2 |
| 7 | 5 | 3 |
| 8 | 9 | 6 |

After Second Click:
| 7 | 4 | 1 |
| 8 | 5 | 2 |
| 9 | 6 | 3 |
```

I don't believe I can write a formula to model this pattern, but I can write a function!
First, I need to see if the expected permutations have any kind of pattern when we update our array.  That is, does each click result in the same kind of change in the array?

Let's see:

```
numbers = [1, 2, 3, 4, 6, 7, 8, 9]
numbers = [4, 1, 2, 7, 3, 8, 9, 6]
numbers = [7, 4, 1, 8, 2, 9, 6, 3]
```

It may not jump out at you right away, but the expected values in the array after each click
do in fact follow a pattern.  That means we can write a simple function that will change
the numbers array in such a way that calling `fillButtonContent` with the updated
array will make the numbers travel around the '5' in a clockwise fashion!

Let's write that function:

```
function enterTheMatrix(arr) {
  let newArr = [];
  newArr.push(arr[3]);
  newArr.push(arr[0]);
  newArr.push(arr[1]);
  newArr.push(arr[5]);
  newArr.push(arr[2]);
  newArr.push(arr[6]);
  newArr.push(arr[7]);
  newArr.push(arr[4]);
  return newArr;
}
```

The function `enterTheMatrix` takes in our numbers array, builds a placeholder array,
pushes values from the original array to our placeholder array using the pattern we saw
in our model, then returns the new array.

Putting the whole thing together we get:

```
const btn5 = document.querySelector('#btn5');
const buttons = document.querySelectorAll('.rotating');
let numbers = [1, 2, 3, 4, 6, 7, 8, 9];

buttons.forEach((btn, i) => fillButtonContent(btn, i));

function rotateThem() {
  numbers = enterTheMatrix(numbers);
  buttons.forEach((btn, i) => fillButtonContent(btn, i)); 
}

function fillButtonContent(btn, i) {
  btn.textContent = numbers[i];
}

function enterTheMatrix(arr) {
  let newArr = [];
  newArr.push(arr[3]);
  newArr.push(arr[0]);
  newArr.push(arr[1]);
  newArr.push(arr[5]);
  newArr.push(arr[2]);
  newArr.push(arr[6]);
  newArr.push(arr[7]);
  newArr.push(arr[4]);
  return newArr;
}

btn5.addEventListener('click', rotateThem);
```

On page load, the buttons which will rotate are assigned an innerHTML value
from the numbers array. We target our `btn5` and attach a click listener 
which fires the event handler `rotateThem`.  The event handler runs `enterTheMatrix`, which gives us a new array.  We use that array to run our
original `fillButtonContent` to update the button texts.

And that's it!

## What did we learn?

Well, first off, the major takeaway from our happy accident was to make sure
to **always** understand your task before starting.  It might feel like diving
in and getting your hands dirty is the best way to accomplish anything, but 
taking a few minutes to understand what you need to accomplish can save a lot
of time and headache down the road.

Second, learn from your mistakes.  You make them, but they can't break you if
you analyze what you've done wrong.  That may mean re-reading the requirements,
Google-ing for help, scrolling forums or asking co-workers (highly recommended,
if you have them).  Own your mistakes and they will begin to feel like self-
teaching moments.

Third, don't scrap everything.  A lot of what developers do is pattern-based.  If
you focus on coding in patterns, you set yourself up with strong frameworks on
which you build your code.  Any mistakes you make therein can usually be
corrected without having to start over from scratch.  There is no need to 
abandon a strong foundation, just because you rushed some execution.

Finally, Bob Ross is eternal.