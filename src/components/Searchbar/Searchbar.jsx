import { Component } from "react";
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    search: '',
  };

  static propTypes = {
    onSubmit:PropTypes.func.isRequired
  };

  handleInputChange = e => {
    this.setState({ search: e.target.value.toLowerCase() });
  }

  handleSubmit = e => {
    e.preventDefault();

    if(this.state.search.trim()==='') {
      toast.error ('Enter a search term.') 
      return
    }
    this.props.onSubmit(this.state.search);
  }

  render () {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles['SearchForm-button']}>
            <span className={styles['SearchForm-button-label']}>Search</span>
          </button>
          <input
            className={styles['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            onChange={this.handleInputChange}
            value={this.state.search}
            placeholder="Search images and photos"
          />
        </form>
        <Toaster position="top-right" />
      </header>
    )
}
}