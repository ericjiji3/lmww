import styles from '@/styles/ContactForm.module.css'
import {useRef, useState} from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const form = useRef();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState('quote');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);

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
    const handleMessageChange = (e) => {
        setMessage(e.target.value)
        console.log(message);
    }


    const sendEmail = (e) => {
        e.preventDefault();
        console.log('MESSAGE: ', message);
        if(name && email){
            emailjs.sendForm('service_gbncwul', 'template_sif6j3g', form.current, 'kUG0i2yQgGLjnWBYr')
        
            .then((result) => {
                setSuccess(true);
                e.target.reset();
            }, (error) => {
                setSuccess(false);
                e.target.reset();
            });
        }
    };

    return(
        <div className={`container ${styles.contactContainer}`}>
            <form className={styles.contactForm} ref={form} onSubmit={sendEmail}>
                <div className={styles.inputContainer}>
                    <label>Name*:</label>
                    <input className={styles.nameInput} type="text" name="name" onChange={handleNameChange} value={name} required/>
                </div>
                <div className={styles.inputContainer}>
                    <label>Email*:</label>
                    <input className={styles.emailInput} type="email" name="email" onChange={handleEmailChange} placeholder="email@email.com" value={email} required/>
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
                    <textarea name="message" rows={10} cols={40} onChange={handleMessageChange} value={message}/>
                </div>
                <button type='submit' className={styles.submitButt}>
                    <h3 className={success ? `${styles.sendText} ${styles.inactive}` : `${styles.sendText}`}>{success ? 'SUCCESS' : 'SEND'}</h3>
                </button>
            </form>
        </div>
    )
}

export default Contact;