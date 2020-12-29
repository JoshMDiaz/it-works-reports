import React, { useState } from 'react'
import Papa from 'papaparse'
import Dropzone from 'react-dropzone'
import moment from 'moment'
import styles from './csv-uploads.module.css'
import emailjs from 'emailjs-com'

const CsvUpload = () => {
  const [state, setState] = useState({
    data: null,
  })
  const { data } = state
  const twoWeeksAgo = moment().subtract(2, 'weeks').startOf('day').format()

  const parse = (files) => {
    Papa.parse(files[0], {
      header: true,
      dynamicTyping: true,
      complete: function (result) {
        setState((prevState) => ({
          ...prevState,
          data: transformKeys(result.data),
        }))
      },
    })
    // do something with files[0]
  }
  const transformKeys = (data) => {
    let result = data
      .map((d) => {
        let arr = Object.keys(d),
          transformedKeysArr = arr.map((a) => {
            return a.replace(/ /g, '_').toLowerCase()
          }),
          mapping = {}
        for (let i = 0; i < arr.length; i++) {
          mapping[arr[i]] = transformedKeysArr[i]
        }
        let mapped = Object.keys(d).reduce((a, key) => {
          a[mapping[key]] = d[key]
          return a
        }, {})
        mapped.name = `${mapped.firstname} ${mapped.lastname}`
        mapped.thirty_days_date = moment(mapped.createddate).add(30, 'days')
        // go back only 2 weeks from today
        // Fewer than 6 Loyal Customers
        // has to be FSQ 30 Days
        // Cannot be us
        if (
          moment(mapped.createddate).isAfter(twoWeeksAgo) &&
          parseInt(mapped.loyalcustomers) < 6 &&
          parseInt(mapped.fsqthirtydays) < 1 &&
          mapped.enrollername !== 'Shyanne Diaz'
        ) {
          return mapped
        }
        return false
      })
      .filter(Boolean)
    return result
  }

  const sendEmail = (email) => {
    emailjs
      .send('gmail', 'fast_start_reminder', email, 'user_MfAuIxXaTpn0egSTeJPQj')
      .then(
        (result) => {
          console.log(result.text)
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  const getEmails = () => {
    data.forEach((d) => {
      let emailObj = {
        name: d.name,
        loyal_customers: d.loyalcustomers,
        thirty_days_date: d.thirty_days_date.format('MMMM Do'),
        enroller_name: d.enrollername,
        // enroller_email: d.enrolleremail,
        enroller_email: 'iknowtennispro@yahoo.com',
      }
      console.log(emailObj)
      sendEmail(emailObj)
    })
  }

  return (
    <div className={`csv-upload`}>
      <Dropzone onDropAccepted={parse} accept='.csv,.xls,.xlsx'>
        {({ getRootProps, getInputProps }) => {
          return (
            <div {...getRootProps()} className={styles.csvUploadContainer}>
              <div>Drag and Drop Files here or</div>
              <button className={styles.button}>Choose Files</button>
              <input {...getInputProps()} />
            </div>
          )
        }}
      </Dropzone>
      {data && (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Loyal Customers</th>
                <th>Created Date</th>
                <th>30 Days Date</th>
                <th>Enroller</th>
                <th>Enroller Email</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e, i) => (
                <tr key={i}>
                  <td>{e.name}</td>
                  <td>{e.loyalcustomers}</td>
                  <td>{moment(e.createddate).format('L')}</td>
                  <td>{moment(e.thirty_days_date).format('L')}</td>
                  <td>{e.enrollername}</td>
                  <td>{e.enrolleremail}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={getEmails}
            className={styles.button}
            style={{ float: 'right' }}
          >
            Send Emails
          </button>
        </>
      )}
    </div>
  )
}

export default CsvUpload
