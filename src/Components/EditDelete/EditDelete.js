import './EditDelete.css';

export default function EditDelete(props) {
    return (
        <div>
            <button onClick={props.edit}>{props.isEditing? 'save': 'edit'}</button>
            <button onClick={props.delete}>delete</button>
        </div>
    );
}