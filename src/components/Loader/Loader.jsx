import { RotatingLines } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <RotatingLines
        strokeColor="blue"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  )
}

export default Loader;