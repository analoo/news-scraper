$(function () {

    $(document).on("click", "#stories", function () {
        $.ajax("/api/articles", {
            type: "GET"
        }).then(result => {

        })
    })

    $.ajax("/api/articles/all", {
        type: "GET"
    })
        .then(res => {
            let LAS;
            res.forEach(element => {
                if (element.headline.length > 0) {
                    LAS += `<li class="list-group-item">
                        <div class="card">
                            <div class="card-body">
                            <a href="${element.URL}" class="card-link" target="_blank">Link</a>
                              <h5 class="card-title">${element.headline}</h5>
                              <p class="card-text">${element.summary}</p>
                              <div class="card">
                              <div class="card-header"> Comments </div>
                              <div id="comments-${element._id}">`
                    for (let i = 0; i < element.comments.length; i++) {
                        LAS += `<div class="card-body">
                        <p class="card-text">${element.comments[i].comment}<button id="del-comm-${element.comments[i]._id}" data-id=${element.comments[i]._id} class="delete-button">Delete</button></p> 
                    </div>`
                    }


                    LAS += ` </div>
                    <form>
                                    <div class="form-group">
                                    <a href="#" id="add-comm-${element._id}" data-id=${element._id} class="btn btn-primary add-comment">Add Comment</a>
                                    <input data-id=${element._id} id="comm-${element._id}" placeholder="Add a Comments"/>
                                    </div>
                                    </form>
                                </div>
                               
              
                            </div>
                          </div> 
                    </li>`
                }
            })
            $("#headlines").append(LAS)
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
            $(`#comments-${id}`).append(`<div class="card-body">
        <p class="card-text">${comment.comment}<button id="del-comm-${lastEl._id}" data-id=${lastEl._id} class="delete-button">Delete</button></p> 
        </div>`
        )

        }).catch(err => {
            console.log(err)
        })
    })

    // (document).om("click", ".delete")

   


})
