import { Component } from 'react';
// import PropTypes from "prop-types";
import s from "./Searchbar.module.css";

// export default function Searchbar({ onSubmit }) {
//   return (
//     <header className={s.Searchbar}>
//       <form className={s.SearchForm}>
//         <button type="submit" className={s.SearchFormButton}>
//           <span className={s.SearchFormButtonLabel}>Search</span>
//         </button>

//         <input
//           className={s.SearchFormInput}
//           type="text"
//           autocomplete="off"
//           autofocus
//           placeholder="Search images and photos"
//         />
//       </form>
//     </header>
//   );
// }

export default class Searchbar extends Component{
  state = {
    inputValue: '',
  };

  addInputSearch = (e) => {
    this.setState({ inputValue: e.currentTarget.value})
  }
  
  onSubmitInput = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputValue);
    this.setState({inputValue:''})
  }

  render() {
    return (<header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={this.onSubmitInput}>
        <button type="submit" className={s.SearchFormButton} >
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={this.state.inputValue}
          onChange={this.addInputSearch}
          
        />
      </form>
    </header>
    )
  }
}
