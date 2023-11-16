import styles from '@/styles/ContactForm.module.css'
import {useRef, useState} from 'react';

const Contact = () => {
    const form = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('quote');

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }
    const handleTypeChange = (e) => {
        setType(e.target.value)
    }

    const sendEmail = (e) => {
        e.preventDefault();
        console.log(type);
        if(name && email && phone){
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
        <div className={`container ${styles.contactContainer}`}>
            <form className={styles.contactForm} ref={form} onSubmit={sendEmail}>
                <div className={styles.inputContainer}>
                    <label>Name*:</label>
                    <input className={styles.nameInput} type="text" name="user_name" onChange={handleNameChange} value={name} />
                </div>
                <div className={styles.inputContainer}>
                    <label>Email*:</label>
                    <input className={styles.emailInput} type="email" name="user_email" onChange={handleEmailChange} value={email} />
                </div>
                <div className={styles.inputContainer}>
                    <label>Phone:</label>
                    <input className={styles.phoneInput} type="text" name="phone" onChange={handlePhoneChange} value={phone} />
                </div>
                <div className={styles.inputContainer}>
                    <label>Type:</label>
                    <select className={styles.typeInput} name="type" onChange={e => setType(e.target.value)} value={type}>
                        <option value="quote">Quote</option>
                        <option value="shirt">Shirt Order</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className={styles.inputContainer}>
                    <label>Message:</label>
                    <textarea name="message" rows={10} cols={40}/>
                </div>
                <button type='submit' className={styles.submitButt}>
                    <h3>SEND</h3>
                </button>
            </form>
        </div>
    )
}

export default Contact;