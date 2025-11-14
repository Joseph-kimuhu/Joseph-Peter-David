# Premier League Soccer App ⚽

***A comprehensive React application for tracking and managing English Premier League soccer data, including team standings, player statistics, and match fixtures.***

## 🚀 Features

### 🏆 **Team Management**
- View all 20 Premier League teams with detailed information
- Interactive team cards with logos and stadium information
- Individual team detail pages with statistics and history
- Add, edit, and delete team information

### 📊 **League Table**
- Real-time Premier League standings
- Sortable by points, goal difference, and goals scored
- Color-coded positions (Champions League, Europa League, Relegation)
- Edit team statistics directly in the table
- Goal difference calculations

### ⚽ **Match Fixtures**
- View upcoming and completed match fixtures
- Add new fixtures with date/time scheduling
- Edit match results and scores
- Status indicators for completed matches
- Delete fixture management

### 🌟 **Top Players**
- Player statistics tracking (goals and assists)
- Ranked leaderboard with medal system
- Add new players to the database
- Edit player statistics and club information
- Delete player records

## 🛠️ **Technologies Used**

- **React 19** - Modern JavaScript library for building user interfaces
- **React Router DOM** - Declarative routing for React applications
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixing
- **REST API** - Backend integration with epl-backend.vercel.app

## 📦 **Installation**

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
```bash
git clone git@github.com:Joseph-kimuhu/Joseph-Peter-David.git
cd epl-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app will automatically reload when you make changes

### Build for Production
```bash
npm run build
```

## 📁 **Project Structure**

```
epl-frontend/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navigation component
│   │   ├── Teams.js           # Teams overview page
│   │   ├── TeamDetail.js      # Individual team details
│   │   ├── Table.js           # League standings table
│   │   ├── Fixtures.js        # Match fixtures management
│   │   └── TopPlayers.js      # Player statistics
│   ├── App.js                 # Main application component
│   ├── index.js              # Application entry point
│   └── index.css             # Global styles with Tailwind
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── package.json              # Project dependencies
```

### API Data Structure

```json
{
  "teams": [
    {
      "id": 1,
      "name": "Manchester City",
      "stadium": "Etihad Stadium",
      "founded": 1880,
      "played": 38,
      "goalsScored": 99,
      "goalsConceded": 26,
      "points": 89,
      "logo": "team-logo-url"
    }
  ],
  "fixtures": [
    {
      "_id": "fixture-id",
      "homeTeam": "Man City",
      "awayTeam": "Arsenal",
      "time": "2024-01-15T15:00:00Z",
      "score": "2-1"
    }
  ],
  "topPlayers": [
    {
      "id": 1,
      "name": "Erling Haaland",
      "club": "Man City",
      "goals": 36,
      "assists": 8
    }
  ]
}
```


## 🎯 **Usage Guide**

### Navigation
Use the top navigation bar to switch between different sections:

- **Teams** - Browse all Premier League teams and view detailed information
- **Fixtures** - Manage match schedules and results
- **Table** - View and edit the current league standings
- **Top Players** - Track player statistics and rankings

### Key Features

#### 🏆 **Managing League Table**
1. Navigate to the "Table" section
2. Click "Edit" next to any team to modify their statistics
3. Update played matches, goals scored/conceded, and points
4. Click "Save" to apply changes
5. The table automatically sorts by points and goal difference

#### ⚽ **Managing Fixtures**
1. View all scheduled and completed matches
2. Click "Edit" to modify match details or add scores
3. Use "Add New Fixture" form to schedule new matches
4. Set date, time, teams, and optional scores
5. Delete fixtures using the "Delete" button

#### 🌟 **Managing Players**
1. View ranked player statistics in the "Top Players" section
2. Click "Edit" to modify player goals and assists
3. Add new players using the form at the bottom
4. Players are automatically ranked by goals scored
5. Delete players using the "Delete" button

#### 🏟️ **Team Information**
1. Browse teams in the "Teams" section
2. Click "View Details" on any team card
3. See comprehensive team information, statistics, and history
4. Navigate back using the "Back to Teams" button

## 🎨 **Design Features**

- **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- **Interactive Elements** - Hover effects, transitions, and animations
- **Color-coded Information** - Visual indicators for different data types
- **Mobile Responsive** - Optimized for all device sizes
- **Loading States** - Smooth loading animations and error handling
- **Accessibility** - Semantic HTML and keyboard navigation support

## 🚀 **Performance Optimizations**

- **Component-based Architecture** - Reusable and maintainable code
- **Efficient State Management** - React hooks for optimal performance
- **Error Boundaries** - Graceful error handling and user feedback
- **Responsive Images** - Optimized loading with fallback placeholders
- **API Error Handling** - Comprehensive error states and retry mechanisms

## 👥 **Contributors**

- **David Kuron** - Frontend Development
- **Peter Jones** - Backend Integration  
- **Joseph Kimuhu** - UI/UX Design & Project Lead

## 📄 **License**

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 **Support**

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for Premier League fans worldwide! ⚽**