const AWS = require('aws-sdk');
const fs = require('fs');
AWS.config.update({
    region: 'local',
    endpoint: 'http://localhost:8000'
});
let docClient = new AWS.DynamoDB.DocumentClient();
console.log('Start importing');
let thongTinTapChi = JSON.parse(fs.readFileSync(__dirname + '/data/ThongTinTapChi.json', 'utf-8'));
let tacGia = JSON.parse(fs.readFileSync(__dirname + '/data/TacGia.json', 'utf-8'));
thongTinTapChi.forEach((tttc) => {
    let params = {
        TableName: "ThongTinTapChi",
        Item: {
            "Id": tttc.Id,
            "NewTitle": tttc.NewTitle,
            "PublishDate": tttc.PublishDate,
            "Image": tttc.Image,
            "Content": tttc.Content,
            "Author": tttc.Author
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            console.error(`Unable to add Thong Tin Tap Chi ${tttc.Id}, ${JSON.stringify(err, null, 2)}`);
        } else {
            console.log(`Thong Tin Tap chi created ${tttc.NewTitle}`);
        }
    });
});
// tacGia.forEach((tg) => {
//     let params = {
//         TableName: "TacGia",
//         Item: {
//             "AuthorTitle": tg.AuthorTitle,
//             "AuthorName": tg.AuthorName,
//             "AuthorAddress": tg.AuthorAddress
//         }
//     };
//     docClient.put(params, (err, data) => {
//         if (err) {
//             console.error(`Unable to add tac Gia ${tg.AuthorTitle}, ${JSON.stringify(err, null, 2)}`);
//         } else {
//             console.log(`Tac Gia created ${tg.AuthorName}`);
//         }
//     });
//});