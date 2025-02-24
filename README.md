# Golf Practice Assistant

A React-based golf coaching application for tracking practice sessions and analyzing swing videos.

## Features

- **Upload and preview swing photos/videos** - Upload your golf swing media for analysis
- **Track practice sessions** - Log your practice sessions and track progress over time
- **Drill progression system** - Progress through increasingly difficult practice drills
- **Progress tracking** - Monitor improvement through skill level tracking
- **Camera alignment** - Visual feedback for proper camera positioning during practice

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/golf-app.git
   cd golf-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Testing

The application uses Jest and React Testing Library for testing components.

To run tests:

```bash
npm test
```

For watch mode during development:

```bash
npm run test:watch
```

To check test coverage:

```bash
npm run test:coverage
```

## Project Structure

```
golf-app/
├── public/                  # Static assets
├── src/                     # Source code
│   ├── app/                 # Next.js App Router
│   ├── components/          # React components
│   │   ├── dashboard/       # Dashboard components
│   │   ├── drills/          # Drill-related components
│   │   ├── media/           # Media upload and preview components
│   │   ├── practice/        # Practice session components
│   │   ├── ui/              # UI components (buttons, cards, etc.)
│   │   ├── data/            # Data files (drill database, etc.)
│   │   ├── GolfCoachApp.tsx # Main application component
│   │   └── types.ts         # TypeScript types
│   ├── lib/                 # Utility functions
│   └── __tests__/           # Test files
├── .github/                 # GitHub Actions workflows
└── ...                      # Config files
```

## Development Workflow

### Component Architecture

The application follows a modular component architecture:

1. **GolfCoachApp**: Main container component that manages application state and navigation
2. **Dashboard**: Home screen showing progress and available drills
3. **PracticeSession**: Camera-based practice environment for selected drills
4. **MediaUploader**: Handles uploading and previewing swing media
5. **DrillList**: Displays available drills and current progress

### State Management

- Local React state for UI components
- LocalStorage for persisting progress data between sessions

### Adding New Drills

New drills can be added to the `drillDatabase.ts` file following the existing format:

```typescript
{
  id: 'unique-id',
  name: 'Drill Name',
  type: 'technique',
  progressionLevels: [
    { 
      level: 1, 
      distance: 10, 
      attempts: 5, 
      target: 3, 
      description: 'Description of level 1' 
    },
    // More levels...
  ],
  instructions: 'Instructions for the drill',
  setupGuide: {
    cameraPosition: 'Description of camera position',
    alignmentGuide: 'Instructions for alignment'
  }
}
```

## Deployment

The application is configured for deployment to GitHub Pages using GitHub Actions. Any push to the `main` branch will trigger a deployment.

The live version can be accessed at: https://smanielp.github.io/golf-app/

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- User authentication for personalized tracking
- Video analysis with AI-powered swing detection
- Social sharing of progress and achievements
- Custom drill creation
- Integration with golf performance metrics

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Lucide](https://lucide.dev/) for icons