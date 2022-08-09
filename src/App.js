import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("this is the title");
  const [description, setDescription] = useState("your description");
  const [author, setAuthor] = useState("todd albert");
  console.log(title);

  function formSubmit(e) {
    //stopped from submitting to server and refreshing page when you hit submit button
    e.preventDefault();
    console.log("form submitted");
  }
  return (
    <div className="App">
      <form onSubmit={formSubmit}>
        <h1>Comments</h1>
        {/* Here goes the title */}
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <h3>{title}</h3>
        {/* This is the description */}
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <h3>{description}</h3>
        {/* This is  the author */}
        <label>Author</label>
        <select
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        >
          <option value="" selected>
            Choose one
          </option>
          <option value="todd albert">Todd</option>
          <option value="ludwigson">Ludwigson</option>
          <option value="other">Other</option>
        </select>
        <h3>{author}</h3>
        <button>Submit form</button>
      </form>
    </div>
  );
}

export default App;
