import './PostDetails.css';

export default function PostDetails(props) {
    return (
        <div className="PostDetails">
            <h1>MIU</h1>
            <text>{props.post.author}</text>
            <text>{props.post.title}</text>
        </div>
    );
}