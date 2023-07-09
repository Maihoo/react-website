import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

class ScrollToTopButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    console.log(window.pageYOffset)
    if (window.pageYOffset > 200) {
      this.setState({ isVisible: true});
    } else {
      this.setState({ isVisible: false});
    }
  };

  scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  render() {
    const { isVisible } = this.state;
    return (
      <button onClick={this.scrollToTop} className={`scroll-to-top-button${isVisible ? ' visible' : ''}`}>
        <FaArrowUp className="scroll-to-top-button-content"/>
        <div className="scroll-to-top-button-content">Scroll To Top</div>
        <FaArrowUp className="scroll-to-top-button-content"/>
      </button>
    );
  }
};

export default ScrollToTopButton;