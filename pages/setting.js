import { FcSettings } from "react-icons/fc";


export default function Setting() {

  


    return (
       <>
            <div className="settingpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Admin <span>Settings</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <FcSettings /> <span>/</span> <span>Settings</span>
                    </div>
                </div>

                <div className="profilesettings">
                    <div className="leftprofile_details flex">
                        <img src="/img/felix.png" alt="felix" />
                        <div className="w-100">
                            <div className="flex flex-sb flex-left mt-2">
                                <h2>My Profile:</h2>
                                <h3>FlxNjgn <br />DevOps Engineer</h3>
                            </div>
                            <div className="flex flex-sb mt-2">
                                <h3>Phone:</h3>
                                <input type="text" defaultValue={'+254-1112 55301'} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </>
    )


}
