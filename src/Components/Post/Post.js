import './Post.css';

export default function Post(props) {

    return (<div className={props.isSelected ? "Post Selected" : "Post"}
                 key={props.post.id}
                 onClick={() => {
                     props.onClick(props.post);
                 }}
    >
        <text>Id: {props.post.id}</text>
        <text>Title: {props.post.title}</text>
        <text>Author: {props.post.author}</text>
    </div>);

}