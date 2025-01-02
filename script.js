function includeHTML() {
	var z, i, elmnt, file, xhttp;
	z = document.getElementsByTagName("*");
	for (i = 0; i < z.length; i++) {
		elmnt = z[i];
		file = elmnt.getAttribute("include-html");
		if (file) {
			xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4) {
					if (this.status == 200) {elmnt.innerHTML = this.responseText;}
					if (this.status == 404) {elmnt.innerHTML = "Wild MissingNo. appeared!";}
					elmnt.removeAttribute("include-html");
					includeHTML();
				}
			}      
			xhttp.open("GET", file, true);
			xhttp.send();
			return;
		}
	}
}

function buildPokedex(currentUniverse) {
	var dexLinks, dexSprites, dexTrackers, i;
	dexTrackers = document.getElementsByClassName("dex-tracker");
	dexLinks = document.getElementsByClassName("dex-link");
	spriteCells = document.getElementsByClassName("sprite-cell");
	dexSprites = document.getElementsByClassName("dex-sprite");
	typeRows = document.getElementsByClassName("type-row");
	for (i = 0; i < (dexTrackers.length); i++) {
		iString = i.toString();
		dexTrackers[i].id = currentUniverse + iString;
		functionString = "toggleLiving('" + currentUniverse + iString + "')"
		spriteCells[i].setAttribute("onclick", functionString);
		typeRows[i].setAttribute("onclick", functionString);
		dexSprites[i].src = "Sprites/" + dexLinks[i].innerText + ".png";
		//Originally developed for the HANDY910is model of Pokédex, this simple upgrade incorporates the functionality to handle multiple Pokémon forms as well as gender differences.
		if (dexLinks[i].classList.contains("form")) {
			dexLinks[i].innerHTML = dexLinks[i].id;
		}
		dexLinks[i].href = "Pokédex/" + dexLinks[i].innerText + ".html";
	}
}

function toggleBar(id) {
	var bar = document.getElementById(id);
	if (bar.style.display === "none") {
		bar.style.display = "block";
	}
	else {
		bar.style.display = "none";
	}
}

function stylizeTypes() {
	var typeP, i;
	typeP = document.getElementsByClassName("type");
	for (i = 0; i < (typeP.length); i++) {
		switch (typeP[i].innerText) {
			case "Unknown":
				typeP[i].className = "type nkdf";
				break;
			case "???":
				typeP[i].className = "type qqq";
				break;
			default:
				typeP[i].className = "type " + typeP[i].innerText;
		}
	}
}

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	let expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
		}
	}
	return "";
}

function toggleCaught(pid) {
	//Inspired by Lyra's website, this lets you track which Pokémon you have caught in each ROM hack/fan game
	//Usng this for tracking individual forms (for Pokémon that have them)
	var element = document.getElementById(pid);
	element.classList.toggle("caught");
	if (element.classList.contains("caught")) {
		setCookie(pid, "caught", 400);
	} else {
		setCookie(pid, "caught", -1);
	}
}

function toggleLiving(pid) {
	//Inspired by Lyra's website, this lets you track which Pokémon you have caught in each ROM hack/fan game
	//Click once to set to Registered, click once again to set to Caught. Then one more click, and it resets.
	var element = document.getElementById(pid);
	
	if (element.classList.contains("registered")) {
		setCookie(pid, "registered", -1);
		setCookie(pid, "caught", 400);
		element.classList.toggle("registered");
		element.classList.toggle("caught");
	} else if (element.classList.contains("caught")) {
		setCookie(pid, "caught", -1);
		element.classList.toggle("caught");
	} else {
		setCookie(pid, "registered", 400);
		element.classList.toggle("registered");
	}
}

function loadSave(currentUniverse) {
	var slot, i;
	slot = document.getElementsByClassName("dex-tracker");
	for (i = 0; i < (slot.length); i++) {
		if (getCookie(currentUniverse + i.toString()) == "caught") {
			slot[i].classList.toggle("caught");
			setCookie(currentUniverse + i.toString(), "caught", 400);
		}
	}
}

function loadSaveLiving(currentUniverse) {
	var slot, i;
	slot = document.getElementsByClassName("dex-tracker");
	for (i = 0; i < (slot.length); i++) {
		if (getCookie(currentUniverse + i.toString()) == "registered") {
			slot[i].classList.toggle("registered");
			setCookie(currentUniverse + i.toString(), "registered", 400);
		} else if (getCookie(currentUniverse + i.toString()) == "caught") {
			slot[i].classList.toggle("caught");
			setCookie(currentUniverse + i.toString(), "caught", 400);
		}
	}
}

function loadSavedForms() {
	var slot, i;
	slot = document.getElementsByClassName("dex-tracker");
	for (i = 0; i < (slot.length); i++) {
		if (getCookie(slot[i].id) == "caught") {
			slot[i].classList.toggle("caught");
			setCookie(slot[i].id, "caught", 400);
		}
	}
}

function flipSprite(spr, front, back) {
	var sp = document.getElementById(spr);
	if (sp.title == "Front") {
		sp.src = back;
		sp.title = "Back";
	} else {
		sp.src = front;
		sp.title = "Front";
	}
}

// Select the canvas and set up context
const canvas = document.getElementById("lostZoneCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas to fit the page
canvas.width = rect.width;
canvas.height = 120;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

ctx.fillStyle = 'cyan';
ctx.fillRect(0, 0, rect.width, 120);

const img = new Image();
img.src = "/Resources/Giratina-Origin.png";
img.onload = () => {
	ctx.drawImage(img, 0, 0, 96, 96); // Adjust position and size as needed
};

const particles = [];
const colors = ["#00FFFF", "#C71585", "#8A2BE2"]; // Cyan, Magenta, Purple

// Particle class
class Particle {
    constructor() {
        this.x = canvas.width / 2; // Start in the center
        this.y = canvas.height / 2;
        this.size = Math.random() * 4 + 1; // Particle size
        this.speedX = (Math.random() - 0.5) * 4; // Random horizontal speed
        this.speedY = (Math.random() - 0.5) * 4; // Random vertical speed
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.life = Math.random() * 60 + 60; // Particle lifespan
    }
    update() {
        this.x += this.speedX; // Move
        this.y += this.speedY;
        this.life--; // Decrease lifespan
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Handle particles
function handleParticles() {
    // Add new particles
    particles.push(new Particle());

    // Draw and update particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        // Remove if particle has faded out
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
}

// Animate
function animate() {
    /*ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    handleParticles();
    requestAnimationFrame(animate);*/
}

function waveCollapse() {
	var fallerThoughts = Array(
		"Hahaha, I guess not. That white hand on your shoulder... I'm just imagining it.",
		"Our words shall remain here for the ages.",
		"We feared it.",
		"The next world waits for you.",
		"Every rumor has a kernel of truth to it.",
		"A flipped coin doesn't always land heads or tails. Sometimes it may never land at all...",
		"By the way, who is that standing behind you?",
		"Dad, Mom, Abra... Where are you...?",
		"No, you're not the one...",
		"I'm going to go for help. Wait in the usual place.",
		"I wonder what he meant. Ice cream, maybe?",
		"Where... Where am I?",
		"When I think about it, you, too, are all alone in the world.",
		"Seek out all Fakemon.",
		"Hello, starlight... You certainly gave everyone a scare.",
		"You’re just in time for the end of the world!",
		"Don't become his lunch.",
		"Shhh! Please walk quietly in the hallway!",
		"We need to talk about parallel universes.",
		"This message should not appear. I'll be scared if it does...",
		"Stones to rival the celestial spheres, the seven hewn by a fell hand.",
		"You've met with a terrible fate, haven't you?",
		"I think you are lost. It’s got to be around here somewhere...",
		"Have you ever thought of a world where everything is exactly the same... except you don't exist?",
		"Please don't think about this anymore.",
		"Yes, your friend... The one behind you, with the creepy smile.",
		"I just wasn't ready for the responsibility.",
		"It pulls the strings and makes them ring.",
		"Can anyone hear me? Help...",
		"It's dark... It's so dark here...",
		"It could not be.",
		"The pain itself is reason why.",
		"The air crackles with freedom.",
		"It's funny because we're all living in a simulation and free will is a lie.",
		"Who are you running from?",
		"You know how I never like letting people see my unfinished work.",
		"Welcome to the zone between zones.",
		"Warning: Nonstandard Spacetime",
		"God save you if you hear something wandering around nearby, because it sure as hell has heard you.",
		"This is the dimension of imagination."
	)
	var fun = Math.floor(Math.random()*fallerThoughts.length);
	echo = fallerThoughts[fun];
	abyss = document.getElementsByClassName("abyss");
	abyss[0].innerText = echo;
	pid = Math.floor(Math.random() * 66) + 1
	if (pid == 66) {
		G = document.getElementsByClassName("G");
		G[0].src = "/Resources/Giratina-Origin-Shiny.png";
	}
}