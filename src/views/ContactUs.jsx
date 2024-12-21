import { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert('Form submitted!');
  };

  return (
    <section className="text-center mt-4">
      <h2>Contact Us</h2>
      <p>
        Have a question? Get in touch with us, and we'll respond as soon as possible!
      </p>

      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control w-25 mx-auto" // Smaller width (25%)
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="form-control w-25 mx-auto" // Smaller width (25%)
            placeholder="Enter your phone number"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control w-25 mx-auto" // Smaller width (25%)
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>

      <p className="mt-3">
        <b><i style={{ fontSize: '1.2em' }}>"Cats are connoisseurs of comfort." - James Herriot</i></b>
      </p>
    </section>
  );
}
