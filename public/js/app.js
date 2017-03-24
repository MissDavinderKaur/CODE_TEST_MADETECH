$(start);

function start(){

  $('#new-tweet-input').on('keyup', function(){
    $('.tweet-counter').html(150 - $('textarea').val().length);
    if ($('textarea').val().length > 150){
      $('.tweet-counter').css('color', '#cc8787');
    } else {
      $('.tweet-counter').css('color', '#8899a6');
    }
  });

  var $tweetForm = $('#new-tweet-form');
  $tweetForm.on('submit', function(e){
    e.preventDefault();
    var text = $('textarea').val();
    if (text.length > 0 && text.length < 150){
      return $.ajax({
        url: 'http://localhost:3000/blogs',
        method: 'POST',
        data: $(this).serialize()
      })
      .done(resp => {
        var $ol = $('.stream-items');
        var tweetToAdd = '<li class="stream-item"><div class="tweet"><a href="#"><img src="http://pix.iemoji.com/images/emoji/apple/ios-9/256/white-woman.png" alt="User image goes here."></a><div class="content"><strong class="fullname">' + resp.blog.fullName + '</strong><span>&rlm;</span><span>@</span><b>' + resp.blog.screenName + '</b>&nbsp;&middot;&nbsp;<small class="time timeago">' + resp.blog.createdAt + '</small><p>' + resp.blog.blogText +   '<form action="/blogs/<%= blog._id %>" method="post"> <input type="hidden" name="_method" value="delete">         <button class="deleteButton"> Delete </button> </form></p></div></div></li>';
        $ol.prepend(tweetToAdd);


        // Reset the form
        $('#fullName').val('');
        $('#screenName').val('');
        $('textarea').val('');
        $('.tweet-counter').html(140 - $('textarea').val().length);

      })
      .fail(data => {
        console.log('inside the FAIL');
        console.log(data);
      });
    }
  });


}
