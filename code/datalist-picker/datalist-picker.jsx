const DatalistPicker = ({ options }) => {
  const nullForm = { name: "", id: 0 };
  
  const [option, setOption] = React.useState(nullForm);
  const optionIds = Object.keys(options);

  /**
   * Resets the selected form back to the default value
   */
  const resetForm = () => {
    setOption(nullForm);
  };

  /**
   * This handler will update only the form name visually but not the selected form ID.
   * The reason for this is to make up for a datalist shortcoming that it defaults to displaying the value instead of the label of the option
   * So we forcibly set the value of the input to the label and set the ID in the background only once a valid option has been selected
   * Why do this? Because datalist provides a neat native way of searching a list of options and allowing you to select one
   * like a dropdown
   */
  const handleChange = ({ target }) => {
    const selectedOption = { id: 0, name: "" };
    const optionId = Number.parseInt(target.value);
    if (Number.isNaN(optionId) || !options[optionId]) {
      selectedOption.name = target.value;
    } else {
      selectedOption.name = options[optionId];
      selectedOption.id = optionId;
    }
    setOption(selectedOption);
  };

  const isOptionSelected = option.id !== 0;

  return (
    <div>
      {isOptionSelected ? (
        <span>
          <h2>{option.name}</h2>
          {/*
           * Why do this? With form onSubmit handler we don't have to worry
           * about implementing an onKeyDown handler for screenreaders
           */}
          <form onSubmit={resetForm}>
            <button type="submit">Select a different option</button>
          </form>
        </span>
      ) : (
        <React.Fragment>
          <label htmlFor="form-picker-input">Select an option</label>
          <input
            list="form-picker-list"
            id="form-picker-input"
            name="form-picker-input"
            type="text"
            value={option.name}
            autocomplete="off"
            onChange={handleChange}
          />
          <datalist id="form-picker-list">
            {optionIds.map((id) => (
              <option key={id} value={id} label={options[id]} />
            ))}
          </datalist>
        </React.Fragment>
      )}
    </div>
  );
};

const optionList = Object.freeze({
  10001: "Christmas",
  10002: "Thanksgiving",
  10003: "Giving Tuesday",
  10004: "Diwali",
  10005: "Hanukkah",
});

ReactDOM.render(
  <DatalistPicker options={optionList} />,
  document.getElementById("working-prototype-mount")
);
