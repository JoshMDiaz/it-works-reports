import React from 'react'
import CabsRow from './CabsRow'

const CabsTable = ({ data, devMode }) => {
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
                <CabsRow data={e} key={e.customerid} devMode={devMode} />
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </div>
  )
}

export default CabsTable
