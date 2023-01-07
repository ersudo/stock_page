let date = []
let high = []
let low = []
let max_data;
const monthNames = ["January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"
];
    jQuery.getJSON("data.json",function(data){
        // let length = Object.keys(data).length;
            for(let i=0;i<data.length;i++){
                date.push(monthNames[new Date(data[i].date *1000).getMonth()])
                high.push(data[i].high)
                low.push(data[i].low)
            } 
    })
     
    // const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: date,
        datasets: [{
          label: 'high price',
          data: high,
          backgroundColor: 'transparent',
          borderColor: 'red',
          borderWidth: 2
        },
        {
          label: 'low price',
          data: low,
          backgroundColor: 'transparent',
          borderColor: 'blue',
          borderWidth: 2
        }
      ]
      },
      options: {
        elements:{
          line:{
            tension: 0
          }
        },
        scales: {
          y: {
            min :30, 
            suggestedMax :70
          }
        }
      }
    });
