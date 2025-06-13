import { motion } from 'framer-motion';
import { 
  Award, 
  Users, 
  Target, 
  Heart, 
  CheckCircle, 
  TrendingUp,
  BookOpen,
  Globe,
  Star
} from 'lucide-react';

const About = () => {
  const stats = [
    { number: '15+', label: 'Years Experience', icon: Award },
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '99%', label: 'Client Retention', icon: Target },
    { number: '24/7', label: 'Support Available', icon: Heart }
  ];

  const values = [
    {
      icon: CheckCircle,
      title: 'Integrity',
      description: 'We maintain the highest ethical standards in all our professional relationships and dealings.'
    },
    {
      icon: TrendingUp,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, continuously improving our services and expertise.'
    },
    {
      icon: Heart,
      title: 'Client-Focused',
      description: 'Our clients success is our success. We prioritize building long-term relationships based on trust.'
    },
    {
      icon: BookOpen,
      title: 'Continuous Learning',
      description: 'We stay current with industry trends and regulations to provide the best possible service.'
    }
  ];

  const certifications = [
    {
      title: 'Certified Public Accountant (CPA)',
      issuer: 'Institute of Certified Public Accountants of Kenya',
      year: '2008'
    },
    {
      title: 'Advanced Certificate in Financial Management',
      issuer: 'Kenya Institute of Management',
      year: '2012'
    },
    {
      title: 'Tax Advisory Certification',
      issuer: 'Kenya Revenue Authority',
      year: '2015'
    },
    {
      title: 'International Financial Reporting Standards (IFRS)',
      issuer: 'IFRS Foundation',
      year: '2018'
    }
  ];

  const milestones = [
    {
      year: '2008',
      title: 'Founded the Practice',
      description: 'Started as a solo practitioner focusing on small business accounting'
    },
    {
      year: '2012',
      title: 'Expanded Services',
      description: 'Added tax planning and business advisory services to our portfolio'
    },
    {
      year: '2016',
      title: 'Team Growth',
      description: 'Grew to a team of 5 professionals to better serve our growing client base'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Implemented cloud-based solutions and remote service capabilities'
    },
    {
      year: '2024',
      title: 'Innovation Leader',
      description: 'Launched comprehensive digital platform for seamless client experience'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900">
                Meet <span className="text-primary-600">Wendy Muhoho</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                A dedicated CPA with over 15 years of experience helping businesses 
                and individuals achieve financial success through expert guidance, 
                innovative solutions, and personalized service.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Award className="h-6 w-6 text-primary-500" />
                  <span className="font-semibold text-gray-700">CPA Certified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-6 w-6 text-primary-500" />
                  <span className="font-semibold text-gray-700">International Standards</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative group"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80"
                  alt="Wendy Muhoho CPA"
                  className="rounded-2xl shadow-2xl transition-opacity duration-300 group-hover:opacity-0"
                />
                <img
                  src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
                  alt="Wendy smiling"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary-500 text-white p-6 rounded-2xl shadow-lg z-20">
                <Star className="h-8 w-8 mb-2" />
                <p className="font-semibold">4.5 Rating</p>
                <p className="text-sm opacity-90">Client Reviews</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 transition-colors">
                  <stat.icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These fundamental principles guide everything we do and shape 
              how we serve our clients every day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Journey Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              A timeline of growth, innovation, and commitment to excellence
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200"></div>
            
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                } mb-12`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="text-primary-600 font-bold text-lg mb-2">
                      {milestone.year}
                    </div>
                    <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-lg"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Professional Certifications
            </h2>
            <p className="text-xl text-gray-600">
              Continuous education and professional development ensure we stay at the forefront of our field
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg flex items-start space-x-4"
              >
                <div className="bg-primary-100 p-3 rounded-lg flex-shrink-0">
                  <Award className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-semibold text-gray-900 mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{cert.issuer}</p>
                  <span className="inline-block bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                    {cert.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold">
              Our Mission
            </h2>
            <p className="text-xl opacity-90 max-w-4xl mx-auto leading-relaxed">
              "To empower businesses and individuals with expert financial guidance, 
              innovative solutions, and personalized service that drives growth, 
              ensures compliance, and creates lasting value. We are committed to 
              building long-term relationships based on trust, integrity, and 
              exceptional results."
            </p>
            <div className="flex justify-center">
              <div className="bg-white bg-opacity-20 px-8 py-4 rounded-lg">
                <p className="font-semibold">— Wendy Muhoho, CPA</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;