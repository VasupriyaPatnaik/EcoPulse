import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiUsers, FiGlobe, FiAward, FiHeart } from "react-icons/fi";
import taraImage from '../assets/images/tara.jpg';
import vaspImage from '../assets/images/vasp.jpg';

const About = () => {
  const [stats, setStats] = useState([
    { value: 0, target: 25000, label: "Active Users", icon: <FiUsers className="text-2xl" /> },
    { value: 0, target: 15, label: "Countries", icon: <FiGlobe className="text-2xl" /> },
    { value: 0, target: 8, label: "Awards Won", icon: <FiAward className="text-2xl" /> },
    { value: 0, target: 500, label: "Trees Planted", icon: <FiHeart className="text-2xl" /> }
  ]);

  // Animate counters
  useEffect(() => {
    const duration = 2000;
    stats.forEach((stat, index) => {
      const start = Date.now();
      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(stat.target * progress);
        
        setStats(prev => prev.map((s, i) => 
          i === index ? { ...s, value: currentValue } : s
        ));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      setTimeout(animate, index * 200);
    });
  }, []);

  const teamMembers = [
    {
      name: "Vasupriya Patnaik",
      role: "Co-Founder & Sustainability Lead",
      bio: "Environmental engineer with 8+ years experience in green technology and circular economy solutions. Passionate about creating actionable sustainability frameworks.",
      image: vaspImage, // Update path to your image
      expertise: ["Circular Economy", "Carbon Footprinting", "ESG Strategy"],
      funFact: "Organized beach cleanups in 12 coastal cities",
      social: {
        linkedin: "https://www.linkedin.com/in/vasupriya-patnaik",
        github: "https://github.com/VasupriyaPatnaik"
      }
    },
    {
      name: "Tarakanta Acharya",
      role: "Co-Founder & Tech Lead",
      bio: "Full-stack developer specializing in environmental data visualization. Built three award-winning sustainability apps before co-founding EcoPulse.",
      image: taraImage, // Update path to your image
      expertise: ["React Development", "Data Analytics", "Cloud Architecture"],
      funFact: "Cycles 20km daily rain or shine",
      social: {
        linkedin: "https://www.linkedin.com/in/tarakantaacharya",
        github: "https://github.com/tarakantaacharya"
      }
    }
  ];

  const values = [
    {
      title: "Sustainability First",
      description: "Every decision is made with environmental impact in mind",
      icon: "🌱"
    },
    {
      title: "Community Driven",
      description: "We grow stronger together through shared knowledge",
      icon: "👥"
    },
    {
      title: "Transparent Impact",
      description: "Real metrics showing real environmental change",
      icon: "📊"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-emerald-50">
      {/* Hero Section - Keep same */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">Mission</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're on a journey to make sustainability accessible, measurable, and rewarding for everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Keep same */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Impact in Numbers
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-emerald-50 rounded-xl"
              >
                <div className="flex justify-center text-emerald-600 mb-4">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value.toLocaleString()}+
                </p>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section - Keep same */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our <span className="text-emerald-600">Story</span>
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                EcoPulse was born in 2020 from a simple idea: sustainability should be rewarding and accessible to all. 
                Frustrated by complex carbon calculators and lack of tangible results, our founder set out to create 
                a platform that makes environmental action simple, measurable, and fun.
              </p>
              <p className="text-lg text-gray-700">
                Today, we're a passionate team of environmentalists, developers, and designers working together to 
                empower individuals and communities to make a real difference.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-emerald-100 rounded-2xl p-2 shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=800" 
                  alt="Team working together" 
                  className="rounded-xl w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
                <p className="font-bold text-emerald-600">Since 2020</p>
                <p className="text-sm text-gray-600">Making sustainability simple</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section - Keep same */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Core Values
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-xl shadow-md text-center transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Updated Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Meet the <span className="text-emerald-600">Founders</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="md:flex">
                  <div className="md:w-1/3 p-6 flex justify-center">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-emerald-100"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <h3 className="text-2xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-emerald-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-700 mb-4">{member.bio}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-bold text-sm text-gray-500 mb-2">EXPERTISE</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((item, i) => (
                          <span key={i} className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-500">FUN FACT</h4>
                        <p className="text-sm">{member.funFact}</p>
                      </div>
                      <div className="flex space-x-3">
                        {member.social.linkedin && (
                          <a href={member.social.linkedin} className="text-gray-500 hover:text-emerald-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        )}
                        {member.social.twitter && (
                          <a href={member.social.twitter} className="text-gray-500 hover:text-emerald-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                          </a>
                        )}
                        {member.social.github && (
                          <a href={member.social.github} className="text-gray-500 hover:text-emerald-600">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Keep same */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Ready to join the movement?</h2>
            <p className="text-xl text-emerald-100 mb-8 max-w-3xl mx-auto">
              Together, we can make a real difference for our planet.
            </p>
            <div className="flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-emerald-700 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:bg-opacity-10 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;