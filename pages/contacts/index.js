import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import { useState } from "react";
import { FcApproval, FcBinoculars, FcFullTrash, FcSurvey } from "react-icons/fc";
import Link from "next/link";

export default function contacts() {


 // pagination

 const [currentPage, setCurrentPage] = useState(1); //for page 1
 const [perPage] = useState(7);

 // search
 const [searchQuery, setSearchQuery] = useState("");

 // fetch blog data
 const { alldata, loading } = useFetchData("/api/contacts");

 //functio to handle page change
 const paginate = (pageNumber) => {
     setCurrentPage(pageNumber);
 };

 // total number of blogs
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
 const publishedblogs = currentBlogs;
 const pageNumbers = [];

 for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
     pageNumbers.push(i);
 }

 return (
     <div className="blogpage">
         <div className="titledashboard flex flex-sb">
             <div>
                 <h2>
                     All <span>Contacts</span>
                 </h2>
                 <h3>ADMIN PANEL</h3>
             </div>
             <div className="breadcrumb">
                 <FcSurvey /> <span>/</span> <span>Contacts</span>
             </div>
         </div>
         <div className="blogstable">
             <div className="flex gap-2 mb-1">
                 <h2>Search a Contact:</h2>
                 <input
                     type="text"
                     placeholder="enter name..."
                     value={searchQuery}
                     onChange={(ev) => setSearchQuery(ev.target.value)}
                 />
             </div>
             <table className="table table-styling">
                 <thead>
                     <tr>
                         <th>#</th>
                         <th>First Name</th>
                         <th>Email</th>
                         <th>Phone No.</th>
                         <th>Project</th>
                         <th>Open Contact</th>
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
                                     <td colSpan={6} className="text-center">
                                         No Contacts Found
                                     </td>
                                 </tr>
                             ) : (
                                 publishedblogs.map((blog, index) => (
                                     <tr key={blog._id}>
                                         <td>{indexOfFirstBlog + index + 1}</td>
                                         <td><h3>{blog.firstname}</h3></td>
                                         <td><h3>{blog.email}</h3></td>
                                         <td><h3>{blog.phone}</h3></td>
                                         <td><h3>{blog.project[0]}</h3></td>
                                         <td>
                                             <h3>{blog.title}</h3>
                                         </td>
                                         <td>
                                             <div className="flex gap-2 flex-center">
                                                 <Link href={"/contacts/view/" + blog._id}>
                                                     <button>
                                                         <IoEyeOffOutline />
                                                     </button>
                                                 </Link>
                                                 {/*<Link href={"/blogs/delete/" + blog._id}>
                                                       <button>
                                                   <FcFullTrash />
                                                    </button>
                                                   </Link>*/}
                                             </div>
                                         </td>
                                     </tr>
                                 ))
                             )}
                         </>
                     )}
                 </tbody>
             </table>

             {/* for pagination */}
             {publishedblogs.length === 0 ? ("") : (
                 <div className="blogpagination">
                     <button
                         onClick={() => paginate(currentPage - 1)}
                         disabled={currentPage === 1}
                     >
                         Previous
                     </button>
                     {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map((number) => (
                         <button
                             key={number}
                             onClick={() => paginate(number)}
                             className={`${currentPage === number ? 'active' : ''}`}
                         >
                             {number}
                         </button>
                     ))}
                     <button
                         onClick={() => paginate(currentPage + 1)}
                         disabled={currentPage === Math.ceil(allblog / perPage)}
                     >
                         Next
                     </button>
                 </div>
             )}
         </div>
     </div>
 );
}
