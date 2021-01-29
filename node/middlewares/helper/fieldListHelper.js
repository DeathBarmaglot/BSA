const  testFieldsList = (model, reqList) => {
    let errText = "";
    const fieldsUser = Object.keys(model);
    fieldsUser.splice(0, 1);
    const fieldsBody = Object.keys(reqList);
    let errTextA = "";
    fieldsUser.forEach(userField => {
        if (fieldsBody.indexOf(userField) < 0) errTextA += userField+" ";
    })
    if (errTextA !== "") errText = "No fields in request : "+errTextA+"\n";
    errTextA = "";
    let errTextB = "";
    fieldsBody.forEach(bodyField => {
        if (fieldsUser.indexOf(bodyField) < 0) errTextA += bodyField+" ";
        if (reqList[bodyField] === "") errTextB += "\n --- "+ bodyField;
    })
    if (errTextA !== "") errText += "Extra fields in request : "+errTextA+"\n";
    if (errTextB !== "") errText += "Empty fields in request : "+errTextB+"\n";
    return errText;
}

exports.testFieldsList = testFieldsList;