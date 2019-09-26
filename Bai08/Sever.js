var http = require('http');
var url = require('url');
var port = 9999;
var form_function = require('./function_form'); // Các hàm xử lý giao diện
var aws_function = require('./function_aws'); // Các hàm thao tác với NoSQL
http.createServer((req, res) => {
    let urlObject = url.parse(req.url, true);
    let pathName = urlObject.pathname;
    let data = urlObject.query;
    let year = data.year;
    let name = data.name;
    let type = data.type;
    let author = data.author;
    if (pathName === "/") {
        form_function.displaySearchForm(res);
        aws_function.getAllItems(res);
    }
    else if (pathName === '/search') {
        if (!year && !name) {
            res.writeHead(302, { 'Location': '/' });
            res.end();
        }
        else {
            form_function.displaySearchForm(res);
            aws_function.searchItems(year, name, res);
        }
    }
    else if (pathName === '/new') {
        form_function.addNewForm(res);
        res.end();
    }
    else if (pathName === '/create') {
        aws_function.createItem(year, name, type, author, res);
    }
    else if (pathName === '/edit') {
        form_function.editForm(year, name, type, author, res);
        res.end();
    }
    else if (pathName === '/save') {
        aws_function.updateItem(year, name, type, author, res);
    }
    else if (pathName === '/delete') {
        aws_function.deleteItem(year, name, res);
    }
}).listen(port, () => {
    console.log(`Server starting at port ${port}`);
});
