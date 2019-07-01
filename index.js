(function(){

	const canvas = document.getElementById('canvas');
	const c = canvas.getContext('2d');
	c.fillStyle = 'gray';
	

	const image = new Image();

	image.src = 'http://www.lostgarden.com/gfx/HardVacuum/ship.gif';
	


	let scope= stateKeydown();

	function keyDownHandler(e){
		if(e.key === 's'){
			scope('s');
			return
		}
		if(e.key === 'w'){
			scope('w');
			return
		}
		if(e.key === 'a'){
			scope('a');
			return
		}
		if(e.key === 'd'){
			scope('d');
			return
		}
		if(e.key === '`'){
			console.log(scope());
		}
	}
	function keyUpHandler(e){
		if(e.key === 's'){
			scope('s', true);
			return
		}
		if(e.key === 'w'){
			scope('w', true);
			return
		}
		if(e.key === 'a'){
			scope('a', true);
			return
		}
		if(e.key === 'd'){
			scope('d', true);
			return
		}
	}
	
	window.addEventListener('keydown',keyDownHandler);
	window.addEventListener('keyup',keyUpHandler);

	const state = {
		x: 10,
		y: 90,
	}


	function action(now){
		// console.log(now)
		c.clearRect(state.y-2,state.x-2, 60, 100);
		c.drawImage(image,state.y, state.x,50, 90)
		if (scope().d) {
			c.drawImage(image,state.y +=1* now/5, state.x,50, 90)
		}

		if (scope().a) {
			c.drawImage(image,state.y -=1* now/5, state.x,50, 90)
		}

		if (scope().w) {
			c.drawImage(image,state.y, state.x-=1* now/5,50, 90)
		}

		if (scope().s) {
			c.drawImage(image,state.y, state.x+=1* now/5,50, 90)
		}

	}


	image.onload = function(){
		time = performance.now();
		main();
		requestAnimationFrame(main);
	};



	let time;
	let i = 0 ;
	function main(){
		let now = performance.now();
		let diffTime =(performance.now() - time);
		// console.log(diffTime)
		action(diffTime);
		time = now;
		requestAnimationFrame(main)
	}

	function stateKeydown(){

		const stateObj = {};
			stateObj.w = false;
			stateObj.a = false;
			stateObj.s = false;
			stateObj.d = false;
			
		return function(key, isKeyUp){
			for(Key in stateObj){
				if (Key === key && !isKeyUp) {
					
					stateObj[key] = true;
					console.log(stateObj)
				}
				else if(isKeyUp){
					stateObj[key] = false;
				}
			}
			if(!key){
				return stateObj;
			}				
		}
	}


}())