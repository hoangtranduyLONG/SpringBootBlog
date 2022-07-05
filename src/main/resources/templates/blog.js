let bdy = document.getElementById("bdy")
let storageKey = "token" // đặt tên key của local storage
let dataString = localStorage.getItem(storageKey) //Lấy item theo kiểu map
let token = "";
localStorage.setItem(storageKey, JSON.stringify(token))
let userId = "";
localStorage.setItem("id", JSON.stringify(userId))
let flag
// if (dataString) {
//     token = JSON.parse(dataString)
// } else {
//     token = ""
// }

function showHome() {
    let str = ""
    str += `
            <!--Navbar-->
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#" onclick="showHome()">Home</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
        
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">`
    if (token === "") {
        str += `<li class="nav-item">
                            <a class="nav-link" onclick="showLoginForm()">Đăng nhập</a>
                        </li>`
    } else {
        str += `<li class="nav-item">
                            <a class="nav-link">ABC</a>
                        </li>
                <li class="nav-item">
                            <a class="nav-link" onclick="showModal()">Add post</a>
                        </li>
                <li class="nav-item">
                            <a class="nav-link" onclick="showMyList()">My post</a>
                        </li>`
    }

    str += `</ul>
                    <div class="form-inline my-2 my-lg-0">
                        <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" id="search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit" onclick="search1()">Search</button>
                    </div>
                </div>
            </nav>
             <!--Table-->
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Number</th>
                  <th scope="col">Title</th>
                  <th scope="col">Author</th>
                  <th scope="col">Create at</th>
                </tr>
              </thead>
              <tbody id="table">
              </tbody>
            </table>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <input type="text" id="title1" placeholder="title" style="width: 100%"><br><br>
                    <textarea type="text" id="content1" placeholder="content" style="width: 100%">
                    </textarea>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" onclick="addPost()">Save changes</button>
                  </div>
                </div>
              </div>
            </div>`
    bdy.innerHTML = str;
    getData()
}

function getData() {
    flag = false
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/home",
        success: function (post) {
            getPostList(post, flag)
        }
    })
}

function getPostList(post, flag) {
    str = "";
    for (let i = 0; i < post.length; i++) {
        str += `<tr>
                    <th scope="row">${i + 1}</th>
                    <td>${post[i].title}</td>
                    <td>${post[i].author.name}</td>
                    <td>${post[i].createAt}</td>`
        if (flag == true) {
            str += `<td><button class="btn-primary">Sửa</button></td>
                    <td><button onclick="remove(${post[i].id})">Xóa</button></td>`
        }
        str += `</tr>`
    }
    $("#table").html(str)
}

function search1() {
    let nameSearch = $("#search")
    flag = false;
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'GET',
        url: "http://localhost:8080/home/search?name=" + nameSearch.val(),
        success: function (data) {
            getPostList(data, flag)
        }
    })
}