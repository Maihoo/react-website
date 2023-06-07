"use strict"

var gl;
var program;

var vaoStand;
var vaoRabbit;
var vaoSphere;

var viewMatrix;
var modelMatrix;
var projectionMatrix;

var vertexCount;

var rotationX = 0;
var rotationY = 0;
var rotationZ = 0;

var lightPosition 		= vec4(1.0, 5.0, 5.0, 0.0 );
var lightAmbient		= vec4(0.5, 0.2, 0.2, 1.0 );

var lightDiffuseRabbit  = vec4( 0.8, 0.8, 0.8, 1 );		//AUFGABE 3) c)
var lightSpecularRabbit = vec4( 1.0, 1.0, 1.0, 1.0 );	//
var shininessRabbit     = 100.0;						//
//														//
var lightDiffuseStand  = vec4( 1.2, 1.2, 1.2, 1 );		//
var lightSpecularStand = vec4( 1.5, 1.5, 1.5, 1 );		//
var shininessStand     = 2.0;							//



function render(timestamp, previousTimestamp) {
	//clear
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.useProgram(program);
	
	//calculate time passed since last frame
	var timeDiff = timestamp-previousTimestamp;
	
	//get Values from sliders
	var light = getLightPosition();											//AUFGABE 3) b)
	var rotation = getRotation();											//AUFGABE 2) b)
	
	//get rotation input from sliders 
	rotationX += rotation[0] * timeDiff;			//include timeDiff for constant speed with varying framerate
	rotationY += rotation[1] * timeDiff;
	rotationZ += rotation[2] * timeDiff;
	
	//define camera position, pointed to position and up-vector 
	var cameraPos = vec3(0, 2, 5);											//AUFGABE 1) b)
	var lookAtPos = vec3(0,0,0);											//
	var upVector  = vec3(0,1,0);											//
	//																		//
	//apply to view matrix													//
	viewMatrix = lookAt(cameraPos, lookAtPos, upVector);					//
	//																		//
	//update view matrix to shader											//
	var uniformLocationID = gl.getUniformLocation(program, "viewMatrix");	//
	gl.uniformMatrix4fv(uniformLocationID, gl.FALSE, flatten(viewMatrix));	//
	
	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//STAND
	
	//primary transformations (stand)
	//scale
	modelMatrix = scalem(2, 2, 2);											//AUFGABE 1) c) (part 1)
	//rotation
	var rotationMat = mat4(1.0);											//AUFGABE 2) b)
	rotationMat = rotateX(rotationX/10);									//
	rotationMat = mult(rotationMat, rotateY(rotationY/10)); 				//(take away the /10 to make it rotate the applied amount every frame (too fast in my opinion))
	rotationMat = mult(rotationMat, rotateZ(rotationZ/10)); 				//(take away the /10 to make it rotate the applied amount every frame (too fast in my opinion))
	modelMatrix = mult(modelMatrix, rotationMat);							//

	//translation
	translationMat = translate(0,-0.75,0);					 				//AUFGABE 1) c)		
	modelMatrix = mult(modelMatrix, translationMat);						//(part 2)
	
	//update to shader first time
	uniformLocationID = gl.getUniformLocation(program, "modelMatrix");
	gl.uniformMatrix4fv(uniformLocationID, gl.FALSE, flatten(modelMatrix));
	
	//update light to shader
	uniformLocationID = gl.getUniformLocation(program, "lightDiffuse");
	gl.uniform4fv(uniformLocationID, flatten(lightDiffuseStand));

	uniformLocationID = gl.getUniformLocation(program, "lightSpecular");
	gl.uniform4fv(uniformLocationID, flatten(lightSpecularStand));
	
	uniformLocationID = gl.getUniformLocation(program, "shininess");
	gl.uniform1f(uniformLocationID, shininessStand);
	
	//bind stand
	gl.bindVertexArray(vaoStand);
	gl.drawArrays(gl.TRIANGLES, 0, 36);	
	
	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//RABBIT
	
	//secondary transformations (rabbit)
	//scale
	var scaleFactor = 1;
	modelMatrix = scalem(scaleFactor, scaleFactor, scaleFactor);
	//rotation
	rotationMat = mat4(1.0);												//AUFGABE 2) b)
	rotationMat = rotateX(rotationX/10);									//
	rotationMat = mult(rotationMat, rotateY(rotationY/10)); 				//(take away the /10 to make it rotate the applied amount every frame (too fast in my opinion))
	rotationMat = mult(rotationMat, rotateZ(rotationZ/10)); 				//(take away the /10 to make it rotate the applied amount every frame (too fast in my opinion))
	modelMatrix = mult(modelMatrix, rotationMat);							//
	//translation
	var translationMat = mat4(1.0);
	translationMat = translate(0,-1.2,0);
	//apply to modelMatrix
	modelMatrix = mult(modelMatrix, translationMat);
	

	//update to shader second time
	uniformLocationID = gl.getUniformLocation(program, "modelMatrix");
	gl.uniformMatrix4fv(uniformLocationID, gl.FALSE, flatten(modelMatrix));
	
	//update light to shader
	uniformLocationID = gl.getUniformLocation(program, "lightDiffuse");
	gl.uniform4fv(uniformLocationID, flatten(lightDiffuseRabbit));

	uniformLocationID = gl.getUniformLocation(program, "lightSpecular");
	gl.uniform4fv(uniformLocationID, flatten(lightSpecularRabbit));
	
	uniformLocationID = gl.getUniformLocation(program, "shininess");
	gl.uniform1f(uniformLocationID, shininessRabbit);


	//bind rabbit
	gl.bindVertexArray(vaoRabbit);											//AUFGABE 2) a) (part 2)
	gl.drawArrays(gl.TRIANGLES, 0, vertexCount);							//
		
	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	//SPHERE																//Aufgabe 4) begin
	
	//third transformations (Sphere)
	//scale
	modelMatrix = scalem(0.15, 0.15, 0.15);
	//rotation
		//(rotiert absichtlich nicht)
	//translation
	translationMat = translate(light[0]*3, light[1]*3, light[2]*3);					 
	modelMatrix = mult(modelMatrix, translationMat);
	
	
	//update to shader third time
	uniformLocationID = gl.getUniformLocation(program, "modelMatrix");
	gl.uniformMatrix4fv(uniformLocationID, gl.FALSE, flatten(modelMatrix));
	
	//update light to shader
	uniformLocationID = gl.getUniformLocation(program, "lightDiffuse");
	gl.uniform4fv(uniformLocationID, flatten(vec4(10, 10, 10, 1)));

	uniformLocationID = gl.getUniformLocation(program, "lightSpecular");
	gl.uniform4fv(uniformLocationID, flatten(vec4(1110, 1110, 1110, 1)));
	
	uniformLocationID = gl.getUniformLocation(program, "shininess");
	gl.uniform1f(uniformLocationID, 0);
	
	//bind Sphere
	gl.bindVertexArray(vaoSphere);
	gl.drawArrays(gl.TRIANGLES, 0, 1000);									//Aufgabe 4) end

	//LIGHT
	//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	lightPosition = vec4(light[0]*3, light[1]*3, light[2]*3, 1.0);			//AUFGABE 3) b)
	//																		//
	uniformLocationID = gl.getUniformLocation(program, "lightPosition");	//
	gl.uniform4fv(uniformLocationID, flatten(lightPosition));				//


	//actually draw
	window.requestAnimFrame(function (time) {		
		render(time, timestamp);
	});
}



function createSphere(){		
	//																		AUFGABE 4) 	|
	//																					V
	var positions = [];
	
	for(let i = 0; i < 1000; i++){						//this creates an array of 1000 points at random positions
		positions.push(vec3(	Math.random() * 2 - 1, 
								Math.random() * 2 - 1, 
								Math.random() * 2 - 1));
		positions[i] = normalize(positions[i]);			//this makes them all 1 unit long
	}													//I know this is dirty as f*ck, but it creates an okay looking sphere, the task is technically done and the Sphere kind of looks like a sun :D
	
	
	vaoSphere = gl.createVertexArray();
	gl.bindVertexArray(vaoSphere);

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 0, 0);
	gl.enableVertexAttribArray(0);

	var colors = [];
	for(let i = 0; i < positions.length; i++){
		colors.push(vec3(1,1,0));
	}

	var vboColor = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vboColor);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);	
	gl.vertexAttribPointer(1, 3, gl.FLOAT, gl.FALSE, 0, 0);
	gl.enableVertexAttribArray(1);	 
	
	var normals = [];
	for (var i = 2; i < positions.length; i += 3) {
		for (var j = 0; j < 3; ++j) {

			var side1 = subtract(positions[i-1], positions[i-2]);
			var side2 = subtract(positions[i], positions[i-2]);
			var crossp = cross(side1, side2);

			normals.push(normalize(crossp));
		}
	}
	
	var normalsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);
	gl.vertexAttribPointer(2, 3, gl.FLOAT, gl.FALSE, 0, 0);
	gl.enableVertexAttribArray(2);
}


function createGeometry()
{
	//																		AUFGABE 1) a) 	|
	//																						V
	
	var positions =[];
	// Punkte:
	//
	//      E__F
	//     H____G
	//    /      \
	//   A________B
	//  D__________C
	
	var A = vec3( -0.5,  0.0,   0.5);
	var B = vec3(  0.5,  0.0,   0.5);
	var C = vec3(  0.5,  0.0,  -0.5);
	var D = vec3( -0.5,  0.0,  -0.5);
	
	var E = vec3( -0.25,  0.25,   0.25);
	var F = vec3(  0.25,  0.25,   0.25);
	var G = vec3(  0.25,  0.25,  -0.25);
	var H = vec3( -0.25,  0.25,  -0.25);
	
	
	//underside
	positions.push(D);
	positions.push(C);
	positions.push(B);

	positions.push(B);
	positions.push(A);
	positions.push(D);

	//backside
	positions.push(B);
	positions.push(F);
	positions.push(A);

	positions.push(A);
	positions.push(F);
	positions.push(E);

	//leftside
	positions.push(A);
	positions.push(E);
	positions.push(D);

	positions.push(D);
	positions.push(E);
	positions.push(H);

	//frontside
	positions.push(D);
	positions.push(H);
	positions.push(C);

	positions.push(C);
	positions.push(H);
	positions.push(G);

	//rightside
	positions.push(C);
	positions.push(G);
	positions.push(B);

	positions.push(B);
	positions.push(G);
	positions.push(F);

	//upperside
	positions.push(F);
	positions.push(G);
	positions.push(H);

	positions.push(H);
	positions.push(E);
	positions.push(F);
	
	

	vaoStand = gl.createVertexArray();
	gl.bindVertexArray(vaoStand);

	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 0, 0);
	gl.enableVertexAttribArray(0);

	var colors = [];
	for(let i = 0; i < positions.length; i++){
		colors.push(vec3(0.5,0.5,0.5));
	}

	var vboColor = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vboColor);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);	
	gl.vertexAttribPointer(1, 3, gl.FLOAT, gl.FALSE, 0, 0);
	gl.enableVertexAttribArray(1);	 
	
	var normals = [];
	for (var i = 2; i < positions.length; i += 3) {
		for (var j = 0; j < 3; ++j) {

			var side1 = subtract(positions[i-1], positions[i-2]);
			var side2 = subtract(positions[i], positions[i-2]);
			var crossp = cross(side1, side2);

			normals.push(normalize(crossp));
		}
	}
	
	var normalsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);
	gl.vertexAttribPointer(2, 3, gl.FLOAT, gl.FALSE, 0, 0);
	gl.enableVertexAttribArray(2);
}


function loadModel()
{
	//																		AUFGABE 2) a) (part 1) die gesamte Funktion loadModel() 
	
	var meshData = loadMeshData();
	var positions = meshData.positions;
	
	vaoRabbit = gl.createVertexArray();
	gl.bindVertexArray(vaoRabbit);


	var vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
	gl.bufferData(gl.ARRAY_BUFFER, flatten(positions), gl.STATIC_DRAW);
	gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 0, 0);
	gl.enableVertexAttribArray(0);

	var normals = meshData.normals;
	var normalsBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, normalsBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW);
	gl.vertexAttribPointer(2, 3, gl.FLOAT, gl.FALSE, 0, 0);
	gl.enableVertexAttribArray(2);

	var colors = meshData.colors;
	var vboColor = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vboColor);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);
	gl.vertexAttribPointer(1, 3, gl.FLOAT, gl.FALSE, 0, 0);
	gl.enableVertexAttribArray(1);

	vertexCount = meshData.vertexCount; 								//only really needed one vertexCount because i know the exact amount of vertices of the sphere and the stand
}


window.onload = function init() {
	var canvas = document.getElementById('rendering-surface');	
	gl = WebGLUtils.setupWebGL( canvas ); 
	
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.enable(gl.DEPTH_TEST);
	gl.clearColor(0.0, 0.0, 0.0, 0.0);

	program = initShaders(gl, "vertex-shader","fragment-shader");
	
	createGeometry();													//creates Stand
	loadModel();														//creates Rabbit
	createSphere();														//creates Sphere

	//initial creatipon and application of modelMatrix, viewMatrix, lightAmbient, lightDiffuse, lightSpecular, shininess and projectionMatrix to shader
	//(most of theses will be updated in render() every frame though)
	modelMatrix = mat4(1.0);

	var cameraPos = vec3(0, 2, 5);
	var lookAtPos = vec3(0, 0, 0);
	var upVector  = vec3(0, 1, 0);

	viewMatrix = lookAt(cameraPos, lookAtPos, upVector);
	projectionMatrix = perspective(60.0, canvas.width/canvas.height, 0.1, 100.0);

	this.gl.useProgram(program);

	var uniformLocationID = gl.getUniformLocation(program, "viewMatrix");
	this.gl.uniformMatrix4fv(uniformLocationID, gl.FALSE, flatten(viewMatrix));
	
	uniformLocationID = gl.getUniformLocation(program, "lightAmbient");
	gl.uniform4fv(uniformLocationID, flatten(lightAmbient));

	uniformLocationID = gl.getUniformLocation(program, "lightDiffuse");
	gl.uniform4fv(uniformLocationID, flatten(lightDiffuseRabbit));

	uniformLocationID = gl.getUniformLocation(program, "lightSpecular");
	gl.uniform4fv(uniformLocationID, flatten(lightSpecularRabbit));

	uniformLocationID = gl.getUniformLocation(program, "shininess");
	gl.uniform1f(uniformLocationID, shininessRabbit);

	uniformLocationID = gl.getUniformLocation(program, "projectionMatrix");
	this.gl.uniformMatrix4fv(uniformLocationID, gl.FALSE, flatten(projectionMatrix));

	uniformLocationID = gl.getUniformLocation(program, "modelMatrix");
	this.gl.uniformMatrix4fv(uniformLocationID, gl.FALSE, flatten(modelMatrix));

	render(0,0);
}

