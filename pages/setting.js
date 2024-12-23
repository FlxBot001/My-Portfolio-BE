import { FcBusinessman, FcSettings } from "react-icons/fc";


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
                                <h3>Felix Ng`ang`a <br />DevOps Engineer</h3>
                            </div>
                            <div className="flex flex-sb mt-2">
                                <h3>Phone:</h3>
                                <input type="text" defaultValue={'+254-1112 55301'} />
                            </div>
                            <div className="mt-2">
                                <input type="email" defaultValue={'njugunafelix79@gmail.com'} />
                            </div>
                            <div className="flex flex-center w-100 mt-2">
                                <button>Save</button>
                                <button>r_p</button>
                            </div>
                        </div>
                    </div>

                    <div className="rightlogoutsec">
                        <div className="topaccoutnbox">
                            <h2 className="flex flex-sb">My Account <FcBusinessman /></h2>
                            <hr />
                            <div className="flex flex-sb mt-1">
                                <h3>Active Account <br /> <span>Email</span></h3>
                                <button>Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </>
    )


}
