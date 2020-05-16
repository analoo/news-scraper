$(function () {

    $(document).on("click", "#stories", function () {
        $.ajax("/api/articles", {
            type: "GET"
        }).then(result => {
            location.reload()

        }).catch(err => {
            console.log(err)
        })
    })

    $.ajax("/api/articles/all", {
        type: "GET"
    })
        .then(res => {
            if(res){
            let LAS="";
            res.forEach(element => {
                if (element.headline.length > 0) {
                    LAS += `<li class="list-group-item bg-secondary">
                        <div class="card">
                            <div class="card-body">
                            <a href="${element.URL}" class="card-link" target="_blank">Link</a>
                              <h5 class="card-title">${element.headline}</h5>
                              <p class="card-text">${element.summary}</p>
                              <div class="card">
                              <div class="card-header"> Comments </div>
                              <div id="comments-${element._id}">`


                    for (let i = 0; i < element.comments.length; i++) {
                        LAS += `<div class="card-body" id="cardbody-${element.comments[i]._id}">
                        <div class="row">
                        <div class="col-md-10 col-sm-12">
                        <p class="card-text" id="comment-${element.comments[i]._id}">${element.comments[i].comment}</p> 
    </div>
    <div class="col-md-2">
    <button id="del-comm-${element.comments[i]._id}" data-id=${element.comments[i]._id} data-art-id=${element._id} class="delete-button">Delete</button>
    </div>
    </div>
                    </div>`
                    }


                    LAS += ` </div>
                    </div>
                    <br>
                    <form>
                                    <div class="form-group col-md-10 col-sm-12 mx-auto">
                                    <a href="#" id="add-comm-${element._id}" data-id=${element._id} class="btn btn-primary add-comment">Add Comment</a>
                                    <input class="col-md-8 col-sm-12"data-id=${element._id} id="comm-${element._id}" placeholder="Add a Comments"/>
                                    </div>
                                    </form>
                                </div>
                               
              
                            
                          </div> 
                    </li>`
                }
            })
            $("#headlines").append(LAS)}
        });

    $(document).on("click", ".add-comment", function (event) {
        event.preventDefault();
        let id = $(this).data("id")
        let comment = {
            comment: $(`#comm-${id}`).val()
        }

        
        $.ajax(`/api/articles/${id}`, {
            type: "PUT",
            data: comment
        }).then(res => {
            let array = res.comments
            let lastEl = array[array.length-1]
            $(`#comm-${id}`).val("");
            $(`#comments-${id}`).append(` 
            <div class="card-body" id="cardbody-${lastEl._id}">
            <div class="row">
            <div class="col-md-10 col-sm-12">
        <p class="card-text" id="comment-${lastEl._id}">${comment.comment}</p> 
        </div>
        <div class="col-md-2">
        <button id="del-comm-${lastEl._id}" data-id=${lastEl._id} data-art-id=${id} class="delete-button">Delete</button>
        </div>
        </div>`
        )

        }).catch(err => {
            console.log(err)
        })
    })

    $(document).on("click", ".delete-button", function(event) {
        event.preventDefault();
        let id = $(this).data("id");
        let artID = $(this).data("art-id");
        console.log(artID)
        let text = $(`#comment-${id}`).text();
        let comment = {
                _id : id,
                comment: text
            }


        $.ajax(`/api/articles/${artID}/remove`, {
            type: "PUT",
            data: comment,
        })
        .then( res => {
            $(`#cardbody-${id}`).remove();
        })
        .catch( res => {
            console.log(res)
        })
    })

   


})
