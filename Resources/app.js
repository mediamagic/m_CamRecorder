Titanium.UI.setBackgroundColor('#000');
Titanium.UI.setBackgroundImage('assets/images/bg.jpg')
Titanium.UI.iPhone.statusBarStyle = Titanium.UI.iPhone.StatusBar.TRANSLUCENT_BLACK;

var global = require('global');
var XHR = require('xhr');
var Resource = require('resource');

var handshake = new Resource('/handshake');

// create tab group
var tabGroup = Titanium.UI.createTabGroup();


//
// create base UI tab and root window
//
var winVideos = Titanium.UI.createWindow({  
    url:'videos.js',
    navBarHidden:true
    // title:'Videos',
    // barColor:null,
    // barImage:'assets/images/bg.jpg',
    // backgroundImage:'assets/images/bg.jpg'
    //backgroundColor:'#fff'
});

var tabVideos = Titanium.UI.createTab({  
    icon:'assets/images/videos.png',
    title:'Videos',
    window:winVideos
});

//
// create controls tab and root window
//
var winCamera = Titanium.UI.createWindow({ 
	url:'camera.js'	
});
var tabCamera = Titanium.UI.createTab({  
    icon:'assets/images/camera.png',
    title:'Record Video',
    window:winCamera
});

tabCamera.addEventListener('focus', function(e) {
	console.log('camera');
});

// var label2 = Titanium.UI.createLabel({
	// color:'#999',
	// text:'I am Window 2',
	// font:{fontSize:20,fontFamily:'Helvetica Neue'},
	// textAlign:'center',
	// width:'auto'
// });
// 
// winCamera.add(label2);



//
//  add tabs
//
tabGroup.addTab(tabVideos);  
tabGroup.addTab(tabCamera);  


// open tab group
handshake.get({}, function(err, res) {
	if(!err) { 
		global.csrf = res.csrf;
		winVideos.global = global;
		winCamera.global = global;
		tabGroup.open();	
	}
});
