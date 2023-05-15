import {React, useEffect, useRef, useState} from 'react';
import {Engine, Render, Runner, Bodies, Composite, Events, Constraint, MouseConstraint,
Mouse, Body} from 'matter-js';


export default function BoardGame() {
	const [width, setWidth] = useState(null);
    const board = useRef();

	useEffect(() => {
		const handeResize = () => {
			setWidth(window.innerWidth);
		}
		handeResize();
		window.addEventListener('resize', handeResize);

		return () => {
			window.removeEventListener('resize', handeResize)
		}
	}, [])

	useEffect(() => {
		if(width > 600) {
 		let engine = Engine.create({});
		const render = Render.create({
				element : board.current,
				engine : engine,
				options: {
					width: 1400,
					height: 1200,
					wireframes: false
				}
			})

		Render.run(render);
		let runner = Runner.create();
		Runner.run(runner, engine);

		let color = '#DD54A6';
		let color2 = '#596EDA';
		let color3 = '#251E28';

		let defaultCategory = 0x0001;
		let redCategory = 0x0002;
		let blueCategory = 0x0003;
		let boardCategory = 0x0004;

		let ballOptions = {
			render: {
				fillStyle: color,
				strokeStyle: '#e26db3',
    			roughness: 1,
         		lineWidth: 6,
			},
			isSensor: false,
			density: 0.1,
			motion: 0.6,
			collisionFilter: {
				mask: defaultCategory | blueCategory,
				group: 0
			}
			};
		let ball = Bodies.circle(399, 177, 37, ballOptions);
		let anchor = {x: 399, y: 177};
		let sling = Constraint.create({
		pointA: anchor,
		bodyB: ball,
		length: 0.01,
		damping: 0.05,
		stiffness: 0.08,
		angularStiffness: 0.02,
		render: {
			strokeStyle: '#403546e3',
			lineWidth: 0.5,
			type: 'line'
		}
		});

		let ballOptions2 = {
			render: {
				fillStyle: color2,
				strokeStyle: '#687cde',
    			roughness: 1,
         		lineWidth: 6,
			},
			isSensor: false,
			density: 0.1,
			motion: 0.6,
			collisionFilter: {
				mask: defaultCategory | redCategory,
				group: 0
			}
		};
		let ball2 = Bodies.circle(801, 580, 37, ballOptions2);
		let anchor2 = {x: 801,y: 580};
		let sling2 = Constraint.create({
		pointA: anchor2,
		bodyB: ball2,
		length: 0.01,
		damping: 0.05,
		stiffness: 0.08,
		angularStiffness: 0.02,
		render: {
			strokeStyle: '#403546e3',
			lineWidth: 0.5,
			type: 'line'
		}
		});

		let boardGame = Bodies.polygon(600, 380, 4, 365, {
			isSensor: true,
			isStatic: true,
			isSleeping: true,
			event: null,
			bounds: null,
			render: {
				fillStyle: color3,
				lineWidth: null,
				visible: true
			},
			chamfer: {
				radius: 40
			},
			collisionFilter: {
				mask: boardCategory,
				group: 1
			}

		});

		engine.gravity.y = 0;

		Composite.add(engine.world, [boardGame, ball, ball2 ]);

		// add mouse control
		let mouse = Mouse.create(render.canvas),
		mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			element : board.current,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		});

		Composite.add(engine.world, mouseConstraint);
		render.mouse = mouse;


		let flagRed = false;
		let flagBlue = false;
		Events.on(mouseConstraint, 'startdrag', (e) => {
			if (e.body === ball) {
				flagRed = true;
				Composite.add(engine.world, sling);
			} else if (e.body === ball2) {
				flagBlue = true;
				Composite.add(engine.world, sling2);
			} else return false;
		});

		Events.on(mouseConstraint, 'enddrag', (e) => {
			if (e.body === ball) {
				flagRed = true;
				setTimeout(removeSling, 1000)
			} else if (e.body === ball2) {
				flagBlue = true;
				setTimeout(removeSling2, 1000)
			} else {
				return false
			}
		});

	function removeSling() {
	Composite.remove(engine.world, sling);
	clearTimeout(removeSling)
	}

	function removeSling2() {
	Composite.remove(engine.world, sling2);
	clearTimeout(removeSling2)
	}


	/**
	 * Add new pink and blue balls after update
	 */
	let newBallOptions = {
			render: {
				fillStyle: color,
			},
			isSensor: false,
			density: 0.1,
			motion: 0.6,
			collisionFilter: {
				mask: defaultCategory | blueCategory,
				group: 0
			}
			};

		let newBallOptions2 = {
			render: {
				fillStyle: color2,
			},
			isSensor: false,
			density: 0.1,
			motion: 0.6,
			collisionFilter: {
				mask: defaultCategory | redCategory,
				group: 0
			}
		};

	Events.on(engine, 'afterUpdate', function () {
	if ((mouseConstraint.mouse.button === -1 && flagRed) &&
		ball.position.x > 399) {
		if (Body.getSpeed(ball) < 10) {
			Body.setSpeed(ball, 20)
		} else {
			Body.setSpeed(ball, 25)
		}
		ball = Bodies.circle(399, 177, 40, newBallOptions);
		Composite.add(engine.world, ball);
		sling.bodyB = ball;
		flagRed = false;
	} else if ((mouseConstraint.mouse.button === -1 && flagBlue) &&
		ball2.position.y < 580) {
		if (Body.getSpeed(ball2) < 10) {
			Body.setSpeed(ball2, 20)
		} else {
			Body.setSpeed(ball2, 25)
		}
		ball2 = Bodies.circle(801, 580, 40, newBallOptions2);
		Composite.add(engine.world, ball2);
		sling2.bodyB = ball2;
		flagBlue = false;
	} else {
		return false
	}
	});

/**
 * Collision balls
 */

	Events.on(engine, "collisionEnd", function (event) {
	event.pairs.forEach(({bodyA,bodyB}) => {
		if (bodyA === ball2 || bodyB === ball2) {
			setTimeout(changePositionBall, 2000)
		}

		if (bodyA === ball || bodyB === ball) {
			setTimeout(changePositionBall, 2000)
		} else return false;
	})
	})

	function changePositionBall() {
	Body.setSpeed(ball, 0.02)
	Body.setPosition(ball, anchor);
	Body.setSpeed(ball2, 0.02);
	Body.setPosition(ball2, anchor2);
	clearTimeout(changePositionBall)
	}

	mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
	mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

		mouseConstraint.collisionFilter.mask = defaultCategory | blueCategory | redCategory | boardCategory
		Render.lookAt(render, {
			min: { x: 0,y: 0 },
			max: { x: 1200,y: 800 }
		});

		return () => {
		 Render.stop(render);
		 Engine.clear(engine);
		 Runner.stop(runner);
		 Composite.clear(engine.world);
		render.canvas.remove();
		}
		}

	}, [width])

	useEffect(() => {
		if(window.innerWidth <= 600) {
 		let engine = Engine.create({});
		const render = Render.create({
				element : board.current,
				engine : engine,
				options: {
					width: 414,
					height: 700,
					wireframes: false
				}
			})

		Render.run(render);
		let runner = Runner.create();
		Runner.run(runner, engine);

		let color = '#DD54A6';
		let color2 = '#596EDA';
		let color3 = '#251E28';

		let defaultCategory = 0x0001;
		let redCategory = 0x0002;
		let blueCategory = 0x0003;
		let boardCategory = 0x0004;

		let ballOptions = {
			render: {
				fillStyle: color,
				strokeStyle: '#e26db3',
    			roughness: 1,
         		lineWidth: 6,
			},
			isSensor: false,
			density: 0.1,
			motion: 0.6,
			collisionFilter: {
				mask: defaultCategory | blueCategory,
				group: 0
			}
		};
		let ball = Bodies.circle(250, 52, 79, ballOptions);
		let anchor = {x: 250, y: 52};
		let sling = Constraint.create({
		pointA: anchor,
		bodyB: ball,
		length: 0.01,
		damping: 0.05,
		stiffness: 0.08,
		angularStiffness: 0.02,
		render: {
			strokeStyle: '#403546e3',
			lineWidth: 0.5,
			type: 'line'
		}
		});

		let ballOptions2 = {
			render: {
				fillStyle: color2,
				strokeStyle: '#687cde',
    			roughness: 1,
         		lineWidth: 6,
			},
			isSensor: false,
			density: 0.1,
			motion: 0.6,
			collisionFilter: {
				mask: defaultCategory | redCategory,
				group: 0
			}
		};
		let ball2 = Bodies.circle(952, 752, 79, ballOptions2);
		let anchor2 = {x: 952,y: 752};
		let sling2 = Constraint.create({
		pointA: anchor2,
		bodyB: ball2,
		length: 0.01,
		damping: 0.05,
		stiffness: 0.08,
		angularStiffness: 0.02,
		render: {
			strokeStyle: '#403546e3',
			lineWidth: 0.5,
			type: 'line'
		}
		});

		let boardGame = Bodies.polygon(600, 400, 4, 680, {
			isSensor: true,
			isStatic: true,
			isSleeping: true,
			event: null,
			bounds: null,
			render: {
				fillStyle: color3,
				lineWidth: null,
				visible: true
			},
			chamfer: {
				radius: 130
			},
			collisionFilter: {
				mask: boardCategory,
				group: 1
			}

		});

		engine.gravity.y = 0;

		Composite.add(engine.world, [boardGame, ball, ball2 ]);

		// add mouse control
		let mouse = Mouse.create(render.canvas),
		mouseConstraint = MouseConstraint.create(engine, {
			mouse: mouse,
			element : board.current,
			constraint: {
				stiffness: 0.2,
				render: {
					visible: false
				}
			}
		});

		Composite.add(engine.world, mouseConstraint);
		render.mouse = mouse;

		let flagRed = false;
		let flagBlue = false;
		Events.on(mouseConstraint, 'startdrag', (e) => {
			if (e.body === ball) {
				flagRed = true;
				Composite.add(engine.world, sling);
			} else if (e.body === ball2) {
				flagBlue = true;
				Composite.add(engine.world, sling2);
			} else return false;
		});

		Events.on(mouseConstraint, 'enddrag', (e) => {
			if (e.body === ball) {
				flagRed = true;
				setTimeout(removeSling, 1000)
			} else if (e.body === ball2) {
				flagBlue = true;
				setTimeout(removeSling2, 1000)
			} else {
				return false
			}
		});

	function removeSling() {
	Composite.remove(engine.world, sling);
	clearTimeout(removeSling)
	}

	function removeSling2() {
	Composite.remove(engine.world, sling2);
	clearTimeout(removeSling2)
	}

	/**
	 * Add new pink and blue balls after update
	 */
		let newBallOptions = {
			render: {
				fillStyle: color,
			},
			isSensor: false,
			density: 0.1,
			motion: 0.6,
			collisionFilter: {
				mask: defaultCategory | blueCategory,
				group: 0
			}
			};

		let newBallOptions2 = {
			render: {
				fillStyle: color2,
			},
			isSensor: false,
			density: 0.1,
			motion: 0.6,
			collisionFilter: {
				mask: defaultCategory | redCategory,
				group: 0
			}
		};

	Events.on(engine, 'afterUpdate', function () {
	if ((mouseConstraint.mouse.button === -1 && flagRed) &&
		ball.position.x > 250) {
		if (Body.getSpeed(ball) < 10) {
			Body.setSpeed(ball, 20)
		} else {
			Body.setSpeed(ball, 25)
		}
		ball = Bodies.circle(250, 52, 79, newBallOptions);
		Composite.add(engine.world, ball);
		sling.bodyB = ball;
		flagRed = false;
	} else if ((mouseConstraint.mouse.button === -1 && flagBlue) &&
		ball2.position.y < 752) {
		if (Body.getSpeed(ball2) < 10) {
			Body.setSpeed(ball2, 20)
		} else {
			Body.setSpeed(ball2, 25)
		}
		ball2 = Bodies.circle(952, 752, 79, newBallOptions2);
		Composite.add(engine.world, ball2);
		sling2.bodyB = ball2;
		flagBlue = false;
	} else {
		return false
	}
	});

	/**
	 * Collision balls
	 */

	Events.on(engine, "collisionEnd", function (event) {
	// console.log(flagBlue, flagRed)
	event.pairs.forEach(({bodyA,bodyB}) => {
		if (bodyA === ball2 || bodyB === ball2) {
			setTimeout(changePositionBall, 2000)
		}

		if (bodyA === ball || bodyB === ball) {
			setTimeout(changePositionBall, 2000)
		} else return false;
	})
	})

	function changePositionBall() {
	Body.setSpeed(ball, 0.02)
	Body.setPosition(ball, anchor);
	Body.setSpeed(ball2, 0.02);
	Body.setPosition(ball2, anchor2);
	clearTimeout(changePositionBall)
	}

	mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
	mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

	mouseConstraint.collisionFilter.mask = defaultCategory | blueCategory | redCategory | boardCategory
	Render.lookAt(render, {
		min: { x: 0,y: 0 },
		max: { x: 1200,y: 800 }
	});

	return () => {
		Render.stop(render);
		Engine.clear(engine);
		Runner.stop(runner);
		Composite.clear(engine.world);
		render.canvas.remove();
	}
	}

	}, [])


    return(
			<div className='boardDesc' ref={board}></div>
    	)
}