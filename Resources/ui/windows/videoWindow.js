var global = require('global');

var win = function(data, nav) {
	
	// var btnDelete = Ti.UI.createButton({
		// systemButton:Ti.UI.iPhone.SystemButton.TRASH
	// });
	
	var self = Ti.UI.createWindow({
		title:data.userName,
		//backgroundColor:'#fff',
		layout:'absolute',
		barColor:null,
		barImage:'assets/images/bg.jpg'
		//rightNavButton:btnDelete
	});
	
	var id = Ti.UI.createLabel({
		text:'ID: ' + data._id,
		left:20,
		top:20
	});
	
	var title = Ti.UI.createLabel({
		text:'Title: ' + data.title,
		left:20,
		top:50
	});
	
	var videoWin = Ti.UI.createWindow({
   		title:'Recorded Video',
   		height:240,
   		width:320,
   		bottom:0
   	});
   	
	var videoPlayer = Ti.Media.createVideoPlayer({
		media:global.host + '/videos/' + data.fileName,
		scalingMode: Ti.Media.VIDEO_SCALING_MODE_FILL,
		mediaControlStyle: Ti.Media.VIDEO_CONTROL_DEFAULT,
		autoplay: true
	});

	videoWin.add(videoPlayer);
	
	videoPlayer.addEventListener('load',function() {
    	videoPlayer.play();
    });
	
	
	// var btnDelete = Titanium.UI.createButtonBar({
	    // labels:['Delete'],
	    // backgroundColor:'#f00',
	    // style:Titanium.UI.iPhone.SystemButtonStyle.BAR,
	    // top: 0
	// });
	
	//self.setToolbar([btnDelete]);
	// var alert = Titanium.UI.createAlertDialog({
	    // title: 'Delete User',
	    // message: 'are you sure you want to delete user "' + data.name  + '"?',
	    // buttonNames: ['Yes', 'No'],
	    // cancel: 1
	// });
// 	
	// alert.addEventListener('click', function(e) {
//  
		// //Clicked cancel, first check is for iphone, second for android
		// if (e.cancel === e.index || e.cancel === true) {
        	// return;
       	// }
//  
        // //now you can use parameter e to switch/case 
       	// switch (e.index) {
          // case 0: //YES
           	// var db = require('database');
          	// db.del('users', data.id, function() {
          		// Ti.App.updateUsers();	
          		// nav.close(self, { animated:'true'});
          	// });          	
          // break; 
          // //This will never be reached, if you specified cancel for index 1
		  // case 1: // no
          // break; 
          // default:
          // break;
//  
      // }
// 	 
	// });
// 	
	// btnDelete.addEventListener('click', function(e) {
		// alert.show();
	// });
	
	self.add(id);
	self.add(title);
	self.add(videoWin);
	
	return self;
}

module.exports = win;
