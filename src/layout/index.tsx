import {Outlet, useNavigate} from "react-router-dom";

const Layout = () => {
    const navigate = useNavigate();
    const navs = [
        {
            label: '首页',
            onClick: () => {
                navigate('/index');
            }
        },
        {
            label: '文件预览',
            onClick: () => {
                navigate('/file-preview');
            }
        },
    ]
    return <>
        <div style={{
            display: "flex",
            justifyContent: "flex-start"
        }}>
            <div style={{width: '200px'}}>
                {
                    navs.map((item) => <div key={item.label} onClick={item.onClick}>{item.label}</div>)
                }
            </div>
            <div style={{flex: 1}}>
                <Outlet/>
            </div>
        </div>
    </>
}

export default Layout