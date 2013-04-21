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

var Table = require('ui/listWindows');
// var nav = Ti.UI.iPhone.createNavigationGroup({
	// backgroundImage:'assets/images/bg.jpg'
// });

var videoWin = new Table([], 'Videos', global.nav, 'ui/windows/videoWindow');
global.nav.window = videoWin;
win.add(global.nav);

function loadVideos() {
	Videos.get({}, function(err, res) {
		var tableData = [];
				
		if(res) {
			if(res.length > 0) {
				for(var i = 0; i < res.length; i++) {
					
					var imageView = Ti.UI.createImageView({
						image: global.host + '/videos/' + res[i].fileName + '.jpg',
						top:2,
						left:5,
						width:60,
						heigth:45,
						preventDefaultImage:true,
						touchEnabled: false	
					});
					
					var username = Ti.UI.createLabel({
						text: res[i].userName,
						font:{fontSize:12, fontWeight:'bold'},
						color:'#576c89',
						left:70,
						top:5,
						touchEnabled: false
					});
					
					var title = Ti.UI.createLabel({
						text: res[i].title,
						font:{fontSize:12},
						color:'#343434',
						left:70,
						top:25,
						touchEnabled: false
					});
					
					var d = new Date(parseInt(res[i]._id.toString().slice(0,8), 16)*1000);
					var date = Ti.UI.createLabel({
						text: d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getYear() + ' ' + d.getHours() + ':' + d.getMinutes(),
						font:{fontSize:9},
						color:'#343434',
						left:250,
						top:5,
						touchEnabled: false
					})
					
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
					
					row.add(imageView);
					row.add(username);
					row.add(title);
					row.add(date);
					
					tableData.push(row);
					
				}
			}
		} else {
			setTimeout(function() {
				loadVideos();	
			}, 1000);
			
			return;
		}
		
		videoWin.table.setData(tableData);
		//tabGroup.activeTab = tab1;
		videoWin.table.scrollToIndex(0, {animated:true});		
		loading.hide();
		win.remove(loading);		
		global.nav.show();
	});
}

win.addEventListener('focus', function(e) {
	global.nav.hide();
	win.add(loading);
	loading.show();
	loadVideos();
});


function formatDate()
{
	var date = new Date();
	var datestr = (date.getMonth() +1)+'/'+date.getDate()+'/'+date.getFullYear();
	if (date.getHours()>=12)
	{
		datestr+=' '+(date.getHours()==12 ? date.getHours() : date.getHours()-12)+':'+date.getMinutes()+' PM';
	}
	else
	{
		datestr+=' '+date.getHours()+':'+date.getMinutes()+' AM';
	}
	return datestr;
}

var border = Ti.UI.createView({
	backgroundColor:"#576c89",
	height:2,
	bottom:0
});

var tableHeader = Ti.UI.createView({
	backgroundColor:"#e2e7ed",
	width:320,
	height:60
});

// fake it til ya make it..  create a 2 pixel
// bottom border
tableHeader.add(border);

var arrow = Ti.UI.createView({
	backgroundImage:"assets/images/whiteArrow.png",
	width:23,
	height:60,
	bottom:10,
	left:20
});

var statusLabel = Ti.UI.createLabel({
	text:"Pull to reload",
	left:55,
	width:200,
	bottom:30,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:13,fontWeight:"bold"},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});

var lastUpdatedLabel = Ti.UI.createLabel({
	text:"Last Updated: "+formatDate(),
	left:55,
	width:200,
	bottom:15,
	height:"auto",
	color:"#576c89",
	textAlign:"center",
	font:{fontSize:12},
	shadowColor:"#999",
	shadowOffset:{x:0,y:1}
});

var actInd = Titanium.UI.createActivityIndicator({
	left:20,
	bottom:13,
	width:30,
	height:30
});

tableHeader.add(arrow);
tableHeader.add(statusLabel);
tableHeader.add(lastUpdatedLabel);
tableHeader.add(actInd);

videoWin.table.headerPullView = tableHeader;


var pulling = false;
var reloading = false;

function beginReloading()
{
	// just mock out the reload
	setTimeout(endReloading,2000);
}

function endReloading()
{
	global.nav.hide();
	win.add(loading);
	loading.show();
	loadVideos();

	// when you're done, just reset
	videoWin.table.setContentInsets({top:0},{animated:true});
	reloading = false;
	lastUpdatedLabel.text = "Last Updated: "+formatDate();
	statusLabel.text = "Pull down to refresh...";
	actInd.hide();
	arrow.show();
}

videoWin.table.addEventListener('scroll',function(e)
{
	var offset = e.contentOffset.y;
	if (offset < -65.0 && !pulling && !reloading)
	{
		var t = Ti.UI.create2DMatrix();
		t = t.rotate(-180);
		pulling = true;
		arrow.animate({transform:t,duration:180});
		statusLabel.text = "Release to refresh...";
	}
	else if((offset > -65.0 && offset < 0 ) && pulling && !reloading)
	{
		pulling = false;
		var t = Ti.UI.create2DMatrix();
		arrow.animate({transform:t,duration:180});
		statusLabel.text = "Pull down to refresh...";
	}    
});

videoWin.table.addEventListener('dragEnd', function()
{	
	if(pulling && !reloading)
	{
		reloading = true;
		pulling = false;
		arrow.hide();
		actInd.show();
		statusLabel.text = "Reloading...";
		videoWin.table.setContentInsets({top:60},{animated:true});
		videoWin.table.scrollToTop(-60,true);
		arrow.transform=Ti.UI.create2DMatrix();
		beginReloading();
	}
});