import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({id, url, name}){
    return (
        <li key={ id}className={s.ImageGalleryItem}>
            <img src={url} alt={name} className={s.ImageGalleryItemImage} />
</li>
    )
}