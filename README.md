<div align="center">
   
# 🌱 EcoPulse
### Your Personal Sustainable Living Companion

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/cloud/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg)](https://tailwindcss.com/)

**Transform your daily habits into meaningful environmental impact**  
*Track • Compete • Achieve • Make a Difference* 🌍

[🚀 Live Demo](https://ecopulsetrackr.netlify.app/) • [📖 Documentation](https://docs.google.com/document/d/1vyWvu0ivqLy-IQ5lDwI8TFk2dyGHvlBm/edit?usp=sharing&ouid=108418581556305643665&rtpof=true&sd=true) • [🐛 Report Bug](https://github.com/VasupriyaPatnaik/EcoPulse/issues) • [💡 Request Feature](https://github.com/VasupriyaPatnaik/EcoPulse/issues)

</div>

---

## ✨ What is EcoPulse?

**EcoPulse** is a gamified sustainability tracker that makes eco-friendly living engaging and rewarding. Turn your green actions into points, compete with friends, and visualize your positive environmental impact in real-time.

### 🎯 Why EcoPulse?
- **📊 Data-Driven Impact**: See exactly how much CO₂, water, and energy you've saved
- **🏆 Gamification**: Earn points, unlock badges, and climb leaderboards
- **👥 Community**: Join challenges with thousands of eco-warriors worldwide
- **📱 User-Friendly**: Beautiful, intuitive interface built with modern web technologies
- **🔒 Secure**: JWT authentication and secure data handling

---

## 🌟 Key Features

<table>
<tr>
<td width="50%">

### 📈 **Smart Activity Tracking**
- Log 15+ eco-friendly activities
- Real-time impact calculations
- Streak tracking and goal setting
- Historical data visualization

### 🏆 **Gamification System**
- EcoPoints reward system
- 20+ achievement badges
- Global and friend leaderboards
- Weekly challenge participation

</td>
<td width="50%">

### 👥 **Community Features**
- Join eco-challenges with others
- Share achievements and progress
- Discussion forums by category
- Mentorship and tips sharing

### 📊 **Analytics Dashboard**
- Beautiful charts and graphs
- Environmental impact metrics
- Progress tracking over time
- Personalized insights

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) | User Interface |
| **Styling** | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | Responsive Design |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) | Server Runtime |
| **Framework** | ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white) | Web Framework |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white) | Data Storage |
| **Authentication** | ![JWT](https://img.shields.io/badge/JWT-black?style=flat&logo=JSON%20web%20tokens) | Secure Auth |
| **Email** | ![Nodemailer](https://img.shields.io/badge/Nodemailer-0078D4?style=flat&logo=microsoft-outlook&logoColor=white) | Email Service |
| **Animations** | ![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=flat&logo=framer&logoColor=blue) | UI Animations |

</div>

---

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

```bash
node --version  # v18.0.0 or higher
npm --version   # v8.0.0 or higher
git --version   # v2.0.0 or higher
```

### ⚡ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/VasupriyaPatnaik/EcoPulse.git
   cd EcoPulse
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   # Edit .env with your MongoDB URI and other secrets
   
   # Start development server
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   
   # Start React development server
   npm start
   ```

4. **Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_APP_PASSWORD=your_app_password
   NODE_ENV=development
   ```

### 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs

---

## 📂 Project Structure

```
EcoPulse/
├── 📁 backend/
│   ├── 📁 config/          # Database configuration
│   ├── 📁 controllers/     # Route logic and business rules
│   ├── 📁 middleware/      # Authentication & validation
│   ├── 📁 models/          # MongoDB schemas
│   ├── 📁 routes/          # API endpoints
│   ├── 📁 utils/           # Helper functions & email service
│   ├── 📄 server.js        # Entry point
│   └── 📄 package.json     # Dependencies
├── 📁 frontend/
│   ├── 📁 public/          # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/  # Reusable React components
│   │   ├── 📁 context/     # React Context (Auth, etc.)
│   │   ├── 📁 pages/       # Page components
│   │   ├── 📁 utils/       # API helpers
│   │   ├── 📄 App.js       # Main app component
│   │   └── 📄 index.js     # React entry point
│   ├── 📄 package.json     # Dependencies
│   └── 📄 tailwind.config.js # Tailwind configuration
├── 📄 README.md            # You are here!
└── 📄 .gitignore          # Git ignore rules
```

---

## 🎮 How to Use

### 1. **Create Account**
- Sign up with email and password
- Verify your email (OTP-based verification)
- Complete your profile setup

### 2. **Start Tracking**
- Navigate to "How It Works" to see available activities
- Log your eco-friendly actions (cycling, energy saving, etc.)
- Watch your EcoPoints grow!

### 3. **Join the Community**
- Check your ranking on the leaderboard
- Join weekly challenges
- Participate in discussions

### 4. **Monitor Progress**
- View your dashboard for detailed analytics
- Track your streak and achievements
- Set personal goals

---

## 🔧 Available Scripts

### Backend Commands
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm run test       # Run backend tests
```

### Frontend Commands
```bash
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run frontend tests
npm run eject      # Eject from Create React App
```

---

## 🚀 Deployment

### Option 1: Render (Recommended)

**Backend Deployment:**
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set root directory to `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variables in Render dashboard

**Frontend Deployment:**
1. Create a new Static Site on Render
2. Set root directory to `frontend`
3. Build command: `npm run build`
4. Publish directory: `build`

### Option 2: Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build individual containers
docker build -t ecopulse-backend ./backend
docker build -t ecopulse-frontend ./frontend
```

---

## 🤝 Contributing

We love contributions! Here's how you can help make EcoPulse even better:

### 🐛 Found a Bug?
1. Check if the issue already exists in [Issues](https://github.com/VasupriyaPatnaik/EcoPulse/issues)
2. If not, create a new issue with detailed description
3. Include steps to reproduce the bug

### 💡 Have a Feature Idea?
1. Open a feature request in [Issues](https://github.com/VasupriyaPatnaik/EcoPulse/issues)
2. Describe the feature and its benefits
3. We'll discuss and prioritize it!

### 🔧 Want to Code?
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📋 Roadmap

### 🚧 Currently in Development
- [ ] Real-time notifications system
- [ ] Mobile app (React Native)
- [ ] Advanced analytics and insights
- [ ] AI-powered personalized tips

### 🎯 Planned Features
- [ ] Social sharing integration
- [ ] Offline mode support
- [ ] Multi-language support
- [ ] Enterprise/Organization accounts
- [ ] Carbon footprint calculator API
- [ ] Integration with fitness trackers
- [ ] Reward redemption system

---

## 📊 Project Stats

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/VasupriyaPatnaik/EcoPulse)
![GitHub contributors](https://img.shields.io/github/contributors/VasupriyaPatnaik/EcoPulse)
![GitHub stars](https://img.shields.io/github/stars/VasupriyaPatnaik/EcoPulse?style=social)
![GitHub forks](https://img.shields.io/github/forks/VasupriyaPatnaik/EcoPulse?style=social)

</div>

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Design Inspiration**: Modern sustainability apps and environmental websites
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/) & [Heroicons](https://heroicons.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Chart.js](https://www.chartjs.org/) for data visualization
- **Community**: All the amazing contributors and eco-warriors using EcoPulse!

---

## 📞 Contact & Support

<div align="center">

**Need Help? Have Questions?**

[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com/VasupriyaPatnaik/EcoPulse/issues)
[![Email](https://img.shields.io/badge/Email-Support-blue?style=for-the-badge&logo=gmail)](mailto:support@ecopulse.com)

**Follow the Project**

[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/VasupriyaPatnaik)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/vasupriyapatnaik)

</div>

---

<div align="center">

### 🌍 Together, let's build a greener tomorrow, one action at a time!

**Made with ❤️ and ♻️ by the EcoPulse Team**

⭐ **If you find EcoPulse helpful, please consider giving it a star!** ⭐

</div>
