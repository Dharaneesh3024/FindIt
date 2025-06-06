import "./home.css";

function Home() {
    return (
        <>
            <div className='navbar'>
                <div className='logo'>FindIt</div>
                <div className='links'>
                    <p>About</p>
                    <p>Contact</p>
                    <p className="reg">Register/Login</p>
                </div>
            </div>
            <img src="/components/BIT homepage.png" alt="college-image" className="image"/>
            <div className="section">
            <p className="para">Find Your Lost items with FindIt</p>
            </div>
            <p className="sub">A centralized platform for students and staff of BITSathy to report, search, and recover lost or found items across the campus.
</p>  
                           <p className="sub-reg">Register/Login</p>
     
        </>
    );
}

export default Home;
