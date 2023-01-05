import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Box, Button, Collapse, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import FlexBox from './FlexBox'
import SquareBox from './SquareBox'
import { Check, CheckCircle, CheckOutlined, Delete, Refresh } from '@mui/icons-material'



interface FileUploadProps {
    label: string
    updateFilesCb: ( file: File | null ) => any

    [x: string]: any
}

const FileUpload = ( { label, updateFilesCb, ...props }: FileUploadProps ) => {

    const [ files, setFiles ] = useState<File | null>( null )

    const handleDelete = () => {
        setFiles( null )
    }

    const handleChange = ( event: ChangeEvent<HTMLInputElement> ) => {

        if ( event.target.files ) {
            setFiles( event.target.files[0] )
        }

    }

    useEffect( () => {
        updateFilesCb( files )
    }, [ files ] )

    return (
      <>
          <label htmlFor={'fileUpload'}>
              <Paper sx={{
                  border: '1px dashed #ffffffB3',
                  'input': { display: 'none' },
              }}>
                  <FlexBox>
                      {files ?
                        <Stack mb={1}>
                            <IconButton color={'error'} size={'small'} onClick={handleDelete}><Delete/></IconButton>
                        </Stack> :
                        <Stack>
                            <FileUploadIcon/>
                            <Typography variant={'body1'} sx={{ opacity: .8 }}>{label}</Typography>
                        </Stack>
                      }
                      <input type={'file'} id={'fileUpload'} onChange={handleChange} {...props}/>
                  </FlexBox>
                  <Collapse in={files !== null}>
                      <SquareBox sx={{
                          'img': { objectFit: 'cover' },
                      }}>
                          {files && <img src={URL.createObjectURL( files )} alt="Upload-Preview"/>}
                      </SquareBox>
                  </Collapse>
              </Paper>

          </label>


      </>
    )

}
export default FileUpload