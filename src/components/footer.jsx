import moment from 'moment'
import ChargeIcon from '../icons/charge.js.svg'
import Link from '../components/link'
export default ({ author }) => (
    <footer className='footer-container'>
        <small>{author} © {moment().format('YYYY')}</small>
        <small>Powered by <Link to="https://charge.js.org"><ChargeIcon /> Charge.js</Link></small>
    </footer>
)