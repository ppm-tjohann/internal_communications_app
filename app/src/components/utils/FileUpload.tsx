import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { Box, Button, Collapse, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import FlexBox from './FlexBox'
import SquareBox from './SquareBox'
import { Check, CheckCircle, CheckOutlined, Delete, Refresh } from '@mui/icons-material'
import { ValidationError } from '../../interfaces/validationError'



interface FileUploadProps {
    label: string
    updateFilesCb: ( file: File | null ) => any
    error?: string

    [x: string]: any
}

const FileUpload = ( { label, error, updateFilesCb, ...props }: FileUploadProps ) => {

    const theme = useTheme()
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
                  border: `1px dashed ${error ? theme.palette.error.main : '#ffffff'}B3`,
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
              {error &&
              <p className={'MuiFormHelperText-root Mui-error MuiFormHelperText-sizeMedium MuiFormHelperText-contained css-xzkq1u-MuiFormHelperText-root'}>{error}</p>}

          </label>


      </>
    )

}
export default FileUpload