var gl = null;
var prg = null;
var c_width = null;
var c_height = null;

var mvMatrix = mat4.create();
var pMatrix = mat4.create();
var nMatrix = mat4.create();
var cMatrix = mat4.create();

var home = [0, -2, -50];
var position = [0, -2, -50];
var rotation = [0, 0, 0];

var coords = -1;

var COORD_WORLD = 1;
var COORD_CAMERA = 2;
var requestUpdate = false;

var updateLightPosition = false;
