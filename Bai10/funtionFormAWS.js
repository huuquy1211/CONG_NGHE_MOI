const aws = require('aws-sdk');
const form_functions = require(__dirname+'/funtionFormInterface.js');
aws.config.update({
    region: "local",
    endpoint: "http://localhost:8000"
});
let docClient = new aws.DynamoDB.DocumentClient();
function getAllItems(res) {
    let params = {
        TableName: "ThongTinTapChi"
    };
    let scanObject = {};
    docClient.scan(params, (err, data) => {
        if (err) {
            scanObject.err = err;
        } else {
            scanObject.data = data;
        }
        form_functions.listTable(scanObject, res);
    });
}
function searchItems(NewTitle, res) {
    console.log(NewTitle);
    let params = {
        TableName: 'ThongTinTapChi'
    };
    let queryObject = {};
    if (NewTitle) {
        params.KeyConditionExpression = '#NewTitle = :NewTitle';
        params.ExpressionAttributeNames = {'#NewTitle': 'NewTitle'};
        params.ExpressionAttributeValues = {':NewTitle': String(NewTitle)};
        docClient.query(params, (err, data) => {
            if (err) {
                queryObject.err = err;
            } else {
                queryObject.data = data;
            }
            console.log("Query succeeded.");
            console.log(data);
            form_functions.listTable(queryObject, res);
        });
    }
}
function createItem(Id, NewTitle, PublishDate, Image, Content,Author, res) {
    let params = {
        TableName: 'ThongTinTapChi',
        Item: {
            Id: String(Id),
            NewTitle: String(NewTitle),
            PublishDate: String(PublishDate),
            Image: String(Image),
            Content: String(Content),
            Author: String(Author)
        }
    };
    docClient.put(params, (err, data) => {
        if (err) {
            form_functions.addNewForm(res);
            res.write('<h5 style="color:red;">All fields are required!</h5>');
        }
        else {
            res.writeHead(302, { 'Location': '/' });
        }
        res.end();
    });
}
function updateItem(Id, NewTitle, PublishDate, Image, Content,Author) {
    let params = {
        TableName: 'ThongTinTapChi',
        Key: {
            "Id": String(Id),
            "NewTitle": String(NewTitle)
        },
        UpdateExpression: "set #p = :PublishDate, #i = :Image, #c = :Content, #a = :Author",
        ExpressionAttributeNames: {
            '#p': 'PublishDate',
            '#i': 'Image',
            '#c': 'Content',
            '#a' : 'Author'
        },
        ExpressionAttributeValues: {
            ':PublishDate': String(PublishDate),
            ':Image': String(Image),
            ':Content': String(Content),
            ':Author' : String(Author)
        },
        ReturnValues: "UPDATED_NEW"
    };
 docClient.update(params, (err, data) => {
    if (err) {
        form_functions.editForm(year, name, type, author, res);
        res.write('<h5 style="color:red;">All fields are required!</h5>');
    } else {
        res.writeHead(302, { 'Location': '/' });
    }
    res.end();
 })
}
function deleteItem(Id, NewTitle, res) {
    let params = {
        TableName: 'ThongTinTapChi',
        Key: {
            "Id": String(Id),
            "NewTitle": String(NewTitle)
        }
    };
    docClient.delete(params, (err, data) => {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            res.writeHead(302, { 'Location': '/' });
        }
        res.end();
    });
}
module.exports = {
    getAllItems: getAllItems,
    searchItems: searchItems,
    createItem: createItem,
    updateItem: updateItem,
    deleteItem: deleteItem
};
