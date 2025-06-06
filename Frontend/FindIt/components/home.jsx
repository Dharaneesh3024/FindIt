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
            <img src="/components/BIT.png" alt="college-image" className="image"/>
            <div className="section">
            <p className="para">Find Your Lost items with FindIt</p>
                
            </div>
            
        </>
    );
}

export default Home;
