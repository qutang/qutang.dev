import PlusIcon from '../content/icons/plus.svg'
import Side from './side'

export default ({ data }) => (
    <section className='menu-button-container'>
        <input type='checkbox' id='menu-button' />
        <label htmlFor="menu-button">
            <div className="modal-menu">
                <Side data={data}></Side>
            </div>
            <div className='menu-icon'>
                <PlusIcon />
            </div>
        </label>
    </section>
)