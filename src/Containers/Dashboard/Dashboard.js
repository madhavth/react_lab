import Posts from "../Posts/Posts";
import {useEffect, useRef, useState} from "react";
import PostDetails from "../../Components/PostDetails/PostDetails";
import ChangePost from "../../Components/ChangePost/ChangePost";
import axios from "axios";
import AddPost from "../../Components/AddPost/AddPost";

export default function DashBoard(props) {

    const myPosts = [{
        "id": 111, "title": "Title 1", "author": "Author 1"
    }, {
        "id": 112, "title": "Title 2", "author": "Author 2"
    }, {
        "id": 113, "title": "Title 3", "author": "Author 3"
    }];

    const [posts, setPosts] = useState(myPosts);
    const [post, setPost] = useState(null);

    const fetchPosts = () => {
        axios.get('http://localhost:8080/posts').then(
            response => {
                setPosts(response.data);
            }
        ).catch((e) => {
            console.log('something went wrong ' + e.message());
        });
    };

    function setPostHandler(post) {
        setPost(post);
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    function onClickedHandler(value) {
        onClicked(value);
    }

    function onClicked(value) {
        // const foundPost = post? posts.findIndex((p) => p.id === post.id): null;
        // setPosts(posts.map((p) => {
        //     // if (p.id === post.id) {
        //     //     p.title = value;
        //     //     setPost(p);
        //     // }
        //     return p;
        // }));
        axios.put("https://localhost:8080/posts/" + post.id, {
            ...post,
            title: value
        }).then((response) => {
            fetchPosts();
        }).catch((e) => {
            console.log(e.message);
        });

    }

    function editPost(id, post) {
        axios.put('https://localhost:8080/posts/' + id, post).then((response) => {
            fetchPosts();
        }).catch((e) => {
            console.log(e.message);
        });
    }

    function addPost(post) {
        axios.post('https://localhost:8080/posts/', post).then(
            (response) => {
                // fetchPosts();
            }
        ).catch((e) => {
            console.log('i am having a major issue adding and ')
            console.log(e.message);
        });
    }

    function onSubmittedHandler(formData) {
        // const post = {
        //     title: formData.title, content: formData.content, author: formData.author
        // }
        // addPost(post);
    }

    function deletePost(id) {
        axios.delete('https://localhost:8080/posts/' + id).then((response) => {
            fetchPosts();
        }).catch((e) => {
            console.log(e.message);
        });
    }

    return (<div>
        <h1>Posts</h1>
        <div className="Posts">
            <Posts posts={posts} selectedPost={post} onClick={setPostHandler}/>
        </div>


        <ChangePost onClicked={onClickedHandler}/>
        {post && <PostDetails post={post} edit={editPost} delete={deletePost}/>}
        <AddPost onSubmitted={onSubmittedHandler}/>

    </div>);
}