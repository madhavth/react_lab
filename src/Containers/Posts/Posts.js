import Post from "../../Components/Post/Post";
import './Posts.css';
import {SelectedPostContext} from "../Dashboard/Dashboard";
import {useContext} from "react";

export default function Posts(props) {
    const posts = props.posts;
    const selectedPost = useContext(SelectedPostContext);

    return posts.map((post) => {
        return (
            <Post key={post.id} post={post} isSelected={selectedPost && selectedPost.id === post.id}
                  onClick={props.onClick}
            />
        )
    });
}