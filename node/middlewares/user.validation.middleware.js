const { user } = require('../models/user');
const { UserRepository } = require('../repositories/userRepository');
const { testFieldsList } = require('./helper/fieldListHelper');

function testPhoneNumber(phone) {
    let errText = "";
    let mode = false;
    let i = 0;
    let len = 0;
    let skob = 0;
    let errSimb = "";
    if (phone.charAt(0) === "+") {
        mode = true;
        i = 1;
    }
    for (; i < phone.length; i++) {
        switch(phone.charAt(i)) {
            case " ":
            case "-": 
                break
            case "(":
                if (skob == 0) skob = 1
                else errSimb = phone.charAt(i);
                break;
            case ")":
                if (skob == 1) skob = 2
                else errSimb = phone.charAt(i);
                break;
            case "0": 
            case "1": 
            case "2": 
            case "3": 
            case "4": 
            case "5": 
            case "6": 
            case "7": 
            case "8": 
            case "9": 
                len++;
                break;
            default:
                errSimb = phone.charAt(i);
        }
        if (errSimb !== "") break;
    }
    if (errSimb !== "") errText += '\n incorrect simbol "'+errSimb+'" in phone'
    else 
        if (((mode)&&(len < 12))||((!mode)&&(len<10))) errText += '\n phone is too short'
        else
        if (((mode)&&(len > 12))||((!mode)&&(len>10))) errText += '\n phone is too long'
        else ;
    return errText;
}

const createUserValid = (req, res, next) => {
    try {
        if (req.body) {
            let errText= testFieldsList(user, req.body);
            if (errText !== "") {
                res.data = {
                      error: true,
                    message: errText,
                     status: 400            
                }
                next();
            }
            const poss = req.body.email.indexOf("@");
            const tail = req.body.email.substr(poss+1);
            const client = UserRepository.getOne((item)=>{ return ((item.firstName === req.body.firstName)&&(item.lastName === req.body.lastName)) });
            if (client) errText = "\n this user is already registered : "+req.body.firstName+"  "+req.body.lastName;
            if ((poss <= 0)||(tail === "")||(tail.indexOf(".") <=0 )) {
                errText += "\n email "+req.body.email+" is incorrect";
            } else {
                let client = UserRepository.getOne((item)=>{ return (item.email == req.body.email) });
                if (client) errText += "\n found user with email : "+req.body.email;
            }
            errText += testPhoneNumber(req.body.phoneNumber);
            if (req.body.password.length <= 4) errText += "\n password is too short, 5 simb min";
            if (errText === "") {
                res.data = { error: false, data: "", status: 200 };
            } else res.data = { error: true, message: errText, status: 400 }    
        } else 
            res.data = { error: true,  message: 'No data in request !', status: 404 };
        next();
    } catch(error) {
        res.data = { error: true, message: error, status: 404 };
        next();
    }
}

const updateUserValid = (req, res, next) => {
    try {
        if (req.body) {
            let id = req.params.id;
            let updUser = UserRepository.getOne((item)=>{ return (item.id === id) });
            if (!updUser) {
                res.data = { error: true, message: "No such user found !", status: 400 };
                next();                
            }
            let errText= testFieldsList(user, req.body);
            if (errText !== "") {
                res.data = { error: true, message: errText, status: 400 };
                next();
            }
            let client = UserRepository.getOne((item)=>{ return ((item.firstName === req.body.firstName)&&(item.lastName === req.body.lastName)) });
            if ((client)&&(client.id != id)) errText = "Such user already registred : "+req.body.firstName+" "+req.body.lastName;
            if (errText !== "") {
                res.data = { error: true, message: errText, status: 400 };
                next();
            }
            let poss = req.body.email.indexOf("@");
            let tail = req.body.email.substr(poss+1);
            if ((poss <= 0)||(tail === "")||(tail.indexOf(".") <=0 )) {
                errText += "\n email "+req.body.email+" is incorrect";
            } else {
                client = UserRepository.getOne((item)=>{ return (item.email === req.body.email) });
                if ((client)&&(client.id !== id))  errText += "User with such email alredy registred !";
            }    
            errText += testPhoneNumber(req.body.phoneNumber);
            if (req.body.password.length <= 4) errText += "\n password is too short, 5 simb min";
            if (errText === "") {
                res.data = { error: false, data: id, status: 200 };
            } else res.data = { error: true, message: errText, status: 400 }    
        } else 
            res.data = { error: true,  message: 'No data in request !', status: 404 };
        next();
    } catch(error) {
        res.data = { error: true, message: error, status: 404 };
        next();
    }
}

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;