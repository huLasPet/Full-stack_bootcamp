function AddNote(event, props) {
  let title = event.target.title.value;
  let noteText = event.target.note.value;
  let key = Math.random() * Math.random();
  let updatedNotes = props.notes;
  updatedNotes.push({
    key: key,
    title: title,
    text: noteText,
  });
  props.setNotes([...updatedNotes]);
  event.preventDefault();
}

export { AddNote };
