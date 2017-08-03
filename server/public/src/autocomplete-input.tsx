import React = require('react');
import getAutocompletes from './get-autocompletes';
import Input from './input';

const blockArrowKeydown = (event)=>{
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
  }
};

export default class AutocompleteInput extends React.Component<any,any> {
  static defaultProps = {
    onSelect: ()=>{},
    onChange: ()=>{},
    onKeyDown: ()=>{}
  }
  state = {
    autocompletes: [],
    highlightIndex: -1,
    forceText: false
  }

  constructor() {
    super();

    this.select = this.select.bind(this);
    this.selectHighlighted = this.selectHighlighted.bind(this);
    this.highlightUp = this.highlightUp.bind(this);
    this.highlightDown = this.highlightDown.bind(this);
  }
  componentWillUnmount() {
    window.removeEventListener('sw-enter', this.selectHighlighted);
    window.removeEventListener('sw-up', this.highlightUp);
    window.removeEventListener('sw-down', this.highlightDown);
  }
  select(selected) {
    this.props.onChange(selected);
    this.props.onSelect(selected);
    this.setState({
      forceText: selected,
      autocompletes: [],
      highlightIndex: -1
    });
  }
  selectHighlighted() {
    this.select(this.state.autocompletes[this.state.highlightIndex]);
  }
  highlightUp(e) {
    e.preventDefault();
    this.setState({
      highlightIndex: Math.max(
        -1, 
        this.state.highlightIndex - 1
      )
    });
  }
  highlightDown(e) {
    e.preventDefault();
    this.setState({
      highlightIndex: Math.min(
        this.state.autocompletes.length - 1,
        this.state.highlightIndex + 1
      )
    });
  }
  onFocus(e) {
    window.addEventListener('sw-enter', this.selectHighlighted);
    window.addEventListener('sw-up', this.highlightUp);
    window.addEventListener('sw-down', this.highlightDown);
  }
  onBlur(e) {
    window.removeEventListener('sw-enter', this.selectHighlighted);
    window.removeEventListener('sw-up', this.highlightUp);
    window.removeEventListener('sw-down', this.highlightDown);
  }
  onChange(text) {
    this.props.onChange(text);
    this.setState({
      autocompletes: getAutocompletes(this.props.data, text),
      highlightIndex: -1,
      forceText: false
    });
  }
  render() {
    const {id, data, label, onChange, onSelect} = this.props;
    const {autocompletes, highlightIndex, forceText} = this.state;
    return (
      <Input
        id={id}
        label={label}
        onChange={x=>this.onChange(x)}
        className="input autocomplete-input"
        onFocus={x=>this.onFocus(x)}
        onBlur={x=>this.onBlur(x)}
        onKeyDown={blockArrowKeydown}
        forceText={forceText}
      >
        {
          autocompletes.length > 0 
          ? <ul>{autocompletes.map((a,i) =>
              <li className={highlightIndex === i && "active" || ""} key={i}  onClick={()=>{this.select(autocompletes[i])}}>
                {a}
              </li> 
            )}</ul> 
          : null
        }
      </Input>
    );
  } 
}