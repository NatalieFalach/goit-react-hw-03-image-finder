import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";

const ImageGallery = ({ imagesList, onShowModal }) => {
  return (
    <ul className={styles.ImageGallery}>
      {imagesList.map(item => {
        return (
          <ImageGalleryItem
            key={item.id}
            preivewUrl={item.webformatURL}
            largeImageURL={item.largeImageURL}
            tags={item.tags}
            onShowModal={onShowModal}
          />
        )
      })}
    </ul>
  )
}

ImageGallery.propTypes = {
  imagesList: PropTypes.arrayOf(PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
  })).isRequired,
  onShowModal: PropTypes.func.isRequired
};

export default ImageGallery;
