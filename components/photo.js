import ReactMarkdown from "react-markdown";
import MarkdownEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Spinner from "./Spinner";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { FcReuse } from "react-icons/fc";
import Head from "next/head";

export default function Photo(

    {
        _id,
        title: existingTitle,
        slug: existingslug,
        images: existingimages,
        description: existingdescription,
        scenery: existingscenery,
    }

) {

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setslug] = useState(existingslug || '');
    const [images, setimages] = useState(existingimages || []);
    const [description, setdescription] = useState(existingdescription || '');
    const [scenery, setscenery] = useState(existingscenery || '');

    //for image uploading
    const [isUploading, setIsUploading] = useState(false);
    const uploadImageQueue = [];

    async function createBlog(ev) {
        ev.preventDefault();

        if (isUploading) {
            await Promise.all(uploadImageQueue)
        }

        const data = {
            title,
            slug,
            images,
            description,
            scenery
        };

        if (_id) {
            await axios.put('/api/projects', { ...data, _id })
            toast.success('Data Updated Successfully')
        } else {
            await axios.post('/api/projects', data)
            toast.success('Project Created Successfully')
        }

        setRedirect(true);
    };

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files?.length > 0) {
            setIsUploading(true);

            for (const file of files) {
                const data = new FormData();
                data.append('file', file);

                // use the axios.post method and push the promise to the queue
                uploadImageQueue.push(
                    axios.post('/api/upload', data).then(res => {
                        setimages(oldImages => [...oldImages, ...res.data.links])
                    })
                )
            }

            // wait for all images to finish uploading

            await Promise.all(uploadImageQueue);

            setIsUploading(false);
            toast.success('Images Uploaded Succesfully')
        } else {
            toast.error('An error occurred during the upload!')
        }
    }

    if (redirect) {
        router.push('/projects');
        return null;
    }

    function uploadImagesOrder(images) {
        setimages(images)
    }

    function handleDeleteImage(index) {
        const uploadImages = [...images];
        uploadImages.splice(index, 1);
        setimages(uploadImages);
        toast.success('Images Deleated Successfully')
    }


    // for slug url
    const handleSlugChange = (ev) => {
        const inputValue = ev.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-') //replaces spaces with hyphens

        setslug(newSlug);
    };

    return (
        <>
            <form className="addWebsiteform" onSubmit={createBlog}>
                {/* blog title */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Enter title"
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}
                    />
                </div>

                {/* photo slug url */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="slug">Slug (SEO friendly URL)</label>
                    <input
                        type="text"
                        id="slug"
                        placeholder="Enter Slug URL"
                        value={slug}
                        onChange={handleSlugChange}
                    />
                </div>

                {/* photo scenery */}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="scenery">scenery</label>
                    <input
                        type="text"
                        id="scenery"
                        placeholder="Enter scenery"
                        value={scenery}
                        onChange={ev => setscenery(ev.target.value)}
                    />
                </div>

                {/* project images */}
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
                            onChange={uploadImages}
                        />
                    </div>
                    <div className="w-100 flex flex-left mt-1">
                        {isUploading && (<Spinner />)}
                    </div>
                </div>

                {/* image preview and Image sortable with delete*/}
                {!isUploading && (
                    <div className="flex">
                        <ReactSortable
                            list={Array.isArray(images) ? images : []}
                            setList={uploadImagesOrder}
                            animation={200}
                            className="flex gap-1"
                        >
                            {images?.map((link, index) => (
                                <div className="uploadedimg">
                                    <img src={link} alt="image" className="object-cover" />
                                    <div className="deleteimg">
                                        <button onClick={() => handleDeleteImage(index)}><FcReuse /></button>
                                    </div>
                                </div>
                            ))}
                        </ReactSortable>
                    </div>
                )}

                {/* markdown description */}
                <div className="description w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="description">
                        Project Content (for image: 1st upload and copy link, paste in ![alt
                        text](link))
                    </label>

                    <MarkdownEditor

                        value={description}

                        onChange={(ev) => setdescription(ev.text)}

                        style={{ width: "98%", height: "800px" }}

                        renderHTML={(text) => (
                            <ReactMarkdown components={{
                                code: ({ node, inline, className, children, ...props }) => {

                                    // for code
                                    const match = /language-(\w+)/.exec(className || '')

                                    if (inline) {
                                        return <code>{children}</code>
                                    } else if (match) {
                                        return (
                                            <div style={{ position: 'relative' }}>
                                                <pre style={{ padding: '0', borderRadius: '5px', overflow: 'auto', whiteSpace: 'pre-wrap' }} {...props}>
                                                    <code>{children}</code>
                                                </pre>
                                                <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }} onClick={() => navigator.clipboard.writeText(children)}>
                                                    copy
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



                {/* submit Button */}
                <div className="w-100 mb-3">
                    <button type="submit" className="w-100 addwebbtn flex-center">SAVE DATA</button>
                </div>
            </form>
        </>
    );
}

