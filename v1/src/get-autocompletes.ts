export default (data, text)=>data.filter( 
  f=>text!="" && f.name.toLowerCase().indexOf( text.toLowerCase() ) >= 0
);