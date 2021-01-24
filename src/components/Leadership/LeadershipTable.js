import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import LeadershipRow from './LeadershipRow'

const LeadershipTable = ({ data, devMode }) => {
  const [state, setState] = useState({
    sendingEmail: false,
    emailSent: false,
    error: false,
  })
  const { sendingEmail, emailSent, error } = state

  const sendEmail = () => {
    setState((prevState) => ({
      ...prevState,
      sendingEmail: true,
    }))
    let emailObj = {}
    data.forEach((d, index) => {
      emailObj[
        `enroller${index + 1}`
      ] = `${d.enrollername}: ${d.distributor_count}`
    })
    emailjs
      .send(
        'gmail',
        'leadership_shoutouts',
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

  return (
    <div className='cabs-table'>
      {data ? (
        <>
          <h2>
            {data.length} Enroller{data.length === 1 ? '' : 's'}
          </h2>
          <table>
            <thead>
              <tr>
                <th>Enroller Name</th>
                <th>Distributor Count</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e) => (
                <LeadershipRow
                  data={e}
                  key={e.enrollername}
                  devMode={devMode}
                />
              ))}
            </tbody>
          </table>
          {!emailSent && !sendingEmail && (
            <button onClick={() => sendEmail(data)}>Send Email</button>
          )}
          {sendingEmail && !emailSent && <span>Sending...</span>}
          {!sendingEmail && emailSent && <span>Email Sent!</span>}
          {error && <button onClick={() => sendEmail(data)}>Try Again</button>}
        </>
      ) : null}
    </div>
  )
}

export default LeadershipTable
