
$(document).ready(function() {
    
    $("#searchButton").click(function() {
        show($("#query").val());
        $(".item").empty();
        event.preventDefault();
    })
    $("#randomButton").click(function() {
        window.open("http://en.wikipedia.org/wiki/Special:Random", "_blank");
    })
});




function show(str) {
    
    var web = 'https://en.wikipedia.org/wiki/';
    $.ajax( {
    url: "https://en.wikipedia.org/w/api.php?",
    jsonp: "callback", 
    dataType: 'jsonp', 
    data: { 
        action: "query", 
        list: "search", 
        srsearch: str, 
        format: "json",
        srlimit: 25
    },
    xhrFields: { withCredentials: true },
    success: function(data) {
        console.log(data.query.search.length);
        console.log(Object.keys(data.query.search[1]));
        console.log(data.query.search[3].title);
        console.log(data.query.search[0].snippet);
        console.log(data.query.search[0].size);
        console.log(data.query.search[0].wordcount);
        console.log(data.query.search[0].timestamp);
        console.log(web +  encodeURIComponent(data.query.search[3].title));
        
        var i = 0;
        while (i < data.query.search.length) {
            $('<div>', {
                'class': 'item',
                html: '<a href = ' + web + encodeURIComponent(data.query.search[i].title) + ' target = "_blank"><h2>' + data.query.search[i].title + '</h2><p>' + data.query.search[i].snippet + '</p><br><h5>Word Count: ' + data.query.search[i].wordcount + '</h5><h5>Timestamp: ' + data.query.search[i].timestamp.substr(0,10) + '</h5></a>'
                }).appendTo('#contain2');
            
            i++;
        }
        
        
        
        
       
        
        
        var mediaItemContainer = $( '#contain2' );
        mediaItemContainer.masonry( {
            itemSelector: '.item',
            columnWidth: '.grid-sizer',
            percentPosition: true
        });
        
        $( mediaItemContainer ).masonry( 'reloadItems' );
        $( mediaItemContainer ).masonry( 'layout' );
        
    }
    });
}