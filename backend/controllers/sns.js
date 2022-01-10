const exec = require('child_process').exec;
const helper = require('./helper');
const SNS = require('../models/sns');

exports.fetch = async (req, res, next) => {

    const name = req.body.name;
    console.log("name", name)
    try {
        const snss = await SNS.findByName(name);
        if (snss[0].length == 0) {
            const error = new Error('No sns found.');
            error.statusCode = 401;
            throw error;
        } else {
            console.log("SNSs found", snss[0][0]);
        }

        res.status(200).json({ data: snss[0], message: "successfully fetched data" });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.fetchAll = async (req, res, next) => {

    try {
        const snss = await SNS.fetchAll();
        if (snss[0].length == 0) {
            const error = new Error('No sns found.');
            error.statusCode = 401;
            throw error;
        } else {
            console.log("SNSs found", snss[0][0]);
        }

        res.status(200).json({ data: snss[0], message: "successfully fetched all snss data" });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.create = async (req, res, next) => {

    const name = req.body.name;
    const model = req.body.model;
    const snsTopic = req.body.snsTopic;
    const command = helper.getCommandForSNS(name, snsTopic, model)
    try {

        const snsDetails = {
            name: name,
            snsTopic: snsTopic,
            command: command
        };

        const sns = await SNS.findByName(name);

        if (sns[0].length !== 0) {
            console.log("sns found", sns[0][0].name);
            const result = await SNS.update(sns[0][0].id, snsDetails);

        } else {
            const result = await SNS.save(snsDetails);
        }


        res.status(201).json({ message: 'SNS registered!' });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

exports.update = async (req, res, next) => {

    const name = req.body.name;
    const model = req.body.model;
    const snsTopic = req.body.snsTopic;
    const command = helper.getCommandForSNS(name, snsTopic, model)

    try {

        const snsDetails = {
            name: name,
            snsTopic: snsTopic,
            command: command
        };

        const sns = await SNS.findByName(name);


        if (sns[0].length == 0) {
            const error = new Error('A sns with this name could not be found.');
            error.statusCode = 401;
            throw error;
        } else {
            console.log("SNS found", sns[0][0].name);
        }

        const result = await SNS.update(sns[0][0].id, snsDetails);
        res.status(201).json({ message: 'SNS updated!' });

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

        const sns = await SNS.findByName(name);

        if (sns[0].length == 0) {
            const error = new Error('A sns with this name could not be found.');
            error.statusCode = 401;
            throw error;
        } else {
            console.log("SNS found", sns[0][0].name);
        }
        const command = sns[0][0].command

        const child = exec(command,
            (error, stdout, stderr) => {
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                if (error !== null) {
                    console.log(`exec error: ${error}`);
                    const errorForApi = new Error('error uploading sns: ', error);
                    errorForApi.statusCode = 401;
                    throw errorForApi;
                }
                res.status(200).json({ message: "successfully triggered sns:" + name });
            });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};


