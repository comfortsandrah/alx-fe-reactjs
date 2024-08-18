import React, { useState } from 'react'

const Contact = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission logic here
      console.log('Form submitted:', formData);
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    };
  
    return (
      <div style={{ padding: '20px' }}>
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            style={{ display: 'block', margin: '10px 0' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            style={{ display: 'block', margin: '10px 0' }}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            style={{ display: 'block', margin: '10px 0' }}
          />
          <button type="submit">Send Message</button>
        </form>
      </div>
  )
}

export default Contact