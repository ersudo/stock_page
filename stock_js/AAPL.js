xmlhttp = new XMLHttpRequest()
url = "http://localhost:3000/stockData/AAPLStock.json"
xmlhttp.open("GET",url,true)
xmlhttp.send()
xmlhttp.onreadystatechange =function(){
   if(this.readyState == 4 && this.status == 200){
    let data = JSON.parse(this.responseText)
    // console.log(data)
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
   ];

    let dates = data.map(function(elem){
        return monthNames[new Date(elem.date *1000).getMonth()]
    })
    let high = data.map(function(elem){
        return elem.high
    })
    let low = data.map(function(elem){
        return elem.low
    })
    let max_data = high.map(function(elem){
        return elem
    })
    let min_data = low.map(function(elem){
        return elem
    })
    let max =0;
    for(let i =0;i<max_data.length; i++){
            if(max<max_data[i])
                max = max_data[i]
    }
    let min = max
    for(let i =0;i<min_data.length; i++){
        if(min> min_data[i])
            min = min_data[i]
    }

    const ctx = document.getElementById('AAPLChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: dates,
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
        // maintainAspectRatio: false,
        // responsive: true,
        elements:{
          line:{
            tension: 0
          }
        },
        scales: {
          y: {
            min :min,
            Max :max
          }
        }
      }
    });
   }
}

