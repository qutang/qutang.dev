import PostLayout from "./post";
import Notebook from "../components/ipynb.jsx";

export default ({ meta, file, ...props }) => (
    <PostLayout {...props} meta={meta}>
        {props.children}
        <Notebook file={file} url={props.data.site.url} />
    </PostLayout>
);