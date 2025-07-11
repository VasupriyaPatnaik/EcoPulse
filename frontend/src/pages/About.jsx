import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiUsers, FiGlobe, FiAward, FiHeart } from "react-icons/fi";
import taraImage from '../assets/images/tara.jpg';
import vaspImage from '../assets/images/vasp.jpg';

const About = () => {
  const [stats, setStats] = useState([
    { value: 0, target: 50, label: "Active Users", icon: <FiUsers className="text-2xl" /> },
    { value: 0, target: 150, label: "Actions Logged", icon: <FiHeart className="text-2xl" /> },
    { value: 0, target: 1, label: "Universities", icon: <FiGlobe className="text-2xl" /> },
    { value: 0, target: 25, label: "CO₂ Saved (kg)", icon: <FiAward className="text-2xl" /> }
  ]);

  // Animate counters
  useEffect(() => {
    const duration = 2000;
    const initialStats = [
      { value: 0, target: 50, label: "Active Users", icon: <FiUsers className="text-2xl" /> },
      { value: 0, target: 150, label: "Actions Logged", icon: <FiHeart className="text-2xl" /> },
      { value: 0, target: 1, label: "Universities", icon: <FiGlobe className="text-2xl" /> },
      { value: 0, target: 25, label: "CO₂ Saved (kg)", icon: <FiAward className="text-2xl" /> }
    ];

    initialStats.forEach((stat, index) => {
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
  }, []); // Empty dependency array is correct here

  const teamMembers = [
    {
      name: "Vasupriya Patnaik",
      role: "Co-Founder & Community Lead",
      bio: "A student passionate about creating awareness around environmental issues. Always looking for practical ways to make sustainability accessible to everyone.",
      image: vaspImage,
      expertise: ["Sustainability Research", "Community Outreach"],
      motivation: "Loves connecting with like-minded people who care about our planet",
    },
    {
      name: "Tarakanta Acharya",
      role: "Co-Founder & Technical Lead",
      bio: "A developer who believes technology can be a force for good. Enjoys building tools that help people make better environmental choices.",
      image: taraImage,
      expertise: ["Full-Stack Development", "UI/UX Design"],
      motivation: "Excited about using code to create positive environmental impact",
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
      <section className="py-20 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            About Our <span className="text-emerald-200">Journey</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl max-w-3xl mx-auto"
          >
            We're a small team passionate about making environmental action accessible to everyone.
          </motion.p>
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
                  EcoPulse started as a college project in 2024. We noticed that while many people wanted to live more sustainably, 
                  they often didn't know where to start or how to track their progress effectively.
                </p>
                <p>
                  As students ourselves, we wanted to create something simple and practical - a platform where people could 
                  easily log their eco-friendly actions and see the real impact they're making. We're still learning and 
                  growing, but we're excited about the journey ahead.
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
                        <span key={i} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 italic">
                    "{member.motivation}"
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