$(function () {

    $.ajax(`api/nyt`, {
        type: "GET"
    }).then(result => {
        console.log(result)
        $.ajax("/api/article", {
            type: "POST",
            data: result
        }).then(res =>
            console.log(res))
    })

    $.ajax("/api/articles", {
        type: "GET"
    })
    .then( res => {
        console.log(res)
        res.map(element => {
            $("#headlines").append(`<li class="list-group-item">
            <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${element.headline}</h5>
                  <p class="card-text">${element.summary}</p>
                  <a href="${element.url}" class="card-link">Link</a>
                  <a href="#" id="add-comm-${element._id}" class="card-link">Add Comment</a>
                </div>
              </div> 
        </li>`)
        })
        
    })
        
    



})