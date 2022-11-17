import {useRef} from 'react';
import './AddPost.css';

export default function AddPost(props) {

    const formRef = useRef();

    return (
        <div className={'AddPost'}>
            <h1>Add Post</h1>
            <form ref={formRef}>
                <div>
                    <label>Title</label>
                    <input aria-label={'title'} name={'title'}/>
                </div>

                <div>
                    <label>Author</label>
                    <input aria-label={'author'} name={'author'}/>
                </div>

                <div>
                    <label>Content</label>
                    <input aria-label={'content'} name={'content'}/>
                </div>

                <div>
                    <button onClick={(event) => {
                        event.preventDefault();
                        props.onSubmitted(formRef.current);
                    }}>add
                    </button>
                </div>
            </form>
        </div>
    );
}