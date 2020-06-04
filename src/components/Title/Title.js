import React, {Component} from 'react';
import styles from './Title.module.css';

class Title extends Component {

  render(){
	
    return (
        <div className={styles.container}>
          <header className={styles.title}>
						COVID-19	
					</header>		
        </div>
    );
  }
}

export default Title;
