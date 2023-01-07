const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT | 3000 // 3000 번 포트 
const fs = require('fs');
let path = require('path');

app.use(cors())
app.use(bodyParser.json())
// app.use(express.static(__dirname + '/public' ));
app.use(express.static(__dirname))
app.get('/',function(req,res) {
   // res.json('checking browser working')  
   res.sendFile(__dirname+'/chart_page.html')
})

app.get('/resume',function(req,res) {
    // res.header("Content-Type",'application/json');   // 파일을 단순하게 웹쪽에 올려주는 형태 
    //res.sendFile(path.resolve('data.json'));
    res.sendFile(__dirname+'/resume/resume.html')
 })
app.listen(port,()=>{
    console.log(`express is running on ${port}`)
})



app.use(cors({
    origin: port, // 접근 권한을 부여하는 도메인
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
}));

var yahooStockPrices = require('yahoo-stock-prices')
const yahooFinance = require('yahoo-finance2').default
// import yahooFinance from 'yahoo-finance2'

// var localStorage = require('node-localstorage').localStorage;
const date = new Date()
let day = date.getDate()
let month = date.getMonth() + 1
let year = date.getFullYear()
let currnetDate = `${day}/${month}/${year}`

let sday = day;
let smonth = month - 1;
let syear = year;

let sDate = `${sday}/${smonth}/${syear}`

let filesave = require('fs/promises')
const TSMC =  async function()
{
    const data = await  yahooStockPrices.getCurrentData('TSM')
    console.log(data)
    console.log(currnetDate)

    console.log(sDate)
    // const prices = await yahooStockPrices.getHistoricalPrices(smonth,sday,syear,month,day,year,'TSM','1d') // it has limit with day / month 
    const prices = await yahooStockPrices.getHistoricalPrices(1,1,2019,1,1,2020,'TSM','1d') // example
    // console.log(prices)
    const after_stringify_data = JSON.stringify(prices)
    filesave.writeFile("data.json", after_stringify_data)    
    const finance_data = JSON.parse(after_stringify_data)
    for(let i = 0; i<finance_data.length; i++)
        console.log(new Date(finance_data[i].date *1000))
}
// TSMC();

const AAPL =  async function()
{
    const data = await  yahooStockPrices.getCurrentData('AAPL')
    console.log(data)
    console.log(currnetDate)

    console.log(sDate)
    // const prices = await yahooStockPrices.getHistoricalPrices(smonth,sday,syear,month,day,year,'TSM','1d') // it has limit with day / month 
    const prices = await yahooStockPrices.getHistoricalPrices(1,1,2019,1,1,2020,'AAPL','1d') // example
    // console.log(prices)
    const after_stringify_data = JSON.stringify(prices)
    filesave.writeFile("AAPLStock.json", after_stringify_data)    
    const finance_data = JSON.parse(after_stringify_data)
    for(let i = 0; i<finance_data.length; i++)
        console.log(new Date(finance_data[i].date *1000))
}
const AMD =  async function()
{
    const query = 'AMD';
    const queryOptions = { period1: '2021-02-01',interval:'1d'}
    const prices = await yahooFinance.historical(query, queryOptions);
    const after_stringify_data = JSON.stringify(prices)
    filesave.writeFile("AMD.json", after_stringify_data)    
    const finance_data = JSON.parse(after_stringify_data)
}
// AMD()
// AAPL()