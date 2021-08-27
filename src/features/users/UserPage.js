import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllPosts } from "../posts/postsSlice";

export const UserPage = ({ match }) => {
  const { userId } = match.params;

  const renderedPosts = useSelector(selectAllPosts)
    .filter((post) => post.user === userId)
    .map((post) => (
      <li key={post.id}>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </li>
    ));

  return (
    <section>
      <ul>{renderedPosts}</ul>
    </section>
  );
};
