import './PostDetails.css';
import EditDelete from '../EditDelete/EditDelete';
import {useRef, useState} from "react";

export default function PostDetails(props) {

    const [editState, setEditState] = useState(false);
    const authorRef = useRef();
    const titleRef = useRef();

    return (<div className="PostDetails">
        <h1>MIU</h1>
        {editState ?
            <input name={'author'} ref={authorRef} value={props.post.author}/> :
            <text>{props.post.author}</text>}
        {editState ?
            <input name={'title'} ref={titleRef} value={props.post.title}/> :
            <text>{props.post.title}</text>
        }
        <EditDelete isEditing={editState} edit={() => {
            if (editState) {
                props.edit(props.post.id, {
                    ...props.post,
                    'title': titleRef.current.value,
                    'author': authorRef.current.value
                });
                setEditState(false);
            } else {
                setEditState(true);
            }
            // props.edit(props.post.id);
        }} delete={() => {
            props.delete(props.post.id);
        }}/>
    </div>);
}