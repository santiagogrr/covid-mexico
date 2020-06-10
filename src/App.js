import React, {Component} from 'react';
import { Cards, LottieView, Title, Footer } from './components/';
import coronaImage from './assets/flag_mexico.png'
import { fetchMexico, fetchYesterdayMexico} from './api';
import { Typography } from '@material-ui/core';


import styles from './App.module.css';


class App extends Component {
  
  state = {
    dataMex: {},
    dataYesterdayMex: {},
    country: {}
  }
  
  async componentDidMount () {
    const fetchedCountry = await fetchMexico();
    const fetchedYesterdayCountry = await fetchYesterdayMexico();
  
    this.setState({
      dataMex: fetchedCountry,
      dataYesterdayMex: fetchedYesterdayCountry
    });
  }

  render(){
    const { dataMex, dataYesterdayMex } = this.state;

    return (
      <div>
        <div className={styles.header}>
          <Title/>
          <LottieView />
        </div>
        <div className={styles.container}>
          <h2 className={styles.text}>Mexico</h2>
          <img
            className={styles.image}
            alt="Mexico"
            src={coronaImage}
          />
        </div>
        <div>
          <Cards dataMex={dataMex} dataYesterdayMex={dataYesterdayMex}/>
        </div>
        {/* <Typography style={{marginBottom: "1%"}} variant="body1" color="textPrimary" align="right" gutterBottom>
        Data from <a href="https://corona.lmao.ninja/" target="_blank">NOVELCovid/API</a>&nbsp;.
        Icons made by <a href="https://www.flaticon.com/authors/smashicons" target="_blank" rel="noopener noreferrer" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer"> www.flaticon.com.</a>
        </Typography> */}
        <Footer/>

      </div>
    );
  }
}

export default App;
