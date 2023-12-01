import styles from '@/styles/Header.module.css';
import Image from 'next/image';
import Logo from '../../public/images/blackLogo.png';
import { useEffect, useState } from 'react';

const Header = () =>{
    const [ClockState, setClockState] = useState();
    const [width, setWidth] = useState();
    useEffect(() => {
      setInterval(() => {
        const date = new Date();
        const CST = date.toLocaleTimeString('en-US',{
          timeZone: 'CST'
        });
        setClockState(CST);
      }, [1000]);
    }, []);
    useEffect(()=>{
        window.addEventListener("resize", () => setWidth(window.innerWidth));
    }, [])
    return(
        <>
            <header className={`genContainer ${styles.headerContainer}`}>
                <div className={`${styles.aboveNav}`}>
                    {
                        width > 750 ?
                            <div className={`${styles.empower}`}>
                            <span><b>EMPOWER~</b></span>
                            <span><b>THE~</b></span>
                            <span><b>CREATIVE~</b></span>
                            </div>
                            :
                            <Image
                        src={Logo}
                        width={100}
                        alt="oops"
                    />
                        
                    }
                    
                    
                    <div className={`${styles.logoContainer}`}>
                        <span>AUSTIN, TEXAS</span>
                        {
                            width > 750 ?
                            <div>
                            </div>
                            :
                            <div className={`${styles.empower}`}>
                            <span><b>~EMPOWER~</b></span>
                            <span><b>THE~</b></span>
                            <span><b>CREATIVE~</b></span>
                            </div>
                        }
                        <h1>Las Muchachos Worldwide</h1>
                        <span className={`${styles.time}`}>{ClockState}</span>
                    </div>
                    
                    <Image
                        src={Logo}
                        width={100}
                        alt="oops"
                    />
                </div>
                <div className={`${styles.navSectionContainer}`}>
                    <div className={`container`}>
                        <ul className={`${styles.navSection}`}>
                            <li><a href="#musicVideos"><h3>VIDEOS</h3></a></li>
                            <li><a href="#photography"><h3>PHOTOGRAPHY</h3></a></li>
                            <li><a href="#verticalVideos"><h3>VERTICAL VIDEOS</h3></a></li>
                            <li><a href="#about"><h3>ABOUT US</h3></a></li>
                            <li><a href="#gears"><h3>GEAR RENTALS</h3></a></li>
                            <li><a href="#fabrics"><h3>FABRICS</h3></a></li>
                            </ul>
                    </div>
                </div>
                
                
            </header>
        </>
    )
    
}

export default Header;