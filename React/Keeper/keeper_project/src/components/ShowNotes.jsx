import { Note } from "./Note.jsx";

function ShowNotes(props) {
  return (
    <div className="App">
      {/* 
Map is the same as forEach but returns a new array - would be better here but this is practice.
Need to add the key as well even if not displayed otherwise it will throw errors 
      */}
      {props.notes.map((item, index) => {
        return <Note key={index} title={item.title} text={item.text} />;
      })}
    </div>
  );
}

export { ShowNotes };
