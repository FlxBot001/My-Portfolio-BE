import Aside from "./Aside";
import Header from "./Header";


function ParentComponent(props) {


    return (
        <div>
            <Header handle />
            <Aside />
        </div>
    );
}

export default ParentComponent;
