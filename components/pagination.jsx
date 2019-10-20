import Link from './link'
import icons from './icon'

export default props => {
    const PreviousIcon = icons("previous")
    const NextIcon = icons('next')
    return (
        <div className="pagination">
            {props.previous && <Link to={props.previous} className='pagination-previous'>
                <PreviousIcon />
            </Link>}
            {props.next && <Link to={props.next} className='pagination-next'>
                <NextIcon />
            </Link>}
        </div>
    )
}