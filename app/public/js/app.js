const $ = window.$;

function start(){

  //Run the blogsIndex function to populate the page
  blogsIndex();

  //Add the event listener to the Delete buttons
  $('body').on('click', '.deleteButton', deleteBlog);

  //The blogsIndex function fetches the blogs from the back-end and adds them to the page.
  function blogsIndex(e){
    if (e) e.preventDefault();

    $('ol').remove();
    $('.stream').append('<ol class="stream-items"></ol>');
    $.get('http://localhost:3000/blogs')
    .done(data => {
      $.each(data, (index, blog) => {
        var blogToAdd = '<li class="stream-item"><div class="blog"><img src="http://pix.iemoji.com/images/emoji/apple/ios-9/256/white-woman.png" alt="User image goes here."><div class="content"><strong class="fullname">' + blog.fullName + '</strong><span>&rlm;</span><span>@</span><b>' + blog.screenName + '</b>&nbsp;&middot;&nbsp;<small class="time timeago">' + $.timeago(blog.createdAt) + '</small><p>' + blog.blogText + '<button class="deleteButton" name="' + index + '" data-id="' + blog._id + '"> Delete </button></p></div></div></li>';
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

    return $.ajax({
      url: 'http://localhost:3000/blogs',
      method: 'POST',
      data: $(this).serialize()
    })
    .fail((resp) => {
      if (text.length === 0) {
        $('#status-blogs-bar')
        .html('Blog is too short!')
        .show()
        .delay(2000)
        .slideUp(2000);
      } else {
        $('#status-blogs-bar')
        .html('Blog is too long!')
        .show()
        .delay(2000)
        .slideUp(2000);
      }
    })
    .done((resp) => {
      $('#status-blogs-bar')
      .html('One new blog')
      .show()
      .delay(2000)
      .slideUp(2000);
      blogsIndex();

      // Reset the form
      $('#fullName').val('');
      $('#screenName').val('');
      $('textarea').val('');
      $('.blog-counter').html(140 - $('textarea').val().length);
    });
  });

  function deleteBlog(e) {
    e.preventDefault();
    $.ajax({
      url: `http://localhost:3000/blogs/${$(this).data('id')}`,
      type: 'delete'
    }).done(() => {
      blogsIndex();
      $('#status-blogs-bar')
      .html('Blog successfully deleted')
      .show()
      .delay(2000)
      .slideUp(2000);
    });
  }
}


$(start);
