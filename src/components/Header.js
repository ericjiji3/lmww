import styles from '@/styles/Header.module.css';
import Image from 'next/image';
import Logo from '../../public/images/combinedOutlineLogo.png';

const Header = () =>{
    return(
        <>
            <header className={`${styles.headerContainer}`}>
                <div className={`container ${styles.aboveNav}`}>
                    <span><b>Empower the Creative~</b></span>
                    <h1>Las Muchachos Worldwide</h1>
                    <Image
                        src={Logo}
                        width={100}
                        alt="oops"
                    />
                </div>
                <div className={`${styles.navSectionContainer}`}>
                    <div className={`container`}>
                        <ul className={`${styles.navSection}`}>
                            <li><a href="#musicVideos"><h2>MUSIC VIDEOS</h2></a></li>
                            <li><a href="#photography"><h2>PHOTOGRAPHY</h2></a></li>
                            <li><a href="#verticalVideos"><h2>VERTICAL VIDEOS</h2></a></li>
                            <li><a href="#about"><h2>ABOUT US</h2></a></li>
                            <li><a href="#gears"><h2>GEAR RENTALS</h2></a></li>
                            </ul>
                    </div>
                </div>
                
                
            </header>
        </>
    )
    
}

export default Header;