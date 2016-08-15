function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

$(function() {
	$("form").on("submit", function(e) {
		e.preventDefault();
		// prepare the request
		var request = gapi.client.youtube.search.list({
			forUsername: "drug",
			part:"snippet",
			type:"video",
			q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
			maxResults: 10,
			order: "viewCount",
			publishedAfter: "2015-01-01T00:00:00Z"
		});
		// execute the request
		request.execute(function(response){
			var results =response.result;
			$.each(results.items, function(index, item){
			$.get("tpl/item.html", function(data){
				$("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
			});
		});
		resetVideoHeight();
	});
 	});
	
	$(window).on("resize", resetVideoHeight);

});

function resetVideoHeight (){
	$(".video").css("height", $("#results").width() * 9/16);
}
	
	function init() {
	gapi.client.setApiKey("AIzaSyAK7ygwXhYxWg1qJs6HyjHtztaWoqnJ8ow");
	gapi.client.load("youtube", "v3", function() {
	// yt api is ready
	});
}