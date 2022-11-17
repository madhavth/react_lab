import './PostDetails.css';
import EditDelete from '../EditDelete/EditDelete';

export default function PostDetails(props) {
    return (<div className="PostDetails">
        <h1>MIU</h1>
        <text>{props.post.author}</text>
        <text>{props.post.title}</text>
        <EditDelete edit={() => {
            props.edit(props.post.id);
        }} delete={() => {
            props.delete(props.post.id);
        }}/>
    </div>);
}