// import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({id, url, name, onClickImg}){
    return (
        // <li key={ id } className={s.ImageGalleryItem}>
        <li className={s.ImageGalleryItem} onClick={onClickImg}>
            <img src={url} alt={name} className={s.ImageGalleryItemImage} />
</li>
    )
}