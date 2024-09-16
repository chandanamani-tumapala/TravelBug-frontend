import { IoLogoFacebook } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return(
        <footer>
            <div className="f-info">
                <div className="f-info-socials">
                    <IoLogoFacebook className="i"/>
                    <FaInstagram className="i"/>
                    <FaLinkedin className="i" />
                </div>
                <div className="f-info-brand">&copy;Travelbugs Private Limited</div>
                <div className="f-info-links" >
                    <a href="/privacy">Privacy</a>
                    <a href="/terms">Terms</a>
                </div>
            </div>
        </footer>
    )
}