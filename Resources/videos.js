var win = Ti.UI.currentWindow;

var global = win.global;
var XHR = require('xhr');
var Resource = require('resource');

var Videos = new Resource('/videos');

// win.title = 'Videos';
win.barColor = null;
win.barImage ='assets/images/bg.jpg';
win.backgroundImage = 'assets/images/bg.jpg';
win.navBarHidden = true;

var loading = Titanium.UI.createActivityIndicator({
	message:'Loading Videos...',
	width:50,
	height:50,
	color:'#fff'
});

win.add(loading);
loading.show();

var Table = require('ui/listWindows');
var nav = Ti.UI.iPhone.createNavigationGroup({
	backgroundImage:'assets/images/bg.jpg'
});
var videoWin = new Table([], 'Videos', nav, 'ui/windows/videoWindow');
nav.window = videoWin;
win.add(nav);

function loadVideos() {
	Videos.get({}, function(err, res) {
		var tableData = [];

		for(var i = 0; i < res.length; i++) {
			
			var username = Ti.UI.createLabel({
				text: res[i].userName,
				font:{fontSize:12, fontWeight:'bold'},
				color:'#343434',
				left:50,
				top:5,
				touchEnabled: false
			});
			
			var title = Ti.UI.createLabel({
				text: res[i].title,
				font:{fontSize:12},
				color:'#343434',
				left:50,
				top:25,
				touchEnabled: false
			});
			
			var row = Ti.UI.createTableViewRow({
				objName:'listRow',
				rowIndex: i,
				data:res[i],
				height:50,
				//title:res[i].name,
				//backgroundColor:'transparent',
				backgroundColor:'#ccc',
				hasChild:true
			});
			
			row.add(username);
			row.add(title);
			//row.add(imageView);
			tableData.push(row);
			
		}
		
		videoWin.table.setData(tableData);
		//tabGroup.activeTab = tab1;
		videoWin.table.scrollToIndex(0, {animated:true});
		
		loading.hide();
		win.remove(loading);		
	});
}

loadVideos();
