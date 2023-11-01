import styles from '@/styles/ContactForm.module.css';
import emailjs from '@emailjs/browser';
import {useRef, useState} from 'react';

const ContactForm = () =>{
    const form = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [insta, setInsta] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleInstaChange = (e) => {
        setInsta(e.target.value)
    }

    const sendEmail = (e) => {
        e.preventDefault();
        if(name && email && insta){
            emailjs.sendForm('service_gbncwul', 'template_d0ji11s', form.current, 'kUG0i2yQgGLjnWBYr')
        
            .then((result) => {
                alert("Successfully sent!");
                e.target.reset();
            }, (error) => {
                alert("Uh oh, something went wrong:( Try again!");
                e.target.reset();
            });
        } else{
            alert("Make sure to fill out akll the fields!");
        }
    };

    return(
        <div className={styles.contactContainer}>
            <form className={styles.contactForm} ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input className={styles.nameInput} type="text" name="user_name" onChange={handleNameChange} value={name} />
                <label>Email</label>
                <input className={styles.emailInput} type="email" name="user_email" onChange={handleEmailChange} value={email} />
                <label>Instagram</label>
                <input className={styles.instaInput} type="text" name="insta" onChange={handleInstaChange} value={insta} />
                <button type='submit' className={styles.submitButt}>
                    <span>SEND</span>
                </button>
            </form>
        </div>
    )
}

export default ContactForm;