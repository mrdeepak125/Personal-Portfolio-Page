import nodemailer from 'nodemailer'
import { MongoClient } from 'mongodb'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    // Create a transporter using SMTP
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    try {
      // Send email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'deepakpuri9190@gmail.com',
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      })

      // Save to MongoDB
      const client = await MongoClient.connect(process.env.MONGODB_URI)
      const db = client.db()
      const contactCollection = db.collection('contacts')
      await contactCollection.insertOne({ name, email, message, date: new Date() })
      client.close()

      res.status(200).json({ message: 'Email sent and data saved successfully' })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ message: 'Error processing request' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}