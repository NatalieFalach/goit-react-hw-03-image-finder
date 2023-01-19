import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import Button from "components/Button/Button";
import { pixaBayApi, PIXABEY_PER_PAGE } from "api/pixabayApi";
import styles from './App.module.css';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    search: '',
    imagesList: [],
    isShowLoadMore: false,
    loading: false,
    isShowModal: false,
    largeImageUrl: null,
    page: 1,
    tags: '',
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.search;
    const nextSearch = this.state.search;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    
    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      if (prevSearch !== nextSearch) {
        this.setState({ imagesList: [], page: 1 });
      }

      this.setState({ loading: true })
      
      pixaBayApi(nextSearch, nextPage).then(({hits, total}) => {
        if (hits.length === 0 && this.state.search) {
          toast.error('Nothing found')
        }
        if (nextPage * PIXABEY_PER_PAGE < total) {
          this.setState({isShowLoadMore: true})
        } else {
          this.setState({isShowLoadMore: false})
        }

        this.setState({ loading: false });
        this.setState(({ imagesList }) => ({ imagesList: [...imagesList, ...hits] })) 
      }).catch(error => {
        toast.error('Network error') 
        this.setState({ loading: false });
      });
    }
  }
  
  toggleModal = (largeImageUrl = null, tags = '') => {
    this.setState(({ isShowModal }) => ({ isShowModal: !isShowModal }));
    this.setState({ largeImageUrl: largeImageUrl });
    this.setState({tags})
  }

  onLoadMore = (e) => {
    this.setState(({page}) => ({page: page + 1}))
  }

  handleFormSubmit = search => {
    this.setState({ search: search });
  }

  render() {
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imagesList={this.state.imagesList} onShowModal={this.toggleModal} />

        {this.state.loading && <Loader />}

        {this.state.isShowLoadMore && <Button onLoadMore={this.onLoadMore} />}
        
        {this.state.isShowModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.largeImageUrl} alt={this.state.tags}/>
          </Modal>
        )}  
        <Toaster position="top-right" />
      </div>
    )
  };
};
