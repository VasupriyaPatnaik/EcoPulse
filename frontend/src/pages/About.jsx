import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiUsers, FiGlobe, FiAward, FiHeart } from "react-icons/fi";
import taraImage from '../assets/images/tara.jpg';
import vaspImage from '../assets/images/vasp.jpg';

const About = () => {
  const [stats, setStats] = useState([
    { value: 0, target: 1200, label: "Community Members", icon: <FiUsers className="text-2xl" /> },
    { value: 0, target: 3, label: "Countries", icon: <FiGlobe className="text-2xl" /> },
    { value: 0, target: 2, label: "Projects", icon: <FiAward className="text-2xl" /> },
    { value: 0, target: 120, label: "Trees Planted", icon: <FiHeart className="text-2xl" /> }
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
      role: "Co-Founder",
      bio: "Passionate about sustainable living and community building. Believes small actions can create big change.",
      image: vaspImage,
      expertise: ["Sustainability", "Community Engagement"],
      funFact: "Started a neighborhood composting initiative",
    },
    {
      name: "Tarakanta Acharya",
      role: "Co-Founder",
      bio: "Tech enthusiast who wants to use technology for environmental good. Builds simple solutions to complex problems.",
      image: taraImage,
      expertise: ["Web Development", "Data Visualization"],
      funFact: "Built a solar-powered weather station",
    }
  ];

  const values = [
    {
      title: "Authentic Impact",
      description: "We focus on real, measurable change rather than vanity metrics",
      icon: "🌍"
    },
    {
      title: "Transparency",
      description: "We share both our successes and challenges openly",
      icon: "🔍"
    },
    {
      title: "Practical Solutions",
      description: "We promote actions that people can realistically implement",
      icon: "🛠️"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl font-medium text-gray-900 mb-4">
              About Our Journey
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're a small team passionate about making environmental action accessible to everyone.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-medium text-center mb-8"
          >
            Our Progress So Far
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4"
              >
                <div className="flex justify-center text-emerald-600 mb-2">
                  {stat.icon}
                </div>
                <p className="text-3xl font-medium text-gray-900 mb-1">
                  {stat.value.toLocaleString()}+
                </p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                How We Started
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  In 2022, we noticed that many environmental platforms were either too technical or focused on large-scale actions. 
                  We wanted to create something different - a space where regular people could find simple, practical ways to make a difference.
                </p>
                <p>
                  What began as a weekend project sharing local sustainability tips has grown into a small but dedicated community. 
                  We're still learning as we go, but we're committed to keeping our approach grounded and honest.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800" 
                  alt="Team working together" 
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-medium text-center mb-8"
          >
            What Guides Us
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-lg"
              >
                <div className="text-3xl mb-3">{value.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-medium text-center mb-8"
          >
            Who We Are
          </motion.h2>
          
          <div className="flex flex-col gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row gap-6 items-center"
              >
                <div className="w-32 h-32 flex-shrink-0">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{member.name}</h3>
                  <p className="text-emerald-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-600 mb-3">{member.bio}</p>
                  
                  <div className="mb-3">
                    <h4 className="font-medium text-sm text-gray-500 mb-1">Focus Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((item, i) => (
                        <span key={i} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Fun fact:</span> {member.funFact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-medium text-white mb-4">Want to join us?</h2>
            <p className="text-emerald-100 mb-6">
              We're always looking for people who share our passion for practical environmental action.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2 bg-white text-emerald-700 rounded-md font-medium"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;