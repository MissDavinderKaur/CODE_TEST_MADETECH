let cbErr;
let cbBlog;

const save = jest.fn(cb => cb(cbErr, cbBlog));
const Blog = jest.fn().mockImplementation(() => {
  return { save };
});

jest.setMock('../../models/blog', Blog);

const { createBlog } = require('../blogs');

describe('createBlog', () => {
  let req;
  const send = jest.fn();
  let res;
  const json = jest.fn();

  beforeEach(() => {
    send.mockClear();
    json.mockClear();
    req = {
      body: {
        blog: {},
      },
    };
    res = {
      status: jest.fn().mockReturnValue({
        send,
        json,
      }),
      send,
    };
  });

  it('doesnt save if 0', () => {
    req.body.blog.blogText = '';

    createBlog(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(send).toBeCalledWith({
      err: 'Blog entries must be between 1 and 150 characters',
    });
  });

  it('doesnt save if length > 150', () => {
    req.body.blog.blogText = 'This will be too long. This will be too long. This will be too long. This will be too long. This will be too long. This will be too long. This will be too long.';

    createBlog(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(send).toBeCalledWith({
      err: 'Blog entries must be between 1 and 150 characters',
    });
  });

  it('saves if length is correct', () => {
    // Given
    const text = 'Adequately lengthed blog post.';
    req.body.blog.blogText = text;

    cbErr = null;
    cbBlog = 'myblog';

    // When
    createBlog(req, res);

    // Then
    expect(Blog).toBeCalledWith(req.body.blog);
    expect(res.status).toBeCalledWith(200);
    expect(res.send).toBeCalledWith({ blog: cbBlog });
  });

  it('returns 400 if it fails to save', () => {
    const text = 'Adequately lengthed blog post.';
    req.body.blog.blogText = text;

    cbErr = 'Error';

    createBlog(req, res);

    expect(Blog).toBeCalledWith(req.body.blog);
    expect(res.status).toBeCalledWith(400);
    expect(json).toBeCalledWith(cbErr);
  });
});
