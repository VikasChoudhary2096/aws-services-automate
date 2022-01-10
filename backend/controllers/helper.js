exports.getCommandForLambda = function (name, dir) {
    return "cd " + dir + " && aws lambda update-function-code --function-name " + name + " --zip-file fileb://" + "main.zip";
}

exports.getCommandForSNS = function (name, snsTopic, model) {
    return `aws sns publish --topic-arn ${snsTopic} --message '{"type":${name}, "isCron":false ,"model":${model}}'`;
}