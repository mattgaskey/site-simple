// Sticky Nav

const nav = document.querySelector('nav#main');
const topOfNav = nav.offsetTop;
let startBeat = false;

function stickyNav() {
	if (window.scrollY > topOfNav) {
		document.body.style.paddingTop = nav.offsetHeight + 'px';
		document.body.classList.add('fixed-nav');
		startBeat = true;
	} else {
		document.body.style.paddingTop = 0;
		document.body.classList.remove('fixed-nav');
		startBeat = false;
	}
}

window.addEventListener('scroll', stickyNav);

// Heart Rate Logo

const line = document.querySelector(".heart-rate__line");

let totalLength = 0;
let prevPos;

for (let i = 0; i < line.points.numberOfItems; i++) {
	let pos = line.points.getItem(i);
	if (i > 0) {
		totalLength += Math.sqrt(
			Math.pow(pos.x - prevPos.x, 2) + Math.pow(pos.y - prevPos.y, 2)
		);
	}
	prevPos = pos;
}

line.style.strokeDasharray = `${totalLength} ${totalLength}`;
line.style.strokeDashoffset = totalLength;

const heartBeat = setInterval(function() {
	if (startBeat) {
		line.style.strokeDashoffset -= totalLength;
	}
}, 1500);

