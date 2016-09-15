import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import isEmoji from '../../utils/isEmoji';
import styles from './Avatar.css';

const SIZES = {
  tiny: 14,
  small: 22,
  medium: 28,
  large: 36,
  big: 100
};

class Avatar extends Component {
  static propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'big']).isRequired,
    placeholder: PropTypes.oneOf([
      'empty',
      'lblue',
      'blue',
      'purple',
      'red',
      'orange',
      'yellow',
      'green'
    ]).isRequired,
    onClick: PropTypes.func
  };

  static defaultProps = {
    title: '',
    size: 'medium',
    placeholder: 'empty'
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.image !== this.props.image ||
           nextProps.placeholder !== this.props.placeholder ||
           nextProps.title !== this.props.title ||
           nextProps.size !== this.props.size ||
           nextProps.className !== this.props.className;
  }

  getAvatarText() {
    const { title, size } = this.props;
    if (size === 'tiny') {
      return null;
    }

    if (title.length) {
      const titleArray = title.trim().split(' ');
      if (titleArray.length > 1) {
        return `${titleArray[0][0]}${titleArray[1][0]}`;
      }

      const char = title[0];
      if (!isEmoji(char)) {
        return char;
      }
    }

    return '#';
  }

  render() {
    const { image, placeholder, title, size, onClick, className } = this.props;
    const avatarText = this.getAvatarText();

    const avatarClassName = classNames({
      [styles.image]: image,
      [styles.placeholder]: !image,
      [styles[placeholder]]: !image,
      [styles[size]]: true,
      [styles.twoChars]: avatarText && avatarText.length !== 1,
      [styles.clickable]: onClick
    }, className);

    if (image) {
      const imgSize = SIZES[size];

      return (
        <img
          className={avatarClassName}
          src={image}
          width={imgSize}
          height={imgSize}
          alt={title}
          onClick={onClick}
        />
      );
    }

    return (
      <div className={avatarClassName} onClick={onClick} title={title}>
        {avatarText}
      </div>
    );
  }
}

export default Avatar;
