// var callback = arguments[arguments.length - 1];
var callback = console.log;
window._loadCount = window._loadCount || 0;
window._currentPage = window._currentPage || 0;

var commentsContainner = document.createElement('DIV');
commentsContainner.setAttribute("id", "commentsContainner");
commentsContainner.setAttribute("style", "display:none;");
document.getElementsByTagName('body')[0].appendChild(commentsContainner);

function shouldLoadMore(loadIntervalId) {
	console.log("loadCount is "+ _loadCount);
  if(_loadCount < 10) {
		var statusNode = $("#mainReplies>.list>.tips")[0];
	  if(statusNode != null) {
	    var statusNodeText = statusNode.textContent;
	    if(statusNodeText.indexOf("欢迎你发表观点") > 0){
	      // callback(true);
	      clearInterval(loadIntervalId);
	      console.log("over no comment");
	    } else if (statusNodeText.indexOf("读取中") > 0) {
	    	_loadCount ++;
	    }
	  } else {
			console.log("currentPage is "+_currentPage);
			var theNodeToClick = getTheNodeToClick();
			if (_currentPage != getCurrentPaeg()) {
				commentsOpreator();
				// callback(false);
				console.log("Have moved "+$("#commentsContainner div.reply.essence").length+" comments.");
			}
			LoadOpeerator(theNodeToClick);
	  }
	} else {
		// callback(true);
		clearInterval(loadIntervalId);
		console.log("over time out");
	}



}


function LoadOpeerator(item){
	if(checkByEle(item)){
		item.click();
	}else{
		_loadCount ++;
	}
}

function commentsOpreator() {
	var commentNode = $("#mainReplies div[class='list'] div.reply.essence");
	for(var i = 0; i < commentNode.length; i++) {
		commentsContainner.appendChild(commentNode[i]);
	}
	_currentPage = getCurrentPaeg();
	_loadCount = 0;
}

function getTheNodeToClick() {
  var nextPageNodes = $("#mainReplies .pages a.beginEnd");

  for(var i=0;i<nextPageNodes.length; i++) {
      var nextNode = nextPageNodes[i];
      if(nextNode.innerText == "下一页"){
          return nextNode;
      }
  }
  return null;
}

function checkByEle(element) {
	if (element) {
		if (element.tagName == "IFRAME") {
			return true;
		} else if(element.innerHTML.length > 0) {
			return true;
		}
	};
	return false;
}

function getCurrentPaeg(){
   return $("#mainReplies>ul>li .current")[0].textContent;
}

var loadIntervalId = setInterval(function(){
	shouldLoadMore(loadIntervalId);
	console.log("begin again");
},500)
