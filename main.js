// document ready
$(function (){

  var URL = 'http://jsonplaceholder.typicode.com';
  var content = $('#content');
  var list = $('<ol></ol>');


  // Get all posts
  function getAllPosts () {
    list.html(null);
    $.get(URL + '/posts', function (data){
     data.forEach(function (post) {
      list.append('<li>' + post.body + '</li>');
      });
    });

    content.html(list);
  }

  // Get post with id of 10
  function getPostWithIdOf10 () {
    list.html(null);
    $.get(URL + '/posts?id=10', function (data){
     data.forEach(function (post) {
      list.append('<li>' + post.body + '</li>');
      });
    });

    content.html(list);
  }

  // Get the comments from post with id of 12 
  function getCommentstWithIdOf12 () {
    list.html(null);
    $.get(URL + '/comments?postId=1', function (data){
     data.forEach(function (post) {
      list.append('<li>' + post.body + '</li>');
      });
    });

    content.html(list);
  }

    // Create a new post and log the id generated for it by the server
    function createPost () {
    list.html(null);
    $.post( URL + '/posts', {       
      title: 'Kobe is the best player',
      body: 'and this is why...'}, 
      function(response){
        var li = $('<li> Post Title: ' + response.title + '<br>Post Body: ' + response.body + '<br>Post ID: ' + response.id + '</li>')
        list.append(li);
      });
    content.html(list);
  }

  // Replace the post with id of 12 and render the responseJSON
  function replacePost () {
    list.html(null);
    $.ajax({
    method: 'PUT',
    url:  URL + '/posts/12',
    data: {completed: true, title: "Updated Post", userId: 24, body: 'New post body'},
    complete: function(response){
      var li = $('<li> Post Title ' + response.responseJSON.title + '<br>Post Body: ' + response.responseJSON.body + '<br>Post Completed: ' + response.responseJSON.completed + 
                '<br>Post ID: ' + response.responseJSON.id + '</li>')
      list.append(li);
      }
    });
    content.html(list);
  }

  // Update the title of post with id of 12 and render responseJSON
  function updatePost () {
    list.html(null);
    $.ajax({
    method: 'PUT',
    url:  URL + '/posts/12',
    data: {title: "Updated Post Title"},
    complete: function(response){
      var li = $('<li> Post Title: ' + response.responseJSON.title + '</li>')
      list.append(li);
      }
    });
    content.html(list);
  }


  // Delete the post with id of 12 and render a success message
  function deletePost () {
    list.html(null);
    $.ajax({
    method: 'DELETE',
    url:  URL + '/posts/12',
    success: function(response){
      content.html('The post was successfuly deleted.');
      }
    });
  }

   /*
    Display a list of posts.
    When the user clicks on a post, display all the comments from that post
    Display a link back to all posts
   */
  function getComments(postId){
   $.get(URL + '/comments?postId=' + postId, function (comments) {
    var commentList = $('<ol id="commentList"></ol>');
    var backToPosts = $('<button class="button-primary" id="backToPosts">Back To Posts</button>');
    var title = '<h3>displaying comments for post id: '+ postId +  '</h3>' ;

    backToPosts.on('click', displayPostComments);

    comments.forEach(function (comment){
      console.log(comment);
      var li = $('<li></li>');
      li.append(comment.body);
      commentList.append(li);
    });
    
    commentList.prepend(title);
    commentList.prepend(backToPosts);
    content.html(commentList);
  });
  }


  function displayPostComments () {
    list.html(null);
  

    $.ajax({
      url: URL + '/posts',
      method: 'GET'
    }).then(function (posts){
      posts.forEach(function (post){
        var li = $('<li></li>');
        var showComments = $('<br> <a id="showComments">Show Comments</a>');
        

        showComments.on('click', function (){
          getComments(post.id);
        }); 

        li.append(post.body);
        li.append(showComments)
        list.append(li);

      });

    });
    content.html(list);
  }



$('#allPostsBtn').on('click', getAllPosts);
$('#postTenBtn').on('click', getPostWithIdOf10);
$('#commentPostTwelveBtn').on('click', getCommentstWithIdOf12);
$('#createPostBtn').on('click', createPost);
$('#replacePostBtn').on('click', replacePost);
$('#updatePostBtn').on('click', updatePost);
$('#deletePostBtn').on('click', deletePost);
$('#displayPostCommentsBtn').on('click', displayPostComments);
});


