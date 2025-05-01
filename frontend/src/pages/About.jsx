import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiUsers, FiGlobe, FiAward, FiHeart } from "react-icons/fi";
import TeamCard from "../components/TeamCard"; // You'll create this component

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
      name: "Alex Green",
      role: "Founder & CEO",
      bio: "Environmental scientist with 10+ years in sustainability",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200"
    },
    {
      name: "Sam Wilson",
      role: "Lead Developer",
      bio: "Tech enthusiast building solutions for a greener planet",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200"
    },
    {
      name: "Jordan Taylor",
      role: "Community Manager",
      bio: "Connecting eco-warriors worldwide",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200"
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
      {/* Hero Section */}
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

      {/* Stats Section */}
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

      {/* Story Section */}
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

      {/* Values Section */}
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

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Meet the <span className="text-emerald-600">Team</span>
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamCard 
                key={member.name}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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