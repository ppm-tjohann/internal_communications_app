import { Box, Button, Collapse, Container, IconButton, Stack, TextField, Typography } from '@mui/material'
import { AccountBox, Check, Refresh, Save } from '@mui/icons-material'
import MdEditor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import MarkdownEditor from '../../components/News/components/AddNews/MarkdownEditor'
import FileUpload from '../../components/utils/FileUpload'
import { ChangeEvent, useState } from 'react'
import { NewsRequest } from '../../interfaces/news'
import * as newsApi from '../../lib/api/news'
import { useAppDispatch } from '../../Store'
import Loader from '../../components/utils/Loader'



const AddNews = () => {

    const defaultValues: NewsRequest = {
        image: null,
        headline: '',
        teaser: '',
        text: '',
    }
    const dispatch = useAppDispatch()
    const [ values, setValues ] = useState<NewsRequest>( defaultValues )
    const [ loading, setLoading ] = useState( false )

    const handleFile = ( file: File | null ) => {
        setValues( {
            ...values,
            image: file,
        } )
    }

    const handleChange = ( label: keyof NewsRequest ) =>
      ( event: ChangeEvent<HTMLInputElement> ) => {
          setValues( {
              ...values,
              [label]: event.target.value,
          } )
      }
    const handleText = ( { text }: { text: string } ) => {
        setValues( { ...values, text } )
    }
    const handleSubmit = async () => {
        //TODO handle submit
        setLoading( true )
        try {
            NewsRequest.parse( values )
            if ( values.image === null ) {
                throw new Error( 'image needed' )
            }
            const formData = new FormData()
            formData.append( 'image', values.image )
            Object.keys( values ).forEach( value => {
                //@ts-ignore
                formData.append( value, values[value] )
            } )

            const { data: news } = await newsApi.store( formData )
            
            setLoading( false )
        }
        catch ( e ) {
            console.error( e )
            setLoading( false )
        }

    }
    const handleReset = () => {
        setValues( defaultValues )
    }

    return (
      <Container>
          <Collapse in={loading}>
              <Loader/>
          </Collapse>
          <Collapse in={!loading}>
              <>
                  <Box><FileUpload variant={'landscape'} label={'News Image'} updateFilesCb={handleFile}/></Box>
                  <Stack my={3} direction={'column'}>
                      <TextField label={'News-Headline'} fullWidth value={values.headline} onChange={handleChange( 'headline' )}/>
                      <TextField label={'News-Teaser'} multiline rows={3} value={values.teaser} onChange={handleChange( 'teaser' )} fullWidth/>
                  </Stack>
                  <MarkdownEditor placeholder={'Write your text here'} onChange={handleText}/>
                  <Box my={3}>
                      <Stack justifyContent={'flex-end'} width={'100%'}>
                          <Button onClick={handleReset} startIcon={<Refresh/>}>Reset</Button>
                          <Button startIcon={<Check/>} variant={'contained'} onClick={handleSubmit}>
                              Save and Publish
                          </Button>
                      </Stack>
                  </Box>
              </>
          </Collapse>
      </Container>
    )
}
export default AddNews