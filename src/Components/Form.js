import { useState, useEffect } from "react";

export default function Form({ handleClose, setStateFromChild }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //one state with entire object that updates as user interacts
  const [form, setForm] = useState({});

  useEffect(() => {
    //fetch stuff when stuff in dependency list changes and update
    if (form?.title?.length > 3 && form?.description?.length > 10) {
      setValidForm(true);
    } else {
      setValidForm(false);
    }
  }, [form]);

  async function formSubmit(e) {
    e.preventDefault(); //stops page refresh
    if (!validForm) {
      setErrorMessage("Not a valid form");
      return;
    }
    setErrorMessage("");

    try {
      //submit to an api
      const results = await fetch("https://sql.bocacode.com/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form), //built in function that takes arguements. gives JSON data from an object. turn into string in JSON format
      }); //get request
      console.log(results);
      const data = await results.json(); //send results in json
      console.log(data);

      setFormSubmitted(true);
      setErrorMessage("");
      setValidForm(true);
      handleClose();
      setStateFromChild(form);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        "there was an error submitting your comment" + error.toString()
      );
    }
  }
  console.log("this is form", form);
  const updateForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <div className="App">
      <form onSubmit={formSubmit}>
        <h1>Comments</h1>
        {/* Here goes the title */}
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          // required
          onChange={updateForm}
          // onChange={(e) => updateForm(e)} --same as line 84
        />
        <h3>{form.title}</h3>
        {/* This is the description */}
        <label>Description</label>
        <textarea
          value={form.description}
          name="description"
          // required
          onChange={updateForm}
        ></textarea>
        <h3>{form.description}</h3>
        {/* This is  the author */}
        <label>Author</label>
        <select value={form.author} name="author" onChange={updateForm}>
          {/* <option value="" selected> */}
          <option value="">Choose one</option>
          <option value="todd albert">Todd</option>
          <option value="ludwigson">Ludwigson</option>
          <option value="other">Other</option>
        </select>
        <h3>{form.author}</h3>
        <button onClick={() => setStateFromChild("Hello father")}>
          Send stuff back to parent
        </button>

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
