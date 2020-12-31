import React from 'react'

const LeadershipRow = ({ data }) => {
  return (
    <tr style={{ height: '64px' }}>
      <td>{data.enrollername}</td>
      <td>{data.distributor_count}</td>
    </tr>
  )
}

export default LeadershipRow
