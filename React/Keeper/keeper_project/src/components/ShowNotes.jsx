import { Note } from "./Note.jsx";

function ShowNotes(props) {
  return (
    <div className="App">
      {/* 
Map is the same as forEach but returns a new array - would be better here but this is practice.
Need to add the key as well even if not displayed otherwise it will throw errors 
      */}
      {props.notes.map((item) => {
        return (
          <Note
            key={item.key}
            title={item.title}
            text={item.text}
            delete={() => {
              props.delete(item.key, props.setNotes);
            }}
          />
        );
      })}
    </div>
  );
}

export { ShowNotes };
