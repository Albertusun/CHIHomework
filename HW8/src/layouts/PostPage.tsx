import Post from '../components/Post/Post';
export default function PostPage({ isMyPosts = false }) {
  return <Post isMyPosts={isMyPosts} />;
}
