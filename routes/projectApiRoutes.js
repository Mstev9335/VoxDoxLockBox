require("express-fileupload");
const db = require("../models");
const aws = require('aws-sdk');
const dotenv = require('dotenv');



dotenv.config();
aws.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});



module.exports = function (app) {
    app.get("/api/projects", function (req, res) {
        let query = {};
        if (req.query.oName) {
            query.oName = req.query.oName;
        }

        db.Project.findAll({
            where: query,
            include: [db.User],
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });



    app.get("/index", function (req, res) {

    });

    app.get("/", function (req, res) {
        console.log("console data");
        db.Project.findAll({ attributes: ['title', 'url'] }).then(function (projects) {

            //  db data consoled
            // console.log(projects['title']);
            var hbsObject = { files: projects };
            for (var i = 0; i < projects.length; i++) {
                // console.log(projects[i]['url']);
                var url = projects[i]['url'];


            }


            res.render("index", hbsObject);

        });
    });



    app.post("/api/projects", function (req, res) {
        const s3 = new aws.S3();

        console.log(req.files[0]);

        let file = req.files[0];
        let buffer = file.buffer;

        let params = {
            Bucket: 'teamawesome55',
            ACL: 'public-read',
            Body: buffer,
            Key: req.body.description + "/" + req.body.title + "/" + file.originalname,
        }

        s3.upload(params, function (err, data) {
            if (err) throw err;
            if (data) {
                console.log(data);
                let newProject = {
                    title: req.body.title,
                    description: req.body.description,
                    url: data.Location,
                }



                db.Project.create(newProject).then(function (dbProject) {
                    res.json(dbProject);
                });
                res.redirect('/');
            }
        });
    });

    app.delete("/api/projects/:title", function (req, res) {
        db.Project.destroy({
            where: {
                title: req.params.title
            }
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.put("/api/projects", function (req, res) {
        db.Project.update(
            req.body,
            {
                where: {
                    title: req.body.title
                }
            }).then(function (dbProject) {
                res.json(dbProject);
            });
    });
}