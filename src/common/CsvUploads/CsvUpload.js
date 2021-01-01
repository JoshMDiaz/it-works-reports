import React from 'react'
import Papa from 'papaparse'
import Dropzone from 'react-dropzone'
import styles from './csv-uploads.module.css'

const CsvUpload = ({ callout }) => {
  const parse = (files) => {
    Papa.parse(files[0], {
      header: true,
      dynamicTyping: true,
      complete: function (result) {
        callout(result.data)
      },
    })
  }

  return (
    <div className={`csv-upload`}>
      <Dropzone onDropAccepted={parse} accept='.csv,.xls,.xlsx'>
        {({ getRootProps, getInputProps }) => {
          return (
            <div {...getRootProps()} className={styles.csvUploadContainer}>
              <div>
                Drag and Drop File or
                <br />
                Click here to Choose File
              </div>
              <input {...getInputProps()} />
            </div>
          )
        }}
      </Dropzone>
    </div>
  )
}

export default CsvUpload
