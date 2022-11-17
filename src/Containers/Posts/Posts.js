import Post from "../../Components/Post/Post";
import './Posts.css';

export default function Posts(props) {
    const posts = props.posts;

    return posts.map((post) => {
        return (
            <Post key={post.id} post={post}  isSelected={props.selectedPost && props.selectedPost.id === post.id }
            onClick={props.onClick}
            />
        )
    });
}