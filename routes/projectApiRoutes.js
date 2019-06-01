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

    // get list from database of objects
    // ----------------------------
    // Project.findAll({attributes: ['title']}).on('success', function (projects) {
    //     console.log(projects);
    //   });

    app.get("/index", function (req, res) {
        // console.log("page load");
        //    db.Project.findAll({attributes: ['url']}).then(function (projects) {
        //     console.log(projects);

        //   });
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
            // console.log(files);

            res.render("index", hbsObject);

        });
    });
    // -------------------


    // app.get("/api/projects/:title/:oName", function (req, res) {
    //     const s3 = new aws.S3();

    //     db.Project.findOne({
    //         where: {
    //             title: req.params.title,
    //             oName: req.params.oName,
    //         },
    //         include: [db.User]
    //     }).then(function (dbProject) {
    //         res.json(dbProject);
    //     });
    // });

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

                // db.User.findOne({
                //     where: {
                //         username: newProject.oName,
                //     }
                // }).then(function (dbUser) {
                //     let projects = dbUser.pNames;
                //     console.log("\n\n\n" + projects + "\n\n\n");
                //     if (projects === "null" || projects === null)
                //         projects = newProject.title + ",";
                //     else
                //         projects += newProject.title + ",";

                //     db.User.update(
                //         { pNames: projects },
                //         { returning: true, where: { username: newProject.oName } }
                //     ).then(function (data) {
                //         console.log(data);
                //     });
                // })

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