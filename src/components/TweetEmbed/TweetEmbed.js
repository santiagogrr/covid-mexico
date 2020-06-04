import React from 'react';
import { Grid } from '@material-ui/core';
import { TwitterTimelineEmbed  } from 'react-twitter-embed';
import styles from './TweetEmbed.module.css';



const TweetEmbed = () => {

  return (
    <div>
      <Grid container justify="center">
        <Grid item xs={9} md={3} className = {styles.card} >
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="SSalud_mx"
            options={{height: 700}}
          />  
        </Grid>
        <Grid item xs={9} md={3} className = {styles.card} >
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="OPSOMSMexico"
            options={{height: 700}}
          />  
        </Grid>
        <Grid item xs={9} md={3} className = {styles.card} >
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="Tu_IMSS"
            options={{height: 700}}
          />  
        </Grid>

      </Grid>

    </div>
  )
};

export default TweetEmbed;