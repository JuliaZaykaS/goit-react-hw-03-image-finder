// import PropTypes from 'prop-types';
import { Component } from 'react';

// export default function ModalImage({ url, name }) {
//     return (
//         <img src={url} alt={name} />
//     )
// }
export default class ModalImage extends Component {
    // state = {
    //     largeImg:{}
    // }
    
    componentDidUpdate(prevProps, prevState) {
        const prevImg = prevProps.largeImg;
        const nextImg = this.props.largeImg;
        console.log(prevImg);
        console.log(nextImg);
    }
    
    render() {
        return(
            // <img src={this.state.largeImg.url} alt={this.state.largeImg.name} />
            <img src={this.props.url} alt={this.props.name} />
        )
    }
}