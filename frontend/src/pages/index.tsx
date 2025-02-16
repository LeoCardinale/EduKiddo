import React from 'react';
import Link from 'next/link';
import { Book, Brain, Rocket, Star, Users } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="font-nunito font-extrabold text-6xl">
                <span className="text-[#1976D2]">EDU</span>
                <span className="text-orange-primary">K</span>
                <span className="text-[#03A9F4]">I</span>
                <span className="text-[#00BCD4]">D</span>
                <span className="text-[#00ACC1]">D</span>
                <span className="text-orange-accent">O</span>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-4 sm:pb-8 md:pb-12 lg:max-w-2xl lg:w-full lg:pb-16">
              <main className="mt-6 mx-auto max-w-7xl px-4 sm:mt-8 sm:px-6 md:mt-10 lg:mt-12 lg:px-8">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl font-nunito">
                    <span className="block">Aprendemos</span>
                    <span className="block text-orange-primary">haciendo</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-nunito">
                    Transformamos el estudio en una aventura práctica y creativa. A través de actividades físicas y técnicas de aprendizaje comprobadas, cada niño construye su propio camino hacia el conocimiento.
                  </p>
                  <ul className="mt-5 text-gray-500 space-y-2 font-nunito">
                    <li className="flex items-center">
                      <span className="text-orange-accent mr-2">✓</span>
                      Actividades físicas que refuerzan el aprendizaje
                    </li>
                    <li className="flex items-center">
                      <span className="text-orange-accent mr-2">✓</span>
                      Técnicas de estudio adaptadas a cada edad
                    </li>
                    <li className="flex items-center">
                      <span className="text-orange-accent mr-2">✓</span>
                      Aprendizaje autónomo y creativo
                    </li>
                  </ul>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link href="/demo">
                        <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange-primary hover:bg-orange-accent transition-colors duration-300 md:py-4 md:text-lg md:px-10 font-nunito">
                          Ver demo
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full">
                <img src="/hero-illustration.svg" alt="Learning illustration" className="h-full w-full object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-3xl text-blue-600 font-semibold">¿Por qué Edukiddo?</h2>
            </div>

            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {/* Feature 1 */}
                <div className="relative">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Brain className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Aprendizaje Activo</h3>
                      <p className="mt-2 text-base text-gray-500">
                        Actividades prácticas que convierten conceptos abstractos en experiencias tangibles.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="relative">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Star className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Personalización</h3>
                      <p className="mt-2 text-base text-gray-500">
                        Contenido adaptado a diferentes edades y estilos de aprendizaje.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="relative">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Rocket className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Tecnología Innovadora</h3>
                      <p className="mt-2 text-base text-gray-500">
                        IA que genera experiencias educativas únicas y significativas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        {/* <div className="bg-blue-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-8">
              <h2 className="text-3xl text-blue-600 font-semibold">Lo que dicen las familias</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic">"Mi hijo disfruta aprendiendo mientras crea. Es increíble ver cómo retiene los conceptos a través de las actividades."</p>
                <p className="mt-4 font-medium">María G. - Madre de Juan, 8 años</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic">"Las actividades son muy creativas y fáciles de seguir. Mi hija siempre está emocionada por empezar una nueva lección."</p>
                <p className="mt-4 font-medium">Carlos P. - Padre de Ana, 4 años</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic">"Una forma maravillosa de aprender en casa. Los materiales son simples pero las experiencias son muy enriquecedoras."</p>
                <p className="mt-4 font-medium">Laura M. - Madre de Diego, 3 años</p>
              </div>
            </div>
          </div>
        </div> */}
      </main>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <p className="text-gray-400 hover:text-gray-500">
              © 2024 Edukiddo. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}