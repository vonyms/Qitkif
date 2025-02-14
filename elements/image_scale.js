import React, {Component} from 'react';
import {Image} from 'react-native';

export default class ImageScale extends Component {
  state = {
    ratio: 1,
  };
  render() {
    return (
      <Image
  source={{uri: this.props.source}}
  style={{
    width: this.props.width ?? '100%',
    aspectRatio: this.state.ratio,
  }}
  accessible={true}
  accessibilityRole="image"
  accessibilityLabel={this.props.accessibilityLabel ?? 'Image description not provided'} // Provide a description of the image
/>

    );
  }
  componentDidMount() {
    Image.getSize(this.props.source, (w, h) => {
      const ratio = w / h;
      this.setState({ratio: ratio});
    });
  }
}
