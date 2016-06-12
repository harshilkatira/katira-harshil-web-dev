module.exports = function (app, models) {

    var widgetModel = models.widgetModel;
    var pageModel = models.pageModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": "2", "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": "4", "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.put("/page/:pageId/widget", reorderWidget);

    function uploadImage(req, res) {

        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var pageId        = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var myFile        = req.file;

        if(myFile == null) {
            res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var widget = {
            url: "/uploads/"+filename
        };

        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (stats) {
                    res.redirect("/assignment/#/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
        /*for(var i in widgets){
            if(widgets[i]._id === widgetId){
                widgets[i].url = "/uploads/"+filename;
            }
        }*/
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;

        widgetModel
            .createWidget(pageId, widget)
            .then(
                function (widget) {
                    pageModel
                        .findPageById(pageId)
                        .then(
                            function (page) {
                                page.widgets.push(widget._id);
                                pageModel
                                    .updatePage(pageId, page)
                                    .then(
                                        function (stats) {},
                                        function (error) {}
                                    );
                            },
                            function (error) {

                            }
                        );
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
        /*widget._id = (new Date()).getTime()+"";
        widgets.push(widget);
        res.send(widget);*/
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function (widgets) {
                    res.send(widgets);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
        /*var result = [];
        for(var i in widgets) {
            if(widgets[i].pageId === pageId) {
                result.push(widgets[i]);
            }
        }
        res.json(result);*/
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
        /*for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                res.send(widgets[i]);
                return;
            }
        }
        res.send({});*/
    }
    
    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;

        widgetModel
            .updateWidget(widgetId, widget)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
        /*for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                widgets[i].name = widget.name;
                widgets[i].text = widget.text;
                switch (widget.widgetType){
                    case "HEADER":
                        widgets[i].size = widget.size;
                        break;
                    case "IMAGE":
                    case "YOUTUBE":
                        widgets[i].width = widget.width;
                        widgets[i].url = widget.url;
                        break;
                }
                res.send(200);
                return;
            }
        }
        res.send(400);*/
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;

        widgetModel
            .deleteWidget(widgetId)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
        /*for(var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                res.send(200);
                return;
            }
        }
        res.send(400);*/
    }

    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = req.query['start'];
        var end = req.query['end'];

        widgetModel
            .reorderWidget(pageId, start, end)
            .then(
                function (widgets) {
                    res.json(widgets);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }
};