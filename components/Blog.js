import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Spinner from "./Spinner";
import { text } from "@cloudinary/url-gen/qualifiers/source";

export default function Blog() {
    return (
        <>
            <form className="addWebsiteform">
                {/* blog title */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" placeholder="Enter title" />
                </div>

                {/* blog slug url */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="title">Slug (SEO friendly URL)</label>
                    <input type="text" id="slug" placeholder="Enter Slug URL" />
                </div>

                {/* blog category */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="category"> Select Category</label>
                    <select name="category" id="category" multiple>
                        <option value="React Js"> React Js</option>
                        <option value="Three Js"> Three Js</option>
                        <option value="Next Js"> Next Js</option>
                        <option value="Django"> Django</option>
                        <option value="Artificial Intellijence">
                            {" "}
                            Artificial Intellijence
                        </option>
                        <option value="AWS Cloud"> AWS Cloud</option>
                        <option value="Azure Cloud"> Azure Cloud</option>
                        <option value="GCP Cloud"> GCP Cloud</option>
                        <option value="JWT Tokens"> JWT Tokens</option>
                        <option value="Cyber Security"> Cyber Security</option>
                        <option value="DevSecOps"> DevSecOps</option>
                        <option value="DevOps"> DevOps</option>
                    </select>
                </div>

                {/* blog image */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <div className="w-100">
                        <label htmlFor="images">
                            {" "}
                            Images (1st image will show as a thumbnail, drag supported)
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            className="mt-1"
                            accept="image/*"
                            multiple
                        />
                    </div>
                    <div className="w-100 flex flex-left mt-1">
                        <Spinner />
                    </div>
                </div>

                {/* image preview and Image sortable*/}
                {/* pending */}

                {/* markdown description */}
                <div className="description w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="description">
                        Blog Content (for image: 1st upload and copy link, paste in ![alt
                        text](link))
                    </label>

                    <MarkdownEditor
                        
                        style={{ width: "98%", height: "650px" }}

                        renderHTML={(text) => (
                            <ReactMarkdown components={{
                                code: ({node, inline, className, children, ...props}) => {

                                    // for code
                                    const match = /language-(\w+)/.exec(className || '')
                                    
                                    if (inline) {
                                        return <code>{children}</code>
                                    } else if(match) {
                                        return (
                                            <div style={{position: 'relative'}}>
                                                <pre style={{padding: '0', borderRadius:'5px', overflow: 'auto', whiteSpace: 'pre-wrap'}} {...props}>
                                                    <code>{children}</code>
                                                </pre>
                                                <button style={{position: 'absolute', top: '0', right: '0', zIndex: '1'}} onClick={() => navigator.clipboard.writeText(children)}>
                                                    copy code
                                                </button>
                                            </div>
                                        )
                                    } else {
                                        return <code {...props}>{children}</code>
                                    }
                                }
                            }}>
                                {text}
                            </ReactMarkdown>
                        )}
                    />
                </div>

                {/* tags */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="tags">Tags</label>
                    <select name="tags" id="tags" multiple>
                        <option value="html">html</option>
                        <option value="css">css</option>
                        <option value="javascript">javascript</option>
                        <option value="nextjs">nextjs</option>
                        <option value="threejs">threejs</option>
                        <option value="nodejs">nodejs</option>
                        <option value="java">java</option>
                        <option value="django">django</option>
                        <option value="dotnet">dotnet</option>
                    </select>
                </div>

                {/* blog status */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="status">Status</label>
                    <select name="status" id="status">
                        <option value="">Select Option</option>
                        <option value="draft">Draft</option>
                        <option value="publish">Publish</option>
                    </select>
                </div>

                {/* submit Button */}
                <div className="w-100 mb-3">
                    <button type="submit" className="w-100 addwebbtn flex-center">SAVE BLOG</button>
                </div>
            </form>
        </>
    );
}
