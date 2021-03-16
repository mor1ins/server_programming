const express = require('express');
const handlebars = require('express-handlebars');
const request = require('request');

const app = express();
const port = 5000;


const state = {
    menu: [
        { href: 'home', active: false, title: 'Home' },
        { href: 'about-us', active: false, title: 'About us' },
        { href: 'our-services', active: false, title: 'Our Services' },
        { href: 'portfolio', active: false, title: 'Portfolio' },
        { href: 'features', active: false, title: 'Features' },
        { href: 'testimonials', active: false, title: 'Testimonials' },
        { href: 'pricing', active: false, title: 'Pricing' },
        { href: 'contact', active: false, title: 'Contact' },
    ]
};


function render_reviews(options) {
    return app.locals.reviews.map(item => options.fn(item)).join('\n');
}


function set_active(new_active) {
    state.menu = state.menu.map(({href, active, title}) => {
        return { href: href, active: new_active === href, title: title, };
    });
}


app.use(express.static('public'));
app.engine(
    'handlebars',
    handlebars({
        defaultLayout: 'main',
        helpers: {
            render_reviews: render_reviews,
        }
    })
);

app.set('views', './views');
app.set('view engine', 'handlebars');


app.use((req, res, next) =>{
    request.get({
       url: 'http://localhost:3000/reviews',
       json: true,
   }, (err, res, data) => {
        app.locals.reviews = (err || res.statusCode !== 200) ? [] : data;
   });

   next();
});


app.get('/', (req, res) => {
    set_active('home');
    res.render('home', {
        menu: state.menu,
    });
});


state.menu.map(({href, active, title}) => {
    app.get(`/${href}`, (req, res) => {
        set_active(href);
        res.render(href, {
            menu: state.menu,
            title: title,
            white_style: href === 'testimonials',
            advanced_feature: href === 'features',
        });
    });
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
