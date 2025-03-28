import React, { useState } from "react";

function Contact() {
    const [data, setData] = useState({ name: "", email: "", message: "" })
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    // Mock a Submission Event
    const handleSubmit = (e) => {
        e.preventDefault();
        setData({ name: "", email: "", message: "" })
        setMessage("Message sent!")
    }

    return (
        <main>
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