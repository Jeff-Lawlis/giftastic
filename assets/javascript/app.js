$(document).ready(function(){
var topics = ["futurama", "rick and morty", "breaking Bad", "parks and recreation", "the office"]

function fillButtons(){
    $("#btn-container").empty()
    for(var i = 0; i < topics.length; i++){
        var listTopic = `
        <li class="topic">
            <button id="topic-button${i}" class="topic-button">
                ${topics[i]}
            </button>
        </li>
        `
        $("#btn-container").append(listTopic)
    }
    $(".topic-button").on("click", function(e){
        var search = e.currentTarget.innerText
        var queryUrl = "http://api.giphy.com/v1/gifs/search?q="+search+"&api_key=DIKMMPF0nlG7ah1L2ZYuYUhBkMAlPivu"
        
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response){
            var results = response.data
            console.log(results);
            
            for(var i = 0; i < results.length; i++){
                var gifDiv = $(`<div class="gif-div"></div>`)
                var rating = results[i].rating

                var p = $(`<p>`).text("Rating: " + rating)

                var image = $("<img>")
                image.attr("src", results[i].images.fixed_height.url)

                gifDiv.append(p, image)
                $(".gif-container").append(gifDiv)
            }
        })
    })
}
function addTopic(item){
    var newItem = item
    topics.push(newItem)
}
$("#sbmt").on("click", function(event){
    event.preventDefault()
    console.log(event);
    addTopic($("#user-input").val())
    fillButtons()
})

fillButtons()

})