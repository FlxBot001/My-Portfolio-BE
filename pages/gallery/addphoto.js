import Photo from "@/components/photo";
import { FcSurvey } from "react-icons/fc";

export default function addphoto() {
    return (
        <>
            <div className="addblogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>
                            Add <span>Photos</span>
                        </h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <FcSurvey /> <span>/</span> <span>Add Photo</span>
                    </div>
                </div>
                <div className="blogsadd">
                    <Photo />
                </div>
            </div>
        </>
    );
}
