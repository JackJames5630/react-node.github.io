import React from 'react'
import './index.css';
import { BsFacebook, BsTwitter, BsInstagram, BsLinkedin } from 'react-icons/bs';
const Footer = ( props: any) => {
    return(
       
        <footer className={`${props.className} footer row`}>
            <div className='container row'>
                <div className='col-sm-6 col-md-6 col-lg-4 col-xl-4 text-center text_div m-auto'>
                    <span>
                        @2021 Solanacash. All Rights Reserved.
                    </span>
                </div>
                <div className='col-md-3 col-lg-5 col-xl-5'>

                </div>
                <div className='col-sm-6 col-md-2 col-lg-2 col-xl-2 d-flex justify-content-between align-items-center footer_icon icon_div'>
                        <a href='https://Instagram.com/solanacash_io'><BsInstagram size={18}/></a>
                        <a href="https://Twitter.com/solanacash_io"><BsTwitter size={18} /></a>
                </div>
                <div className='col-md-1 col-lg-1 col-xl-1'>

                </div>
            </div>
        </footer>
    )
}
export default Footer;