import Aside from "./Aside";
import Header from "./Header";


function ParentComponent(props) {


    return (
        <div>
            <Header handleAsideOpen={props.appAsideOpen} />
            <Aside asideOpen={props.appOpen} handleAsideOpen={props.appAsideOpen} />
        </div>
    );
}

export default ParentComponent;
