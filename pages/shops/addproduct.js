import Shop from "@/components/Shop";
import { FcSurvey } from "react-icons/fc";


export default function Addproduct() {

    return <>
        <div className="addblogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>
                        Add <span>Product</span>
                    </h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <FcSurvey /> <span>/</span> <span>Add Product</span>
                </div>
            </div>
            <div className="blogsadd">
                <Shop />
            </div>
        </div>
    </>
}