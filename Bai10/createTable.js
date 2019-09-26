const AWS = require('aws-sdk');
AWS.config.update({
    region: "local",
    endpoint: "http://localhost:9999"
});
let dynamodb = new AWS.DynamoDB();
let params = {
    TableName: "ThongTinTapChi",
    KeySchema: [
        {AttributeName: "NewTitle", KeyType: "HASH"},
        {AttributeName: "Id", KeyType: "RANGE"}
        
    ],
    AttributeDefinitions: [
        {AttributeName: "NewTitle", AttributeType: "S"},
        {AttributeName: "Id", AttributeType: "S"}
        
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    },
    TableName: "TacGia",
    KeySchema: [
        {AttributeName: "AuthorTitle", KeyType: "HASH"},
        {AttributeName: "AuthorName", KeyType: "RANGE"}
    ],
    AttributeDefinitions: [
        {AttributeName: "AuthorTitle", AttributeType: "S"},
        {AttributeName: "AuthorName", AttributeType: "S"}
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 10,
        WriteCapacityUnits: 10
    }
};
dynamodb.createTable(params, (err, data) => {
    if(err){
        console.error(`Something went wrong ${JSON.stringify(err,null,2)}`);
    }else{
        console.log(`Created table ${JSON.stringify(data, null, 2)}`);
    }
});