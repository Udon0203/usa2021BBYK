const server = require('ws').Server;
const ws = new server({ port: 29082 });

const smtpData = {
    host: 'smtp.gmail.com', // Gmailのサーバ
    port: '465',            // Gmailの場合　SSL: 465 / TLS: 587
    secure: true,           // true = SSL
    auth: {
        user: 'momomomomo2021usa@gmail.com',  // メールアドレス（自身のアドレスを指定）
        pass: 'uooooo99999'            // パスワード（自身のパスワードを指定）平文マジ？
    }
}

const NodeMailer = require('nodemailer')
ws.on('connection', socket => {
    console.log('connected!');

    socket.on('message', ms => {
        console.log(ms);
        main(ms);
    });

    socket.on('close', () => {
        console.log('good bye.');
    });
});

// メール送信関数
function sendMail(smtpData, mailData) {

    // SMTPサーバの情報をまとめる
    const transporter = NodeMailer.createTransport(smtpData)

    // メール送信
    transporter.sendMail(mailData, function (error, info) {
        if (error) {
            // エラー処理
            console.log(error)
        } else {
            // 送信時処理
            console.log('Email sent: ' + info.response)
        }
    })
}


// メイン処理
function main(mailadress) {

    // 送信内容を作成
    const mailData = {
        from: '"テストユーザ" <' + smtpData.auth.user + '>', // 送信元名
        to: mailadress,                         // 送信先
        subject: '転倒しました',                               // 件名
        text: '転倒しました',                              // 通常のメール本文
        html: '<b>転倒しました</b>',                       // HTMLメール
    }

    // メールを送信
    sendMail(smtpData, mailData)
}
