import { motion } from "framer-motion";

const TeamCard = ({ name, role, bio, image, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-emerald-600 mb-3">{role}</p>
        <p className="text-gray-600">{bio}</p>
        <div className="mt-4 flex space-x-4">
          {['🌱', '♻️', '🌍'].map((emoji, i) => (
            <span key={i} className="text-xl">{emoji}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TeamCard;