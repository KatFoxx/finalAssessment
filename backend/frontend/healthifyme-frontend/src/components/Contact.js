import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

function Contact() {
    const [data, setData] = useState({ name: "", email: "", message: "" })
    const [message, setMessage] = useState("")
    // Handle Data Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    // Mock Submission Event
    const handleSubmit = (e) => {
        e.preventDefault();
        setData({ name: "", email: "", message: "" })
        setMessage("Message sent!")
    }
    // Preventing the default form submission behavior avoids a page reload, enabling a smoother user experience.
    // Resetting the form data after submission provides immediate feedback to the user that the form has been cleared.
    // Setting a success message gives the user confirmation that their message was sent.

    return (
        <main>
            <Helmet>
                <title>Contact Us - HealthifyMe</title>
                <meta
                    name="description"
                    content="Get in touch with HealthifyMe. Send us your questions, feedback, or inquiries through our contact form."
                />
                <meta
                    name="keywords"
                    content="HealthifyMe, contact, support, customer service, inquiries, feedback"
                />
            </Helmet>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" placeholder="Your Name" value={data.name} onChange={handleChange}></input>
                <label htmlFor="email">E-Mail:</label>
                <input type="text" name="email" id="email" placeholder="email@example.com" value={data.email} onChange={handleChange}></input>
                <label htmlFor="message">Message:</label>
                <textarea name="message" id="message" placeholder="Please enter your message here" value={data.message} onChange={handleChange}></textarea>
                <button type="submit">Send Message</button>
            </form>
            <p>{message}</p>
        </main>
    )
}

export default Contact;