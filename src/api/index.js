import axios from 'axios';

const url = 'https://corona.lmao.ninja/v2'

export const fetchGlobal = async () => {
  try {
    const { data: { cases, recovered, deaths, updated } } = await axios.get(`${url}/all`);
    const modifiedData = { cases, recovered, deaths, updated }

    return modifiedData;
      
  } catch (error) {
    console.log(error);     
  }
}

export const fetchMexico = async () => {
    try {
      const { data } = await axios.get(`${url}/countries/Mexico`);
  
      return data;
      
    } catch (error) {
      console.log(error)
    }
  }

  export const fetchYesterdayMexico = async () => {
    try {
      const { data } = await axios.get(`${url}/countries/Mexico?yesterday=true`);
      console.log(data)
  
      return data;
      
    } catch (error) {
      console.log(error)
    }
  }

  export const fetchDailyData = async () => {
    try {
      const { data: {timeline} } = await axios.get(`${url}/historical/mexico`);
  
      console.log(timeline);
      
      return timeline;
    
    } catch (error) {
      console.log(error)
      
    }
  }

