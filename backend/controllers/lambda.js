const exec = require('child_process').exec;
const helper = require('./helper');
const Lambda = require('../models/lambda');

exports.fetch = async (req, res, next) => {

    const name = req.body.name;
    console.log("name", name)
    try {
        const lambdas = await Lambda.findByName(name);
        if (lambdas[0].length == 0) {
            const error = new Error('No lambda found.');
            error.statusCode = 401;
            throw error;
        } else {
            console.log("Lambdas found", lambdas[0][0]);
        }

        res.status(200).json({ data: lambdas[0], message: "successfully fetched data" });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchAll = async (req, res, next) => {

    try {
        const lambdas = await Lambda.fetchAll();
        if (lambdas[0].length == 0) {
            const error = new Error('No lambda found.');
            error.statusCode = 401;
            throw error;
        } else {
            console.log("Lambdas found", lambdas[0][0]);
        }

        res.status(200).json({ data: lambdas[0], message: "successfully fetched all lambdas data" });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.create = async (req, res, next) => {

    const name = req.body.name;
    const dir = req.body.dir;
    const command = helper.getCommandForLambda(name, dir)
    try {

        const lambdaDetails = {
            name: name,
            dir: dir,
            command: command
        };

        const lambda = await Lambda.findByName(name);

        if (lambda[0].length !== 0) {
            console.log("lambda found", lambda[0][0].name);
            const result = await Lambda.update(lambda[0][0].id, lambdaDetails);

        } else {
            const result = await Lambda.save(lambdaDetails);
        }


        res.status(201).json({ message: 'Lambda registered!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.update = async (req, res, next) => {

    const name = req.body.name;
    const dir = req.body.dir;
    const command = helper.getCommandForLambda(name, dir)
    try {

        const lambdaDetails = {
            name: name,
            dir: dir,
            command: command
        };

        const lambda = await Lambda.findByName(name);


        if (lambda[0].length == 0) {
            const error = new Error('A lambda with this name could not be found.');
            error.statusCode = 401;
            throw error;
        } else {
            console.log("Lambda found", lambda[0][0].name);
        }

        const result = await Lambda.update(lambda[0][0].id, lambdaDetails);
        res.status(201).json({ message: 'Lambda updated!' });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.execute = async (req, res, next) => {

    const name = req.body.name;
    try {

        const lambda = await Lambda.findByName(name);

        if (lambda[0].length == 0) {
            const error = new Error('A lambda with this name could not be found.');
            error.statusCode = 401;
            throw error;
        } else {
            console.log("Lambda found", lambda[0][0].name);
        }
        const command = lambda[0][0].command

        const child = exec(command,
            (error, stdout, stderr) => {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                    const errorForApi = new Error('error uploading lambda: ', error);
                    errorForApi.statusCode = 401;
                    throw errorForApi;
                }
                res.status(200).json({ message: "successfully updated lambda:" + name + " zip on aws" });
            });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


