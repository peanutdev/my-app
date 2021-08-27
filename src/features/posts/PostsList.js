import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import { ReactionButtons } from "./ReactionButtons";
import { fetchPosts, selectAllPosts } from "./postsSlice";


const PostExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>

      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
    </article>
  )
}


export const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);

  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  let content;
  if (postStatus === "loading") {
    content = <div className="loader">Loading...</div>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

      content = orderedPosts.map(post => (
        <PostExcerpt key={post.id} post={post} />
      ))
  } else if (postStatus === 'failed') {
    content = <div>{error}</div>
  }

  // const renderedPosts = posts.map((post) => (
  //   <article key={post.id} className="post-excerpt">
  //     <h3>{post.title}</h3>
  //     <div>
  //       <PostAuthor userId={post.userId} />
  //       <TimeAgo timestamp={post.date} />
  //       <ReactionButtons post={post} />
  //     </div>
  //     <p className="post-content">{post.content.substring(0, 100)}</p>
  //     <Link to={`/posts/${post.id}`} className="button muted-button">
  //       View Post
  //     </Link>
  //     <Link to={`/editPost/${post.id}`} className="button muted-button">
  //       Edit Post
  //     </Link>
  //   </article>
  // ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};
