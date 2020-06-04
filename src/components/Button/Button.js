import React, {Component} from 'react';
import { Grid, Button } from '@material-ui/core';

import styles from './Button.module.css';

class ButtonComponent extends Component {

  render(){

    return (
      <div>
				<Button variant="contained" size="large" className={styles.button} onClick={this.props.onClick}>
					{this.props.val}
				</Button>
      </div>
    );
  }
}

export default ButtonComponent;
