import React = require("react");
import getAutocompletes from "./get-autocompletes";

export default ({ 
  data, 
  label, 
  text, 
  selected,
  highlightIndex, 
  onChange, 
  onSelect
})=>{
  let autocompletes : any[];
  if( text === "" || selected === undefined || text === selected.name ){
    autocompletes = [];
  }else{
    autocompletes = getAutocompletes( data, text )
  }
  return (
    <div className="autocomplete-input">
      <label htmlFor="labelled-input">{label}</label>
      <input 
        type="text"
        id="labelled-input" 
        placeholder="Type here" 
        value={text}
        autoComplete="off"
        onChange={( e )=>{
          const input : any = e.nativeEvent.target;
          onChange( input.value );
        }}
      />
      { autocompletes.length > 0 && <ul>
        { autocompletes.map( (a,i)=>
          <li 
            className={highlightIndex === i && "active" || ""} 
            key={i} 
            onClick={()=>onSelect(a)}
          >
            {a.name}
          </li> 
        )}
      </ul> }
    </div>
  );
}