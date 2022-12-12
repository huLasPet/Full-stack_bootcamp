function DeleteNote(key, setNotes) {
  //setNotes([{ key: 1, title: "test", text: "test" }]);

  setNotes((text) => {
    return text.filter((item, index) => {
      return item.key !== key;
    });
  });
}

export { DeleteNote };
