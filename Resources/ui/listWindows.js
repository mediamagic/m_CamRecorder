var list = function(data, title, nav, requireWindow) {
	
	var tableView = Ti.UI.createTableView({
		objName:'table',
		backgroundImage:'assets/images/bg.jpg'
		
	});
	
	var tableData = [];

	for(var i = 0; i < data.length; i++) {
		var row = Ti.UI.createTableViewRow({
			objName:'listRow',
			rowIndex: i,
			data:data[i],
			title:data[i].name			
		});
		tableData.push(row);
	}
	
	tableView.setData(tableData);
	
	tableView.addEventListener('click', function(e) {
		if(e.source.objName == 'listRow') {			
			var row = e.source;
			var Win = require(requireWindow);
			var win = new Win(row.data, nav);
			nav.open(win, { animated:'true'});
		}
	});
	
	var self = Ti.UI.createWindow({
		title:title,
		layout:'absolute',
		table:tableView,
		barColor:null,
		barImage:'assets/images/bg.jpg',
		backgroundImage:'assets/images/bg.jpg'
	});	
	
	self.add(tableView);
	return self;
};

module.exports = list;
