
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

export default function Blog() {
    


    return <>
        <form className="addWebsiteform">
            {/* blog title */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="title">Title</label>
                <input type="text" id='title' placeholder='Enter title' />
            </div>

            {/* blog slug url */}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="title">Slug (SEO friendly URL)</label>
                <input type="text" id='slug' placeholder='Enter Slug URL' />
            </div>
        </form>
    </>
}

