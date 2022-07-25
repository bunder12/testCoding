import React, { useState} from 'react'
import { Typography, Container, Tooltip } from '@material-ui/core'
import { FileCopy } from '@material-ui/icons'
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import axios from 'axios';
import useStyles from './styled'

const Upload = () => {

    const classes = useStyles();

    const [link, setLink] = useState()

  const handleChangeStatus = ({ meta }) => {
    setLink(meta.previewUrl);
  };

  const handleSubmit = async (files) => {
    const f = files[0];

    const response = await axios({
      method: "GET",
      url: process.env.REACT_APP_S3_BUCKET_ENDPOINT,
    });



    const result = await fetch(response.data.uploadURL, {
      method: "PUT",
      body: f["file"],
    });

  };

  return (
    <div>
        <Container>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column'}}>
                <Typography style={{marginBottom: '8px'}} variant='h3'>Post Your Image Here</Typography>
                <Typography style={{marginBottom: '20px'}} variant='subtitle1'>Get permanent links for Facebook, Twitter, message boards and blogs</Typography>
                <Dropzone
                onChangeStatus={handleChangeStatus}
                onSubmit={handleSubmit}
                hjello
                multiple={true}
                canCancel={false}
                inputContent="Drag And Drop Image"
                styles={{
                    dropzone: { width: 350, height: 200, border: '2px dashed #B9B9B9'},
                    dropzoneActive: { borderColor: "#434343", transform: 'scale(1.1)' },
                }}
                />
                <div style={{textAlign: 'center'}}>
                <Typography style={{margin: '20px 0'}} variant='h5'>Link Here</Typography>
                <div>
                    {
                        link? 
                        <div className={classes.areaCopyLink}>
                            <Typography className={classes.textLink} variant="subtitle1">{link}</Typography>
                            <Tooltip title="Copy" placement="left">
                            <FileCopy onClick={() => {navigator.clipboard.writeText(link)}} style={{color: 'white', cursor: 'pointer'}}/>
                            </Tooltip>
                        </div>
                        : 
                        <Typography variant='subtitle1'>you haven't uploaded an image</Typography>
                    }
                </div>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default Upload