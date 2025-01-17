import nodemailer from "nodemailer";

export async function sendEmail(to: string, message: string) {
  // Criação de um transportador para enviar os e-mails
  const transporter = nodemailer.createTransport({
    service: "gmail", // Pode ser outro serviço, como 'SendGrid', 'Outlook', etc.
    auth: {
      user: process.env.EMAIL_USER, // Seu e-mail
      pass: process.env.EMAIL_PASS, // Sua senha ou senha de app
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // E-mail de origem
    to: to, // E-mail do destinatário
    subject: "Couplespace | Convite para o sistema", // Assunto do e-mail
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Template</title>
  </head>
  <body
    style="
      padding: 1rem;
      padding: 0;
      background: linear-gradient(to right, #fc5c7d, #6a82fb);
      font-family: Arial, sans-serif;
    "
  >
    <table
      width="100%"
      height="400px"
      cellspacing="0"
      cellpadding="0"
      style="
        background: linear-gradient(to right, #fc5c7d, #6a82fb);
        text-align: center;
      "
    >
      <tr>
        <td align="center" valign="middle">
          <table
            width="50%"
            cellpadding="0"
            cellspacing="0"
            style="
              background-color: #232323;
              border-radius: 6px;
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -4px rgba(0, 0, 0, 0.1);
              padding: 24px;
              color: #ffffff;
            "
          >
            <tr>
              <td style="text-align: center">
                <h3 style="font-size: 24px; font-weight: bold; margin: 0">
                  Couplespace
                </h3>
              </td>
            </tr>
            <tr>
              <td style="padding: 16px 0; text-align: left">
                <p style="margin: 0; font-size: 16px">
                  ${message}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("E-mail enviado com sucesso!");
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}
