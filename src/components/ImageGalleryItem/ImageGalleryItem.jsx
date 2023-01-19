import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({preivewUrl, largeImageURL, onShowModal, tags }) => {
  return (
      <li  className={styles.ImageGalleryItem}>
        <img onClick={() =>onShowModal(largeImageURL, tags)} className={styles['ImageGalleryItem-image']}
          src={preivewUrl} alt={tags}
        />
      </li>
    )
}
export default ImageGalleryItem


 
ImageGalleryItem.propTypes = {
  preivewUrl: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onShowModal: PropTypes.func.isRequired,
}
