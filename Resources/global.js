function getHost() {
	return 'http://node.mediamagic.co.il:8080';
}

module.exports = {
	host:getHost(),
	userName:Ti.Platform.getUsername(),
	uuId:Ti.Platform.getId(),
	csrf:''
}