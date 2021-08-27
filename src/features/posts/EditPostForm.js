import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postUpdated } from "./postsSlice";
import { useHistory } from "react-router";

export const EditPostForm = ({ match }) => {
  const { postId } = match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  const [title, setTitle] = React.useState(post.title);
  const [content, setContent] = React.useState(post.content);

  const onTitleChanged = (e) => {
    setTitle(e.target.value);
  };
  const onContentChanged = (e) => {
    setContent(e.target.value);
  };

  const onUpdatePost = () => {
    if (title && content) {
      dispatch(postUpdated({ id: post.id, title: title, content: content }));
      history.push(`/posts/${postId}`);
    }
  };

  return (
    <section>
      <h1>Edit Post</h1>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        value={title}
        type="text"
        className=""
        onChange={onTitleChanged}
      />
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        value={content}
        onChange={onContentChanged}
      ></textarea>
      <button onClick={onUpdatePost}>Update</button>
    </section>
  );
};
