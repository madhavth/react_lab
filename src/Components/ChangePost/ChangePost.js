import './ChangePost.css';
import {useRef} from "react";

export default function ChangePost(props) {
    const inputRef = useRef();

    return (
        <div className="ChangePost">
            <input ref={inputRef}/>
            <div>
                <button
                    onClick={() => {
                        props.onClicked(inputRef.current.value);
                    }}
                >Change Name
                </button>
            </div>
        </div>
    );
}