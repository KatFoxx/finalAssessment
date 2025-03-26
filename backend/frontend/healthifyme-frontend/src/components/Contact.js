import React, { useState } from "react";

function Contact() {
    const [data, setData] = useState({ name: "", email: "", message: "" })
    const handleSubmit

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" placeholder="Your Name"></input>
                <label htmlFor="email">E-Mail:</label>
                <input type="text" name="email" id="email" placeholder="email@example.com"></input>
                <label htmlFor="message">Message:</label>
                <textarea name="message" placeholder="Please enter your message here"></textarea>
                <button type="submit">Send Message</button>
            </form>
        </main>
    )
}

export default Contact;