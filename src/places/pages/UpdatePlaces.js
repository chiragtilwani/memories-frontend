import { makeStyles } from '@mui/styles'

import UpdatePlaceForm from '../components/UpdatePlaceForm'

const useStyles = makeStyles({
    container: {
        width: '100vw',
        height: '100%',
        display: 'flex',
    }
})

function UpdatePlace(props) {
    const classes = useStyles()
    return <div className={classes.container}>
        <UpdatePlaceForm place={props.place} />
    </div>
}

export default UpdatePlace