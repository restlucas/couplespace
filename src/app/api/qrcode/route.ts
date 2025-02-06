// import QRCode from "qrcode";
// import nodemailer from "nodemailer";
// import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  console.log(req);
  // const { userId } = await req.json(); // No App Router, o body é extraído com req.json()

  return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
  //   try {
  //     const userInfo = await prisma.couple.findFirst({
  //       where: {
  //         userId,
  //       },
  //       select: {
  //         user: {
  //           select: {
  //             email: true,
  //           },
  //         },
  //         page: {
  //           select: {
  //             randomId: true,
  //           },
  //         },
  //       },
  //     });

  //     // const link = couple[0]?.page.link as string;

  //     const email = userInfo?.user.email;
  //     const link = userInfo?.page.link;

  //     // Verificar se o e-mail não é null
  //     if (!email) {
  //       return new Response(
  //         JSON.stringify({ message: "E-mail não encontrado" }),
  //         { status: 400 }
  //       );
  //     }

  //     // Gerar o QR code a partir do link
  //     const qrCodeDataUrl = await QRCode.toDataURL(link as string);

  //     console.log("QR Code gerado com sucesso");

  //     // Configuração do transporte de e-mail usando nodemailer
  //     const transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //         user: process.env.EMAIL_USER, // Email do remetente
  //         pass: process.env.EMAIL_PASS, // Senha do email (ou senha de app, se usar o Gmail)
  //       },
  //     });

  //     // Opções do e-mail
  //     const mailOptions = {
  //       from: process.env.EMAIL_USER,
  //       to: email, // Garantido que não é null
  //       subject: "Couplespace | QR Code para o seu link",
  //       html: `<!DOCTYPE html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //     <title>Email Template</title>
  //   </head>
  //   <body
  //     style="
  //       padding: 1rem;
  //       padding: 0;
  //       background: linear-gradient(to right, #fc5c7d, #6a82fb);
  //       font-family: Arial, sans-serif;
  //     "
  //   >
  //     <table
  //       width="100%"
  //       height="400px"
  //       cellspacing="0"
  //       cellpadding="0"
  //       style="
  //         background: linear-gradient(to right, #fc5c7d, #6a82fb);
  //         text-align: center;
  //       "
  //     >
  //       <tr>
  //         <td align="center" valign="middle">
  //           <table
  //             width="50%"
  //             cellpadding="0"
  //             cellspacing="0"
  //             style="
  //               background-color: #232323;
  //               border-radius: 6px;
  //               box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
  //                 0 4px 6px -4px rgba(0, 0, 0, 0.1);
  //               padding: 24px;
  //               color: #ffffff;
  //             "
  //           >
  //             <tr>
  //               <td style="text-align: center">
  //                 <h3 style="font-size: 24px; font-weight: bold; margin: 0">
  //                   Couplespace | QR Code
  //                 </h3>
  //               </td>
  //             </tr>
  //             <tr>
  //               <td style="padding: 16px 0; text-align: left">
  //                 <p style="margin: 0; font-size: 16px">
  //                   O QR Code para sua página chegou!
  //                 </p>
  //                 <p style="margin: 0; font-size: 16px">
  //                   Link da página: <a href="${link}" target="_blank">${link}</a>
  //                 </p>
  //               </td>
  //             </tr>
  //             <tr>
  //               <td style="text-align: center; padding: 16px">
  //                 <div
  //                   style="
  //                     width: 50%;
  //                     padding: 16px;
  //                     display: inline-block;
  //                     border-radius: 6px;
  //                   "
  //                 >
  //                   <img
  //                     src="cid:qrCodeImage"
  //                     alt="QR Code"
  //                     style="width: 300px; height: 300px"
  //                   />
  //                 </div>
  //               </td>
  //             </tr>
  //           </table>
  //         </td>
  //       </tr>
  //     </table>
  //   </body>
  // </html>

  // `,
  //       // html: `
  //       //     <p>Olá, aqui está o QR Code para o link: <a href="${userInfo.couple?.link}">${userInfo.couple?.link}</a></p>
  //       //     <p>Escaneie o QR code abaixo:</p>
  //       //     <img src="cid:qrCodeImage" alt="QR Code" style="max-width: 300px; height: auto;" />
  //       //   `,
  //       attachments: [
  //         {
  //           filename: "qrcode.png",
  //           path: qrCodeDataUrl,
  //           cid: "qrCodeImage", // Usando o CID para referenciar no HTML
  //         },
  //       ],
  //     };

  //     // Enviar o e-mail
  //     await transporter.sendMail(mailOptions);

  //     // Enviar resposta de sucesso
  //     return new Response(
  //       JSON.stringify({ message: "QR code enviado com sucesso!" }),
  //       { status: 200 }
  //     );
  //   } catch (error) {
  //     console.error(error);

  //     // Enviar resposta de erro
  //     return new Response(
  //       JSON.stringify({ message: "Erro ao gerar o QR code ou enviar o e-mail" }),
  //       { status: 500 }
  //     );
  //   }
}
