import Posts from "../Posts/Posts";
import {useRef, useState} from "react";
import PostDetails from "../../Components/PostDetails/PostDetails";
import ChangePost from "../../Components/ChangePost/ChangePost";

export default function DashBoard(props) {

    const myPosts = [{
        "id": 111, "title": "Title 1", "author": "Author 1"
    }, {
        "id": 112, "title": "Title 2", "author": "Author 2"
    }, {
        "id": 113, "title": "Title 3", "author": "Author 3"
    }];

    const [posts, setPosts] = useState(myPosts);
    const [post, setPost] = useState(posts[0]);


    function setPostHandler(post) {
        setPost(post);
    }

    function onClicked(value) {
        const foundPost = posts.findIndex((p) => p.id === post.id);
        setPosts(posts.map((p) => {
            if (p.id === post.id) {
                p.title = value;
                setPost(p);
            }
            return p;
        }));
    }

    return (<div>
        <h1>Posts</h1>
        <div className="Posts">
            <Posts posts={posts} selectedPost={post} onClick={setPostHandler}/>
        </div>

        <ChangePost onClicked={onClicked}/>
        <PostDetails post={post}/>

    </div>);
}