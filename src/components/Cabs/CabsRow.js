import React, { useState, useEffect, useRef } from 'react'
import emailjs from 'emailjs-com'
import moment from 'moment'

const CabsRow = ({ data }) => {
  const [state, setState] = useState({
    sendingEmail: false,
    emailSent: false,
    error: false,
  })
  const { sendingEmail, emailSent, error } = state

  const sendEmailTimeout = useRef()

  const sendEmail = (d) => {
    setState((prevState) => ({
      ...prevState,
      sendingEmail: true,
    }))
    let emailObj = {
      name: d.name,
      loyal_customers: d.loyalcustomers,
      thirty_days_date: d.thirty_days_date.format('MMMM Do'),
      enroller_name: d.enrollername.split(' ')[0],
      enroller_email: d.enrolleremail,
    }
    emailjs
      .send(
        'gmail',
        'fast_start_reminder',
        emailObj,
        'user_MfAuIxXaTpn0egSTeJPQj'
      )
      .then(
        (result) => {
          console.log(result.text)
          setState((prevState) => ({
            ...prevState,
            emailSent: true,
            sendingEmail: false,
          }))
        },
        (error) => {
          console.log(error.text)
          setState((prevState) => ({
            ...prevState,
            error: true,
            sendingEmail: false,
          }))
        }
      )
  }

  useEffect(() => {
    return () => {
      sendEmailTimeout.current = false
    }
  }, [])

  return (
    <tr style={{ height: '64px' }}>
      <td>{data.customerid}</td>
      <td>{data.name}</td>
      <td>{data.loyalcustomers}</td>
      <td>{moment(data.createddate).format('L')}</td>
      <td>{moment(data.thirty_days_date).format('L')}</td>
      <td>{data.enrollername}</td>
      <td>{data.enrolleremail}</td>
      <td>
        {!emailSent && !sendingEmail && (
          <button onClick={() => sendEmail(data)}>Send Email</button>
        )}
        {sendingEmail && <>Sending...</>}
        {!sendingEmail && error && (
          <>
            <button
              style={{ backgroundColor: 'f86060' }}
              onClick={() => sendEmail(data)}
            >
              Try Again
            </button>
          </>
        )}
        {!sendingEmail && emailSent && <>Email Sent</>}
      </td>
    </tr>
  )
}

export default CabsRow
