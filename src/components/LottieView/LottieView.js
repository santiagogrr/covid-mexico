import React, {Component} from 'react';
import styles from './LottieView.module.css';
import Lottie from 'react-lottie';
import animationData from '../../assets/virus.json'

class LottieView extends Component {

  render(){		
		const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    return (
        <div className={styles.lotties}>
					<Lottie options={defaultOptions}
							height={110}
							width={110}
					/>		
        </div>
    );
  }
}

export default LottieView;
