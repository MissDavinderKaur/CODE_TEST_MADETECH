$(start);

function start(){

  blogsIndex();

  $('body').on('click', '.deleteButton', deleteBlog);

  function blogsIndex(e){
    if (e) e.preventDefault();

    $.get('http://localhost:3000/blogs')
    .done(data => {
      $.each(data, (index, blog) => {
        var blogToAdd = '<li class="stream-item"><div class="blog"><img src="http://pix.iemoji.com/images/emoji/apple/ios-9/256/white-woman.png" alt="User image goes here."><div class="content"><strong class="fullname">' + blog.fullName + '</strong><span>&rlm;</span><span>@</span><b>' + blog.screenName + '</b>&nbsp;&middot;&nbsp;<small class="time timeago">' + $.timeago(blog.createdAt) + '</small><p>' + blog.blogText + '<button class="deleteButton" data-id="' + blog._id + '"> Delete </button></p></div></div></li>';
        $('.stream-items').prepend(blogToAdd);
      });
    });
  }

  $('#new-blog-input').on('keyup', function(){
    $('.blog-counter').html(150 - $('textarea').val().length);
    if ($('textarea').val().length > 150){
      $('.blog-counter').css('color', '#cc8787');
    } else {
      $('.blog-counter').css('color', '#8899a6');
    }
  });

  $('#new-blog-form').on('submit', function(e){
    e.preventDefault();
    var text = $('textarea').val();
    if (text.length > 0 && text.length < 150){
      return $.ajax({
        url: 'http://localhost:3000/blogs',
        method: 'POST',
        data: $(this).serialize()
      })
      .done(resp => {
        $('#status-blogs-bar').html('One new blog').show().delay(2000).slideUp(2000);
        var blogToAdd = '<li class="stream-item"><div class="blog"><img src="http://pix.iemoji.com/images/emoji/apple/ios-9/256/white-woman.png" alt="User image goes here."><div class="content"><strong class="fullname">' + resp.blog.fullName + '</strong><span>&rlm;</span><span>@</span><b>' + resp.blog.screenName + '</b>&nbsp;&middot;&nbsp;<small class="time timeago">' + $.timeago(resp.blog.createdAt) + '</small><p>' + resp.blog.blogText + '<button class="deleteButton" data-id="' + resp.blog._id + '"> Delete </button></p></div></div></li>';
        $('.stream-items').prepend(blogToAdd);

        // Reset the form
        $('#fullName').val('');
        $('#screenName').val('');
        $('textarea').val('');
        $('.blog-counter').html(140 - $('textarea').val().length);
      });
    } else {
      if (text.length === 0) {
        $('#status-blogs-bar').html('Blog is too short!').show().delay(2000).slideUp(2000);
      } else {
        $('#status-blogs-bar').html('Blog is too long').show().delay(2000).slideUp(2000);
      }
    }
  });

  function deleteBlog(e){
    e.preventDefault();
    $.ajax({
      url: `http://localhost:3000/blogs/${$(this).data('id')}`,
      type: 'delete'
    }).done(() => {
      blogsIndex();
      $('#status-blogs-bar').html('Blog successfully deleted').show().delay(2000).slideUp(2000);
    });
  }

}
