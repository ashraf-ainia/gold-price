import Head from "next/head";
import React from "react";

import styles from "./index.module.css";

const ContactUs = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generateMailtoLink = () => {
    const { name, email, message } = formData;
    const subject = "New Contact Us Submission";
    const body = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
    return `mailto:meshal.albshry@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <Head>
        <title>اتصل بنا</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.heading}>اتصل بنا</h1>

        <p>نحن هنا لمساعدتك. يرجى ملء النموذج أدناه للتواصل معنا.</p>

        <form className={styles.form}>
          <label className={styles.label} htmlFor="name">
            الاسم الكامل:
          </label>
          <input
            className={styles.inputField}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className={styles.label} htmlFor="email">
            البريد الإلكتروني:
          </label>
          <input
            className={styles.inputField}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className={styles.label} htmlFor="message">
            رسالتك:
          </label>
          <textarea
            className={styles.inputField}
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <a
            className={styles.submitButton}
            href={generateMailtoLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            إرسال
          </a>
        </form>
        <p>كما يمكنكم التواصل عن طريق <a href="tel:966503413225">رقم الجوال</a></p>
      </div>
    </>
  );
};

export default ContactUs;
