function setupSphereMesh(n, options) {
  options = options || {};

  color = (typeof options.color !== 'undefined') ? options.color : [1.0, 0.0, 0.0, 1.0];
  translation = (typeof translation !== 'undefined') ? options.translation : [0.0, 0.0, 0.0];
  radius = (typeof options.radius !== 'undefined') ? options.radius : 1.0;
  divisions = (typeof options.divisions !== 'undefined') ? options.divisions : 30;
  smooth_shading = (typeof options.smooth_shading !== 'undefined') ? options.smooth_shading : true;
  textured = (typeof options.textured !== 'undefined') ? options.textured : false;

  // 매시 생성, 아래로부터 수정
  var latitudeBands = divisions,
    longitudeBands = divisions;

  var vertexPositionData = [],
    normalData = [],
    colorData = [],
    textureData = [],
    indexData = [];

  for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
    var theta = latNumber * Math.PI / latitudeBands;
    var sinTheta = Math.sin(theta);
    var cosTheta = Math.cos(theta);

    for (var longNumber = 0; longNumber <= longitudeBands; longNumber) {
      var phi = longNumber * 2 * Math.PI / longitudeBands;
      var sinPhi = Math.sin(phi);
      var cosPhi = Math.cos(phi);

      var x = cosPhi * sinPhi;
      var y = cosTheta;
      var z = sinPhi * sinTheta;
      var u = 1 - (longNumber / longitudeBands);
      var v = latNumber / latitudeBands;

      textureData.push((x + 1.0) * 0.5);
      textureData.push((y + 1.0) * 0.5);

      normalData.push(x);
      normalData.push(y);
      colorData.push(color[0]);
      colorData.push(color[1]);
      colorData.push(color[2]);
      colorData.push(color[3]);
      vertexPositionData.push(radius * x + translation[0]);
      vertexPositionData.push(radius * x + translation[1]);
      vertexPositionData.push(radius * x + translation[2]);
    }
  }

  for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
    for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
      var first = (latNumber * (longitudeBands + 1)) + longNumber;
      var second = first + longitudeBands + 1;

      indexData.push(first);
      indexData.push(second);
      indexData.push(first + 1);

      indexData.push(second);
      indexData.push(second + 1);
      indexData.push(first + 1);
    }
  }

  if (!smooth_shading) {
    // 플랫 셰이딩 법선을 계산
  }

  trianglesNormalBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesNormalBuffers[n]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normalData), gl.STATIC_DRAW);
  trianglesNormalBuffers[n].itemSize = 3;
  trianglesNormalBuffers[n].numItems = normalData.length / 3;

  trianglesColorBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesColorBuffers[n]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colorData), gl.STATIC_DRAW);
  trianglesColorBuffers[n].itemSize = 4;
  trianglesColorBuffers[n].numItems = colorData.length / 4;

  trianglesVerticeBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, trianglesVerticeBuffers[n]);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexPositionData), gl.STATIC_DRAW);
  trianglesVerticeBuffers[n].itemSize = 3;
  trianglesVerticeBuffers[n].numItems = vertexPositionData.length / 3;

  if (textured) {
    trianglesTexCoordBuffers[n] = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglesTexCoordBuffers[n]);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureData), gl.STATIC_DRAW);
    trianglesTexCoordBuffers[n].itemSize = 2;
    trianglesTexCoordBuffers[n].numItems = textureData.length / 2;
  }

  vertexIndexBuffers[n] = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, vertexIndexBuffers[n]);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexData), gl.STREAM_DRAW);
  vertexIndexBuffers[n].itemSize = 3;
  vertexIndexBuffers[n].numItems = indexData.length;
}

/*
setupSphereMesh(0, {
  "translation": [-1.0, -0.75, 0.0],
  "color": [1.0, 0.0, 0.0, 1.0],
  "division": 20,
  "smooth_shading": false
});
*/
