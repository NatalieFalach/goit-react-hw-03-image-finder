import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export class Modal extends Component {
   static propTypes = {
    onClose:PropTypes.func.isRequired
  };
  
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  }

  hanleOverlayClick = e => {
    if (e.currentTarget === e.target) { // проверка что мы кликнули именно на оверлей
      this.props.onClose()
    }
  }

  render() {
    return (
      <div className={styles.Overlay} onClick={this.hanleOverlayClick}>
        <div className={ styles.Modal}>{ this.props.children }</div>
      </div>
    )
  }
}

