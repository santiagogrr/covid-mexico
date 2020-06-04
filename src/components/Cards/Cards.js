import React, {useState} from 'react';
import { Card, CardContent, Typography, Grid, Tooltip, withStyles, makeStyles } from '@material-ui/core';
import { ButtonComponent, Chart, TableComponent, TweetEmbed} from '../index';
import CountUp from 'react-countup';
import { Mask1, Mask2, Hands, Handshake, Hospital, Helpline}  from '../../assets';

import cx from 'classnames';
import styles from './Cards.module.css';

const Cards = ({ dataMex, dataYesterdayMex } ) => {
  const [isToggleOn1, setIsToggleOn1] = useState(false);
  const [isToggleOn2, setIsToggleOn2] = useState(false);


  function handleChange1() {
      setIsToggleOn1(!isToggleOn1);
    }

  function handleChange2() {
      setIsToggleOn2(!isToggleOn2);
    }
  
  // const handleChange = setIsToggleOn(!isToggleOn);


  if(!dataMex.cases) {
    return 'Loading...';
  }

  const HtmlTooltipGray = withStyles(() => ({
    tooltip: {
      backgroundColor: 'white',
      borderLeft: "5px solid gray",
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 400,
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  const HtmlTooltipRed = withStyles(() => ({
    tooltip: {
      backgroundColor: 'rgb(255, 240, 240)',
      borderLeft: "5px solid #FF0000",
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 400,
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  const HtmlTooltipGreen = withStyles(() => ({
    tooltip: {
      backgroundColor: 'rgb(240, 255, 240)',
      borderLeft: "5px solid #008900",
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 400,
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  const HtmlTooltipYellow = withStyles(() => ({
    tooltip: {
      backgroundColor: 'rgb(255, 255, 240)',
      borderLeft: "5px solid #e1ad01",
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 400,
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  const yesterday = dataYesterdayMex.updated-(1000 * 60 * 60 * 24)
  const percentDiffCases = ((dataMex.todayCases-dataYesterdayMex.todayCases)/dataYesterdayMex.todayCases)*100
  const percentDiffDeaths = ((dataMex.todayDeaths-dataYesterdayMex.todayDeaths)/dataYesterdayMex.todayDeaths)*100

  const isPositiveNegativeCases = percentDiffCases > 0 ? "increase" : "decrease";
  const isPositiveNegativeDeaths = percentDiffDeaths > 0 ? "increase" : "decrease";

  
  return (
    <div>
      <div className={styles.container}>
        
        <Typography style={{marginBottom: "1%"}} variant="h4" color="textPrimary" align="center" gutterBottom>Today <span style={{fontSize:15}}>({new Date(dataMex.updated).toLocaleDateString("en-GB")})</span></Typography>
        <Grid container spacing ={3} justify="center">
          
        <HtmlTooltipGray title={<Typography style={{fontWeight: 300}} variant="body1" color="textPrimary">There is a {parseFloat(percentDiffCases).toFixed(2)+"%"} {isPositiveNegativeCases} in confirmed cases in comparison to yesterday</Typography>} placement="top-end">
            <Grid item component={Card} xs={11} md={2} className = {cx(styles.card)}>
              
              <Typography style={{fontWeight:300}} variant="h6" color="textSecondary" align="center" gutterBottom>CONFIRMED CASES</Typography>
                <Typography style={{fontWeight: 400}} variant="h4" align="center">
                <CountUp 
                    start={0}
                    end={dataMex.todayCases}
                    duration={2.5}
                    separator=","
                  />
                </Typography>
                <Typography style={{fontWeight:300}} variant="body1" color="textPrimary" align="center" gutterBottom>({parseFloat(percentDiffCases).toFixed(2)+"%"})</Typography>
              
            </Grid>
          </HtmlTooltipGray>

          <HtmlTooltipRed disableFocusListener title={<Typography style={{fontWeight: 300}} variant="body1" color="textPrimary">There is a {parseFloat(percentDiffDeaths).toFixed(2)+"%"} {isPositiveNegativeDeaths} in deaths in comparison to yesterday</Typography>} placement="top-end">
            <Grid item component={Card} xs={11} md={2} className = {cx(styles.card)}>
              
              <Typography style={{fontWeight:300}} variant="h6" color="textSecondary" align="center" gutterBottom>DEATHS</Typography>
                <Typography style={{fontWeight: 400}} variant="h4" color="secondary" align="center" >
                <CountUp 
                    start={0}
                    end={dataMex.todayDeaths}
                    duration={2.5}
                    separator=","
                  />
                </Typography>
                <Typography style={{fontWeight:300}} variant="body1" color="textPrimary" align="center" gutterBottom>({parseFloat(percentDiffDeaths).toFixed(2)+"%"})</Typography>
              
            </Grid>
          </HtmlTooltipRed>
          
        </Grid>
      </div>

      <div className={styles.container}>
        <Typography style={{marginBottom: "1%"}} variant="h4" color="textPrimary" align="center" gutterBottom>Yesterday <span style={{fontSize:15}}>({new Date(yesterday).toLocaleDateString("en-GB")})</span></Typography>
        <Grid container spacing ={3} justify="center">
          <Grid item component={Card} xs={11} md={2} className = {cx(styles.card)}>
            
            <Typography style={{fontWeight:300}} variant="h6" color="textSecondary" align="center" gutterBottom>CONFIRMED CASES</Typography>
              <Typography style={{fontWeight: 400}} variant="h4" align="center">
              <CountUp 
                  start={0}
                  end={dataYesterdayMex.todayCases}
                  duration={2.5}
                  separator=","
                />
              </Typography>
            
          </Grid>
          
          <Grid item component={Card} xs={11} md={2} className = {cx(styles.card)}>
            
            <Typography style={{fontWeight:300}} variant="h6" color="textSecondary" align="center" gutterBottom>DEATHS</Typography>
              <Typography style={{fontWeight: 400}} variant="h4" color="secondary" align="center" >
              <CountUp 
                  start={0}
                  end={dataYesterdayMex.todayDeaths}
                  duration={2.5}
                  separator=","
                />
              </Typography>
            
          </Grid>  

        </Grid>
      </div>

      <div className={styles.container}>
        <Grid container justify="center">
          <ButtonComponent val={isToggleOn1 ? "Hide Chart" : "Show Chart"} onClick={handleChange1} />
        </Grid>
      </div>

      {isToggleOn1 ? (
      <div className={styles.container}>
        <Grid container spacing ={3} justify="center">
          <Chart toggled1={isToggleOn1} />
        </Grid>
      </div>) : null}

      <div className={styles.container}>

        <Typography style={{marginBottom: "1%"}} variant="h4" color="textPrimary" align="center" gutterBottom>All time</Typography>
        <Grid container spacing = {3} justify="center">
            <Grid item component={Card} xs={11} md={3} className = {cx(styles.card)}>
              
              <Typography style={{fontWeight:300}} variant="h6" color="textPrimary" align="center" gutterBottom>TESTS CONDUCTED</Typography>
                <Typography style={{fontWeight: 400}} variant="h4" align="center"  color="primary">
                <CountUp 
                    start={0}
                    end={dataMex.tests}
                    duration={2.5}
                    separator=","
                  />
                </Typography>
              
            </Grid>

            <HtmlTooltipGray title={<Typography style={{fontWeight: 300}} variant="body1" color="textPrimary">Out of all {dataMex.tests.toLocaleString()} tests {parseFloat((dataMex.cases/dataMex.tests)*100).toFixed(2)+"%"} are confirmed</Typography>} placement="top-end">
              <Grid item component={Card} xs={11} md={3} className = {cx(styles.card)}>
                
                <Typography style={{fontWeight:300}} variant="h6" color="textPrimary" align="center" gutterBottom>CONFIRMED CASES</Typography>
                  <Typography style={{fontWeight: 400}} variant="h4" color="textPrimary" align="center" >
                  <CountUp 
                      start={0}
                      end={dataMex.cases}
                      duration={2.5}
                      separator=","
                    />
                  </Typography>
                  <Typography style={{fontWeight:300}} variant="body1" color="textPrimary" align="center" gutterBottom>({parseFloat((dataMex.cases/dataMex.tests)*100).toFixed(2)+"%"})</Typography>
                
              </Grid>
            </HtmlTooltipGray>

            <HtmlTooltipGreen title={<Typography style={{fontWeight: 300}} variant="body1" color="textPrimary">Out of all {dataMex.cases.toLocaleString()} confirmed cases {parseFloat((dataMex.recovered/dataMex.cases)*100).toFixed(2)+"%"} recovered</Typography>} placement="top-end">
              <Grid item component={Card} xs={11} md={3} className = {cx(styles.card)}>
                
                <Typography style={{fontWeight:300}} variant="h6" color="textPrimary" align="center" gutterBottom>RECOVERED</Typography>
                  <Typography style={{fontWeight: 400, color: '#008900'}} variant="h4" align="center" >
                  <CountUp 
                      start={0}
                      end={dataMex.recovered}
                      duration={2.5}
                      separator=","
                    />
                  </Typography>
                  <Typography style={{fontWeight:300}} variant="body1" color="textPrimary" align="center" gutterBottom>({parseFloat((dataMex.recovered/dataMex.cases)*100).toFixed(2)+"%"})</Typography>
                
              </Grid>
              </HtmlTooltipGreen>

            <HtmlTooltipRed title={<Typography style={{fontWeight: 300}} variant="body1" color="textPrimary">Out of all {dataMex.cases.toLocaleString()} confirmed cases {parseFloat((dataMex.deaths/dataMex.cases)*100).toFixed(2)+"%"} died</Typography>} placement="top-end">
            <Grid item component={Card} xs={11} md={3} className = {cx(styles.card)}>
              
              <Typography style={{fontWeight:300}} variant="h6" color="textPrimary" align="center" gutterBottom>DEATHS</Typography>
                <Typography style={{fontWeight: 400}} variant="h4" color="secondary" align="center" >
                <CountUp 
                    start={0}
                    end={dataMex.deaths}
                    duration={2.5}
                    separator=","
                  />
                </Typography>
                <Typography style={{fontWeight:300}} variant="body1" color="textPrimary" align="center" gutterBottom>({parseFloat((dataMex.deaths/dataMex.cases)*100).toFixed(2)+"%"})</Typography>
              
            </Grid>
            </HtmlTooltipRed>

            <HtmlTooltipYellow title={<Typography style={{fontWeight: 300}} variant="body1" color="textPrimary">Out of all {dataMex.cases.toLocaleString()} confirmed cases {parseFloat((dataMex.active/dataMex.cases)*100).toFixed(2)+"%"} are still active</Typography>} placement="top-end">
            <Grid item component={Card} xs={11} md={3} className = {cx(styles.card)}>
             
              <Typography style={{fontWeight:300}} variant="h6" color="textPrimary" align="center" gutterBottom>ACTIVE CASES</Typography>
                <Typography style={{fontWeight: 400, color: '#e1ad01'}} variant="h4" align="center" >
                <CountUp 
                    start={0}
                    end={dataMex.active}
                    duration={2.5}
                    separator=","
                  />
                </Typography>
                <Typography style={{fontWeight:300}} variant="body1" color="textPrimary" align="center" gutterBottom>({parseFloat((dataMex.active/dataMex.cases)*100).toFixed(2)+"%"})</Typography>
             
            </Grid>
            </HtmlTooltipYellow>        
          </Grid>
           
      </div>

      <div className={styles.container}>
          <Grid container spacing ={3} justify="center">
            <ButtonComponent val={isToggleOn2 ? "Hide Chart" : "Show Chart"} onClick={handleChange2} />
          </Grid>
      </div>

      {isToggleOn2 ? (
      <div className={styles.container}>
        <Grid container spacing ={3} justify="center">
          <Chart toggled2={isToggleOn2}  />
        </Grid>
      </div>) : null}

      <div className={styles.container}>
        
        <Typography style={{marginBottom: "1%"}} variant="h4" color="textPrimary" align="center" gutterBottom>Basic Protective Measures</Typography>
        <Grid container justify="center">
            <Grid item component={Card}  md={8} >
              <Grid container item spacing={3} style={{ padding: 25 }} >
                  <Grid item xs={12} md={2} >                   
                      <img
                      className={styles.image}
                      alt="Hands"
                      src={Hands}
                      />       
                  </Grid>
                  <Grid item xs={12} md={10} >
                    
                      <Typography style={{fontWeight:500}} variant="h5" color="textPrimary" align="left" gutterBottom>Wash your hands frequently</Typography>
                      <Typography style={{fontWeight:300}} variant="body1" color="textSecondary" align="left" gutterBottom>Regularly and thoroughly clean your hands with an alcohol-based hand rub or wash them with soap and water.</Typography>
                    
                  </Grid>
              </Grid>
              <Grid container item spacing={3} style={{ padding: 25 }} >
                  <Grid item xs={12} md={2} >
                        <img
                        className={styles.image}
                        alt="Handshake"
                        src={Handshake}
                        />
                      
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <Typography style={{fontWeight:500}} variant="h5" color="textPrimary" align="left" gutterBottom>Maintain social distancing</Typography>
                    <Typography style={{fontWeight:300}} variant="body1" color="textSecondary" align="left" gutterBottom>Maintain at least 1 meter distance between yourself and anyone who is coughing or sneezing.</Typography>
                  </Grid>
              </Grid>

              <Grid container item spacing={3} style={{ padding: 25 }}>
                  <Grid item xs={12} md={2}>
                        <img
                        className={styles.image}
                        alt="Mask2"
                        src={Mask2}
                        />                   
                  </Grid>
                  <Grid item xs={12} md={10}>
                      <Typography style={{fontWeight:500}} variant="h5" color="textPrimary" align="left" gutterBottom>Avoid touching eyes, nose and mouth</Typography>
                      <Typography style={{fontWeight:300}} variant="body1" color="textSecondary" align="left" gutterBottom>Hands touch many surfaces and can pick up viruses. Once contaminated, hands can transfer the virus to your eyes, nose or mouth. From there, the virus can enter your body and can make you sick.</Typography>                   
                  </Grid>
              </Grid>

              <Grid container item xs={12} spacing={3} style={{ padding: 25 }}>
                  <Grid item xs={12} md={2}>
                        <img
                        className={styles.image}
                        alt="Mask1"
                        src={Mask1}
                        />
                  </Grid>
                  <Grid item xs={12} md={10}>
                      <Typography style={{fontWeight:500}} variant="h5" color="textPrimary" align="left" gutterBottom>Practice respiratory hygiene</Typography>
                      <Typography style={{fontWeight:300}} variant="body1" color="textSecondary" align="left" gutterBottom>Make sure you, and the people around you, follow good respiratory hygiene. This means covering your mouth &nbsp; and nose with your bent elbow or tissue when you cough or sneeze.</Typography>
                  </Grid>
              </Grid>

              <Grid container item xs={12} spacing={3} style={{ padding: 25 }}>
                  <Grid item xs={12} md={2}>
                        <img
                        className={styles.image}
                        alt="Hospital"
                        src={Hospital}
                        />
                  </Grid>
                  <Grid item xs={12} md={10}>
                      <Typography style={{fontWeight:500}} variant="h5" color="textPrimary" align="left" gutterBottom>If you have fever, cough and difficulty breathing, seek medical care early</Typography>
                      <Typography style={{fontWeight:300}} variant="body1" color="textSecondary" align="left" gutterBottom>Stay home if you feel unwell. If you have a fever, cough and difficulty breathing, seek medical attention and call in advance. Follow the directions of your local health authority.</Typography>
                  </Grid>
              </Grid>

              <Grid container item xs={12} spacing={3} style={{ padding: 25 }}>
                  <Grid item xs={12} md={2}>
                        <img
                        className={styles.image}
                        alt="Helpline"
                        src={Helpline}
                        />
                  </Grid>
                  <Grid item xs={12} md={10}>
                      <Typography style={{fontWeight:500}} variant="h5" color="textPrimary" align="left" gutterBottom>Stay informed and follow advice given by your healthcare provider</Typography>
                      <Typography style={{fontWeight:300}} variant="body1" color="textSecondary" align="left" gutterBottom>Stay informed on the latest developments about COVID-19. Follow advice given by your healthcare provider, your national and local public health authority or your employer on how to protect yourself and others from COVID-19.</Typography>
                  </Grid>
              </Grid>
              <Typography style={{marginBottom: "2%", marginRight:'2%', fontStyle:'italic'}} variant="body2" color="textSecondary" align="right" gutterBottom><a style={{textDecoration:'none'}} href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public" target="_blank" rel="noopener noreferrer">Source WHO</a></Typography>

            </Grid>     
        </Grid>
      </div>

      <div className={styles.container}>
      <Typography style={{marginBottom: "1%"}} variant="h4" color="textPrimary" align="center" gutterBottom>Mexican COVID 19 Helplines</Typography>
        <Grid container justify="center">
            <TableComponent />       
        </Grid>
      </div>

      <div className={styles.container}>
      <Typography style={{marginBottom: "1%"}} variant="h4" color="textPrimary" align="center" gutterBottom>Get the Latest Mexico COVID 19 News</Typography>
          <TweetEmbed/>
      </div>


    </div>
  )
};

export default Cards;