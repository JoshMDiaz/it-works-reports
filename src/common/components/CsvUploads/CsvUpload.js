import React, { useState } from 'react'
import Papa from 'papaparse'
import Dropzone from 'react-dropzone'
import moment from 'moment'
import styles from './csv-uploads.module.css'
import CsvUploadRow from './CsvUploadRow'

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
  }
  const transformKeys = (data) => {
    let customerIds = []
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
        if (!customerIds.includes(mapped.customerid)) {
          customerIds.push(mapped.customerid)
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
        }
        return false
      })
      .filter(Boolean)
    return result
  }

  return (
    <div className={`csv-upload`}>
      <Dropzone onDropAccepted={parse} accept='.csv,.xls,.xlsx'>
        {({ getRootProps, getInputProps }) => {
          return (
            <div {...getRootProps()} className={styles.csvUploadContainer}>
              <div>Drag and Drop Files here or</div>
              <button className={styles.dropFilesButton}>Choose Files</button>
              <input {...getInputProps()} />
            </div>
          )
        }}
      </Dropzone>
      {data && (
        <>
          <h2>
            {data.length} Enroller{data.length === 1 ? '' : 's'}
          </h2>
          <table>
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Loyal Customers</th>
                <th>Created Date</th>
                <th>30 Days Date</th>
                <th>Enroller</th>
                <th>Enroller Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((e) => (
                <CsvUploadRow data={e} key={e.customerid} />
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default CsvUpload
