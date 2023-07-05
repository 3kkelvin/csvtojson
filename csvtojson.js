
const fs = require('fs');
const csv = require('csv-parser');

const inputFilePath = '20220707142734.csv'; // 更換為您的CSV文件的路徑
const outputFilePath = 'TA.json'; // 更換為您想要輸出JSON文件的路徑

const keyMap = {
  '發生年度': 'year',
  '發生月份': 'month',
  '發生日期': 'date',
  'GPS經度': 'gpsLongitude',
  'GPS緯度': 'gpsLatitude',
  '案件類別名稱': 'caseCategory',
  '事故類別名稱': 'accidentCategory',
  '發生縣市名稱': 'city',
  '發生市區鄉鎮名稱': 'town',
  '處理單位名稱分局層': 'policeSubstation',
  '24小時內死亡人數': 'deathWithin24Hrs',
  '受傷人數': 'injured',
  '天候名稱': 'weather',
  '光線名稱': 'light',
  '道路型態大類別名稱': 'roadTypeMainCategory',
  '道路型態子類別名稱': 'roadTypeSubCategory',
  '事故位置大類別名稱': 'accidentLocationMainCategory',
  '事故位置子類別名稱': 'accidentLocationSubCategory',
  '事故類型及型態大類別名稱': 'accidentTypeMainCategory',
  '事故類型及型態子類別名稱': 'accidentTypeSubCategory',
  '肇因研判大類別名稱-主要': 'causeMainCategory',
  '肇因研判子類別名稱-主要': 'causeSubCategory',
  '當事者區分（類別）大類別名稱（車種）': 'partyTypeMainCategory',
  '當事者區分（類別）子類別名稱（車種）': 'partyTypeSubCategory',
  '旅次目的名稱': 'tripPurpose',
  '牌照種類名稱': 'licensePlateType',
  '肇事原因（或違規事實）': 'accidentCause',
};

const jsonArray = [];

fs.createReadStream(inputFilePath)
  .pipe(csv({ separator: ',' })) // 假設CSV文件使用逗號分隔符
  .on('data', (row) => {
    const transformedRow = {};

    for (const key in row) {
      if (key in keyMap) {
        transformedRow[keyMap[key]] = row[key];
      } else {
        transformedRow[key] = row[key];
      }
    }

    jsonArray.push(transformedRow);
  })
  .on('end', () => {
    const jsonData = JSON.stringify(jsonArray, null, 2);

    fs.writeFile(outputFilePath, jsonData, (err) => {
      if (err) throw err;
      console.log('CSV轉換為JSON成功，已保存至: ' + outputFilePath);
    });
  });