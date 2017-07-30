import React = require('react');
import getAutocompletes from './get-autocompletes';
import Input from './input';

export default ({ 
  id,
  data, 
  label, 
  text, 
  selected,
  highlightIndex, 
  onChange,
  onSelect
}) => {
  let autocompletes : any[];
  if (text === '' || selected && text === selected.name) {
    autocompletes = [];
  }else{
    autocompletes = getAutocompletes(data, text)
  }
  return (
    <Input
      id={id}
      label={label}
      text={text}
      onChange={onChange}
      className="input autocomplete-input"
    >
      {autocompletes.length > 0 && <ul>
        {autocompletes.map((a,i) =>
          <li 
            className={highlightIndex === i && "active" || ""} 
            key={i} 
            onClick={() => onSelect(a)}
          >
            {a.name}
          </li> 
        )}
      </ul>}
    </Input>
  );
}