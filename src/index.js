const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const cookieparser = require('cookie-parser');
const route = require('./routes');
const db = require('./config/db');
const app = express();
app.use(cookieparser('onetowthreefourfivesix'));
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', exphbs({
    extname: '.hbs',
    helpers: {
        sum: (a, b)=>a+b,
        pagination: ( total, size, page ) =>{
            var pages = Math.ceil(total / size); 
            let out = `<ul class="pagination2">
            `;
            for (var i = 1; i <= pages;i++){
                if (i == page){
                  out = out + `
               <li class="page-item2 active2">
                    <a class="page-link2" href ="?page=`+i+`">`+i+`</a>
               </li>
               `   }else{
                out = out + `
                <li class="page-item2">
                     <a class="page-link2" href ="?page=`+i+`">`+i+`</a>
                </li>
                `
               }
            }
                return out + `
            </ul>`;
        },
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

route(app);
const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));