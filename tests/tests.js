module.exports = {
  // 'Demo test Google' : function (client) {
  //   client
  //     .url('http://www.google.com')
  //     .waitForElementVisible('body', 1000)
  //     .assert.title('Google')
  //     .assert.visible('input[type=text]')
  //     .setValue('input[type=text]', 'rembrandt van rijn')
  //     .waitForElementVisible('button[name=btnG]', 1000)
  //     .click('button[name=btnG]')
  //     .pause(1000)
  //     .assert.containsText('ol#rso li:first-child',
  //       'Rembrandt - Wikipedia')
  //     .end()
  // }
  'Successfully submitted a blog' : function (client) {
    client
    .url('http://localhost:3000/')
    .waitForElementVisible('body', 1000)
    .assert.visible('#fullName')
    .setValue('#fullName', 'DavinderKaur')
    .assert.visible('#screenName')
    .setValue('#screenName', 'DK')
    .assert.visible('#new-blog-input')
    .setValue('#new-blog-input', 'Blog of perfect length')
    .waitForElementVisible('#postBlog', 1000)
    .click('#postBlog')
    .pause(1000)
    .assert.visible('#status-blogs-bar')
    .assert.containsText('#status-blogs-bar', 'One new blog')
    .end();
  },
  'Blog is too short' : function (client) {
    client
    .url('http://localhost:3000/')
    .waitForElementVisible('body', 1000)
    .assert.visible('#fullName')
    .setValue('#fullName', 'DavinderKaur')
    .assert.visible('#screenName')
    .setValue('#screenName', 'DK')
    .assert.visible('#new-blog-input')
    .setValue('#new-blog-input', '')
    .waitForElementVisible('#postBlog', 1000)
    .click('#postBlog')
    .pause(1000)
    .assert.visible('#status-blogs-bar')
    .assert.containsText('#status-blogs-bar', 'Blog is too short!')
    .end();
  },
  'Blog is too long' : function (client) {
    client
    .url('http://localhost:3000/')
    .waitForElementVisible('body', 1000)
    .assert.visible('#fullName')
    .setValue('#fullName', 'DavinderKaur')
    .assert.visible('#screenName')
    .setValue('#screenName', 'DK')
    .assert.visible('#new-blog-input')
    .setValue('#new-blog-input', 'This will be too long. This will be too long. This will be too long. This will be too long. This will be too long. This will be too long. This will be too long.')
    .waitForElementVisible('#postBlog', 1000)
    .click('#postBlog')
    .pause(1000)
    .assert.visible('#status-blogs-bar')
    .assert.containsText('#status-blogs-bar', 'Blog is too long!')
    .end();
  },
  'Delete a blog' : function (client) {
    client
    .url('http://localhost:3000/')
    .waitForElementVisible('body', 1000)
    .assert.visible('#fullName')
    .assert.visible('.stream-items')
    .click('#1')
    .assert.containsText('#status-blogs-bar', 'Blog successfully deleted')
    .end();
  },
};
