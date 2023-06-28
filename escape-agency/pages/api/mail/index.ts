// import { contactUsTemplate } from '@/utils/contact-us';
// import { waitingListTemplate } from '@/utils/waiting-list';
import contactUsTemplate from '@/utils/contactUsTemplate';
import sendgrid from '@sendgrid/mail';

import { NextApiRequest, NextApiResponse } from 'next';

sendgrid.setApiKey(
  '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'
);

interface IMailResponse {
  error: string;
  status: string;
}

const SENDGRID_EMAIL = 'contact@escape-agency.org';

async function sendEmail(
  req: NextApiRequest,
  res: NextApiResponse<IMailResponse>
) {
  try {
    const { body } = req;
    console.log('body = ', body);

    const { firstName, lastName, email, topic, message } = body;
    await sendgrid.send({
      to: SENDGRID_EMAIL,
      from: SENDGRID_EMAIL,
      subject: `Escape Agency: ${topic}`,
      html: contactUsTemplate({
        firstName,
        lastName,
        email,
        topic,
        message,
      }),
    });
  } catch (error: any) {
    return res.status(500).json({ error: error, status: 'error' });
  }
  return res.status(200).json({ error: '', status: 'success' });
}

export default sendEmail;
