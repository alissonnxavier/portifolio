import { motion } from "framer-motion"

import { styles } from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {

  var keyOpen = '{';
  var keyClose = '}';
  var parentheses = '() => ';
  
  return (
    <section className='relative w-full h-screen mt-auto'>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w7x1 mx-auto flex 
      flex-row items-start gap-5`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Ola meu nome é <span className="text-rose-400"> Alisson </span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            Sou desenvolvedor Full stack {parentheses} <span className='text-lime-500'>{keyOpen} </span><br className="sm:block hidden" />
            <div className="flex">
            <span className='ml-8'>
              Desenvolvo e mantenho aplicações web usando  JavaScript, TypeScript, 
              NodeJs, React.js, Next.js, MongoDb, Convex, MySql,
              Docker, tailwindcss, Three.Js e outras tecnologias relacionadas
            </span><br></br>
            </div>
            <span className='text-lime-500'>{keyClose} </span>
          </p>
        </div>

      </div>

      <ComputersCanvas />

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>


  )
}

export default Hero