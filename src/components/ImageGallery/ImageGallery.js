import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

export default function ImageGallery({items}) {
    return (
        <ul className={s.ImageGallery}>
            {items.map((item,index) => {
                
                <ImageGalleryItem id={ index} url={item.src} name={ item.name}/>
            })}

  
</ul>
    )
}