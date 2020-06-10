import React from 'react';
import styles from './Footer.module.css';

import FontAwesome from 'react-fontawesome'

const Footer = () => {

  return (
    <div className={styles.footerGeneral}>
      <div className={styles.footerContent}>
					<div className={styles.footerText} >
						<p> &copy; {new Date().getFullYear()}, Built by 
							<a href="https://github.com/santiagogrr" target="_blank" rel="noopener noreferrer">
								<FontAwesome className="fa-github" name="clock-o" size="2x" />
							</a>
							Santiago Guerra
						</p>  
					</div>
      </div>
    </div>
  );
}

export default Footer;
