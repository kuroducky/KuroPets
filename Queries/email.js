var nodemailer = require('nodemailer');

const sendMail = (email, msg) => {
    var transporter = nodemailer.createTransport({
        'service': 'gmail',
        'auth': {
          'user': 'kuropets123@gmail.com',
          'pass': 'Kuroducky'
        }
    });
    var text = "KuroPets"
    var result = text.link("http://172.21.148.170")
    var mailCreation = {
            'from': 'kuropets123@gmail.com',
            'to': email,
            'subject': 'Creation of KuroPets account',
            'html': '<p>'+msg+'<\p><br/><p>Click here to enter '+result+'!</p>'
        };
      
        transporter.sendMail(mailCreation, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    sendMail
}