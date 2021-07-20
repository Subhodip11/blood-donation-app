const express = require('express');
const donerRoutes = express.Router();
const donerData = require('./model/donerCard');
const bodyParser = require('body-parser');
donerRoutes.use(bodyParser.urlencoded({ extended: true }));

donerRoutes.get('/index/donerDB', (req, res) => {

    res.render('regd.ejs');
})

donerRoutes.get('/index', (req, res) => {
    res.render('index1.ejs');
})
donerRoutes.get('/index/searchDB', (req, res) => {
    donerData.find({}).then(data => {
        res.render('search2.ejs', { data: data });
    }).catch(err => {
        console.log(err);
    })
})

donerRoutes.get('/index/searchDB/searchResults', (req, res) => {

        let searchQuery = { blood_group: String(req.query.blood_group).trim() };

        donerData.find(searchQuery).then(data => {
            console.log(data.forEach(ele => { console.log(ele.blood_group) }));
            res.render('search2.ejs', { data: data });
        }).catch(error => {
            console.log(error);
        })


    })
    //admin login process starts here
donerRoutes.get('/index/adminLogin', (req, res) => {
    res.render('login1.ejs');
})

donerRoutes.get('/index/adminLogin/details/DB/edit', (req, res) => {
    donerData.find({}).then(data => {
        res.render('emp.ejs', { doner: data });
    }).catch(err => {
        console.log(err);
    })
})
let check = false;
donerRoutes.get('/index/adminLogin/DB', (req, res) => {
    let user = String(req.query.username),
        pass = String(req.query.password);
    console.log()
    if (user === 'subravmat' && pass === 'subravmat@123') {
        res.redirect('/index/adminLogin/details/DB');
    } else {
        res.send('404 Not Found')
    }
})
donerRoutes.get('/index/adminLogin/details/DB', (req, res) => {
        donerData.find({}).then(data => {
            // req.flash('success_mssg', 'Login successfull');
            res.render('emp.ejs', { doner: data });
        }).catch(err => {
            console.log(err);
        })

    })
    //admin login process ends here

donerRoutes.get('/index/donerDB/details', (req, res) => {
    donerData.find({}).then(data => {
        console.log(data);
        res.render('emp1.ejs', { doner: data })
    }).catch(err => {
        console.log(err);
    })

})

donerRoutes.get('/index/donerDB/details/DB/edit/:id', (req, res) => {
    let search = { _id: req.params.id };

    donerData.findOne(search)
        .then(data => {
            res.render('edit.ejs', { doner: data })
        })
        .catch(error => {
            console.log(error);
        })
})

//post request 
donerRoutes.post('/index/donerDB', (req, res) => {
    let new_doner = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        contact: req.body.contact,
        address: req.body.address,
        blood_group: req.body.blood_group,
        gender: req.body.gender
    }

    donerData.create(new_doner).then(data => {
        res.redirect('/index/donerDB/details');
    }).catch(err => {
        console.log(err);
    })

})

//put request
donerRoutes.put('/index/donerDB/details/DB/edit/:id', (req, res) => {
    let search = { _id: req.params.id };

    donerData.updateOne(search, {
            $set: {
                fname: req.body.fname,
                lname: req.body.lname,
                blood_group: req.body.blood_group,
                gender: req.body.gender,
                email: req.body.email,
                contact: req.body.contact,
                address: req.body.address
            }
        })
        .then(data => {
            res.redirect('/index/adminLogin/details/DB/edit');
        })
        .catch(err => {
            console.log(err);
        })
})

//delete request
donerRoutes.delete('/index/donerDB/details/DB:id', (req, res) => {
    let search = { _id: req.params.id };
    donerData.remove(search)
        .then(data => {

            res.redirect('/index/adminLogin/details/DB');
        })
        .catch(error => {
            console.log(error);
        })
})
module.exports = donerRoutes;