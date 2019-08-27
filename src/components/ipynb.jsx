import nb from 'notebookjs'
import fs from 'fs'
import renderHTML from 'react-render-html'
import Link from '../components/link'

export default ({ url, file }) => {
    var absPath = 'src/blog/' + file;
    var nbviewerLink = 'https://nbviewer.jupyter.org/url/' + url + '/blog/' + file;
    var ipynb = JSON.parse(fs.readFileSync(absPath));
    var notebook = nb.parse(ipynb);
    return (
        <>
            <span className='badge'><Link to={nbviewerLink}><img src="../icons/nbviewer.svg" alt="nbviewer" /></Link></span>
            {renderHTML(notebook.render().outerHTML)}
        </>
    )
}