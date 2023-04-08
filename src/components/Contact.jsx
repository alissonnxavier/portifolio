import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const [buttonSubmitColor, setButtonSubmitColor] = useState('py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:rounded-none bg-gradient-to-r from-red-400 to-blue-500 hover:from-green-500 hover:to-green-100');
  const [headContact, setHeadContact] = useState('Contato.');
  const [contactColor, setContactColor] = useState(`text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]`);
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState('Enviar');

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setLoading('Enviar');
    setHeadContact('digitando...')
    setButtonSubmitColor('py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:rounded-none bg-gradient-to-r from-red-400 to-blue-500 hover:from-green-500 hover:to-green-100');
    setContactColor(`animate-bounce w-6 h-6 text-lime-400 font-black md:text-[30px] sm:text-[25px] xs:text-[20px] text-[15px]`);
    e.target.classList.add('text-lime-500');
    e.target.classList.remove('text-white')

    setForm({
      ...form,
      [name]: value,
    });
  };

  function verifyFields(field, event, str) {
    if (field === '') {
      event.target[str].classList.remove('border-none');
      setHeadContact('Opss... algum campo ficou vazio')
      setContactColor(`text-rose-700 font-black md:text-[30px] sm:text-[25px] xs:text-[20px] text-[15px]`);
    } else {
      event.target[str].classList.add('border-none');
    }
  }

  function sendEmail(e) {
    e.preventDefault();
    verifyFields(form.name, e, 'name');
    verifyFields(form.email, e, 'email');
    verifyFields(form.message, e, 'message');

    const templateParams = {
      from_name: form.name,
      message: form.message,
      email: form.email
    }

    if (form.name != '' && form.email != '' && form.message != '') {
      setLoading('Enviando...');
      emailjs.send('service_m8uzzie', 'template_we19dku', templateParams, '0TJa4hS5emOUGaH83')
        .then((response) => {
          console.log("EMAIL ENVIADO", response.status, response.text)
          setHeadContact('Obrigado pela menssagem! prometo te responder em breve')
          setContactColor(`text-lime-400 font-black md:text-[30px] sm:text-[25px] xs:text-[20px] text-[15px]`);
          setButtonSubmitColor('py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover:rounded-none bg-gradient-to-r from-green-400 to-green-200 hover:from-green-500 hover:to-green-100')
          setLoading('Enviado');
          setForm({
            name: "",
            email: "",
            message: "",
          })
        }, (err) => { console.log("ERROR: ", err) })
    }
  }

  return (
    <div
      className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
      >
  
        <p className={styles.sectionSubText}>Entre em contato</p>
        <h3 className={contactColor} id='contact'>{headContact}</h3>



        <form
          ref={formRef}
          onSubmit={sendEmail}
          className=' mt-12 flex flex-col gap-8 '
        >
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Seu Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}

              placeholder="Qual é o seu nome?"
              className='border-2 border-rose-600 bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Seu E-mail</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="Qual é o seu E-mail"
              className='border-2 border-rose-600 bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Sua Menssagem</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='O que vc gostaria de dizer?'
              className='border-2 border-rose-600 bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
            />
          </label>

          <button
            type='submit'
            className={buttonSubmitColor}
          >
            {loading}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");