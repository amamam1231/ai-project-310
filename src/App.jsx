import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Sparkles,
  Cpu,
  Rocket,
  Users,
  Zap,
  ChevronRight,
  Send,
  CheckCircle,
  Brain,
  Code,
  Globe,
  ArrowRight,
  Star,
  Quote,
  Menu,
  X,
  Target,
  Layers,
  Workflow
} from 'lucide-react'

// Web3Forms Handler Hook
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e, accessKey) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsError(false)

    const formData = new FormData(e.target)
    formData.append('access_key', accessKey)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setIsSuccess(true)
        e.target.reset()
      } else {
        setIsError(true)
        setErrorMessage(data.message || 'Что-то пошло не так')
      }
    } catch (error) {
      setIsError(true)
      setErrorMessage('Ошибка сети. Попробуйте еще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setIsSuccess(false)
    setIsError(false)
    setErrorMessage('')
  }

  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm }
}

// Scroll Animation Component
const ScrollReveal = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : 0,
      x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    }
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Stagger Container
const StaggerContainer = ({ children, className }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const StaggerItem = ({ children, className }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
)

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler()

  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY' // Замените на ваш ключ с https://web3forms.com

  const stages = [
    {
      icon: Target,
      number: '01',
      title: 'Идея и исследование',
      description: 'Анализ рынка, поиск ниши и валидация концепции AI-продукта. Определяем целевую аудиторию и проблемы, которые решит продукт.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Brain,
      number: '02',
      title: 'Проектирование',
      description: 'Создание архитектуры, выбор технологий и моделей ИИ. Разработка прототипа и тестирование гипотез на реальных данных.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Code,
      number: '03',
      title: 'Разработка MVP',
      description: 'Быстрая разработка минимально жизнеспособного продукта. Интеграция API ИИ, настройка промптов и базовый функционал.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Rocket,
      number: '04',
      title: 'Запуск и масштаб',
      description: 'Вывод продукта на рынок, сбор обратной связи, итерации и масштабирование. Оптимизация моделей и рост пользовательской базы.',
      color: 'from-orange-500 to-amber-500'
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: 'Быстрый старт',
      description: 'Начните создавать AI-продукты уже через неделю, даже без глубоких технических знаний'
    },
    {
      icon: Layers,
      title: 'Проверенные методы',
      description: 'Работаем только с реальными кейсами и актуальными инструментами 2024 года'
    },
    {
      icon: Workflow,
      title: 'Пошаговые инструкции',
      description: 'Четкий план от идеи до первых пользователей без воды и теории ради теории'
    },
    {
      icon: Globe,
      title: 'Глобальный рынок',
      description: 'Создавайте продукты для мирового рынка и масштабируйте безгранично'
    },
    {
      icon: Users,
      title: 'Сообщество',
      description: 'Доступ к закрытому комьюнити создателей AI-продуктов и нетворкинг'
    },
    {
      icon: Cpu,
      title: 'Техническая поддержка',
      description: 'Помощь с интеграцией API, выбором моделей и оптимизацией затрат'
    }
  ]

  const testimonials = [
    {
      name: 'Александр Петров',
      role: 'Основатель AI Startup',
      content: 'За 3 месяца запустил свой первый AI-продукт. Материал структурирован отлично, все по делу без воды. Уже 500+ пользователей!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Мария Соколова',
      role: 'Product Manager',
      content: 'Наконец-то поняла, как работают LLM под капотом. Смогла самостоятельно прототипировать AI-фичи для своего продукта.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Дмитрий Волков',
      role: 'Indie Developer',
      content: 'Создал AI-ассистента для маркетологов. Доход $3K/мес на подписках. Лучшее вложение времени за последний год.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
    }
  ]

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[128px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
        <nav className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">AI Creator</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="text-sm text-slate-300 hover:text-white transition-colors">О проекте</button>
            <button onClick={() => scrollToSection('stages')} className="text-sm text-slate-300 hover:text-white transition-colors">Этапы</button>
            <button onClick={() => scrollToSection('benefits')} className="text-sm text-slate-300 hover:text-white transition-colors">Преимущества</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-sm text-slate-300 hover:text-white transition-colors">Отзывы</button>
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-white text-slate-950 px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-200 transition-colors"
            >
              Начать создавать
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900 border-b border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                <button onClick={() => scrollToSection('about')} className="block w-full text-left text-slate-300 py-2">О проекте</button>
                <button onClick={() => scrollToSection('stages')} className="block w-full text-left text-slate-300 py-2">Этапы</button>
                <button onClick={() => scrollToSection('benefits')} className="block w-full text-left text-slate-300 py-2">Преимущества</button>
                <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-slate-300 py-2">Отзывы</button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-white text-slate-950 px-6 py-3 rounded-full font-semibold mt-4"
                >
                  Начать создавать
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-slate-300">Новая эра создания продуктов</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight"
            >
              Создавайте{' '}
              <span className="text-gradient">AI продукты</span>
              <br className="hidden md:block" />
              <span className="text-slate-400">от идеи до запуска</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Пошаговый путь создания успешных AI-продуктов без сложного кода.
              Научитесь использовать искусственный интеллект для решения реальных проблем.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <button
                onClick={() => scrollToSection('contact')}
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center gap-2 glow min-h-[56px] min-w-[200px] justify-center"
              >
                Начать обучение
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('stages')}
                className="px-8 py-4 rounded-full font-semibold text-lg text-slate-300 hover:text-white border border-white/10 hover:border-white/30 transition-all min-h-[56px] min-w-[200px]"
              >
                Узнать больше
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            >
              {[
                { value: '500+', label: 'Выпускников' },
                { value: '$2M+', label: 'Выручка студентов' },
                { value: '50+', label: 'Запущенных продуктов' },
                { value: '4.9', label: 'Рейтинг курса' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 md:px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="relative">
                <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
                    alt="AI Technology"
                    className="w-full h-full object-cover opacity-80"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center glow">
                  <div className="text-center">
                    <div className="text-4xl font-bold">AI</div>
                    <div className="text-sm opacity-80">Революция</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div>
              <ScrollReveal delay={0.1}>
                <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">О проекте</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 tracking-tight">
                  Почему сейчас —{' '}
                  <span className="text-gradient">идеальное время</span>{' '}
                  для AI-продуктов?
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                  Искусственный интеллект открыл золотую жилу для создателей продуктов.
                  То, что раньше требовало команды разработчиков и миллионы инвестиций,
                  теперь доступно одному человеку с ноутбуком.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-slate-400 text-lg leading-relaxed mb-8">
                  Мы собрали опыт создания десятков AI-продуктов в структурированную систему,
                  которая поможет вам избежать типичных ошибок и запустить продукт,
                  который решает реальные проблемы людей.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Без сложного кода</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Готовые шаблоны</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Поддержка 24/7</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Stages Section */}
      <section id="stages" className="py-24 px-4 md:px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal className="text-center mb-16">
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Путь создания</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 tracking-tight">
              4 этапа от{' '}
              <span className="text-gradient">идеи</span>{' '}
              до{' '}
              <span className="text-gradient">прибыли</span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((stage, index) => (
              <StaggerItem key={index}>
                <div className="group relative h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <stage.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-4xl font-black text-white/10 absolute top-4 right-4">
                    {stage.number}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{stage.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Timeline Connector (Desktop) */}
          <div className="hidden lg:block mt-8">
            <div className="flex justify-between px-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 flex items-center">
                  <div className="h-0.5 w-full bg-gradient-to-r from-purple-600/50 to-blue-600/50" />
                  <ArrowRight className="w-5 h-5 text-purple-400 -ml-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <ScrollReveal className="text-center mb-16">
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Преимущества</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 tracking-tight">
              Что вы{' '}
              <span className="text-gradient">получите</span>
            </h2>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <StaggerItem key={index}>
                <div className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-purple-500/30 transition-all h-full">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center mb-4 group-hover:bg-purple-600/30 transition-colors">
                    <benefit.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 md:px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal className="text-center mb-16">
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Истории успеха</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 tracking-tight">
              Что говорят{' '}
              <span className="text-gradient">выпускники</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-purple-600/20">
                <Quote className="w-16 h-16" />
              </div>

              <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="text-xl md:text-2xl leading-relaxed mb-8 text-slate-200">
                      "{testimonials[activeTestimonial].content}"
                    </p>

                    <div className="flex items-center gap-4">
                      <img
                        src={testimonials[activeTestimonial].avatar}
                        alt={testimonials[activeTestimonial].name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-purple-500/30"
                      />
                      <div>
                        <div className="font-bold text-lg">{testimonials[activeTestimonial].name}</div>
                        <div className="text-slate-400 text-sm">{testimonials[activeTestimonial].role}</div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeTestimonial ? 'w-8 bg-purple-500' : 'bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
              <div className="relative bg-slate-950/90 backdrop-blur-xl rounded-[22px] p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                  Готовы создать свой{' '}
                  <span className="text-gradient">AI продукт?</span>
                </h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
                  Присоединяйтесь к тысячам создателей, которые уже строят будущее с помощью искусственного интеллекта.
                </p>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-white text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-200 transition-all inline-flex items-center gap-2"
                >
                  Получить доступ
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 md:px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <ScrollReveal className="text-center mb-12">
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Связаться</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 tracking-tight">
              Начните{' '}
              <span className="text-gradient">сегодня</span>
            </h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Оставьте заявку, и мы свяжемся с вами в течение 24 часов с персональным планом обучения
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="max-w-lg mx-auto">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Ваше имя"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="telegram"
                        placeholder="Telegram (опционально)"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>

                    <div>
                      <textarea
                        name="message"
                        placeholder="Расскажите о вашей идее или задайте вопрос"
                        rows="4"
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                      ></textarea>
                    </div>

                    {isError && (
                      <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                        {errorMessage}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 min-h-[56px]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Отправка...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Отправить заявку
                        </>
                      )}
                    </button>

                    <p className="text-xs text-slate-500 text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="text-center py-12"
                  >
                    <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      Заявка отправлена!
                    </h3>
                    <p className="text-slate-400 mb-8 max-w-md mx-auto">
                      Спасибо за интерес! Мы свяжемся с вами в ближайшее время для обсуждения деталей.
                    </p>
                    <button
                      onClick={resetForm}
                      className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                    >
                      Отправить еще одну заявку
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-6 border-t border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">AI Creator</span>
            </div>

            <div className="flex items-center gap-8 text-sm text-slate-400">
              <button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">О проекте</button>
              <button onClick={() => scrollToSection('stages')} className="hover:text-white transition-colors">Этапы</button>
              <button onClick={() => scrollToSection('benefits')} className="hover:text-white transition-colors">Преимущества</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Контакты</button>
            </div>

            <div className="text-sm text-slate-500">
              © 2024 AI Creator. Все права защищены.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App