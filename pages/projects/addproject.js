import Project from "@/components/Project";
import { FcSurvey } from "react-icons/fc";


export default function Addproject() {
    return (
        <>
            <div className="addblogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>
                            Add <span>Project</span>
                        </h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <FcSurvey /> <span>/</span> <span>Add Project</span>
                    </div>
                </div>
                <div className="blogsadd">
                    <Project />
                </div>
            </div>
        </>
    );
}
