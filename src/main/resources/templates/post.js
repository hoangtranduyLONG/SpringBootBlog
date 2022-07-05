function showModal() {
    $("#exampleModal").modal("show")
}


function addPost() {
    let title = $("#title1")
    let content = $("#content1")
    let post = {
        "title": title.val(),
        "content": content.val(),
        "author": {
            "id": localStorage.getItem("id")
        }
    }
    console.log(post)
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token")),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'POST',
        url: "http://localhost:8080/posts",
        data: JSON.stringify(post),
        success: function () {
            showHome()
        },
        error: function (error) {
            console.log(error)
        }
    })
}

function showMyList() {
    flag = true;
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token")),
        },
        type: 'GET',
        url: "http://localhost:8080/posts?authorId=" + localStorage.getItem("id"),
        success: function (data) {
            getPostList(data, flag)
        }
    })
}

function remove(id) {
    flag = true;
    $.ajax({
        headers: {
            Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("token")),
        },
        type: 'Delete',
        url: "http://localhost:8080/posts?id=" + id,
        success: function () {
            showMyList()
        }
    })
}