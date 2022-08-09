import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("your description");
  const [author, setAuthor] = useState("todd albert");

  useEffect(() => {
    //fetch stuff when stuff in dependency list changes and update
    // console.log('wow. something changed')
    if (title.length > 3 && description.length > 10) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [title, description, author]);

  // console.log(title);

  //Equivalent to line 13
  // const formSubmit = async (e) =>
  async function formSubmit(e) {
    e.preventDefault();
    if (!validForm) {
      setErrorMessage("Not a valid form");
      return;
    }
    setErrorMessage("");

    try {
      //stopped from submitting to server and refreshing page when you hit submit button
      const comment = {
        title,
        description,
        author,
      };
      console.log("form submitted", comment);

      //really submit to an api
      const results = await fetch("https://sql.bocacode.com/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(comment), //built in function that takes arguements. gives JSON data from an object. turn into string in JSON format
      }); //get request
      console.log(results);
      const data = await results.json(); //send results in json

      console.log(data);
      setFormSubmitted(true);
      setErrorMessage("");
      setValidForm(true);
      alert("Wow! Submitted!");
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "there was an error submitting your comment" + error.toString()
      );
    }
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
          // required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <h3>{title}</h3>
        {/* This is the description */}
        <label>Description</label>
        <textarea
          value={description}
          required
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
          {/* <option value="" selected> */}
          <option value="">Choose one</option>
          <option value="todd albert">Todd</option>
          <option value="ludwigson">Ludwigson</option>
          <option value="other">Other</option>
        </select>
        <h3>{author}</h3>
        {!formSubmitted && <button>Submit form</button>}
        {/* If error, show error message */}
        {errorMessage && (
          <h1>
            There was an error!
            <br />
            {errorMessage}
          </h1>
        )}
      </form>
    </div>
  );
}

export default App;
