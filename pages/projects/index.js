import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import { FcApproval, FcFullTrash, FcSurvey } from "react-icons/fc";
import Link from "next/link";

export default function Projects() {


    // pagination

    const [currentPage, setCurrentPage] = useState(1); //for page 1
    const [perPage] = useState(7);

    // search
    const [searchQuery, setSearchQuery] = useState("");

    // fetch blog data
    const { alldata, loading } = useFetchData("/api/projects");  // fetch project data

    //functio to handle page change
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // total number of projects
    const allblog = alldata.length;

    //filter all data based on search query
    const filteredBlogs =
        searchQuery.trim() === ""
            ? alldata
            : alldata.filter((blog) =>
                blog.title.toLowerCase().includes(searchQuery.toLowerCase())
            );

    // calculate index of the first blog displayed on the current page
    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;

    // Get the current page's blog
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const publishedblogs = currentBlogs.filter((ab) => ab.status === "publish");
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>
                        All Published <span>Projects</span>
                    </h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <FcSurvey /> <span>/</span> <span>Projects</span>
                </div>
            </div>
            <div className="blogstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search Project:</h2>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchQuery}
                        onChange={(ev) => setSearchQuery(ev.target.value)}
                    />
                </div>
                <table className="table table-styling">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4}>
                                    <Dataloading />
                                </td>
                            </tr>
                        ) : (
                            <>
                                {publishedblogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center">
                                            No Projects Found
                                        </td>
                                    </tr>
                                ) : (
                                    publishedblogs.map((blog, index) => (
                                        <tr key={blog._id}>
                                            <td>{indexOfFirstBlog + index + 1}</td>
                                            <td>
                                                <img src={blog.images[0]} width={180} alt="image" />
                                            </td>
                                            <td>
                                                <h3>{blog.title}</h3>
                                            </td>
                                            <td>
                                                <div className="flex gap-2 flex-center">
                                                    <Link href={"/projects/edit/" + blog._id}>
                                                        <button>
                                                            <FcApproval />
                                                        </button>
                                                    </Link>
                                                    <Link href={"/projects/delete/" + blog._id}>
                                                        <button>
                                                            <FcFullTrash />
                                                        </button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}