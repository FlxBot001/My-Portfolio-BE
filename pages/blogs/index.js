import { FcSurvey } from "react-icons/fc";


export default function Blogs() {

    return <>
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>
                        All Published <span>Blogs</span>
                    </h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <FcSurvey /> <span>/</span> <span>Blogs</span>
                </div>
            </div>
            <div className="blogstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search Blogs:</h2>
                    <input type="text" placeholder="Serch by title..." />
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
                </table>
            </div>
        </div>
    </>
}