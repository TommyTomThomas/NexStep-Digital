import React from 'react';

function App() {
  return (
    <div className='min-h-screen bg-gray-50 text-gray-900'>
      <header className='sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-200'>
        <div className='mx-auto max-w-6xl px-6 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-fuchsia-500 grid place-items-center'>
              <span className='text-black'>🚀</span>
            </div>
            <span className='font-bold tracking-tight'>NexStep Digital</span>
          </div>
          <a href='#contact' className='text-sm rounded-xl bg-black text-white px-4 py-2 font-semibold hover:bg-gray-800'>Get a Quote</a>
        </div>
      </header>

      <section className='relative py-24 md:py-36 text-center'>
        <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight'>
          Websites that <span className='bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400'>win business</span>
        </h1>
        <p className='mt-6 text-lg md:text-xl text-gray-700 max-w-2xl mx-auto'>
          We craft conversion-focused sites, sharpen SEO, and run paid media that pays for itself.
        </p>
        <div className='mt-8'>
          <iframe
            src='https://docs.google.com/forms/d/e/1FAIpQLSe3xQvLehmBLRgiwzHgPMHf7ZYXXQkYfjTc9h7ZdEc7RPNRFg/viewform?embedded=true'
            width='640'
            height='824'
            frameBorder='0'
            marginHeight='0'
            marginWidth='0'
            title='NexStep Digital Contact Form'
          >
            Loading…
          </iframe>
        </div>
      </section>

      <footer className='border-t border-gray-200 text-center py-6 text-gray-600 text-sm'>
        © {new Date().getFullYear()} NexStep Digital. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
