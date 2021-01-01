import React, { useState } from 'react'
import moment from 'moment'
import CabsTable from './CabsTable'
import CsvUpload from '../../common/CsvUploads/CsvUpload'

const CabsUpload = ({ devMode }) => {
  const [data, setData] = useState(null)

  const twoWeeksAgo = moment().subtract(2, 'weeks').startOf('day').format()

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

  const getCsvData = (csvData) => {
    setData(transformKeys(csvData))
  }

  return (
    <div className={`csv-upload`}>
      <CsvUpload callout={getCsvData} />
      <CabsTable data={data} devMode={devMode} />
    </div>
  )
}

export default CabsUpload
