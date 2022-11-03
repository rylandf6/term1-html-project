document.addEventListener("DOMContentLoaded", () => {
	const MARGIN = 20;
	const parent = document.getElementById("background");

	const balls = [];

	for (let i = 0; i < 100; i++) {
		// Generate random positions within parent
		const x = Math.random() * (parent.offsetWidth - MARGIN);
		const y = Math.random() * (parent.offsetHeight - MARGIN);

		// Create element
		const element = document.createElement("span");
		element.innerHTML = "•";
		element.classList.add("ball");

		parent.appendChild(element);

		// Generate object and add to array
		const ball = { 
			velX: 0,
			velY: 0,
			x,
			y,
			element 
		};
		balls.push(ball);
	}

	// Mouse handler
	let mouseX = -1000;
	let mouseY = -1000;
	
	let lastMouseX = -1000;
	let lastMouseY = -1000;

	document.addEventListener("mousemove", (e) => {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});

	// Physics loop
	setInterval(() => {
		// Bounding box
		const tl_x = MARGIN;
		const tl_y = MARGIN;
		const br_x = parent.offsetWidth - MARGIN;
		const br_y = parent.offsetHeight - MARGIN;

		// Mouse deltas
		const mouseDx = mouseX - lastMouseX;
		const mouseDy = mouseY - lastMouseY;

		lastMouseX = mouseX;
		lastMouseY = mouseY;

    	for (const ball of balls) {
			// Apply velocity
			ball.x += ball.velX;
			ball.y += ball.velY;

			// Bounce
			if (ball.x < tl_x || ball.x > br_x) {
				ball.velX *= -0.95;
			}

			if (ball.y < tl_y || ball.y > br_y) {
				ball.velY *= -0.95;
			}

			// Reduce velocity (friction)
			ball.velX *= 0.99;
			ball.velY *= 0.99;

			if (Math.abs(ball.velX) < 1) {
				ball.velX = 0;
			}

			if (Math.abs(ball.velY) < 1) {
				ball.velY = 0;
			}

			// Calculate squared distance to mouse cursor and apply mouse velocity
			const mouseDist = Math.sqrt(Math.pow(ball.x - mouseX, 2) + Math.pow(ball.y - mouseY, 2));

			if (mouseDist < 35) {
				ball.velX += Math.min(5, mouseDx / 3);
				ball.velY += Math.min(5, mouseDy / 3);
			}
		}

	}, 50);

    // Animation loop
	const frameTick = () => {
		for (const ball of balls) {
			// Update rendered position
			const y = Math.max(0, Math.min(parent.offsetHeight - MARGIN, ball.y));
			const x = Math.max(0, Math.min(parent.offsetWidth - MARGIN, ball.x));

			ball.element.style.top = `${y}px`;
			ball.element.style.left = `${x}px`;
		}

		window.requestAnimationFrame(frameTick);
	}

	frameTick();
});