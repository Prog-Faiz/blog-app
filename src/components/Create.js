import { useState } from "react";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Mario');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const blog = { title, body, author };
        setIsPending(true);

        fetch('http://localhost:8000/blogs/', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('new blog added');
            setIsPending(false);
        })
    };

    return ( 
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <label>Blog Body:</label>
                <textarea 
                    required
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                ></textarea>
                <label>Blog Author:</label>
                <select
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}
                >
                    <option value="Mario">Mario</option>
                    <option value="Yoshi">Yoshi</option>
                </select> 
                { !isPending ? <button>Add Blog</button> : <button disabled>Adding Blog...</button>} 
            </form>
        </div>
     );
}
 
export default Create;