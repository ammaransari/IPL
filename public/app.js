function fetchAndVisualizeData() {
    fetch("./data.json")
      .then(r => r.json())
      .then(visualizeData);
  }
  fetchAndVisualizeData();
 
function visualizeData(data) {
  visualizeNoOfMatchesWonByEachTeam(data.noOfMatchesWonByEachTeam);
  visualizeMaxRunConsededByEachTeam(data.maxRunConsededByEachTeam);
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeTopTenEconomicalBowlers(data.topTenEconomicalBowlers);
  visualizeMatchesPlayedByEachTeamPerVenue(data.matchesPlayedByEachTeamPerVenue);
    
    return;
  }
  
  function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
    const seriesData = [];
    for (let year in matchesPlayedPerYear) {
      seriesData.push([year, matchesPlayedPerYear[year]]);
    }
  
    Highcharts.chart('matches-played-per-year', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Matches Played Per Year'
      },
      subtitle: {
          text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population"></a>'
      },
      xAxis: {
          type: 'category',
          labels: {
              rotation: -45,
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Population (millions)'
          }
      },
      legend: {
          enabled: false
      },
      tooltip: {
          pointFormat: 'Population in 2017: <b>{point.y:.1f} millions</b>'
      },
      series: [{
          
            name: 'year',
             data: seriesData,
          
          dataLabels: {
              enabled: true,
              rotation: 360,
              color: '#FFFFFF',
              align: 'center',
              format: '{point.y:.1f}', // one decimal
              y: 10, // 10 pixels down from the top
              
          }
      }]
  });
}
//    function fetchAndVisualizeData() {
//     fetch("./data.json")
//      .then(r => r.json())
//      .then(visualizeData);
//   }
//    fetchAndVisualizeData();
  
 
// function visualizeData(data) {
//     visualizeNoOfMatchesWonByEachTeam(data.noOfMatchesWonByEachTeam);
//     return;
//   }
  
function visualizeNoOfMatchesWonByEachTeam(data) {
  let teamobj = {};
  let count = 0;
  for (let eachyear in data) {
    count++;
    for (let eachteam in data[eachyear]) {
      if (eachteam in teamobj) {
        teamobj[eachteam].push(data[eachyear][eachteam]);
        console.log(data[eachyear][eachteam]);
      } else {
        teamobj[eachteam] = [];
        for (let i = 1; i < count; i++) {
          teamobj[eachteam].push(0);
        }
        teamobj[eachteam].push(data[eachyear][eachteam]);
      }
    }
  }
console.log("teamobj=",teamobj);
  let arr = [];
  for (let each in teamobj) {
    let x = {};
    x["name"] = each;
    x["data"] = teamobj[each];
    arr.push(x);
  }
  console.log("arr=",arr);

Highcharts.chart("no-of-matches-won-by-each-team", {
chart: {
    type: 'column'
},
title: {
    text: 'No of matches won by each team'
},
subtitle: {
    text: 'Source: WorldClimate.com'
},
xAxis: {
    categories: Object.keys(data),
    crosshair: true
},
yAxis: {
    min: 0,
    title: {
        text: "Matches Won"
    }
},
tooltip: {
    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} matches</b></td></tr>',
    footerFormat: '</table>',
    shared: true,
    useHTML: true
},
plotOptions: {
    column: {
        pointPadding: 0.2,
        borderWidth: 0
    }
},
series: arr
});

}
  
  function visualizeMaxRunConsededByEachTeam(data)
  {
    var chart = Highcharts.chart("max-run-conceded-by-each-team", {
  
      title: {
          text: "Max runs conceded by Teams in 2016"
      },
    
      subtitle: {
          text: "Source: Csv data released by IPL"
      },
    
      xAxis: {
        categories: Object.keys(data),
        crosshair: true
      }
    , yAxis: {
      min: 0,
      title: {
        text: "Runs"
      }
    }
    ,
    
      series: [
        {
          name: "Max runs conceded",
          data: Object.values(data)
        }
      ]
    
    
    });
    
    
    
  }

  function visualizeTopTenEconomicalBowlers(data)
{//console.log("Eco data",data);
Highcharts.chart("top-ten-economical-bowlers", {
  chart: {
      type: 'column'
  },
  title: {
      text: 'TOP TEN ECONOMICAL BOWLERS IN 2015'
  },
  subtitle: {
      text: 'Source: <a href="http://en.wikipedia.org/wiki/List_of_cities_proper_by_population"></a>'
  },
  xAxis: {
      categories:Object.keys(data),
      crosshair: true
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Economy Rate'
      }
  },
  legend: {
      enabled: false
  },
  
  series:[{
    data: Object.values(data),
    name: 'Economy Rate',
    showInLegend: true,
    dataLabels: {
        enabled: true,
        rotation: 360,
        color: '#FFFFFF',
        align: 'center',
       // format: '{point.y:.1f}', // one decimal
        y: 10}
}]
  
});
  }
  
  function visualizeMatchesPlayedByEachTeamPerVenue(data)
  {
    let teamobj1 = {};
    let count1 = 0;
    for (let eachvenue in data) {
      count1++;
      for (let eachteam in data[eachvenue]) {
        if (eachteam in teamobj1) {
          teamobj1[eachteam].push(data[eachvenue][eachteam]);
          console.log(data[eachvenue][eachteam]);
        } else {
          teamobj1[eachteam] = [];
          for (let i = 1; i < count1; i++) {
            teamobj1[eachteam].push(0);
          }
          teamobj1[eachteam].push(data[eachvenue][eachteam]);
        }
      }
    }
  console.log("teamobj=",teamobj1);
    let arr1 = [];
    for (let each in teamobj1) {
      let x = {};
      x["name"] = each;
      x["data"] = teamobj1[each];
      arr1.push(x);
    }
    console.log("arr=",arr1);

    Highcharts.chart('matches-played-by-each-team-per-venue', {
      chart: {
          type: 'bar'
      },
      title: {
          text: 'Story : Matches Played By Each Team Per Venue'
      },
      xAxis: {
          categories:Object.keys(data),
          crosshair: true
          
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Match Played By Each Team'
          }
      },
      legend: {
          reversed: true
      },
      plotOptions: {
          series: {
              stacking: 'normal'
          }
      },
      series: 
        arr1
      
      
  });
}