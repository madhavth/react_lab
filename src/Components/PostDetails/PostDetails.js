import './PostDetails.css';
import EditDelete from '../EditDelete/EditDelete';
import {useContext, useRef, useState} from "react";
import {SelectedPostContext} from "../../Containers/Dashboard/Dashboard";

export default function PostDetails(props) {

    const [editState, setEditState] = useState(false);
    const authorRef = useRef();
    const titleRef = useRef();
    const post = useContext(SelectedPostContext);

    return (<div className="PostDetails">
        <h1>MIU</h1>
        {editState ?
            <input name={'author'} ref={authorRef} value={post.author}/> :
            <text>{post.author}</text>}
        {editState ?
            <input name={'title'} ref={titleRef} value={post.title}/> :
            <text>{post.title}</text>
        }
        <EditDelete isEditing={editState} edit={() => {
            if (editState) {
                props.edit(post.id, {
                    ...post,
                    'title': titleRef.current.value,
                    'author': authorRef.current.value
                });
                setEditState(false);
            } else {
                setEditState(true);
            }
            // props.edit(post.id);
        }} delete={() => {
            props.delete(post.id);
        }}/>
    </div>);
}