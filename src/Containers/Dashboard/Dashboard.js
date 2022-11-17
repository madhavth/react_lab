import Posts from "../Posts/Posts";
import {useEffect, useRef, useState} from "react";
import PostDetails from "../../Components/PostDetails/PostDetails";
import ChangePost from "../../Components/ChangePost/ChangePost";
import axios from "axios";
import AddPost from "../../Components/AddPost/AddPost";
import './Dashboard.css';

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

    const getPostById = (id) => {
        axios.get('http://localhost:8080/posts/' + id).then(
            (response) => {
                console.log('setting post response as : response');
                setPost(response.data);
            }
        ).catch((e) => {
            console.log(e.message);
        })
    }

    const fetchPosts = (fetchedCallback) => {
        axios.get('http://localhost:8080/posts').then(
            response => {
                console.log('the response data is:' + response.data);
                setPosts(response.data);
                if (fetchedCallback) {
                    fetchedCallback();
                }
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
        onChangeClicked(value);
    }

    function onChangeClicked(value) {
        // const foundPost = post? posts.findIndex((p) => p.id === post.id): null;
        // setPosts(posts.map((p) => {
        //     // if (p.id === post.id) {
        //     //     p.title = value;
        //     //     setPost(p);
        //     // }
        //     return p;
        // }));
        axios.put("http://localhost:8080/posts/" + post.id, {
            ...post,
            title: value
        }).then((response) => {
            fetchPosts(() => {
                getPostById(post.id);
            });
        }).catch((e) => {
            console.log(e.message);
        });

    }

    function editPost(id, post) {
        axios.put('http://localhost:8080/posts/' + id, post).then((response) => {
            fetchPosts(() => {
                getPostById(post.id);
            });
        }).catch((e) => {
            console.log(e.message);
        });
    }

    function addPost(newPost) {
        axios.post('http://localhost:8080/posts/', newPost,
            // {headers: options}
        ).then(
            (response) => {
                fetchPosts();
            }
        ).catch((e) => {
            console.log('::::ERROR WHILE ADDING DATA::::')
            console.log(e.message);
        });
    }

    function onSubmittedHandler(formData) {
        const newPost = {
            title: formData.title.value, content: formData.content.value, author: formData.author.value
        };
        addPost(newPost);
    }

    function deletePost(id) {
        axios.delete('http://localhost:8080/posts/' + id).then((response) => {
            fetchPosts();
            if (id === post.id) {
                setPost(null);
            }
        }).catch((e) => {
            console.log(e.message);
        });
    }

    return (<div>
        <h1>Posts</h1>
        <div className="Posts">
            <Posts posts={posts} selectedPost={post} onClick={setPostHandler}/>
        </div>


        {post == null ? <div className={'helpText'}>Click a post to change its title</div> :
            <ChangePost onClicked={onClickedHandler}/>}
        {post == null ? <div className={'helpText'}>Click a post to view its details</div> :
            <PostDetails post={post} edit={editPost} delete={deletePost}/>}
        <AddPost onSubmitted={onSubmittedHandler}/>

    </div>);
}