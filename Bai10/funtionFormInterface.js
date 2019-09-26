var fs = require('fs');
function displaySearchForm(res) {
    var data = fs.readFileSync(__dirname+'/Views/home.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
}
function listTable(obj, res) {
    let tableHeader = '<table border="1px solid black"><tr><th>Id</th><th>New Title</th><th>PublishDate</th><th>Image</th><th>Content</th><th>Author</th><th><a href="/create">Add Item</a></td></tr></th></tr>';
    res.write(tableHeader);
    if (obj.err) {
        res.write('<h5 style="color:red;">Error:: ${obj.err}</h5>');
        res.write('<tr><td colspan="5">Khong tim thay </td></tr>');
    } else {
        if (obj.data.Items.length == 0) {
            res.write('<tr><td colspan="5">khong tim thay</td></tr>');
    }
    obj.data.Items.forEach((tttc) => {
            res.write(`<tr>
                            <td>${tttc.Id}</td>
                            <td>${tttc.NewTitle}</td>
                            <td>${tttc.PublishDate}</td>
                            <td>${tttc.Image}</td>
                            <td>${tttc.Content}</td>
                            <td>${tttc.Author}</td>
                            <td>
                                <a href="/edit?Id=${tttc.Id}&NewTitle=${tttc.NewTitle}&PublishDate=${tttc.PublishDate}&Image=${tttc.Image}&Content=${tttc.Content}&Author=${tttc.Author}">Edit</a>
                                <a href="/delete?year=${tttc.Id}&name=${tttc.NewTitle}">Delete</a>
                            </td>
                        </tr>`);
        });
    }
    res.write('</table>');
    res.end();
}
function addNewForm(res) {
    let data = fs.readFileSync(__dirname+'/Views/create.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
}
function editForm(Id, NewTitle, PublishDate, Image, Content) {
    let data = fs.readFileSync(__dirname+'/Views/update.html', 'utf-8');
    res.writeHead(200, {'Content-Type': 'text/html'});
    data = replaceYearValue(data, Id);
    data = replaceNameValue(data, NewTitle);
    data = replaceTypeValue(data, PublishDate);
    data = replaceAuthorValue(data, Image);
    data = replaceAuthorValue(data, Content);
    data = replaceAuthorValue(data, Author);
    res.write(data);
}
function replaceYearValue(data, year) {
    let str = '<input name="year" type="text" readonly="readonly"/>';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + ` value="${year}" ` + data.substr(index);
}
function replaceNameValue(data, name) {
    let str = '<input name="name" type="text" readonly="readonly"/>';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + ` value="${name}" ` + data.substr(index);
}
function replaceTypeValue(data, type) {
    let str = '<input name="type" type="text"/>';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + ` value="${type}" ` + data.substr(index);
}
function replaceAuthorValue(data, author) {
    let str = '<input name="author" type="text"/>';
    let index = data.indexOf(str) + str.length - 2;
    return data.substr(0, index) + ` value="${author}" ` + data.substr(index);
}
module.exports = {
    displaySearchForm: displaySearchForm,
    addNewForm: addNewForm,
    editForm: editForm,
    listTable: listTable
};
   