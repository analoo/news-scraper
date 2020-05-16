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
            res.forEach(element => {
                if (element.headline.length > 0) {
                    return (
                        $("#headlines").append(`<li class="list-group-item">
            <div class="card">
                <div class="card-body">
                <a href="${element.URL}" class="card-link" target="_blank">Link</a>
                  <h5 class="card-title">${element.headline}</h5>
                  <p class="card-text">${element.summary}</p>
                  <div class="card">
                    <div class="card-header" id="comments"> Comments </div>
                        <div class="card-body">
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.<button id="del-comm-${element._id}" data-id=${element._id} class="delete-button">Delete</button></p> 
                        </div>
                        <form>
                        <div class="form-group">
                        <a href="#" id="add-comm-${element._id}" data-id=${element._id} class="card-link add-comment">Add Comment</a>
                        <input data-id=${element._id} id="comm-${element._id}" placeholder="Add a Comments"/>
                        </div>
                        </form>
                    </div>
                   
  
                </div>
              </div> 
        </li>`)
                    )
                }
            })
        })

    $(document).on("click", ".add-comment", function (event) {
        event.preventDefault();
        let id = $(this).data("id")
        let comment = {
            comment: $(`#comm-${id}`).val()}

        $.ajax(`/api/articles/${id}`, {
            type: "PUT",
            data: comment
        }).then(res => {
            $(`#comm-${id}`).val("");
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    })

})
