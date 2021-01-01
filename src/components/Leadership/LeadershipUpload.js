import React, { useState } from 'react'
import LeadershipTable from './LeadershipTable'
import CsvUpload from '../../common/CsvUploads/CsvUpload'

const LeadershipUpload = ({ devMode }) => {
  const [data, setData] = useState(null)
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
        // Last 7 days of Your Downline Activity reports
        // Only get distributors
        // Get rid of Shyanne
        // Create a count of how many distributors everyone got
        if (
          mapped.enrollername !== 'Shyanne Diaz' &&
          mapped.customertype === 'Distributor'
        ) {
          return mapped
        }
        return false
      })
      .filter(Boolean)

    const groupBy = (objectArray, property) => {
      return objectArray.reduce((acc, obj) => {
        const key = obj[property]
        if (!acc[key]) {
          acc[key] = []
        }
        // Add object to list for given key's value
        acc[key].push(obj)
        return acc
      }, {})
    }

    const grouped = groupBy(result, 'enrollername')
    let groupedResult = []
    for (const key in grouped) {
      groupedResult.push({
        enrollername: key,
        distributor_count: grouped[key].length,
      })
    }
    groupedResult = groupedResult.sort(function (a, b) {
      return b.distributor_count - a.distributor_count
    })
    return groupedResult
  }

  const getCsvData = (csvData) => {
    setData(transformKeys(csvData))
  }

  return (
    <div className={`csv-upload`}>
      <CsvUpload callout={getCsvData} />
      <LeadershipTable data={data} devMode={devMode} />
    </div>
  )
}

export default LeadershipUpload
