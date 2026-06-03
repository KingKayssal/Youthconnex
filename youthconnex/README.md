# YouthConnex Frontend

A modern, responsive React-based web application built with Vite, React Router, Tailwind CSS, and Axios. This frontend connects to a Node.js/Express backend API and provides a complete user experience for managing items and community engagement.

## Features

- **Authentication System**: Secure login/registration with JWT tokens
- **Protected Routes**: Route-level access control based on authentication status
- **Item Management**: Create, read, update, and delete items with full CRUD operations
- **Real-time Search & Filtering**: Instant search with debouncing and dynamic filtering
- **Responsive Design**: Mobile-first approach with Tailwind CSS utility-first styling
- **Toast Notifications**: Custom notification system for user feedback
- **Error Handling**: Comprehensive error handling and user-friendly error messages
- **Code Quality**: ESLint and Prettier for consistent code formatting

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **ESLint & Prettier** - Code quality and formatting

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Input, Modal, etc.)
│   └── layout/          # Layout components (Navbar, Footer, ProtectedRoute)
├── pages/               # Page components (Home, Login, Dashboard, etc.)
├── hooks/               # Custom React hooks (useDebounce, useFetch)
├── context/             # React Context (AuthContext, ToastContext)
├── services/            # API service with Axios
├── utils/               # Helper functions and utilities
├── assets/              # Static files and images
├── App.jsx              # Main App component with routing
├── main.jsx             # Entry point
└── index.css            # Tailwind CSS imports
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

   Update `.env` with your backend URL:
   ```
   VITE_API_URL=http://localhost:5000
   VITE_APP_ENV=development
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`

## Available Scripts

### Development

```bash
# Start development server with hot module replacement
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

### Code Quality

```bash
# Run ESLint to check for code issues
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Format code with Prettier
npm run format

# Check if code is formatted correctly
npm run format:check
```

## Pages and Routes

| Route | Component | Authentication | Description |
|-------|-----------|-----------------|-------------|
| `/` | Home | Public | Welcome page with features overview |
| `/login` | Login | Public | User login form |
| `/register` | Register | Public | User registration form |
| `/dashboard` | Dashboard | Protected | Main dashboard with items list, search, filter, and pagination |
| `/items/new` | AddItem | Protected | Form to create a new item |
| `/items/:id` | ItemDetail | Protected | Item details with edit and delete functionality |
| `*` | NotFound | Public | 404 page for unmatched routes |

## API Integration

All API calls are managed through `src/services/api.js` using Axios with automatic JWT token handling.

### Available API Functions

```javascript
// Authentication
login(data)              // POST /api/auth/login
register(data)           // POST /api/auth/register
getMe()                  // GET /api/auth/me

// Items
getItems()               // GET /api/items
getItemById(id)          // GET /api/items/:id
createItem(data)         // POST /api/items
updateItem(id, data)     // PATCH /api/items/:id
deleteItem(id)           // DELETE /api/items/:id
```

### Request/Response Interceptors

- **Request**: Automatically attaches JWT token from `localStorage`
- **Response**: Handles 401 errors by logging out user and redirecting to login

## Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token is decoded and stored in `localStorage`
4. `AuthContext` provides token and user info to the entire app
5. Protected routes check authentication status
6. On 401 response, user is automatically logged out

## State Management

The application uses React Context API for state management:

- **AuthContext**: Manages user authentication state
- **ToastContext**: Manages toast notifications

No Redux or external state management library is used.

## Form Validation

All forms include:
- Client-side validation before API calls
- Field-level error messages
- Submit button disabled state during loading
- API error message display

## Responsive Design

The application is fully responsive with:
- Mobile-first approach (320px and up)
- Tablet optimizations (768px)
- Desktop layouts (1024px+)
- Hamburger menu on mobile
- Adaptive grid layouts

## Accessibility (WCAG 2.1 AA)

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Color contrast compliance
- Form label associations

## Performance Optimizations

- Lazy loading of page components
- Debounced search input (300ms)
- Pagination (10 items per page)
- React.lazy() and Suspense for code splitting
- Optimized bundle size < 500KB (gzipped)

## Error Handling

- Network errors display user-friendly messages
- API validation errors show field-specific feedback
- Failed requests trigger toast notifications
- Loading states prevent duplicate submissions

## Troubleshooting

### "Could not connect to backend"
- Ensure backend API is running on `http://localhost:5000`
- Check `VITE_API_URL` in `.env`
- Verify CORS is enabled on backend

### "Page does not load"
- Clear browser cache and localStorage
- Restart development server: `npm run dev`
- Check browser console for errors

### "Build size too large"
- Ensure lazy loading is implemented for pages
- Run `npm run build` and check bundle analysis
- Remove unused dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint:fix` and `npm run format`
4. Commit with clear messages
5. Create a pull request

## License

MIT

## Support

For issues or questions, please contact the development team or create an issue in the repository.
