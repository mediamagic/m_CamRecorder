var win = Ti.UI.currentWindow;

var global = win.global;
var XHR = require('xhr');
var Resource = require('resource');

var Videos = new Resource('/videos');

win.title = 'Record Video';
win.barColor = null;
win.barImage ='assets/images/bg.jpg';
win.backgroundImage = 'assets/images/bg.jpg';

var media = null;

var uploading = Titanium.UI.createActivityIndicator({
	message:'Uploading Video...',
	width:50,
	height:50,
	color:'#fff'
});

var videoPlayerWin = Ti.UI.createWindow({
	title:'Recorded Video',
	height:210,
	width:280,
	bottom:0
});

var btnRecord = Ti.UI.createButton({
	title:'Record',
	width:150,
	height:40,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	borderRadius:10,
	//font:{fontSize:16,fontFamily:_fontFamily,fontWeight:'bold'},
	backgroundGradient:{
		type:'linear',
		colors:['#000001','#666666'],
		startPoint:{
			x:0,
			y:0
		},
		endPoint:{
			x:2,
			y:50
		},
		backFillStart:false
	},
	borderWidth:1,
	borderColor:'#666',
	backgroundColor:'#222',
	zIndex:2	
});

var btnUpload = Ti.UI.createButton({
	title:'Upload Video',
	width:150,
	height:40,
	top:60,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	borderRadius:10,
	//font:{fontSize:16,fontFamily:_fontFamily,fontWeight:'bold'},
	backgroundGradient:{
		type:'linear',
		colors:['#000001','#666666'],
		startPoint:{
			x:0,
			y:0
		},
		endPoint:{
			x:2,
			y:50
		},
		backFillStart:false
	},
	borderWidth:1,
	borderColor:'#666',
	backgroundColor:'#222',
	zIndex:2,
	enabled:false,
	color:'#343434'
});

var btnCancel = Ti.UI.createButton({
	title:'Cancel',
	width:150,
	height:40,
	top:110,
	style:Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
	borderRadius:10,
	//font:{fontSize:16,fontFamily:_fontFamily,fontWeight:'bold'},
	backgroundGradient:{
		type:'linear',
		colors:['#000001','#666666'],
		startPoint:{
			x:0,
			y:0
		},
		endPoint:{
			x:2,
			y:50
		},
		backFillStart:false
	},
	borderWidth:1,
	borderColor:'#666',
	backgroundColor:'#222',
	zIndex:2	
});

var txtTitle = Ti.UI.createTextField({
	borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	hintText: 'please provide title for the video',
	top:10,
	width:300,
	height:40,
	editable:true
});

win.add(btnRecord);
		
txtTitle.addEventListener('change', function(e) {
	if(txtTitle.value.length > 2) {
		btnUpload.enabled = true;
		btnUpload.color = '#fff';
	} else {
		btnUpload.enabled = false;
		btnUpload.color = '#343434';
	}
});

btnUpload.addEventListener('click', function(e) {
	// making sure the app won't auto-lock while uploading..
	Titanium.App.idleTimerDisabled = true;
	
	win.remove(txtTitle);
	win.remove(btnUpload);
	win.remove(btnCancel);
	win.remove(videoPlayerWin);
		
	uploading.title = 'Upload Video';
	uploading.show();
	win.add(uploading);
			
	Videos.upload({file:media, fileName:(new Date()).getTime().toString() + '.mov', userName:global.userName, uuId:global.uuId, title:txtTitle.value }, 'video/quicktime', function(progress) {
		uploading.message = 'Uploading Video... (' + progress + '%)';		
	}, function(err, res) {
		uploading.hide();
		win.remove(uploading);
		txtTitle.value = '';
				
		media = null;
		
		win.add(btnRecord);	
		
		Titanium.App.idleTimerDisabled = false;
	});
});

btnCancel.addEventListener('click', function(e) {
	txtTitle.value = '';
	win.remove(txtTitle);
	win.remove(btnUpload);
	win.remove(btnCancel);
	win.remove(videoPlayerWin);
	
	media = null;
		
	win.add(btnRecord);	
});
	
btnRecord.addEventListener('click', function(e) {
	Ti.Media.showCamera({
		success: function(e) {
			media = e.media;
			win.remove(btnRecord);
			win.add(txtTitle);
			win.add(btnUpload);
			win.add(btnCancel);
			
			
			// win.add(uploading);
			// uploading.show();
// 				
			// Videos.upload({file:e.media, fileName:(new Date()).getTime().toString() + '.mov', userName:global.userName, uuId:global.uuId}, 'video/quicktime', function(err, res) {
				// uploading.hide();
				// win.remove(uploading);
				// win.add(btnRecord);	
			// });			
			
			
			// var dlg = Titanium.UI.createActivityIndicator({
				// message:'Loading...',
				// width:50,
				// height:50,
				// color:'#fff'
			// });
// 			
           	// win.add(dlg);
           	// win.remove(record);
           	// dlg.show();
//            	
           	           	
			var videoPlayer = Ti.Media.createVideoPlayer({
				media:e.media,
				scalingMode: Titanium.Media.VIDEO_SCALING_MODE_FILL,
    			movieControlStyle: Titanium.Media.VIDEO_CONTROL_DEFAULT,
    			autoplay: false
    		});
// 			
           	// videoPlayer.addEventListener('load',function()
		    // {
		           // dlg.hide();
		    // });
//            
			videoPlayerWin.add(videoPlayer);
			win.add(videoPlayerWin);
// 			
			// videoPlayer.play();
		},
		error: function(e) {
			alert('can\'t find a camera');
		},
		cancel: function(e) {
			
		},
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO],
		videoQuality:Ti.Media.QUALITY_HIGH
	});
});